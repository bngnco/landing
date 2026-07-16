import "./build-blog.mjs";

import { cp, copyFile, mkdir, readFile, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

const PUBLIC_FILES = [
  "index.html",
  "vera.html",
  "deepdetect-plus.html",
  "support.html",
  "privacy.html",
  "terms.html",
  "sitemap.html",
  "sitemap.xml",
  "robots.txt",
  "app-ads.txt",
  "llms.txt",
  "googlea79bb30fe44d8145.html",
];

const PUBLIC_DIRS = ["assets", "admin", "blog", "tr", "es", "pt", "de", "fr", "it", "ar"];
const TEXT_EXTENSIONS = new Set([".html", ".xml", ".css", ".txt"]);

async function exists(target) {
  try { await stat(target); return true; } catch { return false; }
}

async function walk(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await walk(full));
    else output.push(full);
  }
  return output;
}

async function copyRequiredUploads() {
  const publishedFiles = await walk(DIST);
  const uploadPaths = new Set();

  for (const file of publishedFiles) {
    if (!TEXT_EXTENSIONS.has(path.extname(file).toLowerCase())) continue;
    const source = await readFile(file, "utf8");
    const matches = source.matchAll(/(?:https:\/\/verifyco\.info)?(\/uploads\/[^"'<>?#]+)(?:[?#][^"'<>]*)?/g);
    for (const match of matches) {
      let pathname = match[1];
      try { pathname = decodeURIComponent(pathname); } catch {}
      pathname = pathname.replaceAll("/", path.sep);
      const absolute = path.resolve(ROOT, `.${pathname}`);
      const uploadRoot = path.resolve(ROOT, "uploads") + path.sep;
      if (absolute.startsWith(uploadRoot)) uploadPaths.add(absolute);
    }
  }

  let copied = 0;
  for (const source of uploadPaths) {
    if (!await exists(source)) throw new Error(`Referenced upload is missing: ${path.relative(ROOT, source)}`);
    const relative = path.relative(ROOT, source);
    const destination = path.join(DIST, relative);
    await mkdir(path.dirname(destination), { recursive: true });
    await copyFile(source, destination);
    copied += 1;
  }
  return copied;
}

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

for (const file of PUBLIC_FILES) {
  const source = path.join(ROOT, file);
  if (!await exists(source)) throw new Error(`Public file is missing: ${file}`);
  await copyFile(source, path.join(DIST, file));
}

for (const directory of PUBLIC_DIRS) {
  const source = path.join(ROOT, directory);
  if (!await exists(source)) continue;
  await cp(source, path.join(DIST, directory), { recursive: true });
}

const uploadCount = await copyRequiredUploads();

const forbidden = ["content", "scripts", "node_modules", ".git", ".preview", "package.json", "package-lock.json"];
for (const item of forbidden) {
  if (await exists(path.join(DIST, item))) throw new Error(`Private build input leaked into dist: ${item}`);
}

console.log(`Production bundle ready: dist/ · ${uploadCount} referenced upload assets copied · source inputs excluded.`);
