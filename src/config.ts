import type {
  ExpressiveCodeConfig,
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
  title: "Wayfinder",
  subtitle: "Charting Simple Routes to Success",
  lang: "en", // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
  themeColor: {
    hue: 300, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false, // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: "assets/images/prism-dancer.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: true, // Display the credit text of the banner image
      text: "Prism Dancer", // Credit text to be displayed
      url: "https://www.pixiv.net/en/artworks/134886025", // (Optional) URL link to the original artwork or artist's page
    },
  },
  toc: {
    enable: true, // Display the table of contents on the right side of the post
    depth: 2, // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [
    {
      src: "/favicon/favicon-light-192.png",
      theme: "light",
    },
    {
      src: "/favicon/favicon-dark-192.png",
      theme: "dark",
    },
  ],
};

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: "GitHub",
      url: "https://github.com/athena-sh/fuwari", // Internal links should not include the base path, as it is automatically added
      external: true, // Show an external link icon and will open in a new tab
    },
    {
      name: "Subscribe",
      url: "https://wayfinder.eo.page/v6y87", // Internal links should not include the base path, as it is automatically added
      external: true, // Show an external link icon and will open in a new tab
    },
  ],
};

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/athena.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: "Athena",
  bio: "Content Creator & Founder @ Wayfinder.page. Tech-savvy millennial helping you navigate life's chaos. Fitness junkie, sarcasm pro, and occasional cookie monster.",
  links: [
    {
      name: "Bluesky",
      icon: "fa6-brands:bluesky",
      url: "https://web-cdn.bsky.app/profile/wayfinderpage.bsky.social",
    },
    {
      name: "Twitter",
      icon: "fa6-brands:twitter", // Visit https://icones.js.org/ for
      url: "https://x.com/wayfinderpage",
    },
    {
      name: "GitHub",
      icon: "fa6-brands:github",

      url: "https://github.com/athena-sh",
    },
  ],
};

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
  // Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
  // Please select a dark theme, as this blog theme currently only supports dark background color
  theme: "github-dark",
};
