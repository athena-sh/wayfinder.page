# Wayfinder Voice & Content Standards (2026 Edition)

**Last Updated:** January 2, 2026
**Status:** Active - This supersedes outdated guidance files
**Context:** Created after pivoting from solo blogger to publication leader

## The Pivot: What Changed and Why

**Historical Context:**
- **Pre-2025:** Casual, snarky voice with forced humor to "widen audience"
- **Late 2025:** Opened publication to other writers, became publication leader
- **January 2026:** Realized snarky voice doesn't work for publication leadership

**The Problem with Old Voice:**
Files like `guidance/voice.md` and `guidance/opening.md` push forced humor that creates "dumpster fire" content:
- ❌ "I'm a _fabulous_ disaster, thank you very much"
- ❌ "Or How I Fake It 'Til I Make It" subtitles
- ❌ "Strap yourselves in, this will be one hell of a ride!"
- ❌ Self-deprecating jokes that undermine authority

**Why This Doesn't Work Anymore:**
1. Publication leaders need credibility, not schtick
2. Other writers won't match forced humor consistently
3. Readers want authentic experience, not performance
4. Google/Medium algorithms favor authentic voice over gimmicks

## The New Wayfinder Voice

### Core Principles

**Authentic Experience Over Performance:**
- Write from real personal experience with real data
- "I spend 8-12 hours a day staring at screens" beats "Let's face it, we're all screen zombies"
- Share actual numbers: cholesterol improvements, hours tracked, money spent
- Doctor validation, monthly check-ins, 18-month tracking periods

**Professional With Edge:**
- Direct and opinionated without being performatively snarky
- Challenge assumptions with data, not jokes
- "This doesn't work" beats "Spoiler alert: this is BS!"
- Uncomfortable truths delivered straight, not wrapped in forced humor

**Data-Driven but Human:**
- Every claim backed by reputable sources (see citation guidelines below)
- Personal experience validates the research, not replaces it
- Real metrics: "$2,000 spent on ads over 18 months" not "I spent a bunch of money"
- Honest about limitations: "This won't build muscle mass"

### What Good Content Looks Like

**Opening Example (GOOD):**
```markdown
Every month, I sit across from my doctor and get the same lecture—in a good way.
"Your cholesterol numbers keep improving," she says, pointing at the lab results.
"Whatever you're doing, keep doing it."

What I'm doing is embarrassingly simple: walking outside.
```

**Opening Example (BAD - Old Voice):**
```markdown
Look, I'm not some fitness guru or wellness expert. I'm just a regular person who
stumbled into the world of outdoor exercise and thought, "Hey, this isn't half bad."
So buckle up, because I'm about to spill the beans on why working out in nature
might just be the game-changer you never knew you needed.
```

**Why the first works:**
- Immediate credibility (doctor validation)
- Concrete detail (monthly visits, actual lab results)
- Sets up real data to follow
- No performative humor

**Why the second fails:**
- Self-deprecating undermines authority
- "Buckle up" and "spill the beans" are filler
- "Game-changer" is a cliché
- Forced casual voice feels inauthentic

### Section Headers

**GOOD:**
```markdown
## Escaping the Indoor Prison (Why I Can't Exercise Inside Anymore)
## The Numbers My Doctor Actually Tracks
## What This Isn't (The Realistic Expectations)
```

**BAD (Old Voice):**
```markdown
## The Great Indoors vs. The Great Outdoors
## The Science Behind the Sweat (Without Boring You to Death)
## The Part Where I Wrap This Up (Finally, Right?)
```

**Difference:**
- Good headers are direct and specific
- Bad headers rely on forced humor and filler
- Good headers promise value
- Bad headers waste reader time

## Citation Standards (CRITICAL)

### Word Count to Citation Ratio

**Formula:** 1 citation per 500 words
- 1,000-word article: 2-3 citations
- 2,000-word article: 4-5 citations
- 3,000-word article: 6-7 citations
- **Maximum:** 7 citations for articles under 3,500 words

