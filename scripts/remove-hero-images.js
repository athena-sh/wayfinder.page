#!/usr/bin/env node

import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const postsDir = path.join(__dirname, "..", "src", "content", "posts");

async function removeHeroImages() {
	try {
		const entries = fs.readdirSync(postsDir, { withFileTypes: true });

		let processedCount = 0;
		let totalFiles = 0;

		for (const entry of entries) {
			let filePath;

			if (entry.isFile() && entry.name.endsWith(".md")) {
				// Direct .md file
				filePath = path.join(postsDir, entry.name);
			} else if (entry.isDirectory() && !entry.name.startsWith(".")) {
				// Check for index.md in folder
				const indexPath = path.join(postsDir, entry.name, "index.md");
				if (fs.existsSync(indexPath)) {
					filePath = indexPath;
				}
			}

			if (!filePath) continue;

			totalFiles++;

			// Read the file content
			const content = fs.readFileSync(filePath, "utf8");

			// Check if it contains the hero image line (jpg or webp)
			const heroImagePatternJpg =
				/^!\[Hero Image\]\(\.\/heroImage\.jpg\)\s*$/gm;
			const heroImagePatternWebp =
				/^!\[Hero Image\]\(\.\/heroImage\.webp\)\s*$/gm;

			if (
				heroImagePatternJpg.test(content) ||
				heroImagePatternWebp.test(content)
			) {
				// Remove both types of hero image lines
				let updatedContent = content.replace(heroImagePatternJpg, "");
				updatedContent = updatedContent.replace(heroImagePatternWebp, "");

				// Write the updated content back
				fs.writeFileSync(filePath, updatedContent, "utf8");

				const fileName = entry.isFile() ? entry.name : `${entry.name}/index.md`;
				console.log(`✅ Removed hero image from: ${fileName}`);
				processedCount++;
			}
		}

		console.log("\n🎉 Hero image removal complete!");
		console.log(`📁 Scanned: ${totalFiles} post files`);
		console.log(`🗑️  Cleaned: ${processedCount} files`);

		if (processedCount > 0) {
			console.log(
				"\n💡 All ![Hero Image](./heroImage.jpg) lines have been removed.",
			);
		} else {
			console.log("\n💡 No hero image lines found to remove.");
		}
	} catch (error) {
		console.error("❌ Error removing hero images:", error.message);
		process.exit(1);
	}
}

removeHeroImages();
