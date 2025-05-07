// docusaurus.config.ts
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

/** @type {Config} */
const config: Config = {
  /* ───────────────────────────────────
     Core site settings
     ─────────────────────────────────── */
  title: "Wayfinder", // short project name → appears after “|”
  tagline: "Your roadmap to resilience, creativity, and financial freedom.",
  favicon: "img/favicon.ico",
  url: "https://wayfinder.page", // production URL
  baseUrl: "/",

  /* Build behaviour */
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  /* Internationalisation */
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  /* ───────────────────────────────────
     Presets
     ─────────────────────────────────── */
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  /* ───────────────────────────────────
     Theme configuration
     ─────────────────────────────────── */
  themeConfig: {
    /* Extra <meta> tags –‑ Facebook needed og:site_name */
    metadata: [
      { property: "og:site_name", content: "Wayfinder" },
      { name: "twitter:site", content: "@wayfinderpage" },
    ],

    /* If you ever want a different separator: titleDelimiter: "–" */

    /* Table‑of‑contents defaults */
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 2,
    },

    /* Algolia DocSearch */
    algolia: {
      appId: "Y9DKV91KMO",
      apiKey: "d44226b6efcc3817fb821a938e8f4a01",
      indexName: "wayfinder",
      contextualSearch: true,
    },

    /* Default social‑card image */
    image: "img/1200x675_social_card_wayfinder.jpg",

    /* Navbar */
    navbar: {
      title: "Wayfinder",
      logo: { alt: "Wayfinder Logo", src: "img/logo.svg" },
      items: [
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/athena-sh/wayfinder.page",
          label: "GitHub",
          position: "right",
        },
      ],
    },

    /* Footer */
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Bluesky",
              href: "https://bsky.app/profile/wayfinderpage.bsky.social",
            },
            { label: "X", href: "https://x.com/wayfinderpage" },
          ],
        },
        {
          title: "More",
          items: [
            { label: "Blog", to: "/blog" },
            {
              label: "GitHub",
              href: "https://github.com/athena-sh/wayfinder.page",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Wayfinder, Built with Docusaurus.`,
    },

    /* Code‑block themes */
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
