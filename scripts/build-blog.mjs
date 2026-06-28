/* ════════════════════════════════════════════════════════════════════
   Verifyco — static blog generator
   Reads Markdown posts from /content/blog, renders production-grade,
   SEO-optimised static HTML into /blog, plus sitemap.xml + robots.txt.

   No client framework. markdown-it + gray-matter at build time only.
   Run:  npm run blog
   ════════════════════════════════════════════════════════════════════ */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";

/* ── Site config ──────────────────────────────────────────────────── */
const SITE = {
  url: "https://verifyco.info",
  name: "Verifyco",
  blogName: "The Verifyco Blog",
  blogPath: "/blog",
  appStore: "https://apps.apple.com/app/id6772592963",
  defaultAuthor: "Verifyco Team",
  defaultImage: "/assets/app/signals.png",
  twitter: "@verifyco",
  locale: "en_US",
  // Existing top-level pages, included in the sitemap (clean URLs).
  staticPages: ["/", "/deepdetect-plus", "/support", "/privacy", "/terms"],
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const OUT_BLOG = path.join(ROOT, "blog");

/* ── Markdown engine ──────────────────────────────────────────────── */
const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
md.use(anchor, { level: [2, 3], tabIndex: false, slugify: (s) => slugify(s) });

// External links open in a new tab with safe rel.
const defaultLinkOpen =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const href = tokens[idx].attrGet("href") || "";
  if (/^https?:\/\//i.test(href) && !/(^|\.)verifyco\.info/i.test(href)) {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener noreferrer");
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

// Lazy-load + async-decode content images for performance.
const defaultImage =
  md.renderer.rules.image ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
md.renderer.rules.image = function (tokens, idx, options, env, self) {
  tokens[idx].attrSet("loading", "lazy");
  tokens[idx].attrSet("decoding", "async");
  return defaultImage(tokens, idx, options, env, self);
};

/* ── Helpers ──────────────────────────────────────────────────────── */
const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const slugify = (s = "") =>
  String(s)
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const abs = (p) => (p && p.startsWith("http") ? p : SITE.url + (p || ""));

const fmtDate = (d) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);

const isoDate = (d) => d.toISOString().replace(/\.\d{3}Z$/, "+00:00");

function readingTime(markdown) {
  const words = markdown.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function jsonLd(obj) {
  // Safe embedding inside <script>: neutralise "</" and unicode separators.
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/* ── Shared chrome ────────────────────────────────────────────────── */
const FONTS = `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />`;

// FOUC-safe theme bootstrap (runs before paint).
const THEME_BOOT = `<script>(function(){try{var t=localStorage.getItem("vfy-theme")||"dark";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();</script>`;

const SUN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"></circle><path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"></path></svg>`;
const MOON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.4 6.4 0 0 0 10.5 10.5z"></path></svg>`;
const APPLE = `<svg viewBox="0 0 384 512" fill="currentColor" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>`;

function header(active) {
  const link = (href, label, key) =>
    `<a href="${href}"${active === key ? ' class="is-here" aria-current="page"' : ""}>${label}</a>`;
  return `
  <header class="bnav" id="bnav">
    <div class="bwrap bnav-in">
      <a class="brand" href="/" aria-label="Verifyco">Verify<em>co</em></a>
      <nav class="bnav-links" aria-label="Primary">
        ${link("/#app", "Features")}
        ${link("/#how", "How it works")}
        ${link("/blog", "Blog", "blog")}
        ${link("/#pricing", "Pricing")}
      </nav>
      <div class="bnav-right">
        <button type="button" class="icon-btn" data-theme-toggle aria-label="Toggle theme">
          <span class="t-dark">${MOON}</span><span class="t-light">${SUN}</span>
        </button>
        <a class="btn btn-fill btn-sm" href="${SITE.appStore}" target="_blank" rel="noopener">Get the app</a>
        <button type="button" class="bburger" data-bburger aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div class="bmenu" data-bmenu>
    <nav aria-label="Mobile">
      <a href="/#app">Features</a>
      <a href="/#how">How it works</a>
      <a href="/blog">Blog</a>
      <a href="/#pricing">Pricing</a>
      <a href="/support">Support</a>
    </nav>
    <a class="btn btn-fill" href="${SITE.appStore}" target="_blank" rel="noopener">Download on the App Store</a>
  </div>`;
}

function footer() {
  const year = new Date().getUTCFullYear();
  return `
  <footer class="bfoot">
    <div class="bwrap bfoot-in">
      <div class="bfoot-brand">
        <a class="brand" href="/">Verify<em>co</em></a>
        <p>On-device forensic verification for photos and videos. Reality, verified in every pixel.</p>
        <p class="mono-note">VERIFYCO.INFO</p>
      </div>
      <div class="bfoot-col">
        <h4>Product</h4>
        <ul>
          <li><a href="/#how">How it works</a></li>
          <li><a href="/#app">Features</a></li>
          <li><a href="/deepdetect-plus">DeepDetect+</a></li>
          <li><a href="/#pricing">Pricing</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </div>
      <div class="bfoot-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/support">Support</a></li>
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/terms">Terms</a></li>
          <li><a href="${SITE.appStore}" target="_blank" rel="noopener">App Store</a></li>
        </ul>
      </div>
    </div>
    <div class="bwrap bfoot-bot">
      <span>© ${year} Verifyco · All rights reserved</span>
      <span>ON-DEVICE · 0 UPLOADS · EST. 2026</span>
    </div>
  </footer>`;
}

const FOOT_JS = `<script>(function(){var r=document.documentElement;var tt=document.querySelector("[data-theme-toggle]");if(tt){tt.addEventListener("click",function(){var n=r.getAttribute("data-theme")==="light"?"dark":"light";r.setAttribute("data-theme",n);try{localStorage.setItem("vfy-theme",n);}catch(e){}});}var b=document.querySelector("[data-bburger]"),m=document.querySelector("[data-bmenu]");if(b){b.addEventListener("click",function(){document.body.classList.toggle("bmenu-open");});}if(m){m.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){document.body.classList.remove("bmenu-open");});});}var nav=document.getElementById("bnav");if(nav){var on=function(){nav.classList.toggle("is-solid",window.scrollY>8);};on();window.addEventListener("scroll",on,{passive:true});}var pr=document.querySelector(".read-progress");if(pr){var up=function(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight;pr.style.transform="scaleX("+(max>0?Math.min(1,h.scrollTop/max):0)+")";};up();window.addEventListener("scroll",up,{passive:true});window.addEventListener("resize",up);}})();</script>`;

/* ── CTA components ───────────────────────────────────────────────── */
function ctaBlock() {
  return `
  <aside class="cta" aria-label="Get Verifyco">
    <img class="cta-icon" src="/assets/verifyco-icon.png" alt="" width="72" height="72" loading="lazy" />
    <div class="cta-body">
      <h3 class="cta-title">Verify it yourself — on your iPhone</h3>
      <p class="cta-text">Verifyco runs five forensic signals on-device to flag deepfakes, AI-generated and manipulated media — in seconds, fully offline, never uploaded.</p>
      <a class="btn btn-fill" href="${SITE.appStore}" target="_blank" rel="noopener">
        <span class="btn-ico">${APPLE}</span> Download on the App Store
      </a>
    </div>
  </aside>`;
}

function ctaInline() {
  return `
  <aside class="cta cta--inline" aria-label="Get Verifyco">
    <p><strong>Want to check a file right now?</strong> Verifyco analyses any photo or video on your iPhone — on-device and private.</p>
    <a class="cta-link" href="${SITE.appStore}" target="_blank" rel="noopener">Get Verifyco →</a>
  </aside>`;
}

/* ── Page shell ───────────────────────────────────────────────────── */
function page({ title, description, canonical, image, head = "", bodyClass = "", active = "", main }) {
  const img = abs(image || SITE.defaultImage);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonical)}" />
  <meta name="theme-color" content="#0B0908" />
  <meta name="robots" content="index, follow, max-image-preview:large" />

  <meta property="og:site_name" content="${esc(SITE.name)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:image" content="${esc(img)}" />
  <meta property="og:locale" content="${SITE.locale}" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="${SITE.twitter}" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(img)}" />

  <link rel="icon" type="image/png" href="/assets/verifyco-icon.png" />
  <link rel="apple-touch-icon" href="/assets/verifyco-icon.png" />
  <link rel="alternate" type="application/rss+xml" title="${esc(SITE.blogName)}" href="${SITE.url}/blog/feed.xml" />
  ${THEME_BOOT}
  ${FONTS}
  <link rel="stylesheet" href="/assets/blog.css" />
${head}
</head>
<body class="${bodyClass}">
${header(active)}
${main}
${footer()}
${FOOT_JS}
</body>
</html>`;
}

/* ── Tag chips ────────────────────────────────────────────────────── */
const tagChip = (t) =>
  `<a class="chip" href="/blog/tag/${slugify(t)}">${esc(t)}</a>`;

/* ── Post card (index/tag listings) ───────────────────────────────── */
function postCard(p) {
  return `
    <article class="card">
      <a class="card-media" href="${p.urlPath}" aria-label="${esc(p.title)}">
        <img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" loading="lazy" decoding="async" />
      </a>
      <div class="card-body">
        <div class="card-tags">${p.tags.slice(0, 2).map(tagChip).join("")}</div>
        <h2 class="card-title"><a href="${p.urlPath}">${esc(p.title)}</a></h2>
        <p class="card-excerpt">${esc(p.description)}</p>
        <div class="card-meta">
          <time datetime="${p.iso}">${p.dateHuman}</time>
          <span class="dot">·</span>
          <span>${p.reading} min read</span>
        </div>
      </div>
    </article>`;
}

/* ── Article page ─────────────────────────────────────────────────── */
function articlePage(p, related) {
  const crumbs = `
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span class="sep">/</span>
      <a href="/blog">Blog</a><span class="sep">/</span>
      <span aria-current="page">${esc(p.tags[0] || "Article")}</span>
    </nav>`;

  const article = jsonLd({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    image: [p.imageAbs],
    datePublished: p.iso,
    dateModified: p.isoUpdated,
    author: { "@type": "Organization", name: p.author, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: abs("/assets/verifyco-icon.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": p.canonical },
    articleSection: p.tags[0] || "Article",
    keywords: p.tags.join(", "),
    wordCount: p.words,
    timeRequired: `PT${p.reading}M`,
    inLanguage: "en",
    isAccessibleForFree: true,
  });

  const breadcrumb = jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url + "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: SITE.url + "/blog" },
      { "@type": "ListItem", position: 3, name: p.title, item: p.canonical },
    ],
  });

  const updated =
    p.iso !== p.isoUpdated
      ? `<span class="dot">·</span><span class="updated">Updated ${p.updatedHuman}</span>`
      : "";

  const relatedHtml = related.length
    ? `
    <section class="related bwrap">
      <h2 class="related-h">More from the blog</h2>
      <div class="post-grid">${related.map(postCard).join("")}</div>
    </section>`
    : "";

  const tocHtml =
    p.toc.length >= 2
      ? `
      <nav class="toc measure" aria-label="Table of contents">
        <p class="toc-h">On this page</p>
        <ol>${p.toc.map((h) => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join("")}</ol>
      </nav>`
      : "";

  const main = `
  <div class="read-progress" aria-hidden="true"></div>
  <main class="bmain">
    <article class="post">
      <div class="post-head measure">
        ${crumbs}
        <div class="post-tags">${p.tags.map(tagChip).join("")}</div>
        <h1 class="post-title">${esc(p.title)}</h1>
        <p class="post-dek">${esc(p.description)}</p>
        <div class="post-meta">
          <span class="byline">${esc(p.author)}</span>
          <span class="dot">·</span>
          <time datetime="${p.iso}">${p.dateHuman}</time>
          <span class="dot">·</span>
          <span>${p.reading} min read</span>
          ${updated}
        </div>
      </div>

      <figure class="post-hero">
        <img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" decoding="async" fetchpriority="high" />
      </figure>
      ${tocHtml}

      <div class="prose measure">
        ${p.html}
        ${ctaBlock()}
      </div>

      <div class="post-back measure"><a href="/blog">← All articles</a></div>
    </article>
    ${relatedHtml}
  </main>`;

  return page({
    title: p.metaTitle,
    description: p.description,
    canonical: p.canonical,
    image: p.image,
    active: "blog",
    bodyClass: "is-post",
    head: `  <link rel="preload" as="image" href="${esc(p.image)}" fetchpriority="high" />
  <meta name="author" content="${esc(p.author)}" />
  <meta property="og:type" content="article" />
  <meta property="og:image:alt" content="${esc(p.imageAlt)}" />
  <meta name="twitter:image:alt" content="${esc(p.imageAlt)}" />
  <meta property="article:published_time" content="${p.iso}" />
  <meta property="article:modified_time" content="${p.isoUpdated}" />
  <meta property="article:author" content="${esc(p.author)}" />
${p.tags.map((t) => `  <meta property="article:tag" content="${esc(t)}" />`).join("\n")}
  <script type="application/ld+json">${article}</script>
  <script type="application/ld+json">${breadcrumb}</script>`,
    main,
  });
}

/* ── Index + tag listing pages ────────────────────────────────────── */
function listingPage({ posts, allTags, heading, lead, eyebrow, canonical, title, description, activeTag }) {
  const tagFilter = `
    <div class="tag-filter">
      <a class="chip${!activeTag ? " is-on" : ""}" href="/blog">All</a>
      ${allTags.map((t) => `<a class="chip${activeTag === t ? " is-on" : ""}" href="/blog/tag/${slugify(t)}">${esc(t)}</a>`).join("")}
    </div>`;

  const collection = jsonLd({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: SITE.blogName,
    url: canonical,
    description,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: p.canonical,
      datePublished: p.iso,
      image: abs(p.image),
    })),
  });

  const main = `
  <main class="bmain">
    <header class="blog-hero bwrap">
      <span class="eyebrow">${esc(eyebrow)}</span>
      <h1>${heading}</h1>
      <p class="lead">${esc(lead)}</p>
      ${tagFilter}
    </header>
    <section class="post-grid bwrap">
      ${posts.map(postCard).join("")}
    </section>
  </main>`;

  return page({
    title,
    description,
    canonical,
    image: posts[0] ? posts[0].image : SITE.defaultImage,
    active: "blog",
    bodyClass: "is-listing",
    head: `  <meta property="og:type" content="website" />
  <script type="application/ld+json">${collection}</script>`,
    main,
  });
}

/* ── Build ────────────────────────────────────────────────────────── */
function loadPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      if (data.draft) return null;

      const slug = slugify(data.slug || file.replace(/\.mdx?$/, ""));
      const date = new Date(data.date || Date.now());
      const updated = data.updated ? new Date(data.updated) : date;
      const tags = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [];

      let html = md.render(content);
      // Inline CTA marker: a line with [[cta]] or <!-- cta -->
      html = html
        .replace(/<p>\s*\[\[cta\]\]\s*<\/p>/gi, ctaInline())
        .replace(/<!--\s*cta\s*-->/gi, ctaInline());
      // Captioned images: ![alt](src "Caption") -> <figure> with <figcaption>
      html = html.replace(
        /<p>(<img\b[^>]*\btitle="([^"]*)"[^>]*>)<\/p>/gi,
        (m, img, title) => `<figure class="fig">${img}<figcaption>${title}</figcaption></figure>`
      );

      // Table of contents from H2s (for longer posts)
      const toc = [...html.matchAll(/<h2[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({
        id: m[1],
        text: m[2].replace(/<[^>]+>/g, "").trim(),
      }));

      const urlPath = `${SITE.blogPath}/${slug}`;
      const words = content.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
      return {
        slug,
        urlPath,
        canonical: SITE.url + urlPath,
        title: data.title || slug,
        metaTitle: (data.metaTitle || data.title || slug) + " | " + SITE.name + " Blog",
        description: data.description || "",
        author: data.author || SITE.defaultAuthor,
        tags,
        image: data.image || SITE.defaultImage,
        imageAbs: abs(data.image || SITE.defaultImage),
        imageAlt: data.imageAlt || data.title || "Verifyco",
        date,
        updated,
        iso: isoDate(date),
        isoUpdated: isoDate(updated),
        dateHuman: fmtDate(date),
        updatedHuman: fmtDate(updated),
        reading: readingTime(content),
        words,
        toc,
        html,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.date - a.date);
}

function writeFileSafe(file, contents) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}

function build() {
  const posts = loadPosts();

  // reset blog output dir
  fs.rmSync(OUT_BLOG, { recursive: true, force: true });
  fs.mkdirSync(OUT_BLOG, { recursive: true });

  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) =>
    a.localeCompare(b)
  );

  // Individual posts
  for (const p of posts) {
    const related = posts
      .filter((o) => o.slug !== p.slug && o.tags.some((t) => p.tags.includes(t)))
      .slice(0, 3);
    writeFileSafe(path.join(OUT_BLOG, `${p.slug}.html`), articlePage(p, related));
  }

  // Index
  writeFileSafe(
    path.join(OUT_BLOG, "index.html"),
    listingPage({
      posts,
      allTags,
      eyebrow: "THE VERIFYCO BLOG",
      heading: `Field notes on <span class="hl">deepfakes</span> &amp; media forensics`,
      lead: "Guides, breakdowns and research on detecting AI-generated and manipulated media — from the team building on-device verification.",
      canonical: SITE.url + "/blog",
      title: SITE.blogName + " — Deepfake & AI Detection Guides",
      description:
        "Guides, breakdowns and research on detecting deepfakes, AI-generated and manipulated media — from the team behind Verifyco, on-device forensic verification for iPhone.",
    })
  );

  // Tag pages
  for (const tag of allTags) {
    const tagged = posts.filter((p) => p.tags.includes(tag));
    writeFileSafe(
      path.join(OUT_BLOG, "tag", `${slugify(tag)}.html`),
      listingPage({
        posts: tagged,
        allTags,
        activeTag: tag,
        eyebrow: "TOPIC",
        heading: esc(tag),
        lead: `Verifyco articles tagged “${tag}”.`,
        canonical: `${SITE.url}/blog/tag/${slugify(tag)}`,
        title: `${tag} — ${SITE.blogName}`,
        description: `Verifyco articles about ${tag}: detecting deepfakes, AI-generated and manipulated media.`,
      })
    );
  }

  // sitemap.xml (with Google image-sitemap extension for posts)
  const today = isoDate(new Date()).slice(0, 10);
  const urls = [
    ...SITE.staticPages.map((u) => ({ loc: SITE.url + (u === "/" ? "/" : u), lastmod: today, priority: u === "/" ? "1.0" : "0.7" })),
    { loc: SITE.url + "/blog", lastmod: posts[0] ? posts[0].iso.slice(0, 10) : today, priority: "0.8" },
    ...posts.map((p) => ({ loc: p.canonical, lastmod: p.isoUpdated.slice(0, 10), priority: "0.7", image: p.imageAbs, imageAlt: p.imageAlt })),
    ...allTags.map((t) => ({ loc: `${SITE.url}/blog/tag/${slugify(t)}`, lastmod: today, priority: "0.4" })),
  ];
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    urls
      .map((u) => {
        const img = u.image
          ? `\n    <image:image><image:loc>${u.image}</image:loc><image:title>${esc(u.imageAlt)}</image:title></image:image>`
          : "";
        return `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority>${img}</url>`;
      })
      .join("\n") +
    `\n</urlset>\n`;
  writeFileSafe(path.join(ROOT, "sitemap.xml"), sitemap);

  // RSS 2.0 feed → /blog/feed.xml (discovery + syndication)
  const feedItems = posts
    .map(
      (p) =>
        `    <item>\n` +
        `      <title>${esc(p.title)}</title>\n` +
        `      <link>${p.canonical}</link>\n` +
        `      <guid isPermaLink="true">${p.canonical}</guid>\n` +
        `      <pubDate>${p.date.toUTCString()}</pubDate>\n` +
        `      <description>${esc(p.description)}</description>\n` +
        p.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n") +
        `\n    </item>`
    )
    .join("\n");
  const feed =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>${esc(SITE.blogName)}</title>\n` +
    `    <link>${SITE.url}/blog</link>\n` +
    `    <description>Guides and research on detecting deepfakes, AI-generated and manipulated media.</description>\n` +
    `    <language>en</language>\n` +
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n` +
    `    <atom:link href="${SITE.url}/blog/feed.xml" rel="self" type="application/rss+xml" />\n` +
    feedItems +
    `\n  </channel>\n</rss>\n`;
  writeFileSafe(path.join(OUT_BLOG, "feed.xml"), feed);

  // robots.txt
  writeFileSafe(
    path.join(ROOT, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`
  );

  console.log(
    `✓ Blog built: ${posts.length} post(s), ${allTags.length} tag(s) → /blog`
  );
  console.log(`✓ sitemap.xml (with images) + robots.txt + blog/feed.xml written`);
}

build();
