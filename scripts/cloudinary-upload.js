#!/usr/bin/env node

import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, "..", ".env") });

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

function isUrl(string) {
	try {
		new URL(string);
		return true;
	} catch {
		return false;
	}
}

async function uploadImage(imageInput) {
	try {
		const isImageUrl = isUrl(imageInput);

		if (isImageUrl) {
			// Validate URL extension
			const url = new URL(imageInput);
			const pathname = url.pathname.toLowerCase();
			const validExtensions = [".jpg", ".jpeg", ".png"];
			const hasValidExtension = validExtensions.some((ext) =>
				pathname.includes(ext),
			);

			if (!hasValidExtension) {
				console.error(
					`Error: URL must point to a JPG or PNG image. Found: ${pathname}`,
				);
				process.exit(1);
			}

			console.log(`Uploading image from URL: ${imageInput}`);
		} else {
			// Check if local file exists
			if (!fs.existsSync(imageInput)) {
				console.error(`Error: File not found: ${imageInput}`);
				process.exit(1);
			}

			// Check if file is jpg or png
			const validExtensions = [".jpg", ".jpeg", ".png"];
			const fileExtension = imageInput
				.toLowerCase()
				.substring(imageInput.lastIndexOf("."));

			if (!validExtensions.includes(fileExtension)) {
				console.error(
					`Error: Only JPG and PNG files are supported. Found: ${fileExtension}`,
				);
				process.exit(1);
			}

			console.log(`Uploading local file: ${imageInput}`);
		}

		// Upload to Cloudinary
		const result = await cloudinary.uploader.upload(imageInput, {
			folder: "wayfinder-images",
			resource_type: "image",
		});

		// Extract the parts we need from the original URL
		const originalUrl = result.secure_url;
		const urlParts = originalUrl.split("/");

		// Find the version and filename parts
		const versionIndex = urlParts.findIndex((part) => part.startsWith("v"));
		const version = urlParts[versionIndex];
		const filename = urlParts[urlParts.length - 1];

		// Remove extension from filename
		const filenameWithoutExt = filename.substring(0, filename.lastIndexOf("."));

		// Construct the optimized URL
		const optimizedUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,fl_force_strip,q_auto:best/${version}/wayfinder-images/${filenameWithoutExt}`;

		console.log("Upload successful!");
		console.log("Optimized URL:");
		console.log(optimizedUrl);

		return optimizedUrl;
	} catch (error) {
		console.error("Upload failed:", error.message);
		process.exit(1);
	}
}

// Get image path or URL from command line arguments
const imageInput = process.argv[2];

if (!imageInput) {
	console.error("Usage: node cloudinary-upload.js <path-to-image-or-url>");
	console.error("Examples:");
	console.error("  node cloudinary-upload.js ./my-image.jpg");
	console.error("  node cloudinary-upload.js https://example.com/image.png");
	process.exit(1);
}

uploadImage(imageInput);
