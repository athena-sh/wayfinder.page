import rss from "@astrojs/rss";
import { getSortedPosts } from "@utils/content-utils";
import { url } from "@utils/url-utils";
import type { APIContext } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { siteConfig } from "@/config";

const parser = new MarkdownIt();

function stripInvalidXmlChars(str: string): string {
	return str.replace(
		// biome-ignore lint/suspicious/noControlCharactersInRegex: https://www.w3.org/TR/xml/#charsets
		/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]/g,
		"",
	);
}

function convertCalloutsToBlockquotes(content: string): string {
	// Convert :::note, :::tip, :::warning, etc. to blockquotes
	return content.replace(
		/:::(\w+)\s*([\s\S]*?):::/g,
		(_, type, innerContent) =>
			`> **${type.toUpperCase()}**\n>\n${innerContent
				.trim()
				.split("\n")
				.map((line: string) => `> ${line}`)
				.join("\n")}`,
	);
}

function convertInlineChartsToTables(content: string): string {
	// Convert ::linechart{title="..." data="..."} to markdown tables
	return content.replace(
		/::linechart\{title="([^"]+)"\s+data="([^"]+)"\}/g,
		(_, title, data) => {
			const dataPoints = data.split(",").map((point: string) => {
				const [label, value] = point.split("|");
				return `| ${label.trim()} | $${value.trim()} |`;
			});
			return `\n**${title}**\n\n| Date | Price |\n|------|-------|\n${dataPoints.join("\n")}\n`;
		},
	);
}

export async function GET(context: APIContext) {
	const blog = await getSortedPosts();
	const siteUrl = context.site ?? "https://fuwari.vercel.app";

	return rss({
		title: siteConfig.title,
		description: siteConfig.subtitle || "No description",
		site: siteUrl,
		items: blog.map((post) => {
			const content =
				typeof post.body === "string" ? post.body : String(post.body || "");
			// Convert callouts to blockquotes and charts to tables before processing
			const contentWithBlockquotes = convertCalloutsToBlockquotes(content);
			const contentWithTables = convertInlineChartsToTables(
				contentWithBlockquotes,
			);
			const cleanedContent = stripInvalidXmlChars(contentWithTables);

			// Build description with hero image like Medium does
			let descriptionHtml = "";
			if (post.data.hero) {
				descriptionHtml += `<p><a href="${url(`/posts/${post.slug}/`)}"><img src="${post.data.hero}" alt="${post.data.title}" /></a></p>`;
			}
			if (post.data.description) {
				descriptionHtml += `<p>${post.data.description}</p>`;
			}

			// Add enclosure tag for RSS readers that use it for images
			let enclosureTag = "";
			if (post.data.hero) {
				enclosureTag = `<enclosure url="${post.data.hero}" type="image/jpeg" />`;
			}

			return {
				title: post.data.title,
				pubDate: post.data.published,
				description: descriptionHtml || post.data.description || "",
				link: url(`/posts/${post.slug}/`),
				content: sanitizeHtml(parser.render(cleanedContent), {
					allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
				}),
				customData: enclosureTag,
			};
		}),
		customData: `<language>${siteConfig.lang}</language>
    <image>
      <url>${siteUrl}favicon/favicon-universal-128.png</url>
      <title>${siteConfig.title}</title>
      <link>${siteUrl}</link>
      <width>128</width>
      <height>128</height>
    </image>`,
	});
}
