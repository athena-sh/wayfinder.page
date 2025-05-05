import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Charting Simple Routes to Success 🧭",
  tagline: "Your roadmap to resilience, creativity, and financial freedom.",
  favicon: "img/favicon.ico",
  url: "https://wayfinder.page",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: { defaultLocale: "en", locales: ["en"] },

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
          feedOptions: { type: ["rss", "atom"], xslt: true },
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: { customCss: "./src/css/custom.css" },

        /* ▶️  GA4 (gtag.js) */
        gtag: {
          trackingID: "G-XXXXXXXXXX", // replace with your GA‑4 measurement ID
          anonymizeIP: true,
        },

        /* ▶️  Google Tag Manager — remove if you don’t use GTM */
        googleTagManager: {
          containerId: "GTM-MZZPFK44", // replace with your GTM container ID
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
    algolia: {
      appId: "Y9DKV91KMO",
      apiKey: "d44226b6efcc3817fb821a938e8f4a01",
      indexName: "wayfinder",
      contextualSearch: true,
    },
    image: "img/1200x675_social_card_wayfinder.jpg",
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
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  } satisfies Preset.ThemeConfig,
};

export default config;
