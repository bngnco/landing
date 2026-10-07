// Claims lint for the public site pages.
//
// Mirrors tools/verify_app_store_copy.py in the Verifyco monorepo: the
// "deepfake" vocabulary App Review rejected (every script the app ships) and
// the affirmative product claims docs/VERIFYCO_RESEARCH_CLAIMS_REGISTER.md
// forbids in Verifyco's own voice. A claim is reported only when no negation
// precedes it in the same clause, so disclaimers that negate the claim
// ("evidence, not proof", "No Guarantee of Accuracy") pass without an
// allowlist.
//
// SCOPE: the top-level site pages and assets/i18n.js only. The blog —
// content/blog, the generated blog/ and <lang>/blog/ output, and sitemap.html,
// which scripts/build-blog.mjs regenerates from post titles — is explicitly
// out of scope for now: its existing posts are an owner decision, not a
// copy-gate decision, and will be reviewed separately.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const BLOG_GENERATED_PAGES = new Set(["sitemap.html"]);
const PAGES = fs
  .readdirSync(ROOT)
  .filter((name) => name.endsWith(".html") && !BLOG_GENERATED_PAGES.has(name))
  .sort();
const FILES = [...PAGES, "assets/i18n.js"];

const DEEPFAKE = {
  latin: /deep[ -]?fakes?/gi,
  arabic: /ديب\s*فيك/g,
  hindi: /डीप(?:फ़|फ)ेक/g,
  japanese: /ディープフェイク/g,
  korean: /딥페이크/g,
  cyrillic: /дипфейк/gi,
  thai: /ดีปเฟก/g,
  chinese: /深度伪造/g,
};

// Every pattern is English because the register's prohibited wording is
// English; translations are reviewed against the English catalog. "100%" must
// be followed by a word (CSS "width: 100%" is not), "proof" must not be part
// of an id, class, key or path ("#proof", "corpus.proof.1", "race-proof"), and
// the bare verb "prove" must follow an English auxiliary so the Italian noun
// "prove" (evidence) is left alone.
const CLAIMS = {
  "percent-accuracy": /\b\d{2,3}\s?%\s*(?:accura|detect)/gi,
  "hundred-percent": /\b100\s?%(?=\s+(?!auto\b|cover\b|contain\b)[a-z])/gi,
  guaranteed: /\bguarantee[sd]?\s+(?:of\s+)?(?:accura|detect|result|authentic)/gi,
  proof: /(?<![-#"'./])\bproof\b(?![-.])/gi,
  proves: /\bproves\b|\bproven\s+(?:accura|detect|result|technolog|track)|\b(?:to|can|will|would|could|should|may|might|must|shall|we)\s+prove\b/gi,
  "tamper-evident": /\btamper[- ]?(?:evident|proof)/gi,
  "never-leaves-device": /\bnever\s+(?:leaves?|needs?\s+to\s+leave|has\s+to\s+leave)\s+(?:your|the)\s+(?:device|phone|iphone)/gi,
  "independent-vote": /\bindependent\s+(?:signals?|experts?|checks?|layers?)\b[^.]{0,60}\bvot/gi,
  "five-independent": /\b(?:five|5)\s+independent\b/gi,
  "accurate-results": /\baccurate\s+results?\b/gi,
  "detection-accuracy": /(?<!people's )(?<!people’s )(?<!human )(?<!your )(?<!their )(?<!own )\bdetection\s+accuracy\b/gi,
};

const NEGATION = /(?:\b(?:not|never|no|nor|neither|cannot|without)|n't)\b/i;
const CLAUSE_BOUNDARY = /[.;:!?\n]/;
const NEGATION_WINDOW = 160;
// "never leaves your device" carries its own "never" and is a claim as written.
const NEVER_NEGATED = new Set(["never-leaves-device"]);

const JS_LINE_COMMENT = /(?:^|\s)\/\/.*$/;
const JS_BLOCK_COMMENT_LINE = /^\s*(?:\/\*|\*)/;

function negated(text, start) {
  const prefix = text.slice(Math.max(0, start - NEGATION_WINDOW), start);
  const clause = prefix.split(CLAUSE_BOUNDARY).pop();
  return NEGATION.test(clause);
}

export function claimViolations(text) {
  const labels = [];
  for (const [label, pattern] of Object.entries(CLAIMS)) {
    for (const match of text.matchAll(pattern)) {
      if (!NEVER_NEGATED.has(label) && negated(text, match.index)) continue;
      labels.push(label);
      break;
    }
  }
  return labels;
}

export function deepfakeViolations(text) {
  return Object.entries(DEEPFAKE)
    .filter(([, pattern]) => text.match(pattern))
    .map(([label]) => label);
}

// Comments are not copy; the claims family ignores them. The deepfake family
// always sees the whole line.
function copyBearing(line, extension) {
  if (extension !== ".js") return line;
  if (JS_BLOCK_COMMENT_LINE.test(line)) return "";
  return line.replace(JS_LINE_COMMENT, "");
}

// Inline <style> blocks are CSS, not copy; blank them but keep line numbers.
function withoutStyleBlocks(html) {
  return html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, (block) => block.replace(/[^\n]/g, " "));
}

const violations = [];
let scannedLines = 0;
for (const relative of FILES) {
  const file = path.join(ROOT, relative);
  const extension = path.extname(relative).toLowerCase();
  let source = fs.readFileSync(file, "utf8");
  if (extension === ".html") source = withoutStyleBlocks(source);
  source.split("\n").forEach((line, index) => {
    scannedLines += 1;
    const labels = [...deepfakeViolations(line), ...claimViolations(copyBearing(line, extension))];
    for (const label of labels) {
      const excerpt = line.trim().replace(/\s+/g, " ").slice(0, 180);
      violations.push(`${relative}:${index + 1}: ${label}: ${excerpt}`);
    }
  });
}

if (violations.length) {
  console.error(`Claims lint failed with ${violations.length} hit(s):`);
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}
console.log(`Claims lint passed: ${FILES.length} files, ${scannedLines} lines (blog out of scope).`);
