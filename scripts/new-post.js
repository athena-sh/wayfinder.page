/* This is a script to create a new post markdown file with front-matter */

import fs from "fs";
import path from "path";

function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

const args = process.argv.slice(2);

if (args.length === 0) {
	console.error(`Error: No filename argument provided
Usage: npm run new-post -- <filename>`);
	process.exit(1); // Terminate the script and return error code 1
}

const originalInput = args[0];

// Remove any .md extension from the provided name
const fileExtensionRegex = /\.(md|mdx)$/i;
const baseName = originalInput.replace(fileExtensionRegex, "");

function slugify(input) {
	return input
		.toLowerCase()
		.trim()
		.replace(/[_\s]+/g, "-") // spaces/underscores to hyphens
		.replace(/[^a-z0-9-]/g, "") // drop non-url-safe chars
		.replace(/-+/g, "-") // collapse multiple hyphens
		.replace(/^-|-$/g, ""); // trim hyphens
}

const slug = slugify(baseName);

const targetDir = "./src/content/posts/";
const fullPath = path.join(targetDir, `${slug}.md`);

if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists `);
	process.exit(1);
}

const content = `---
title: ${originalInput}
published: ${getDate()}
description: ''
image: ''
showImageInline: false
tags: []
category: ''
draft: false 
lang: ''
---
`;

fs.writeFileSync(fullPath, content);

console.log(`Post ${fullPath} created`);
