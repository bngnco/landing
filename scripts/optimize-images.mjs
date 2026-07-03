/* One-off image optimizer.
 * Resizes + recompresses the oversized PNGs in place (same filenames, so
 * every reference across the site and generated blog keeps working). The
 * landing was shipping multi-megabyte screenshots and icons that froze the
 * page on load; these are displayed small, so we downscale to a retina-safe
 * width and quantize the PNG palette. Run with: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, statSync, renameSync } from "node:fs";

sharp.cache(false);

// [file, targetWidth] — width is generous vs. the on-screen display size.
const JOBS = [
  // Phone screenshots — shown ~264–300px wide inside the phone frame.
  ["assets/app/home.png", 760],
  ["assets/app/onb-uap.png", 760],
  ["assets/app/onb-object.png", 760],
  ["assets/app/onb-pro.png", 760],
  ["assets/app/onb-terrain.png", 760],
  ["assets/app/deepfake.png", 760],
  ["assets/app/signals.png", 900], // also the blog og-image → keep a touch larger
  ["assets/app/face.png", 760],
  ["assets/app/url.png", 760],
  ["assets/app/spotlight.png", 760],
  ["assets/app/paywall.png", 760],
  // Brand marks.
  ["assets/verifyco-icon.png", 512], // favicon + og-image sitewide
  ["assets/verifyco-icon-transparent.png", 512], // download-CTA icon (~116px)
  ["assets/verifyco-wordmark.png", 1400],
];

const kb = (n) => (n / 1024).toFixed(0) + "KB";
let before = 0, after = 0;

for (const [file, width] of JOBS) {
  const src = readFileSync(file);
  const b = src.length;
  const meta = await sharp(src).metadata();
  const tmp = file + ".tmp";
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .png({ palette: true, quality: 82, effort: 10, dither: 1.0, compressionLevel: 9 })
    .toFile(tmp);
  const a = statSync(tmp).size;
  // Guard: only replace if the optimized file is actually smaller.
  if (a < b) {
    renameSync(tmp, file);
  } else {
    writeFileSync(file, src);
  }
  before += b;
  after += Math.min(a, b);
  console.log(
    `${file.padEnd(40)} ${String(meta.width).padStart(4)}px → ${width}px   ${kb(b).padStart(7)} → ${kb(Math.min(a, b)).padStart(7)}`
  );
}

console.log("─".repeat(72));
console.log(`TOTAL ${kb(before)} → ${kb(after)}  (saved ${kb(before - after)}, ${(100 * (before - after) / before).toFixed(0)}%)`);
