#!/usr/bin/env node

/**
 * Citation Link Auditor & Fixer
 *
 * Audits and optionally fixes broken citation links in markdown posts
 *
 * Modes:
 *   report (default) - Check all links and generate report
 *   fix              - Check and attempt to fix broken links
 *
 * Usage:
 *   node scripts/audit-fix-citations.js                    # Report mode (all files)
 *   node scripts/audit-fix-citations.js --file <path>      # Report mode (single file)
 *   node scripts/audit-fix-citations.js --fix              # Fix mode (all files)
 *   node scripts/audit-fix-citations.js --fix --file <path> # Fix mode (single file)
 */

import { promises as fs } from "fs";
import http from "http";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const POSTS_DIR = "src/content/posts";
const REPORTS_DIR = path.join(__dirname, "..", "reports");
const REPORT_FILE = "citation-audit-report.txt";
const TIMEOUT = 10000; // 10 seconds
const USER_AGENT = "Mozilla/5.0 (compatible; LinkChecker/1.0)";

// Colors
const colors = {
	reset: "\x1b[0m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
};

// Statistics
const stats = {
	totalCitations: 0,
	brokenCitations: 0,
	fixedCitations: 0,
	totalBacklinks: 0,
	brokenBacklinks: 0,
};

// Parse command line arguments
function parseArgs() {
	const args = process.argv.slice(2);
	const config = {
		mode: "report",
		targetFile: null,
	};

	for (let i = 0; i < args.length; i++) {
		switch (args[i]) {
			case "--fix":
				config.mode = "fix";
				break;
			case "--file":
				config.targetFile = args[++i];
				if (!config.targetFile) {
					console.error("Error: --file requires a filename");
					process.exit(1);
				}
				break;
			case "--help":
			case "-h":
				printHelp();
				process.exit(0);
			default:
				console.error(`Unknown option: ${args[i]}`);
				console.error("Use --help for usage information");
				process.exit(1);
		}
	}

	if (config.targetFile) {
		config.mode += "-test";
	}

	return config;
}

function printHelp() {
	console.log("Citation Link Auditor & Fixer\n");
	console.log("Usage:");
	console.log(
		"  node scripts/audit-fix-citations.js                    # Report mode (all files)",
	);
	console.log(
		"  node scripts/audit-fix-citations.js --file <path>      # Report mode (single file)",
	);
	console.log(
		"  node scripts/audit-fix-citations.js --fix              # Fix mode (all files)",
	);
	console.log(
		"  node scripts/audit-fix-citations.js --fix --file <path> # Fix mode (single file)\n",
	);
	console.log("Modes:");
	console.log("  report (default) - Check all links and generate report");
	console.log("  fix              - Check and attempt to fix broken links");
}

// Test URL with proper redirects and timeout
function testUrl(url, method = "HEAD") {
	return new Promise((resolve) => {
		const urlObj = new URL(url);
		const client = urlObj.protocol === "https:" ? https : http;

		const options = {
			method,
			timeout: TIMEOUT,
			headers: {
				"User-Agent": USER_AGENT,
				Accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
				"Accept-Language": "en-US,en;q=0.5",
			},
		};

		const req = client.request(url, options, (res) => {
			// Handle redirects
			if (
				res.statusCode >= 300 &&
				res.statusCode < 400 &&
				res.headers.location
			) {
				testUrl(res.headers.location, method).then(resolve);
				return;
			}

			// If HEAD fails with 403/405, retry with GET
			if (
				method === "HEAD" &&
				(res.statusCode === 403 || res.statusCode === 405)
			) {
				testUrl(url, "GET").then(resolve);
				return;
			}

			resolve(res.statusCode);

			// Consume response data to free up memory
			res.resume();
		});

		req.on("error", () => resolve(0));
		req.on("timeout", () => {
			req.destroy();
			resolve(0);
		});

		req.end();
	});
}

