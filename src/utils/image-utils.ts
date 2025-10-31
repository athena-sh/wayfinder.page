// src/utils/image-utils.ts
import fs from "fs";
import path from "path";

/**
 * Resolves image path for Open Graph and social media sharing
 * Handles local images, SVG icons, and external URLs
 */
export function resolveOgImagePath(
	imageSrc: string,
	postSlug?: string,
	siteUrl?: string,
): string {
	if (!imageSrc) return "";

	// If it's already an absolute URL, return as-is
	if (imageSrc.startsWith("http://") || imageSrc.startsWith("https://")) {
		return imageSrc;
	}

	// Ensure we have a base URL for social sharing
	const baseUrl = (siteUrl || "http://localhost:4321").replace(/\/$/, ""); // Remove trailing slash

	// Handle different image path patterns
	if (imageSrc.startsWith("./")) {
		// Local image in post folder: "./image.jpg" -> need to resolve to final URL
		if (postSlug) {
			// In production, these get processed by Astro's asset pipeline
			// For OG tags, we need to reference them properly
			return `${baseUrl}/_astro/${imageSrc.slice(2).replace(/[^a-zA-Z0-9.-]/g, "_")}`;
		}
		return `${baseUrl}${imageSrc.slice(1)}`; // fallback
	}
	if (imageSrc.endsWith(".svg") && !imageSrc.startsWith("/")) {
		// SVG icon from theme icons: "apple.svg"
		// For production, SVGs in assets/icons need to be imported to get proper URLs
		// For now, try to find them in the built _astro directory or use fallback
		return getFallbackOgImage(siteUrl);
	}
	if (imageSrc.startsWith("/")) {
		// Absolute path from public: "/image.jpg"
		return `${baseUrl}${imageSrc}`;
	}
	// Relative path, assume it's in public or assets
	return `${baseUrl}/${imageSrc}`;
}

/**
 * Gets the full image path for display (used by HeroImage component)
 * This is similar to the logic in HeroImage.astro but reusable
 */
export function resolveImagePath(imageSrc: string, basePath?: string): string {
	if (!imageSrc) return "";

	// If it's already an absolute URL, return as-is
	if (imageSrc.startsWith("http://") || imageSrc.startsWith("https://")) {
		return imageSrc;
	}

	// Build the full image path
	if (basePath) {
		return `/${basePath}/${imageSrc}`.replace(/\/+/g, "/");
	}

	return imageSrc;
}

/**
 * Checks if an image file exists at the given server path
 * Useful for fallback logic during build time
 */
export function imageExists(imagePath: string): boolean {
	try {
		const fullPath = path.join(process.cwd(), imagePath);
		return fs.existsSync(fullPath);
	} catch {
		return false;
	}
}

/**
 * Gets a fallback OG image URL
 * Returns a default image for social sharing when no post image is available
 */
export function getFallbackOgImage(siteUrl?: string): string {
	const baseUrl = (siteUrl || "http://localhost:4321").replace(/\/$/, ""); // Remove trailing slash

	// Check for common fallback images in order of preference
	const fallbackImages = [
		"/src/assets/images/prism-dancer.jpg", // Primary homepage OG image
		"/og-default.jpg",
		"/og-default.png",
		"/favicon/favicon-universal-192.png", // Universal PNG favicon with purple background (better compatibility than SVG)
	];

	// Return the first available fallback - using prism-dancer.jpg for homepage
	return `${baseUrl}${fallbackImages[0]}`;
}
