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

Open **https://verifyco.info/admin**. It's [Sveltia CMS](https://github.com/sveltia/sveltia-cms),
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

## What you get per post (SEO)

Custom `<title>` + meta description · canonical URL · Open Graph + Twitter cards ·
JSON-LD `Article` + `BreadcrumbList` · semantic `<article>` with a single `<h1>` ·
publish date, author, reading time · featured image with alt · auto "related
posts" for internal linking · entry in `sitemap.xml`.

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
