import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CANONICAL_ORIGIN = "https://verifyco.app";
const MAX_SITEMAP_BYTES = 50 * 1024 * 1024;
const MAX_SITEMAP_URLS = 50_000;

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const read = (relativePath) => fs.readFileSync(path.join(ROOT, relativePath), "utf8");
const decodeXml = (value) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
const matches = (source, pattern) => [...source.matchAll(pattern)].map((match) => match[1]);

function outputFileFor(url) {
  let decoded;
  try {
    decoded = decodeURIComponent(url.pathname);
  } catch {
    return undefined;
  }
  const relative = decoded.replace(/^\/+|\/+$/g, "");
  const candidates = relative
    ? [`${relative}.html`, path.join(relative, "index.html")]
    : ["index.html"];
  return candidates.find((candidate) => fs.existsSync(path.join(ROOT, candidate)));
}

function validateUrl(rawValue, label, { requireCanonicalHost = true } = {}) {
  const value = decodeXml(rawValue);
  check(!/\s/.test(rawValue), `${label} contains an unescaped whitespace character: ${rawValue}`);
  check(!/[^\x21-\x7E]/.test(rawValue), `${label} contains a non-ASCII character that must be percent-encoded: ${rawValue}`);
  let url;
  try {
    url = new URL(value);
  } catch {
    failures.push(`${label} is not an absolute URL: ${value}`);
    return null;
  }
  check(url.protocol === "https:", `${label} is not HTTPS: ${value}`);
  try {
    decodeURIComponent(url.pathname);
  } catch {
    check(false, `${label} contains malformed percent-encoding: ${value}`);
  }
  if (requireCanonicalHost) {
    check(url.origin === CANONICAL_ORIGIN, `${label} uses a non-canonical origin: ${value}`);
  }
  return url;
}

function validateXmlStructure(source) {
  const stack = [];
  let valid = true;
  let rootElements = 0;
  for (const match of source.matchAll(/<[^>]*>/g)) {
    const token = match[0];
    if (/^<\?|^<!/.test(token)) continue;
    const closing = token.match(/^<\/\s*([^\s>]+)\s*>$/);
    if (closing) {
      const open = stack.pop();
      if (open !== closing[1]) {
        failures.push(`sitemap.xml closes <${closing[1]}> while <${open || "nothing"}> is open`);
        valid = false;
      }
      continue;
    }
    const opening = token.match(/^<\s*([^\s/>]+)(?:\s[^>]*)?>$/);
    if (!opening) {
      failures.push(`sitemap.xml contains a malformed tag: ${token}`);
      valid = false;
      continue;
    }
    if (stack.length === 0) rootElements += 1;
    if (!/\/\s*>$/.test(token)) stack.push(opening[1]);
  }
  if (source.replace(/<[^>]*>/g, "").includes("<")) {
    failures.push("sitemap.xml contains an unterminated or malformed tag");
    valid = false;
  }
  if (rootElements !== 1) {
    failures.push(`sitemap.xml must contain exactly one root element (found ${rootElements})`);
    valid = false;
  }
  if (stack.length) {
    failures.push(`sitemap.xml has unclosed elements: ${stack.join(", ")}`);
    valid = false;
  }
  return valid;
}

const sitemapPath = path.join(ROOT, "sitemap.xml");
const sitemap = fs.readFileSync(sitemapPath, "utf8");
const sitemapBytes = fs.statSync(sitemapPath).size;

