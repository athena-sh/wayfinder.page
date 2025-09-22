#!/usr/bin/env node

import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const postsDir = path.join(__dirname, "..", "src", "content", "posts");

async function flattenPosts() {
	try {
		const entries = fs.readdirSync(postsDir, { withFileTypes: true });

		let processedCount = 0;
		let skippedCount = 0;

		for (const entry of entries) {
			// Skip files and .DS_Store
			if (!entry.isDirectory() || entry.name.startsWith(".")) {
				continue;
			}

			const folderPath = path.join(postsDir, entry.name);
			const indexPath = path.join(folderPath, "index.md");

			// Check if index.md exists in the folder
			if (!fs.existsSync(indexPath)) {
				console.log(`⚠️  Skipping ${entry.name} - no index.md found`);
				skippedCount++;
				continue;
			}

			// Create the new direct .md file path
			const newFilePath = path.join(postsDir, `${entry.name}.md`);

			// Check if direct .md file already exists
			if (fs.existsSync(newFilePath)) {
				console.log(
					`⚠️  Skipping ${entry.name} - ${entry.name}.md already exists`,
				);
				skippedCount++;
				continue;
			}

			// Copy index.md to the new location
			fs.copyFileSync(indexPath, newFilePath);

			// Remove the entire folder and its contents
			fs.rmSync(folderPath, { recursive: true, force: true });

			console.log(`✅ Flattened: ${entry.name}/index.md → ${entry.name}.md`);
			processedCount++;
		}

		console.log("\n🎉 Flattening complete!");
		console.log(`📁 Processed: ${processedCount} posts`);
		console.log(`⏭️  Skipped: ${skippedCount} posts`);

		if (processedCount > 0) {
			console.log(
				"\n💡 All folder-based posts have been converted to direct .md files.",
			);
			console.log(
				"💡 Any extra files (heroImage.jpg, etc.) have been removed.",
			);
		}
	} catch (error) {
		console.error("❌ Error flattening posts:", error.message);
		process.exit(1);
	}
}

flattenPosts();