**Why This Matters:**
- 15 citations in a 2,300-word article looks like a college term paper
- Readers skim; excessive citations break flow
- Quality over quantity: pick the BEST sources

### Source Quality Requirements

**Acceptable Sources:**
- ✅ Peer-reviewed journals (PMC, PLOS, Frontiers, etc.)
- ✅ Major research institutions (NIH, WHO, CDC, AHA, etc.)
- ✅ Reputable publications with editorial oversight (Harvard Health, Mayo Clinic, Mental Health America)
- ✅ Government research organizations (SBA, BLS, etc.)
- ✅ Recent studies (prefer 2024-2026 for current topics)

**Avoid:**
- ❌ Blog posts (even from companies)
- ❌ Marketing content disguised as research
- ❌ Undated or ancient sources
- ❌ Paywalled content readers can't verify
- ❌ Broken/404 links

### Citation Integration

**GOOD Integration:**
```markdown
A 2024 workplace wellness study found that 90% of workers in unhealthy work
environments reported that work stress affected their sleep.[^1]
```

**BAD Integration:**
```markdown
Recent research on work-from-home mental health found that extended indoor
confinement, prolonged screen time, and lack of outdoor exposure are strongly
associated with increased rates of depression, anxiety, and feelings of
isolation.[^1]

A 2024 workplace wellness study found that **90% of workers in unhealthy work
environments** reported that work stress affected their sleep, compared to 44%
in healthier environments.[^2] The common factor? Indoor confinement, excessive
screen time, and lack of outdoor activity.
```

**Why the second is too much:**
- Two citations for the same point
- First citation is redundant
- Breaks reading flow with excessive sourcing

## Frontmatter Requirements

```yaml
---
title: "Specific, Direct Title Without Forced Humor"
published: YYYY-MM-DD
description: "Value proposition without hype or gimmicks"
image: "icon-name.svg"  # From src/assets/icons/
hero: "https://cloudinary-url"  # CDN hosted
tags: ["Relevant", "Tags"]  # 2-3 tags
category: "Category Name"
draft: false
lang: ""
# Main niche: [Your Niche]
# Sub-niche: [Sub-Category]
# Long-tail keyword: [SEO target phrase]
---
```

**Required Icons Available:**
- apple.svg, rocket.svg, money-bill-trend-up.svg, scale-unbalanced.svg
- newspaper.svg, twitter.svg, signal.svg, google.svg, person-walking.svg

## Required Article Elements

### 1. FAQ Section
**Every article needs FAQ section:**
```markdown
## FAQ: [Concise Topic]

### Q: [Specific question]?

A: [Direct answer with specifics]
```

**Format:**
- Short topic title (not full article title)
- 5-7 questions addressing common objections
- Answers with concrete details, not platitudes

### 2. Data Visualizations

**Use When Appropriate:**
```markdown
# Line charts for trends over time
::linechart{title="Chart Title" data="Label1|value,Label2|value"}

# Donut charts for distributions
::donut{title="Chart Title" data="Label|value|#color,Label2|value2|#color"}

# Tables for comparisons
| Metric | Before | After |
|--------|--------|-------|
| Data   | Value  | Value |
```

**When to Use:**
- 3+ data points that compare well visually
- Percentages/distributions (donut charts)
- Trends over time (line charts)
- Before/after comparisons (tables)

### 3. Real Personal Data

**Include:**
- Actual numbers from your experience
- Time periods tracked ("18 months", "540 sessions")
- Money spent/earned with context
- Doctor/professional validation where relevant
- Honest limitations ("This won't build muscle mass")

**Avoid:**
- Vague claims ("I saw great results")
- Hypotheticals without testing ("This should work")
- Borrowed experience ("A friend of mine...")
- Exaggeration for effect

## Content Types & Appropriate Voice

### Opinion/Analysis Pieces
**Characteristics:**
- Strong thesis backed by data
- Challenge conventional wisdom
- Use `:::warning` callouts for controversial takes
- Professional but direct tone