check(!sitemap.includes("\uFFFD"), "sitemap.xml contains invalid UTF-8 replacement characters");
check(
  !/&(?!amp;|quot;|apos;|lt;|gt;|#\d+;|#x[\dA-Fa-f]+;)/.test(sitemap),
  "sitemap.xml contains an unescaped ampersand or invalid entity",
);
check(sitemapBytes <= MAX_SITEMAP_BYTES, `sitemap.xml exceeds 50 MB (${sitemapBytes} bytes)`);
check(
  /^<\?xml version="1\.0" encoding="UTF-8"\?>\s*<urlset\b/.test(sitemap),
  "sitemap.xml is missing the UTF-8 declaration or urlset root",
);
check(
  sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
  "sitemap.xml is missing the sitemap namespace",
);
check(
  (sitemap.match(/<url>/g) || []).length === (sitemap.match(/<\/url>/g) || []).length,
  "sitemap.xml has unbalanced <url> elements",
);
check(validateXmlStructure(sitemap), "sitemap.xml has invalid element nesting");

const locValues = matches(sitemap, /<loc>([\s\S]*?)<\/loc>/g);
check(locValues.length > 0, "sitemap.xml contains no URLs");
check(locValues.length <= MAX_SITEMAP_URLS, `sitemap.xml exceeds 50,000 URLs (${locValues.length})`);
check(new Set(locValues.map(decodeXml)).size === locValues.length, "sitemap.xml contains duplicate <loc> URLs");
const sitemapLocs = new Set(locValues.map(decodeXml));
const localizedInternalLinkErrors = [];
const htmlAlternateSets = new Map();

for (const rawLoc of locValues) {
  const url = validateUrl(rawLoc, "Sitemap URL");
  if (!url) continue;
  check(!url.search && !url.hash, `Sitemap URL contains a query or fragment: ${url.href}`);
  const outputFile = outputFileFor(url);
  check(Boolean(outputFile), `Sitemap URL has no generated HTML file: ${url.href}`);
  if (!outputFile) continue;

  const html = read(outputFile);
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/i);
  check(Boolean(canonicalMatch), `${outputFile} is missing a self-canonical link`);
  if (canonicalMatch) {
    const canonical = validateUrl(canonicalMatch[1], `${outputFile} canonical`);
    check(canonical?.href === url.href, `${outputFile} canonical does not match sitemap URL`);
  }
  check(!/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html), `${outputFile} is noindex but present in sitemap`);

  const htmlAlternates = new Map();
  for (const link of html.matchAll(/<link\b[^>]*\srel="alternate"[^>]*\shreflang="([^"]+)"[^>]*\shref="([^"]+)"[^>]*\/?>/g)) {
    check(!htmlAlternates.has(link[1]), `${outputFile} repeats HTML hreflang ${link[1]}`);
    htmlAlternates.set(link[1], decodeXml(link[2]));
  }
  if (htmlAlternates.size) htmlAlternateSets.set(url.href, htmlAlternates);

  const localeMatch = url.pathname.match(/^\/([^/]+)\/blog(?:\/|$)/);
  if (localeMatch) {
    const locale = localeMatch[1];
    for (const link of html.matchAll(/href="\/blog\/([^"#?]+)(?:[?#][^"]*)?"/g)) {
      const localizedTarget = `${CANONICAL_ORIGIN}/${locale}/blog/${link[1]}`;
      if (sitemapLocs.has(localizedTarget)) localizedInternalLinkErrors.push(`${outputFile} → ${localizedTarget}`);
    }
  }
}
check(
  localizedInternalLinkErrors.length === 0,
  `Translated pages link to English despite an available translation: ${localizedInternalLinkErrors.join(", ")}`,
);

const extendedUrls = [
  ...matches(sitemap, /<image:loc>([\s\S]*?)<\/image:loc>/g).map((value) => ["Image URL", value]),
  ...matches(sitemap, /<xhtml:link\b[^>]*\shref="([^"]+)"[^>]*\/>/g).map((value) => ["hreflang URL", value]),
];
for (const [label, rawValue] of extendedUrls) {
  const url = validateUrl(rawValue, label);
  if (label === "Image URL" && url?.origin === CANONICAL_ORIGIN) {
    const relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    check(fs.existsSync(path.join(ROOT, relative)), `Image URL has no local file: ${url.href}`);
  }
}

// Every hreflang cluster must contain a self-reference and x-default → English,
// and each alternate page must publish the exact same reciprocal cluster.
const alternateSets = new Map();
for (const match of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const block = match[1];
  const locMatch = block.match(/<loc>([\s\S]*?)<\/loc>/);
  if (!locMatch) continue;
  const loc = decodeXml(locMatch[1]);
  const alternates = new Map();
  for (const link of block.matchAll(/<xhtml:link\b[^>]*\shreflang="([^"]+)"[^>]*\shref="([^"]+)"[^>]*\/>/g)) {
    check(!alternates.has(link[1]), `${loc} repeats hreflang ${link[1]}`);
    alternates.set(link[1], decodeXml(link[2]));
  }
  if (!alternates.size) continue;
  const selfReferences = [...alternates.entries()].filter(([lang, href]) => lang !== "x-default" && href === loc);
  check(selfReferences.length === 1, `${loc} must have exactly one hreflang self-reference`);
  check(alternates.get("x-default") === alternates.get("en"), `${loc} x-default must point to English`);
  for (const [lang, href] of alternates) {
    if (lang !== "x-default") check(sitemapLocs.has(href), `${loc} hreflang target is absent from sitemap: ${href}`);
  }
  alternateSets.set(loc, alternates);
}
for (const [loc, alternates] of alternateSets) {
  const signature = JSON.stringify([...alternates.entries()].sort());
  const htmlAlternates = htmlAlternateSets.get(loc);
  check(Boolean(htmlAlternates), `${loc} has sitemap hreflang annotations but no HTML hreflang set`);
  if (htmlAlternates) {
    check(
      JSON.stringify([...htmlAlternates.entries()].sort()) === signature,
      `${loc} HTML and sitemap hreflang sets differ`,
    );
  }
  for (const [lang, href] of alternates) {
    if (lang === "x-default") continue;
    const reciprocal = alternateSets.get(href);
    check(Boolean(reciprocal), `${loc} hreflang target has no reciprocal set: ${href}`);
    if (reciprocal) {
      check(JSON.stringify([...reciprocal.entries()].sort()) === signature, `${loc} and ${href} have different hreflang sets`);
    }
  }
}

