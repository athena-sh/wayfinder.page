/**
 * blog-tag-updater.js — v2
 * Fixes: (1) description block scalar  (2) heroImage relocation
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const matter = require("gray-matter");

// ---------- constants ----------
const BLOG_DIR = path.join(__dirname, "blog");
const TAG_FILE = path.join(BLOG_DIR, "tags.yml");
const MAP_FILE = path.join(__dirname, "tag-map.json");
const DEFAULT_AUTHOR = "athena";

// ---------- load data ----------
const tagDict = yaml.load(fs.readFileSync(TAG_FILE, "utf8"));
const mapJSON = fs.existsSync(MAP_FILE)
  ? JSON.parse(fs.readFileSync(MAP_FILE, "utf8"))
  : {};

console.log(`Loaded ${Object.keys(mapJSON).length} explicit tag mappings`);
console.log(`Loaded ${Object.keys(mapJSON).length} mappings from ${MAP_FILE}`);

const keywords = {
  // **unchanged mini‑heuristic**
  meditation: "Meditation",
  mindful: "Mindfulness",
  wellness: "Wellness",
  fitness: "Fitness",
  productivity: "Productivity",
  "time management": "Time Management",
  habit: "Habit Building",
  technology: "Technology",
  tech: "Technology",
  ai: "AI",
  branding: "Branding",
  monetize: "Monetization",
  revenue: "Monetization",
  freelance: "Freelance",
  "side hustle": "Side Hustle",
  marketing: "Marketing",
  seo: "SEO",
  blogging: "Blogging",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
  sales: "Sales",
  finance: "Finance",
  sleep: "Sleep",
  stress: "Stress Management",
  elon: "Elon Musk",
  musk: "Elon Musk",
  tesla: "Elon Musk",
};

// ---------- helpers ----------
const ensureISODate = (d) => {
  if (!d) return "";
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(d)) return d;
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  const p = (n) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${p(dt.getMonth() + 1)}-${p(dt.getDate())}T10:00`;
};

const ensureAuthorArray = (a) =>
  Array.isArray(a) ? a : a ? [a] : [DEFAULT_AUTHOR];

const fuzzTags = (txt) => {
  const found = new Set();
  const lower = txt.toLowerCase();
  Object.entries(keywords).forEach(([kw, tag]) => {
    if (lower.includes(kw)) found.add(tag);
  });
  return [...found].slice(0, 2).length ? [...found].slice(0, 2) : ["Blogging"];
};

// ---------- core ----------
function processPost(slug) {
  const file = path.join(BLOG_DIR, slug, "index.mdx");
  if (!fs.existsSync(file)) return;

  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const data = parsed.data;
  let body = parsed.content;

  // skip if already tagged & cleaned
  if (Array.isArray(data.tags) && data.tags.length && !data.categories) {
    return;
  }

  // ---------- TAGS ----------
  const tags =
    mapJSON[slug] ||
    fuzzTags(`${slug} ${data.title || ""} ${data.description || ""} ${body}`);
  data.tags = tags;

  // ---------- DATE & AUTHORS ----------
  if (data.pubDate) {
    data.date = ensureISODate(data.pubDate);
    delete data.pubDate;
  } else if (data.date) {
    data.date = ensureISODate(data.date);
  }
  data.authors = ensureAuthorArray(data.authors);

  // ---------- DESCRIPTION (single‑line, quoted) ----------
  if (data.description) {
    const oneLine = Array.isArray(data.description)
      ? data.description.join(" ").replace(/\s+/g, " ").trim()
      : String(data.description).replace(/\s+/g, " ").trim();
    data.description = oneLine;
  }

  // ---------- HERO IMAGE relocate ----------
  if (data.heroImage) {
    const imgPath = "./" + path.posix.basename(data.heroImage);
    delete data.heroImage;

    const imgMarkdown = `![Hero Image](${imgPath})`;
    const lines = body.split(/\r?\n/);
    if (!lines.some((l) => l.trim() === imgMarkdown)) {
      // Insert after the first empty line (or at top if no blank line found)
      const idx = lines.findIndex((l) => l.trim() !== "");
      lines.splice(idx === -1 ? 0 : idx, 0, imgMarkdown, "");
      body = lines.join("\n");
    }
  }

  // ---------- DESCRIPTION must be quoted ----------
  const yamlStr = yaml.dump(data, {
    lineWidth: -1,
    noRefs: true,
    quotingType: '"',
  });

  const newContent = `---\n${yamlStr}---\n\n${body.trimStart()}\n`;
  fs.writeFileSync(file, newContent);
  console.log(`✔ ${slug} → [${tags.join(", ")}]`);
}

// ---------- run ----------
console.log("Updating blog front‑matter…");
fs.readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .forEach((d) => processPost(d.name));

console.log("Done.");