**Example:** "Sell NVIDIA Stock Today" article
- Makes bold claim
- Backs with institutional investor data
- Acknowledges counterarguments
- No forced humor, just strong analysis

### Personal Experience/Guides
**Characteristics:**
- Lead with real results/data
- Share methodology and timeline
- Include what didn't work
- FAQ addressing common questions

**Example:** "Why I Walk 10,000+ Steps Outside" article
- Doctor-validated health metrics
- 18 months of tracking data
- Honest about psychological aspects (indoor confinement)
- Real equipment and costs listed

### How-To/Tutorial
**Characteristics:**
- Step-by-step with real examples
- Include actual costs/time investment
- Show real results from following the method
- Troubleshoot common failures

### Call to Action (CTA) Requirements

**Every article over 500 words MUST include a newsletter CTA.** This is critical for audience growth.

**Standard CTA Format** (place before FAQ section):

```markdown
:::tip
Want more real data and honest insights like this? **Join our FREE newsletter** where I share what actually works—backed by real numbers, honest failures, and lessons learned from getting my hands dirty. No hype, no BS, just practical insights you can use.

[**Subscribe to Wayfinder →**](https://wayfinder.page/subscribe)
:::
```

**CTA Principles:**
- ✅ **Do:** Use `:::tip` callout (no custom label - breaks Medium export)
- ✅ **Do:** Match the article's value proposition
- ✅ **Do:** Make the subscribe link bold and clickable
- ✅ **Do:** Emphasize "FREE" in caps - removes friction
- ✅ **Do:** Use wayfinder.page/subscribe URL (canonical)
- ❌ **Don't:** Use custom tip labels like `:::tip[Custom Text]` (breaks Medium export)
- ❌ **Don't:** Use gimmicky language ("SMASH that subscribe button")
- ❌ **Don't:** Make exaggerated promises ("10x your life")
- ❌ **Don't:** Hide it at the very end after footnotes (place before FAQ)

**The audit script checks for CTA presence** and will warn if missing.

## The Indoor Confinement Psychology Example

**This section from outdoor-exercise-truth.md demonstrates the new voice:**

```markdown
Here's the uncomfortable reality of modern work: I spend 8-12 hours a day
staring at screens and Zoom calls during the week. On weekends? Another 6-10
hours in front of a computer dealing with emails and projects.

I'm not claustrophobic in the clinical sense. But after an entire day trapped
inside—same room, same walls, same artificial light—the last thing I want to do
is walk over to an exercise machine on the other side of that same wall.

It feels like staying in prison. The treadmill might be in a different room,
but it's the same cage.

**Going outside is a hard transition from trapped to FREE.**
```

**Why this works:**
- Specific numbers (8-12 hours, 6-10 hours)
- Honest emotional reality without joking
- Strong metaphor (prison/cage) that resonates
- No forced humor or self-deprecation
- Backed by workplace wellness research

## Automated Quality Control

**Article Audit Script** (`scripts/audit-articles.js`):

```bash
pnpm audit              # Full report all articles
pnpm audit:simple       # High-risk articles only
pnpm audit:list         # Just filenames
pnpm audit --file article-name  # Single article audit
```

**What It Detects:**

**Red Flags (Dumpster Fire Indicators):**
- Forced humor patterns ("explaining to grandma", "strap yourselves in")
- AI-generated phrases ("let's dive in", "unlock your potential")
- Self-undermining content (mocking own advice)
- Weak conclusions ("implement these strategies today")
- Generic openings ("In today's fast-paced world...")

**Good Signals:**
- Real dollar amounts and percentages
- Personal experience markers ("I spent", "My doctor")
- Specific numbers and data
- Proper citations with footnotes
- FAQ sections
- Data visualizations

**Risk Scoring:**
- Risk Score = (Red Flags × 2) - Good Signals
- High Risk: >5 (likely dumpster fire)
- Medium Risk: 2-5 (review recommended)
- Low Risk: ≤2 (good authentic voice)
- Excellent: Negative scores (-20 to -33 range)

## Guidance Files Status