const robots = read("robots.txt");
check(
  robots.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`),
  "robots.txt does not advertise the canonical sitemap URL",
);

const vercel = JSON.parse(read("vercel.json"));
// Keep cleanUrls disabled so Google's ownership verification file remains a
// direct 200 at its exact .html URL. Blog clean URLs are mapped explicitly,
// which avoids coupling search canonical URLs to that global Vercel switch.
check(vercel.cleanUrls !== true, "vercel cleanUrls must remain disabled for the Google HTML verification file");

const hasRoute = (routes, source, destination) =>
  (routes || []).some((route) => route.source === source && route.destination === destination);

const requiredBlogRewrites = [
  ["/blog", "/blog/index.html"],
  ["/:lang(tr|es|de|fr|it|pt|ar)/blog", "/:lang/blog/index.html"],
  ["/blog/tag/:slug([a-z0-9-]+)", "/blog/tag/:slug.html"],
  ["/:lang(tr|es|de|fr|it|pt|ar)/blog/tag/:slug([a-z0-9-]+)", "/:lang/blog/tag/:slug.html"],
  ["/blog/:slug([a-z0-9-]+)", "/blog/:slug.html"],
  ["/:lang(tr|es|de|fr|it|pt|ar)/blog/:slug([a-z0-9-]+)", "/:lang/blog/:slug.html"],
];
for (const [source, destination] of requiredBlogRewrites) {
  check(hasRoute(vercel.rewrites, source, destination), `vercel.json is missing blog rewrite ${source} -> ${destination}`);
}

const requiredBlogRedirects = [
  ["/blog/index.html", "/blog"],
  ["/:lang(tr|es|de|fr|it|pt|ar)/blog/index.html", "/:lang/blog"],
  ["/blog/tag/:slug([a-z0-9-]+).html", "/blog/tag/:slug"],
  ["/:lang(tr|es|de|fr|it|pt|ar)/blog/tag/:slug([a-z0-9-]+).html", "/:lang/blog/tag/:slug"],
  ["/blog/:slug([a-z0-9-]+).html", "/blog/:slug"],
  ["/:lang(tr|es|de|fr|it|pt|ar)/blog/:slug([a-z0-9-]+).html", "/:lang/blog/:slug"],
];
for (const [source, destination] of requiredBlogRedirects) {
  const route = (vercel.redirects || []).find((candidate) => candidate.source === source);
  check(route?.destination === destination && route?.permanent === true, `vercel.json is missing permanent blog redirect ${source} -> ${destination}`);
}

const canonicalRedirect = (vercel.redirects || []).some(
  (redirect) =>
    redirect.source === "/:path*" &&
    redirect.destination === `${CANONICAL_ORIGIN}/:path*` &&
    redirect.permanent === true &&
    (redirect.has || []).some(
      (condition) => condition.type === "host" && condition.value === "www.verifyco.app",
    ),
);
check(canonicalRedirect, "vercel.json is missing the permanent www-to-apex redirect");

if (failures.length) {
  console.error(`Site verification failed with ${failures.length} error(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Site verification passed: ${locValues.length} sitemap URLs, ${extendedUrls.length} extended URLs, ${sitemapBytes} bytes.`,
);

let longTitles = 0;
let longDescriptions = 0;
for (const rawLoc of locValues) {
  const url = new URL(decodeXml(rawLoc));
  const outputFile = outputFileFor(url);
  if (!outputFile) continue;
  const html = read(outputFile);
  const title = decodeXml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "").replace(/<[^>]+>/g, "").trim();
  const description = decodeXml(html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || "").trim();
  if (title.length > 65) longTitles += 1;
  if (description.length > 165) longDescriptions += 1;
}
if (longTitles || longDescriptions) {
  console.warn(`SEO advisory: ${longTitles} titles exceed 65 characters; ${longDescriptions} descriptions exceed 165 characters.`);
}