// Parse frontmatter from markdown content
function parseFrontmatter(content) {
	const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		return { frontmatter: "", body: content, badUrls: [] };
	}

	const frontmatter = match[1];
	const body = content.slice(match[0].length);

	// Extract bad URLs from frontmatter comments
	const badUrlsRegex = /# bad_urls:\s*\[(.*?)\]/s;
	const badUrlsMatch = frontmatter.match(badUrlsRegex);
	const badUrls = badUrlsMatch
		? badUrlsMatch[1]
				.split(",")
				.map((url) => url.trim().replace(/['"]/g, ""))
				.filter((url) => url.length > 0)
		: [];

	return { frontmatter, body, badUrls };
}

// Update frontmatter with bad URLs
function updateFrontmatter(content, badUrls) {
	const frontmatterRegex = /^(---\n[\s\S]*?)(\n---)/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		return content;
	}

	let frontmatter = match[1];

	// Remove existing bad_urls comment if present
	frontmatter = frontmatter.replace(/\n# bad_urls:\s*\[.*?\]/s, "");

	// Add new bad_urls comment if there are any
	if (badUrls.length > 0) {
		const badUrlsList = badUrls.map((url) => `"${url}"`).join(", ");
		frontmatter += `\n# bad_urls: [${badUrlsList}]`;
	}

	return frontmatter + match[2] + content.slice(match[0].length);
}

// Extract citations from markdown content
function extractCitations(content) {
	const citationRegex = /^\[\^(\d+)\]: \[([^\]]+)\]\((https?:\/\/[^)]+)\)/gm;
	const citations = [];
	let match;

	while ((match = citationRegex.exec(content)) !== null) {
		citations.push({
			ref: `^${match[1]}`,
			title: match[2],
			url: match[3],
			line: match[0],
		});
	}

	return citations;
}

// Extract backlinks (internal links)
function extractBacklinks(content) {
	const backlinkRegex = /\[([^\]]+)\]\((\/posts\/[^)]+|\.\.?\/[^)]+)\)/g;
	const backlinks = [];
	let match;

	while ((match = backlinkRegex.exec(content)) !== null) {
		backlinks.push({
			text: match[1],
			url: match[2],
			line: match[0],
		});
	}

	return backlinks;
}

// Check if internal link exists
async function checkInternalLink(link, currentFile) {
	try {
		// Handle absolute paths starting with /posts/
		if (link.startsWith("/posts/")) {
			// Remove trailing slash and anchor
			const cleanLink = link.split("#")[0].replace(/\/$/, "");
			const targetPath = path.join("src/content", cleanLink);

			// Try as-is first
			try {
				await fs.access(targetPath);
				return 200;
			} catch {
				// Try with .md extension
				try {
					await fs.access(targetPath + ".md");
					return 200;
				} catch {
					return 404;
				}
			}
		}

		// Handle relative paths
		if (link.startsWith("../") || link.startsWith("./")) {
			const baseDir = path.dirname(currentFile);
			const targetPath = path.resolve(baseDir, link);
			const cleanPath = targetPath.split("#")[0]; // Remove anchor

			try {
				await fs.access(cleanPath);
				return 200;
			} catch {
				try {
					await fs.access(cleanPath + ".md");
					return 200;
				} catch {
					return 404;
				}
			}
		}

		return 200; // Not an internal link we can check
	} catch {
		return 404;
	}
}

// Get domain from URL
function getDomain(url) {
	try {
		const urlObj = new URL(url);
		return urlObj.hostname.replace(/^www\./, "");
	} catch {
		return url;
	}
}

// Duplicate removed - using the first parseFrontmatter() and updateFrontmatter() functions above

