# Verifyco Blog — how it works & how to add posts

A fast, SEO-optimised static blog. Posts are Markdown files in `content/blog/`.
A tiny Node script (`scripts/build-blog.mjs`) renders them into static HTML under
`/blog`, plus `sitemap.xml` and `robots.txt`. **No server, no database, no cost** —
Vercel serves plain files and rebuilds on every push.

- Listing: **/blog**
- Post: **/blog/&lt;slug&gt;**
- Topic page: **/blog/tag/&lt;tag&gt;**
- Admin panel: **/admin**

---

## Option A — Write in the admin panel (recommended)

Open **https://verifyco.app/admin**. It's [Sveltia CMS](https://github.com/sveltia/sveltia-cms),
a modern git-based editor. Three ways to sign in:

### 1. Sign In Using Access Token  ← simplest, works from anywhere (incl. phone)
No server or OAuth app needed.

1. GitHub → **Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token**.
2. **Repository access:** only `bngnco/landing`.
   **Permissions:** *Contents* → **Read and write** (that's all it needs).
3. In `/admin`, click **“Sign In Using Access Token”** and paste it.
4. Write your post, hit **Publish**. It commits to `main` → Vercel rebuilds →
   the post is live in ~1 minute.

### 2. Work with Local Repository  ← no token, on your computer (Chrome/Edge)
Click **“Work with Local Repository”**, pick the `landing` folder. Edits save
straight to your local files; commit & push when ready.

### 3. Sign In with GitHub (optional one-click OAuth)
Only worth it for several non-technical editors. It needs a free OAuth proxy
(Cloudflare Worker: <https://github.com/sveltia/sveltia-cms-auth>). After
deploying it, uncomment `base_url` in `admin/config.yml`.

> The panel writes the same Markdown files described below — the two workflows
> are interchangeable.

---

## Languages (multilingual + hreflang)

The blog is **multilingual and SEO-correct per language**. It ships in **8
languages**: English (default, at `/blog`) plus Turkish, Spanish, German, French,
Italian, Portuguese and Arabic, each under its code (e.g. `/es/blog`, `/ar/blog`).
Arabic renders **right-to-left** automatically. Each translated post cross-links
its siblings with reciprocal `hreflang` tags (+ `x-default`), and the sitemap
lists every alternate — so Google serves each searcher the right language and
never treats them as duplicates. The chrome (nav, CTAs, dates) is localised too;
dates format per locale (e.g. Arabic-Indic numerals for AR).

**File convention** (the build reads this):

```
content/blog/<slug>.md          → English    → /blog/<slug>
content/blog/<slug>.tr.md       → Turkish    → /tr/blog/<slug>
content/blog/<slug>.es.md       → Spanish    → /es/blog/<slug>
content/blog/<slug>.de.md       → German     → /de/blog/<slug>
content/blog/<slug>.fr.md       → French     → /fr/blog/<slug>
content/blog/<slug>.it.md       → Italian    → /it/blog/<slug>
content/blog/<slug>.pt.md       → Portuguese → /pt/blog/<slug>
content/blog/<slug>.ar.md       → Arabic     → /ar/blog/<slug>
```

A post shows up in a language only when that file exists — so you can translate
posts gradually. The per-post language switcher only offers languages that
actually have that post. Translations are linked by a **shared `slug`** — keep it
identical across a post's language files (translate the *tags* per language).

**In the admin panel:** each entry has a language tab (EN · TR · ES · DE · FR ·
IT · PT · AR). Fill the ones you want and Publish; the CMS writes the files above.

**By hand:** copy `content/blog/foo.md` to `content/blog/foo.<code>.md`, translate
the frontmatter + body, keep the same `slug`, run `npm run blog`.

> ⚠️ **Don't paste raw machine translation.** Google detects unedited MT and can
> suppress *every* language of the post. Translate properly (or have a native
> speaker review). Two solid languages beat ten sloppy ones. The sample post
> "what-is-a-deepfake" is translated into all 8 languages as a template — have
> them reviewed before you promote them heavily.

**Adding another language** (e.g. Japanese `ja`): add
`{ code: "ja", locale: "ja_JP", label: "Japanese", native: "日本語", dir: "ltr" }`
to `LANGS` in `scripts/build-blog.mjs`, add a `ja` block to the `UI` strings
(falls back to English if omitted), add `ja` to `i18n.locales` in
`admin/config.yml`, then translate posts to `<slug>.ja.md`. Non-Latin scripts
(Japanese, Chinese, Russian, Hindi, …) get proper UTF-8 slugs automatically.

---

## Option B — Add a Markdown file by hand

1. Create `content/blog/my-post-slug.md`.
2. Add frontmatter + body:

```markdown
---
title: "Your SEO Title (becomes the H1)"
description: "150–160 char summary for Google + social cards + the listing excerpt."
slug: my-post-slug                 # the URL → /blog/my-post-slug
date: 2026-06-28
author: "Verifyco Team"
tags: ["AI Detection", "Guides"]   # topic pages are auto-created per tag
image: /assets/app/face.png        # featured image (1200×630 ideal)
imageAlt: "Describe the image for accessibility + SEO"
draft: false                       # true = hidden from the live site
---

Your article in **Markdown**. Use `##` and `###` headings for structure
(they get anchor IDs automatically).

Type this on its own line to drop an inline App Store call-to-action:

[[cta]]

A bronze "Download on the App Store" card is also added automatically at the
end of every post.
```

3. Commit & push. Vercel rebuilds automatically.

### Preview locally
```bash
npm install          # once
npm run blog         # regenerate /blog, sitemap.xml, robots.txt
npx serve .          # open http://localhost:3000/blog
```

---

## What you get per post (SEO — all automatic)

Custom `<title>` + meta description · canonical URL · Open Graph + Twitter cards
(with image alt) · JSON-LD `BlogPosting` (word count, reading time, section) +
`BreadcrumbList` · semantic `<article>` with a single `<h1>` and auto heading
anchors · publish date, author, reading time · featured image with alt +
`preload`/`fetchpriority` for fast LCP · auto "related posts" for internal
linking · entry in `sitemap.xml` **with image data** · **RSS feed** at
`/blog/feed.xml`.

Site-wide: `robots.txt`, `MobileApplication` + `Organization` + `WebSite`
structured data on the homepage (so Google understands the app), clean URLs,
static + fast (great Core Web Vitals).

## To actually rank #1 (the part only you can do)

The tech is handled; rankings come from **content + reputation**:

1. **Publish often, answer real questions.** Target what people actually search
   ("is this video a deepfake", "how to detect AI images") with genuinely useful
   posts. Depth and originality win.
2. **Internal links.** Link new posts to older related ones (and to the app
   page). Helps Google and readers.
3. **Backlinks (off-page).** Get other sites to link to you — this is the single
   biggest external ranking factor. Share posts, answer on Reddit/Quora/forums,
   reach out to journalists covering deepfakes. I can't create these; they come
   from your content being worth citing.
4. **Submit your sitemap** once live: Google Search Console → add
   `https://verifyco.app`, submit `sitemap.xml`. Do the same in Bing Webmaster.
5. **Keep posts fresh.** Update older posts; the sitemap `lastmod` updates
   automatically when you rebuild.

## Deploy notes

- `vercel.json` runs `node scripts/build-blog.mjs` on each deploy and serves the
  repo root, with `cleanUrls` for `/blog/<slug>` URLs.
- The generated `/blog`, `sitemap.xml`, `robots.txt` are also committed, so the
  site works even without a build.
- The admin bundle is **self-hosted** at `admin/sveltia-cms.js` (no third-party
  CDN). To update it later:
  `npm i @sveltia/cms && cp node_modules/@sveltia/cms/dist/sveltia-cms.js admin/`

> **Important:** the admin panel commits to the **`main`** branch (see
> `admin/config.yml`). Make sure this work is merged to `main` first, or change
> `branch:` to match your Vercel production branch.