### ✅ Keep & Follow
- `START-HERE.md` - Aligns with new voice
- `attention-grabbing.md` - Professional with edge (mostly good)

### ❌ Outdated - DO NOT FOLLOW
- `voice.md` - Pushes forced humor we've moved past
- `opening.md` - Generic templates, not authentic voice

### ⚠️ Needs Review
- Other guidance files may have remnants of old voice
- When in doubt, refer to this document (WAYFINDER-VOICE-2026.md)

## Quick Decision Framework

**When writing, ask:**

1. **Is this my real experience?**
   - ✅ "I spent $2,000 over 18 months"
   - ❌ "Most people probably spend too much"

2. **Would I say this to a colleague?**
   - ✅ Direct, professional, with personal take
   - ❌ Performative humor or forced casualness

3. **Does the data back this up?**
   - ✅ Cited from reputable source within 2 years
   - ❌ "Studies show" without citation

4. **Is the humor serving the content?**
   - ✅ Natural aside that adds context
   - ❌ Forced joke that undermines credibility

5. **Would this work for other writers in the publication?**
   - ✅ Clear voice that scales
   - ❌ Personal schtick that only works for one person

## Examples of Voice Evolution

### Example 1: Article Openings

**OLD (Dumpster Fire):**
> Look, I'm not some fitness guru or wellness expert. I'm just a regular person who stumbled into the world of outdoor exercise and thought, "Hey, this isn't half bad." So buckle up, because I'm about to spill the beans...

**NEW (Authentic):**
> Every month, I sit across from my doctor and get the same lecture—in a good way. "Your cholesterol numbers keep improving," she says, pointing at the lab results. "Whatever you're doing, keep doing it."

**Transformation:**
- Removed self-deprecation
- Added doctor validation
- Led with concrete results
- No forced casual voice

### Example 2: Handling Controversial Topics

**OLD (Forced Snark):**
> Spoiler alert: The hustle culture bros aren't going to like this one! *grabs popcorn* Let me tell you why their 5am routines are complete BS...

**NEW (Professional Edge):**
> A 2024 workplace wellness study found that 90% of workers in unhealthy work environments reported that work stress affected their sleep. The common factor? Indoor confinement, excessive screen time, and lack of outdoor activity.

**Transformation:**
- Data leads, not performance
- Professional tone with strong claim
- No "popcorn" theater
- Credibility through research, not snark

## For Claude Code Instances

**When starting a new session:**

1. Read this document first (WAYFINDER-VOICE-2026.md)
2. Check CLAUDE.md for technical requirements
3. Ignore outdated guidance in voice.md and opening.md
4. Run audit script on any content you create
5. Aim for risk scores in the negative range

**Red flags in user requests:**
- If asked to write "fun subtitles in parentheses" → Suggest authentic headers instead
- If asked for "snarky opening" → Offer direct, data-driven opening
- If article scores >5 on audit → Major rewrite needed

**Citation management:**
- Use DuckDuckGo MCP for source discovery
- Verify all links work before finalizing
- Keep to 1 citation per 500 words
- Maximum 7 citations for articles under 3,500 words

## Success Metrics

**Article Quality Indicators:**
- ✅ Risk score of -10 or lower
- ✅ FAQ section present
- ✅ 3-7 citations from reputable sources
- ✅ Real personal data with specific numbers
- ✅ No forced humor red flags
- ✅ Professional but engaging tone
- ✅ Data visualizations where appropriate

**Example of Excellence:**
- outdoor-exercise-truth.md: Risk score -33
  - 0 red flags
  - 33 good signals
  - 4 peer-reviewed citations
  - 2 charts + 3 data tables
  - Real doctor-validated health metrics
  - Authentic voice throughout

---

**Remember:** Wayfinder is now a publication with multiple writers. The voice needs to scale. Authentic experience and data-driven content work for everyone. Forced humor and personal schtick don't.

**Last Note:** This document was created after 15+ hours of conversation identifying dumpster fires, rewriting authentic content, and building automated quality tools. It represents hard-won lessons about what actually works for publication-quality content in 2026.
