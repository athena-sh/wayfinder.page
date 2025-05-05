import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Charting Simple Routes to Success 🧭",
  tagline: "Your roadmap to resilience, creativity, and financial freedom.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://wayfinder.page",
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

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

  themeConfig: {
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 2,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: "Y9DKV91KMO",
      // Public API key: it is safe to commit this
      apiKey: "d44226b6efcc3817fb821a938e8f4a01",
      indexName: "wayfinder",
      contextualSearch: true,
      // Optional: See below for advanced options
      //contextualSearch: true, // default: true
      //searchParameters: {}, // Algolia search parameters
      //searchPagePath: "search", // if you have a custom search page
    },
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Wayfinder",
      logo: {
        alt: "Wayfinder Logo",
        src: "img/logo.svg",
      },
      items: [
        //{
        //  type: "docSidebar",
        //  sidebarId: "tutorialSidebar",
        //  position: "left",
        //  label: "Docs",
        //},
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/facebook/docusaurus",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        //{
        //  title: "Docs",
        //  items: [
        //    {
        //      label: "Wayfinder Docs",
        //      to: "/docs/intro",
        //    },
        //  ],
        //},
        {
          title: "Community",
          items: [
            {
              label: "Bluesky",
              href: "https://bsky.app/profile/wayfinderpage.bsky.social",
            },
            {
              label: "X",
              href: "https://x.com/wayfinderpage",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Wayfinder, Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
