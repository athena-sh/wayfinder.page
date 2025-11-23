# 🧭 Wayfinder

![Website](https://img.shields.io/website?url=https%3A//wayfinder.page&style=flat-square)
[![Netlify Status](https://api.netlify.com/api/v1/badges/0960fa68-f10c-464c-a597-9d8dec7af987/deploy-status)](https://app.netlify.com/projects/wayfinderpage/deploys)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen?style=flat-square)
![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-orange?style=flat-square)

**Charting Simple Routes to Success** - The source code for [Wayfinder.page](https://wayfinder.page), a personal growth and productivity blog built with the Fuwari theme.

This is a fork of the excellent [Fuwari](https://github.com/saicaca/fuwari) Astro blog template, customized for the Wayfinder brand and content.

## 🚀 Live Site

Visit **[wayfinder.page](https://wayfinder.page)** to see this code in action!

## 📖 About Wayfinder

Wayfinder is your digital compass for navigating life's challenges. We provide:

- 📈 **Personal Growth** - Strategies for self-improvement and mindfulness
- 💼 **Career Development** - Freelancing, entrepreneurship, and professional skills
- ⚡ **Productivity** - Time management, workflow optimization, and focus techniques
- 🧘 **Wellness** - Health, fitness, nutrition, and mental well-being
- 📊 **Business Insights** - Marketing, sales psychology, and digital strategies

## ✨ Features

- [x] Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)
- [x] Smooth animations and page transitions
- [x] Light / dark mode with custom purple theme
- [x] Responsive design optimized for all devices
- [x] Search functionality with [Pagefind](https://pagefind.app/)
- [x] RSS feed and sitemap generation
- [x] Table of contents for long-form articles
- [x] Comprehensive redirect system for SEO

## 🛠️ Development

### Prerequisites

- **Node.js** >= 20
- **pnpm** >= 9

### Recent Fixes

**Donut Chart Components** - Fixed donut charts that were breaking in dark/light mode switching. All posts have been updated from old React component syntax (`<DonutChart>`) to new working markdown syntax (`::donut{}`). The fix includes:

- Proper CSS variable usage for theme-adaptive colors
- Removal of JavaScript color manipulation that was overriding theme colors
- Better hover states and interactions
- Charts now start from top (-π/2) for improved visual appearance

See the business-excellence post for a working example of the fixed donut chart syntax.

### Commands

| Command                    | Action                                     |
| :------------------------- | :----------------------------------------- |
| `pnpm install`             | Install dependencies                       |
| `pnpm dev`                 | Start local dev server at `localhost:4321` |
| `pnpm build`               | Build production site to `./dist/`         |
| `pnpm preview`             | Preview build locally                      |
| `pnpm check`               | Run checks for errors                      |
| `pnpm format`              | Format code using Biome                    |
| `pnpm new-post <filename>` | Create a new post                          |

### Maintenance Reports

Several maintenance scripts write their output to a shared `reports/` directory at the project root (which is gitignored):

- `scripts/audit-fix-citations.js` – writes `reports/citation-audit-report.txt` (Node version)
- `scripts/audit-fix-citations.sh` – writes `reports/citation-audit-report.txt` (Bash version)
- `scripts/process-post-images.js` – writes `reports/image-migration-report.json`

You can safely delete files in `reports/` between runs; they are regenerated each time the scripts are executed.

### Content Structure

```
src/content/posts/[slug]/
├── index.md       # Post content with frontmatter
└── heroImage.jpg  # Featured image (optional)
```

### Frontmatter Format

```yaml
---
title: "Your Post Title"
published: 2024-01-15
description: "Brief description for SEO and previews"
image: ./heroImage.jpg
tags: ["Productivity", "Business"]
category: "Guides"
draft: false
---
```

## 🚚 Migration from Docusaurus

This repository represents a complete migration from Docusaurus to Fuwari, featuring:

### ✨ **Migration Achievements**

- **251 blog posts** successfully migrated from `.mdx` to `.md` format
- **Ultra-concise URLs** with 60-70% size reduction for better SEO
- **Comprehensive redirects** maintaining all SEO value during transition
- **Automated slug optimization** removing years, stop words, and garbage characters
- **Consistent frontmatter** standardized for Fuwari content collections
- **Category/tag cleanup** eliminating redundancy and improving organization
- **Production-ready** with Netlify deployment configuration

### 🎯 **URL Optimization Examples**

- `effective-client-communication-strategies-freelancers-2024` → `client-communication`
- `7-mindfulness-techniques-productivity-focus` → `mindfulness-productivity`
- `best-side-hustle-ideas-earn-500-3000-month-working-part-time` → `side-hustle-500-3000`
- `overcome-procrastination-5-proven-strategies-success` → `beat-procrastination`

### 🔧 **Technical Implementation**

- **Path structure**: `/blog/` → `/posts/` for Fuwari compatibility
- **Redirects file**: 486 redirects ensuring seamless URL transitions
- **Content processing**: Automated emoji spacing, truncate comment removal
- **Schema validation**: All posts validated against Astro content collections
- **Development workflow**: Custom scripts and automation for future maintenance

### 📊 **Migration Statistics**

- **Total files processed**: 251 blog posts
- **Redirects created**: 486 URL mappings
- **Folders renamed**: 240+ for clean URL structure
- **Schema errors resolved**: 120+ frontmatter formatting issues fixed
- **Tags optimized**: 112 → 82 clean, consistent tags
- **Average URL reduction**: 60-70% shorter slugs

## 🎨 Using the Fuwari Template

If you like this blog design, you can use the original Fuwari template for your own project:

**[Fork Fuwari Template](https://github.com/saicaca/fuwari)** - The original Astro blog theme

Fuwari offers:

- Clean, minimal design
- Multiple color themes
- Markdown extended features
- Easy customization
- Active community support

## 👥 Credits

**Migration Co-Editor**: [Claude (Anthropic)](https://claude.ai/code) - Assisted with the comprehensive migration from Docusaurus to Fuwari, including content processing, URL optimization, redirects configuration, and automation scripts.

**Original Template**: [Fuwari](https://github.com/saicaca/fuwari) by [saicaca](https://github.com/saicaca)

## 📄 License

This project is licensed under the MIT License - see the original [Fuwari license](https://github.com/saicaca/fuwari/blob/main/LICENSE) for details.
# Trigger deployment - Tue Sep 16 03:23:23 EDT 2025
 