// Search for replacement URL using DuckDuckGo
async function searchReplacement(title, originalDomain) {
	return new Promise((resolve) => {
		// Clean up title for search
		const searchQuery = title
			.replace(/[^a-zA-Z0-9 ]/g, " ")
			.replace(/\s+/g, " ")
			.trim();

		console.log(
			`    ${colors.yellow}Searching DuckDuckGo for: "${searchQuery}"${colors.reset}`,
		);

		const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}`;

		const req = https.get(
			searchUrl,
			{
				headers: {
					"User-Agent": USER_AGENT,
				},
				timeout: TIMEOUT,
			},
			(res) => {
				let data = "";

				res.on("data", (chunk) => {
					data += chunk;
				});

				res.on("end", () => {
					// Parse HTML to extract first few results
					const results = [];
					const linkRegex =
						/<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
					let match;
					let count = 0;

					while ((match = linkRegex.exec(data)) !== null && count < 5) {
						const url = match[1].replace(
							/^\/\/duckduckgo\.com\/l\/\?uddg=/,
							"",
						);
						const decodedUrl = decodeURIComponent(url.split("&")[0]);

						// Filter out ads, tracking URLs, and same domain
						const isAd =
							decodedUrl.includes("duckduckgo.com/y.js") ||
							decodedUrl.includes("/aclick?") ||
							decodedUrl.includes("ad_domain=") ||
							decodedUrl.includes("msclkid=");

						const isSameDomain = decodedUrl.includes(originalDomain);

						if (!isAd && !isSameDomain && decodedUrl.startsWith("http")) {
							results.push({
								title: match[2],
								url: decodedUrl,
							});
							count++;
						}
					}

					resolve(results);
				});
			},
		);

		req.on("error", () => resolve([]));
		req.on("timeout", () => {
			req.destroy();
			resolve([]);
		});
	});
}

// Test multiple URLs and return the first working one (skip bad URLs)
async function findWorkingUrl(urls, badUrls = []) {
	for (const result of urls) {
		// Skip if URL is in the bad list
		if (badUrls.includes(result.url)) {
			console.log(
				`    ${colors.yellow}⊘ Skipping (on bad list): ${getDomain(result.url)}${colors.reset}`,
			);
			continue;
		}

		console.log(`    ${colors.yellow}Testing: ${result.url}${colors.reset}`);
		const status = await testUrl(result.url);

		if (status === 200) {
			console.log(
				`    ${colors.green}✓ Found working URL: ${getDomain(result.url)}${colors.reset}`,
			);
			return result;
		}
		console.log(
			`    ${colors.red}✗ Failed (HTTP ${status}): ${getDomain(result.url)}${colors.reset}`,
		);
	}

	return null;
}

// Replace citation in file content
function replaceCitation(content, oldCitation, newUrl, newTitle) {
	const oldLine = oldCitation.line;
	const newLine = `[^${oldCitation.ref.replace("^", "")}]: [${newTitle || oldCitation.title}](${newUrl})`;

	return content.replace(oldLine, newLine);
}

// Process a single file
async function processFile(filePath, reportLines, config) {
	const filename = path.basename(filePath);
	console.log(`${colors.blue}Checking: ${filename}${colors.reset}`);

	reportLines.push("");
	reportLines.push(`File: ${filename}`);
	reportLines.push("---");

	let content = await fs.readFile(filePath, "utf-8");
	let fileHasBroken = false;
	let fileModified = false;

	// Parse frontmatter and get bad URLs list
	const { frontmatter, body, badUrls } = parseFrontmatter(content);
	const newBadUrls = [...badUrls]; // Track new bad URLs to add

	if (badUrls.length > 0) {
		console.log(
			`  ${colors.yellow}Found ${badUrls.length} URL(s) on bad list${colors.reset}`,
		);
	}

	// Check citations
	const citations = extractCitations(content);

	for (const citation of citations) {
		stats.totalCitations++;

		const httpCode = await testUrl(citation.url);

		if (httpCode === 200) {
			console.log(
				`  ${colors.green}✓${colors.reset} ${citation.ref} - ${httpCode} - ${getDomain(citation.url)}`,
			);
		} else {
			fileHasBroken = true;
			stats.brokenCitations++;

			console.log(
				`  ${colors.red}✗${colors.reset} ${citation.ref} - ${httpCode} - ${citation.title}`,
			);
			console.log(`    ${colors.red}URL: ${citation.url}${colors.reset}`);

			reportLines.push(`BROKEN: ${citation.ref} - HTTP ${httpCode}`);
			reportLines.push(`  Title: ${citation.title}`);
			reportLines.push(`  URL: ${citation.url}`);

			// Add to bad URLs list if not already there (always track bad URLs)
			if (!newBadUrls.includes(citation.url)) {
				newBadUrls.push(citation.url);
				console.log(
					`    ${colors.yellow}→ Added to bad URL list${colors.reset}`,
				);
			}

			// Attempt to fix if in fix mode
			if (config.mode.startsWith("fix")) {
				const originalDomain = getDomain(citation.url);
				const searchResults = await searchReplacement(
					citation.title,
					originalDomain,
				);

				if (searchResults.length > 0) {
					const workingResult = await findWorkingUrl(searchResults, newBadUrls);

					if (workingResult) {
						console.log(
							`    ${colors.green}→ Replacing with: ${workingResult.url}${colors.reset}`,
						);

						content = replaceCitation(
							content,
							citation,
							workingResult.url,
							workingResult.title,
						);

						// Verify the replacement works
						console.log(
							`    ${colors.yellow}Verifying replacement...${colors.reset}`,
						);
						const verifyStatus = await testUrl(workingResult.url);

						if (verifyStatus === 200) {
							console.log(
								`    ${colors.green}✓ Verified: Replacement URL works${colors.reset}`,
							);
							fileModified = true;
							stats.fixedCitations++;
							reportLines.push(`  FIXED: Replaced with ${workingResult.url}`);
							reportLines.push("  VERIFIED: Replacement tested and working");

							// Remove original bad URL from list since we fixed it
							const badUrlIndex = newBadUrls.indexOf(citation.url);
							if (badUrlIndex > -1) {
								newBadUrls.splice(badUrlIndex, 1);
							}
						} else {
							console.log(
								`    ${colors.red}✗ Verification failed: Replacement URL returned ${verifyStatus}${colors.reset}`,
							);
							reportLines.push(
								`  FAILED: Replacement URL verification failed (HTTP ${verifyStatus})`,
							);
							// Add failed replacement to bad list
							if (!newBadUrls.includes(workingResult.url)) {
								newBadUrls.push(workingResult.url);
							}
							// Don't modify the file if verification fails
							content = await fs.readFile(filePath, "utf-8"); // Reload original
						}
					} else {
						console.log(
							`    ${colors.yellow}✗ No working replacement found${colors.reset}`,
						);
						reportLines.push("  FAILED: No working replacement found");
					}
				} else {
					console.log(
						`    ${colors.yellow}✗ No search results found${colors.reset}`,
					);
					reportLines.push("  FAILED: No search results");
				}
			}

			reportLines.push("");
		}
	}

	// Save file if modified
	if (fileModified) {
		await fs.writeFile(filePath, content, "utf-8");
		console.log(`  ${colors.green}✓ File updated with fixes${colors.reset}`);
	}

	if (!fileHasBroken && citations.length > 0) {
		console.log(`  ${colors.green}All citations OK!${colors.reset}`);
	}

	// Check backlinks
	const backlinks = extractBacklinks(content);

	if (backlinks.length > 0) {
		console.log(`${colors.blue}  Checking backlinks...${colors.reset}`);

		for (const backlink of backlinks) {
			stats.totalBacklinks++;

			const status = await checkInternalLink(backlink.url, filePath);

			if (status === 200) {
				console.log(
					`    ${colors.green}✓${colors.reset} Internal: ${backlink.text} → ${backlink.url}`,
				);
			} else {
				stats.brokenBacklinks++;
				console.log(
					`    ${colors.red}✗${colors.reset} Broken backlink: ${backlink.text}`,
				);
				console.log(
					`      ${colors.red}Target: ${backlink.url}${colors.reset}`,
				);

				reportLines.push("BROKEN BACKLINK:");
				reportLines.push(`  Text: ${backlink.text}`);
				reportLines.push(`  Target: ${backlink.url}`);
				reportLines.push("");
			}
		}
	}

	// Update frontmatter with bad URLs list if changed
	if (
		newBadUrls.length !== badUrls.length ||
		!newBadUrls.every((url, i) => url === badUrls[i])
	) {
		content = updateFrontmatter(content, newBadUrls);
		fileModified = true;
		console.log(
			`  ${colors.yellow}→ Updated bad URL list (${newBadUrls.length} URLs)${colors.reset}`,
		);
	}

	// Save file if modified
	if (fileModified) {
		await fs.writeFile(filePath, content, "utf-8");
		console.log(`  ${colors.green}✓ File updated with fixes${colors.reset}`);
	}

	console.log("");
}

// Get list of files to process
async function getFilesToProcess(config) {
	if (config.targetFile) {
		try {
			await fs.access(config.targetFile);
			return [config.targetFile];
		} catch {
			console.error(
				`${colors.red}Error: File not found: ${config.targetFile}${colors.reset}`,
			);
			process.exit(1);
		}
	}

	const files = await fs.readdir(POSTS_DIR);
	return files
		.filter((file) => file.endsWith(".md"))
		.map((file) => path.join(POSTS_DIR, file));
}

// Main function
async function main() {
	const config = parseArgs();

	console.log(`${colors.blue}=== Citation Link Auditor ===${colors.reset}`);
	console.log(`Mode: ${config.mode}`);
	if (config.targetFile) {
		console.log(`Target: ${config.targetFile}`);
	} else {
		console.log(`Directory: ${POSTS_DIR}`);
	}
	console.log("");

	// Ensure reports directory exists
	await fs.mkdir(REPORTS_DIR, { recursive: true });
	const reportLines = [
		`Citation Audit Report - ${new Date().toISOString()}`,
		"======================================",
	];

	const files = await getFilesToProcess(config);

	for (const file of files) {
		await processFile(file, reportLines, config);
	}

	// Add summary to report
	reportLines.push("");
	reportLines.push("======================================");
	reportLines.push("Summary:");
	reportLines.push(`  Total citations checked: ${stats.totalCitations}`);
	reportLines.push(`  Broken citations: ${stats.brokenCitations}`);
	reportLines.push(`  Fixed citations: ${stats.fixedCitations}`);
	reportLines.push(`  Total backlinks checked: ${stats.totalBacklinks}`);
	reportLines.push(`  Broken backlinks: ${stats.brokenBacklinks}`);

	// Write report
	const reportPath = path.join(REPORTS_DIR, REPORT_FILE);
	await fs.writeFile(reportPath, reportLines.join("\n"));

	// Print summary
	console.log(`${colors.blue}=== Summary ===${colors.reset}`);
	console.log(`Total citations checked: ${stats.totalCitations}`);
	console.log(
		`Broken citations: ${colors.red}${stats.brokenCitations}${colors.reset}`,
	);
	console.log(
		`Fixed citations: ${colors.green}${stats.fixedCitations}${colors.reset}`,
	);
	console.log(`Total backlinks checked: ${stats.totalBacklinks}`);
	console.log(
		`Broken backlinks: ${colors.red}${stats.brokenBacklinks}${colors.reset}`,
	);
	console.log("");
	console.log(`Full report saved to: ${reportPath}`);

	const totalBroken = stats.brokenCitations + stats.brokenBacklinks;
	process.exit(totalBroken > 0 ? 1 : 0);
}

// Run
main().catch((err) => {
	console.error(`${colors.red}Error: ${err.message}${colors.reset}`);
	process.exit(1);
});
