/* ════════════════════════════════════════════════════════════════════
   Verifyco — static, multilingual blog generator
   Reads Markdown posts from /content/blog, renders production-grade,
   SEO-optimised static HTML into /blog (English, default) and
   /<lang>/blog for every translation, plus sitemap.xml (with hreflang
   alternates + image extension), robots.txt and per-language RSS feeds.

   Language of a post file:
     content/blog/<slug>.md        → English (default, lives at /blog/<slug>)
     content/blog/<slug>.tr.md     → Turkish  (lives at /tr/blog/<slug>)
   Translations are linked by shared <slug> and cross-referenced with
   reciprocal, self-referencing hreflang tags + x-default (→ English).

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
  // Existing top-level pages, included in the sitemap (clean URLs).
  staticPages: ["/", "/deepdetect-plus", "/support", "/privacy", "/terms"],
};

/* ── Languages ────────────────────────────────────────────────────────
   The first entry is the DEFAULT and lives at the site root (/blog). Add a
   language here + drop <slug>.<code>.md files in content/blog to ship it.  */
const DEFAULT_LANG = "en";
const LANGS = [
  { code: "en", locale: "en_US", label: "English",    native: "English",    dir: "ltr" },
  { code: "tr", locale: "tr_TR", label: "Turkish",    native: "Türkçe",     dir: "ltr" },
  { code: "es", locale: "es_ES", label: "Spanish",    native: "Español",    dir: "ltr" },
  { code: "de", locale: "de_DE", label: "German",     native: "Deutsch",    dir: "ltr" },
  { code: "fr", locale: "fr_FR", label: "French",     native: "Français",   dir: "ltr" },
  { code: "it", locale: "it_IT", label: "Italian",    native: "Italiano",   dir: "ltr" },
  { code: "pt", locale: "pt_BR", label: "Portuguese", native: "Português",  dir: "ltr" },
  { code: "ar", locale: "ar_SA", label: "Arabic",     native: "العربية",    dir: "rtl" },
];
const LANG_CODES = LANGS.map((l) => l.code);
const langMeta = (code) => LANGS.find((l) => l.code === code) || LANGS[0];
// URL prefix: default language at root, others under /<code>.
const langPrefix = (code) => (code === DEFAULT_LANG ? "" : `/${code}`);
// Languages that actually have published content this build (set in build()).
// The switcher only offers these so it can never link to a 404.
let AVAILABLE_LANGS = [DEFAULT_LANG];

/* ── UI strings (chrome). English is the fallback for any missing key. ─ */
const UI = {
  en: {
    navFeatures: "Features",
    navHow: "How it works",
    navBlog: "Blog",
    navPricing: "Pricing",
    navSupport: "Support",
    getApp: "Get the app",
    download: "Download on the App Store",
    minRead: "min read",
    allArticles: "← All articles",
    onThisPage: "On this page",
    moreFromBlog: "More from the blog",
    home: "Home",
    blog: "Blog",
    article: "Article",
    updated: "Updated",
    footerTagline:
      "On-device forensic verification for photos and videos. Reality, verified in every pixel.",
    product: "Product",
    company: "Company",
    rights: "All rights reserved",
    ctaTitle: "Verify it yourself — on your iPhone",
    ctaText:
      "Verifyco runs five forensic signals on-device to flag deepfakes, AI-generated and manipulated media — in seconds, fully offline, never uploaded.",
    ctaInlineStrong: "Want to check a file right now?",
    ctaInlineText:
      " Verifyco analyses any photo or video on your iPhone — on-device and private.",
    ctaInlineLink: "Get Verifyco →",
    heroEyebrow: "THE VERIFYCO BLOG",
    heroHeading: `Field notes on <span class="hl">deepfakes</span> &amp; media forensics`,
    heroLead:
      "Guides, breakdowns and research on detecting AI-generated and manipulated media — from the team building on-device verification.",
    listTitle: "The Verifyco Blog — Deepfake & AI Detection Guides",
    listDesc:
      "Guides, breakdowns and research on detecting deepfakes, AI-generated and manipulated media — from the team behind Verifyco, on-device forensic verification for iPhone.",
    all: "All",
    topic: "TOPIC",
    langLabel: "Language",
  },
  tr: {
    navFeatures: "Özellikler",
    navHow: "Nasıl çalışır",
    navBlog: "Blog",
    navPricing: "Fiyatlar",
    navSupport: "Destek",
    getApp: "Uygulamayı al",
    download: "App Store'dan İndir",
    minRead: "dk okuma",
    allArticles: "← Tüm yazılar",
    onThisPage: "Bu sayfada",
    moreFromBlog: "Blog'dan daha fazlası",
    home: "Ana Sayfa",
    blog: "Blog",
    article: "Yazı",
    updated: "Güncellendi",
    footerTagline:
      "Fotoğraf ve videolar için cihazda çalışan adli doğrulama. Her pikselde gerçeği doğrula.",
    product: "Ürün",
    company: "Şirket",
    rights: "Tüm hakları saklıdır",
    ctaTitle: "Kendin doğrula — iPhone'unda",
    ctaText:
      "Verifyco, deepfake'leri, AI üretimi ve manipüle edilmiş medyayı cihazında beş adli sinyalle işaretler — saniyeler içinde, tamamen çevrimdışı, hiçbir yükleme olmadan.",
    ctaInlineStrong: "Hemen bir dosya kontrol etmek ister misin?",
    ctaInlineText:
      " Verifyco her fotoğraf veya videoyu iPhone'unda analiz eder — cihazda ve gizli.",
    ctaInlineLink: "Verifyco'yu edin →",
    heroEyebrow: "VERIFYCO BLOG",
    heroHeading: `<span class="hl">Deepfake</span> ve medya adli bilimi üzerine notlar`,
    heroLead:
      "AI üretimi ve manipüle edilmiş medyayı tespit etme üzerine rehberler, çözümlemeler ve araştırmalar — cihazda doğrulama geliştiren ekipten.",
    listTitle: "Verifyco Blog — Deepfake ve AI Tespit Rehberleri",
    listDesc:
      "Deepfake, AI üretimi ve manipüle edilmiş medyayı tespit etme üzerine rehberler ve araştırmalar — iPhone için cihazda adli doğrulama sunan Verifyco ekibinden.",
    all: "Tümü",
    topic: "KONU",
    langLabel: "Dil",
  },
  es: {
    navFeatures: "Funciones", navHow: "Cómo funciona", navBlog: "Blog", navPricing: "Precios", navSupport: "Soporte",
    getApp: "Descargar la app", download: "Descargar en el App Store", minRead: "min de lectura",
    allArticles: "← Todos los artículos", onThisPage: "En esta página", moreFromBlog: "Más del blog",
    home: "Inicio", blog: "Blog", article: "Artículo", updated: "Actualizado",
    footerTagline: "Verificación forense en el dispositivo para fotos y vídeos. La realidad, verificada en cada píxel.",
    product: "Producto", company: "Empresa", rights: "Todos los derechos reservados",
    ctaTitle: "Compruébalo tú mismo — en tu iPhone",
    ctaText: "Verifyco ejecuta cinco señales forenses en el dispositivo para detectar deepfakes y contenido generado o manipulado por IA — en segundos, totalmente sin conexión y sin subir nada.",
    ctaInlineStrong: "¿Quieres comprobar un archivo ahora mismo?",
    ctaInlineText: " Verifyco analiza cualquier foto o vídeo en tu iPhone — en el dispositivo y en privado.",
    ctaInlineLink: "Obtén Verifyco →",
    heroEyebrow: "EL BLOG DE VERIFYCO",
    heroHeading: `Apuntes sobre <span class="hl">deepfakes</span> y análisis forense de medios`,
    heroLead: "Guías, análisis e investigación sobre cómo detectar contenido generado o manipulado por IA — del equipo que desarrolla la verificación en el dispositivo.",
    listTitle: "El Blog de Verifyco — Guías de detección de deepfakes e IA",
    listDesc: "Guías e investigación sobre cómo detectar deepfakes y contenido generado o manipulado por IA — del equipo de Verifyco, verificación forense en el dispositivo para iPhone.",
    all: "Todo", topic: "TEMA", langLabel: "Idioma",
  },
  de: {
    navFeatures: "Funktionen", navHow: "So funktioniert’s", navBlog: "Blog", navPricing: "Preise", navSupport: "Support",
    getApp: "App holen", download: "Im App Store laden", minRead: "Min. Lesezeit",
    allArticles: "← Alle Artikel", onThisPage: "Auf dieser Seite", moreFromBlog: "Mehr aus dem Blog",
    home: "Start", blog: "Blog", article: "Artikel", updated: "Aktualisiert",
    footerTagline: "Forensische Verifizierung für Fotos und Videos — direkt auf dem Gerät. Realität, in jedem Pixel verifiziert.",
    product: "Produkt", company: "Unternehmen", rights: "Alle Rechte vorbehalten",
    ctaTitle: "Prüfe es selbst — auf deinem iPhone",
    ctaText: "Verifyco führt fünf forensische Signale direkt auf dem Gerät aus, um Deepfakes sowie KI-generierte und manipulierte Medien zu erkennen — in Sekunden, vollständig offline und ohne Upload.",
    ctaInlineStrong: "Willst du jetzt eine Datei prüfen?",
    ctaInlineText: " Verifyco analysiert jedes Foto oder Video auf deinem iPhone — auf dem Gerät und privat.",
    ctaInlineLink: "Verifyco holen →",
    heroEyebrow: "DER VERIFYCO-BLOG",
    heroHeading: `Notizen zu <span class="hl">Deepfakes</span> & Medienforensik`,
    heroLead: "Leitfäden, Analysen und Forschung zum Erkennen KI-generierter und manipulierter Medien — vom Team hinter der Verifizierung auf dem Gerät.",
    listTitle: "Der Verifyco-Blog — Leitfäden zur Deepfake- & KI-Erkennung",
    listDesc: "Leitfäden und Forschung zum Erkennen von Deepfakes sowie KI-generierten und manipulierten Medien — vom Verifyco-Team, forensische Verifizierung auf dem iPhone.",
    all: "Alle", topic: "THEMA", langLabel: "Sprache",
  },
  fr: {
    navFeatures: "Fonctions", navHow: "Comment ça marche", navBlog: "Blog", navPricing: "Tarifs", navSupport: "Assistance",
    getApp: "Obtenir l’app", download: "Télécharger sur l’App Store", minRead: "min de lecture",
    allArticles: "← Tous les articles", onThisPage: "Sur cette page", moreFromBlog: "Plus d’articles",
    home: "Accueil", blog: "Blog", article: "Article", updated: "Mis à jour",
    footerTagline: "Vérification forensique des photos et vidéos, directement sur l’appareil. La réalité, vérifiée dans chaque pixel.",
    product: "Produit", company: "Entreprise", rights: "Tous droits réservés",
    ctaTitle: "Vérifiez par vous-même — sur votre iPhone",
    ctaText: "Verifyco exécute cinq signaux forensiques sur l’appareil pour repérer les deepfakes et les médias générés ou manipulés par IA — en quelques secondes, entièrement hors ligne et sans aucun envoi.",
    ctaInlineStrong: "Envie de vérifier un fichier tout de suite ?",
    ctaInlineText: " Verifyco analyse n’importe quelle photo ou vidéo sur votre iPhone — sur l’appareil et en privé.",
    ctaInlineLink: "Obtenir Verifyco →",
    heroEyebrow: "LE BLOG VERIFYCO",
    heroHeading: `Notes sur les <span class="hl">deepfakes</span> et l’analyse forensique des médias`,
    heroLead: "Guides, décryptages et recherches sur la détection des médias générés ou manipulés par IA — par l’équipe qui développe la vérification sur l’appareil.",
    listTitle: "Le Blog Verifyco — Guides de détection des deepfakes et de l’IA",
    listDesc: "Guides et recherches sur la détection des deepfakes et des médias générés ou manipulés par IA — par l’équipe Verifyco, vérification forensique sur iPhone.",
    all: "Tout", topic: "SUJET", langLabel: "Langue",
  },
  it: {
    navFeatures: "Funzioni", navHow: "Come funziona", navBlog: "Blog", navPricing: "Prezzi", navSupport: "Supporto",
    getApp: "Scarica l’app", download: "Scarica sull’App Store", minRead: "min di lettura",
    allArticles: "← Tutti gli articoli", onThisPage: "In questa pagina", moreFromBlog: "Altro dal blog",
    home: "Home", blog: "Blog", article: "Articolo", updated: "Aggiornato",
    footerTagline: "Verifica forense di foto e video, direttamente sul dispositivo. La realtà, verificata in ogni pixel.",
    product: "Prodotto", company: "Azienda", rights: "Tutti i diritti riservati",
    ctaTitle: "Verificalo tu stesso — sul tuo iPhone",
    ctaText: "Verifyco esegue cinque segnali forensi sul dispositivo per individuare deepfake e contenuti generati o manipolati dall’IA — in pochi secondi, completamente offline e senza alcun caricamento.",
    ctaInlineStrong: "Vuoi controllare un file adesso?",
    ctaInlineText: " Verifyco analizza qualsiasi foto o video sul tuo iPhone — sul dispositivo e in privato.",
    ctaInlineLink: "Ottieni Verifyco →",
    heroEyebrow: "IL BLOG DI VERIFYCO",
    heroHeading: `Appunti su <span class="hl">deepfake</span> e analisi forense dei media`,
    heroLead: "Guide, analisi e ricerca sul riconoscimento dei contenuti generati o manipolati dall’IA — dal team che sviluppa la verifica sul dispositivo.",
    listTitle: "Il Blog di Verifyco — Guide al rilevamento di deepfake e IA",
    listDesc: "Guide e ricerca sul rilevamento di deepfake e contenuti generati o manipolati dall’IA — dal team Verifyco, verifica forense su iPhone.",
    all: "Tutti", topic: "ARGOMENTO", langLabel: "Lingua",
  },
  pt: {
    navFeatures: "Recursos", navHow: "Como funciona", navBlog: "Blog", navPricing: "Preços", navSupport: "Suporte",
    getApp: "Obter o app", download: "Baixar na App Store", minRead: "min de leitura",
    allArticles: "← Todos os artigos", onThisPage: "Nesta página", moreFromBlog: "Mais do blog",
    home: "Início", blog: "Blog", article: "Artigo", updated: "Atualizado",
    footerTagline: "Verificação forense de fotos e vídeos, direto no dispositivo. A realidade, verificada em cada pixel.",
    product: "Produto", company: "Empresa", rights: "Todos os direitos reservados",
    ctaTitle: "Verifique você mesmo — no seu iPhone",
    ctaText: "O Verifyco executa cinco sinais forenses no dispositivo para detectar deepfakes e mídia gerada ou manipulada por IA — em segundos, totalmente offline e sem enviar nada.",
    ctaInlineStrong: "Quer verificar um arquivo agora?",
    ctaInlineText: " O Verifyco analisa qualquer foto ou vídeo no seu iPhone — no dispositivo e em privado.",
    ctaInlineLink: "Obter o Verifyco →",
    heroEyebrow: "O BLOG DA VERIFYCO",
    heroHeading: `Notas sobre <span class="hl">deepfakes</span> e perícia forense de mídia`,
    heroLead: "Guias, análises e pesquisa sobre como detectar mídia gerada ou manipulada por IA — da equipe que desenvolve a verificação no dispositivo.",
    listTitle: "O Blog da Verifyco — Guias de detecção de deepfakes e IA",
    listDesc: "Guias e pesquisa sobre como detectar deepfakes e mídia gerada ou manipulada por IA — da equipe Verifyco, verificação forense no iPhone.",
    all: "Tudo", topic: "TÓPICO", langLabel: "Idioma",
  },
  ar: {
    navFeatures: "الميزات", navHow: "كيف يعمل", navBlog: "المدوّنة", navPricing: "الأسعار", navSupport: "الدعم",
    getApp: "احصل على التطبيق", download: "التنزيل من App Store", minRead: "دقيقة قراءة",
    allArticles: "← كل المقالات", onThisPage: "في هذه الصفحة", moreFromBlog: "المزيد من المدوّنة",
    home: "الرئيسية", blog: "المدوّنة", article: "مقال", updated: "محدّث",
    footerTagline: "تحقّق جنائي للصور والفيديوهات على الجهاز نفسه. الحقيقة، مُتحقَّق منها في كل بكسل.",
    product: "المنتج", company: "الشركة", rights: "جميع الحقوق محفوظة",
    ctaTitle: "تحقّق بنفسك — على جهاز iPhone",
    ctaText: "يُشغّل Verifyco خمس إشارات جنائية على الجهاز لكشف التزييف العميق والوسائط المُولّدة أو المُعدّلة بالذكاء الاصطناعي — خلال ثوانٍ، دون اتصال تمامًا ودون رفع أي شيء.",
    ctaInlineStrong: "تريد فحص ملف الآن؟",
    ctaInlineText: " يحلّل Verifyco أي صورة أو فيديو على جهاز iPhone — على الجهاز وبخصوصية تامة.",
    ctaInlineLink: "← احصل على Verifyco",
    heroEyebrow: "مدوّنة Verifyco",
    heroHeading: `ملاحظات حول <span class="hl">التزييف العميق</span> والتحليل الجنائي للوسائط`,
    heroLead: "أدلّة وتحليلات وأبحاث حول كشف الوسائط المُولّدة أو المُعدّلة بالذكاء الاصطناعي — من الفريق الذي يطوّر التحقّق على الجهاز.",
    listTitle: "مدوّنة Verifyco — أدلّة كشف التزييف العميق والذكاء الاصطناعي",
    listDesc: "أدلّة وأبحاث حول كشف التزييف العميق والوسائط المُولّدة أو المُعدّلة بالذكاء الاصطناعي — من فريق Verifyco، التحقّق الجنائي على iPhone.",
    all: "الكل", topic: "الموضوع", langLabel: "اللغة",
  },
};
const strings = (lang) => ({ ...UI.en, ...(UI[lang] || {}) });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content", "blog");

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

// Transliterate common Turkish / Latin diacritics so non-English tag slugs
// stay readable (Araştırma → arastirma) instead of losing whole characters.
const TRANSLIT = {
  ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u",
  á: "a", à: "a", ä: "a", é: "e", è: "e", ê: "e", ë: "e", í: "i", ó: "o",
  ô: "o", ú: "u", ñ: "n", ß: "ss",
};
const slugify = (s = "") =>
  String(s)
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[çğıöşüâîûáàäéèêëíóôúñß]/g, (c) => TRANSLIT[c] || c)
    // Keep Unicode letters/numbers (Arabic, Cyrillic, CJK, …) so non-Latin
    // tags/headings get real slugs instead of collapsing to empty. ASCII
    // stays clean; other scripts are preserved (browsers + Google handle
    // UTF-8 URLs fine).
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

const abs = (p) => (p && p.startsWith("http") ? p : SITE.url + (p || ""));

const bcp47 = (lang) => (langMeta(lang).locale || "en_US").replace("_", "-");
const fmtDate = (d, lang) =>
  new Intl.DateTimeFormat(bcp47(lang), {
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
  // Safe embedding inside <script>: neutralise "</" and the JS line/paragraph
  // separators (U+2028/U+2029), written as escapes so the source stays ASCII.
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/* Build reciprocal hreflang <link> tags for a set of {lang → absolute url}
   alternates. Always self-references and adds x-default → the default lang. */
function hreflangLinks(alternates) {
  if (!alternates || Object.keys(alternates).length < 2) return "";
  const lines = LANG_CODES.filter((c) => alternates[c]).map(
    (c) => `  <link rel="alternate" hreflang="${c}" href="${esc(alternates[c])}" />`
  );
  if (alternates[DEFAULT_LANG]) {
    lines.push(
      `  <link rel="alternate" hreflang="x-default" href="${esc(alternates[DEFAULT_LANG])}" />`
    );
  }
  return "\n" + lines.join("\n");
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

// Language switcher: links to the same page in every language that has a
// version of it, otherwise to that language's blog index. Aids discovery and
// mirrors the hreflang set the crawler sees.
function langSwitcher(lang, alternates, ui) {
  // Only offer languages that have content this build. Deep-link to the exact
  // translation when it exists, else that language's blog index.
  const langs = LANGS.filter((l) => AVAILABLE_LANGS.includes(l.code));
  if (langs.length < 2) return "";
  const items = langs
    .map((l) => {
      const href = (alternates && alternates[l.code]) || `${SITE.url}${langPrefix(l.code)}/blog`;
      const here = l.code === lang ? ' aria-current="true" class="is-here"' : "";
      return `<a href="${esc(href)}" hreflang="${l.code}" lang="${l.code}"${here}>${esc(l.native)}</a>`;
    })
    .join("");
  return `<div class="blang" aria-label="${esc(ui.langLabel)}">${items}</div>`;
}

// Language links for the mobile menu (the inline switcher is hidden on small
// screens), so phone users can still switch language.
function mobileLangLinks(lang, alternates, ui) {
  const langs = LANGS.filter((l) => AVAILABLE_LANGS.includes(l.code));
  if (langs.length < 2) return "";
  const items = langs
    .map((l) => {
      const href = (alternates && alternates[l.code]) || `${SITE.url}${langPrefix(l.code)}/blog`;
      const here = l.code === lang ? ' aria-current="true" class="is-here"' : "";
      return `<a href="${esc(href)}" hreflang="${l.code}" lang="${l.code}"${here}>${esc(l.native)}</a>`;
    })
    .join("");
  return `<div class="bmenu-lang" aria-label="${esc(ui.langLabel)}"><span class="bmenu-lang-h">${esc(ui.langLabel)}</span>${items}</div>`;
}

function header(active, lang, ui, alternates) {
  const pre = langPrefix(lang);
  const link = (href, label, key) =>
    `<a href="${href}"${active === key ? ' class="is-here" aria-current="page"' : ""}>${label}</a>`;
  return `
  <header class="bnav" id="bnav">
    <div class="bwrap bnav-in">
      <a class="brand" href="/" aria-label="Verifyco">Verify<em>co</em></a>
      <nav class="bnav-links" aria-label="Primary">
        ${link("/#app", ui.navFeatures)}
        ${link("/#how", ui.navHow)}
        ${link(`${pre}/blog`, ui.navBlog, "blog")}
        ${link("/#pricing", ui.navPricing)}
      </nav>
      <div class="bnav-right">
        ${langSwitcher(lang, alternates, ui)}
        <button type="button" class="icon-btn" data-theme-toggle aria-label="Toggle theme">
          <span class="t-dark">${MOON}</span><span class="t-light">${SUN}</span>
        </button>
        <a class="btn btn-fill btn-sm" href="${SITE.appStore}" target="_blank" rel="noopener">${ui.getApp}</a>
        <button type="button" class="bburger" data-bburger aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div class="bmenu" data-bmenu>
    <nav aria-label="Mobile">
      <a href="/#app">${ui.navFeatures}</a>
      <a href="/#how">${ui.navHow}</a>
      <a href="${pre}/blog">${ui.navBlog}</a>
      <a href="/#pricing">${ui.navPricing}</a>
      <a href="/support">${ui.navSupport}</a>
    </nav>
    ${mobileLangLinks(lang, alternates, ui)}
    <a class="btn btn-fill" href="${SITE.appStore}" target="_blank" rel="noopener">${ui.download}</a>
  </div>`;
}

function footer(lang, ui) {
  const pre = langPrefix(lang);
  const year = new Date().getUTCFullYear();
  return `
  <footer class="bfoot">
    <div class="bwrap bfoot-in">
      <div class="bfoot-brand">
        <a class="brand" href="/">Verify<em>co</em></a>
        <p>${esc(ui.footerTagline)}</p>
        <p class="mono-note">VERIFYCO.INFO</p>
      </div>
      <div class="bfoot-col">
        <h4>${esc(ui.product)}</h4>
        <ul>
          <li><a href="/#how">${ui.navHow}</a></li>
          <li><a href="/#app">${ui.navFeatures}</a></li>
          <li><a href="/deepdetect-plus">DeepDetect+</a></li>
          <li><a href="/#pricing">${ui.navPricing}</a></li>
          <li><a href="${pre}/blog">${ui.navBlog}</a></li>
        </ul>
      </div>
      <div class="bfoot-col">
        <h4>${esc(ui.company)}</h4>
        <ul>
          <li><a href="/support">${ui.navSupport}</a></li>
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/terms">Terms</a></li>
          <li><a href="${SITE.appStore}" target="_blank" rel="noopener">App Store</a></li>
        </ul>
      </div>
    </div>
    <div class="bwrap bfoot-bot">
      <span>© ${year} Verifyco · ${esc(ui.rights)}</span>
      <span>ON-DEVICE · 0 UPLOADS · EST. 2026</span>
    </div>
  </footer>`;
}

const FOOT_JS = `<script>(function(){var r=document.documentElement;var tt=document.querySelector("[data-theme-toggle]");if(tt){tt.addEventListener("click",function(){var n=r.getAttribute("data-theme")==="light"?"dark":"light";r.setAttribute("data-theme",n);try{localStorage.setItem("vfy-theme",n);}catch(e){}});}var b=document.querySelector("[data-bburger]"),m=document.querySelector("[data-bmenu]");if(b){b.addEventListener("click",function(){document.body.classList.toggle("bmenu-open");});}if(m){m.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){document.body.classList.remove("bmenu-open");});});}var nav=document.getElementById("bnav");if(nav){var on=function(){nav.classList.toggle("is-solid",window.scrollY>8);};on();window.addEventListener("scroll",on,{passive:true});}var pr=document.querySelector(".read-progress");if(pr){var up=function(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight;pr.style.transform="scaleX("+(max>0?Math.min(1,h.scrollTop/max):0)+")";};up();window.addEventListener("scroll",up,{passive:true});window.addEventListener("resize",up);}})();</script>`;

/* ── CTA components ───────────────────────────────────────────────── */
function ctaBlock(ui) {
  return `
  <aside class="cta" aria-label="Get Verifyco">
    <img class="cta-icon" src="/assets/verifyco-icon.png" alt="" width="72" height="72" loading="lazy" />
    <div class="cta-body">
      <h3 class="cta-title">${esc(ui.ctaTitle)}</h3>
      <p class="cta-text">${esc(ui.ctaText)}</p>
      <a class="btn btn-fill" href="${SITE.appStore}" target="_blank" rel="noopener">
        <span class="btn-ico">${APPLE}</span> ${ui.download}
      </a>
    </div>
  </aside>`;
}

function ctaInline(ui) {
  return `
  <aside class="cta cta--inline" aria-label="Get Verifyco">
    <p><strong>${esc(ui.ctaInlineStrong)}</strong>${esc(ui.ctaInlineText)}</p>
    <a class="cta-link" href="${SITE.appStore}" target="_blank" rel="noopener">${esc(ui.ctaInlineLink)}</a>
  </aside>`;
}

/* ── Page shell ───────────────────────────────────────────────────── */
function page({
  title,
  description,
  canonical,
  image,
  head = "",
  bodyClass = "",
  active = "",
  main,
  lang = DEFAULT_LANG,
  alternates = null,
}) {
  const img = abs(image || SITE.defaultImage);
  const meta = langMeta(lang);
  const ui = strings(lang);
  return `<!DOCTYPE html>
<html lang="${meta.code}" dir="${meta.dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonical)}" />
  <meta name="theme-color" content="#0B0908" />
  <meta name="robots" content="index, follow, max-image-preview:large" />${hreflangLinks(alternates)}

  <meta property="og:site_name" content="${esc(SITE.name)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:image" content="${esc(img)}" />
  <meta property="og:locale" content="${meta.locale}" />${
    alternates
      ? LANG_CODES.filter((c) => alternates[c] && c !== lang)
          .map((c) => `\n  <meta property="og:locale:alternate" content="${langMeta(c).locale}" />`)
          .join("")
      : ""
  }

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="${SITE.twitter}" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(img)}" />

  <link rel="icon" type="image/png" href="/assets/verifyco-icon.png" />
  <link rel="apple-touch-icon" href="/assets/verifyco-icon.png" />
  <link rel="alternate" type="application/rss+xml" title="${esc(SITE.blogName)}" href="${SITE.url}${langPrefix(lang)}/blog/feed.xml" />
  ${THEME_BOOT}
  ${FONTS}
  <link rel="stylesheet" href="/assets/blog.css" />
${head}
</head>
<body class="${bodyClass}">
${header(active, lang, ui, alternates)}
${main}
${footer(lang, ui)}
${FOOT_JS}
</body>
</html>`;
}

/* ── Tag chips ────────────────────────────────────────────────────── */
const tagChip = (t, lang) =>
  `<a class="chip" href="${langPrefix(lang)}/blog/tag/${slugify(t)}">${esc(t)}</a>`;

/* ── Post card (index/tag listings) ───────────────────────────────── */
function postCard(p, ui) {
  return `
    <article class="card">
      <a class="card-media" href="${p.urlPath}" aria-label="${esc(p.title)}">
        <img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" loading="lazy" decoding="async" />
      </a>
      <div class="card-body">
        <div class="card-tags">${p.tags.slice(0, 2).map((t) => tagChip(t, p.lang)).join("")}</div>
        <h2 class="card-title"><a href="${p.urlPath}">${esc(p.title)}</a></h2>
        <p class="card-excerpt">${esc(p.description)}</p>
        <div class="card-meta">
          <time datetime="${p.iso}">${p.dateHuman}</time>
          <span class="dot">·</span>
          <span>${p.reading} ${ui.minRead}</span>
        </div>
      </div>
    </article>`;
}

/* ── Article page ─────────────────────────────────────────────────── */
function articlePage(p, related) {
  const ui = strings(p.lang);
  const pre = langPrefix(p.lang);
  const crumbs = `
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">${esc(ui.home)}</a><span class="sep">/</span>
      <a href="${pre}/blog">${esc(ui.blog)}</a><span class="sep">/</span>
      <span aria-current="page">${esc(p.tags[0] || ui.article)}</span>
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
    inLanguage: p.lang,
    isAccessibleForFree: true,
  });

  const breadcrumb = jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ui.home, item: SITE.url + "/" },
      { "@type": "ListItem", position: 2, name: ui.blog, item: SITE.url + pre + "/blog" },
      { "@type": "ListItem", position: 3, name: p.title, item: p.canonical },
    ],
  });

  // FAQPage structured data when the article has a FAQ section (≥2 Q&As) —
  // makes the post eligible for FAQ rich results in search.
  const faqLd =
    p.faq && p.faq.length >= 2
      ? `\n  <script type="application/ld+json">${jsonLd({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: p.faq.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        })}</script>`
      : "";

  const updated =
    p.iso !== p.isoUpdated
      ? `<span class="dot">·</span><span class="updated">${esc(ui.updated)} ${p.updatedHuman}</span>`
      : "";

  const relatedHtml = related.length
    ? `
    <section class="related bwrap">
      <h2 class="related-h">${esc(ui.moreFromBlog)}</h2>
      <div class="post-grid">${related.map((r) => postCard(r, ui)).join("")}</div>
    </section>`
    : "";

  const tocHtml =
    p.toc.length >= 2
      ? `
      <nav class="toc measure" aria-label="Table of contents">
        <p class="toc-h">${esc(ui.onThisPage)}</p>
        <ol>${p.toc.map((h) => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join("")}</ol>
      </nav>`
      : "";

  const main = `
  <div class="read-progress" aria-hidden="true"></div>
  <main class="bmain">
    <article class="post">
      <div class="post-head measure">
        ${crumbs}
        <div class="post-tags">${p.tags.map((t) => tagChip(t, p.lang)).join("")}</div>
        <h1 class="post-title">${esc(p.title)}</h1>
        <p class="post-dek">${esc(p.description)}</p>
        <div class="post-meta">
          <span class="byline">${esc(p.author)}</span>
          <span class="dot">·</span>
          <time datetime="${p.iso}">${p.dateHuman}</time>
          <span class="dot">·</span>
          <span>${p.reading} ${ui.minRead}</span>
          ${updated}
        </div>
      </div>

      <figure class="post-hero">
        <img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" decoding="async" fetchpriority="high" />
      </figure>
      ${tocHtml}

      <div class="prose measure">
        ${p.html}
        ${ctaBlock(ui)}
      </div>

      <div class="post-back measure"><a href="${pre}/blog">${esc(ui.allArticles)}</a></div>
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
    lang: p.lang,
    alternates: p.alternates,
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
  <script type="application/ld+json">${breadcrumb}</script>${faqLd}`,
    main,
  });
}

/* ── Index + tag listing pages ────────────────────────────────────── */
function listingPage({
  posts,
  allTags,
  heading,
  lead,
  eyebrow,
  canonical,
  title,
  description,
  activeTag,
  lang,
  alternates,
}) {
  const ui = strings(lang);
  const pre = langPrefix(lang);
  const tagFilter = `
    <div class="tag-filter">
      <a class="chip${!activeTag ? " is-on" : ""}" href="${pre}/blog">${esc(ui.all)}</a>
      ${allTags.map((t) => `<a class="chip${activeTag === t ? " is-on" : ""}" href="${pre}/blog/tag/${slugify(t)}">${esc(t)}</a>`).join("")}
    </div>`;

  const collection = jsonLd({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: SITE.blogName,
    url: canonical,
    inLanguage: lang,
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
      ${posts.map((p) => postCard(p, ui)).join("")}
    </section>
  </main>`;

  return page({
    title,
    description,
    canonical,
    image: posts[0] ? posts[0].image : SITE.defaultImage,
    active: "blog",
    bodyClass: "is-listing",
    lang,
    alternates,
    head: `  <meta property="og:type" content="website" />
  <script type="application/ld+json">${collection}</script>`,
    main,
  });
}

/* ── Load + group posts by slug across languages ──────────────────── */
function parseLangFromFile(file) {
  // <slug>.md → en ; <slug>.<code>.md → <code>
  const m = file.match(/^(.*?)(?:\.([a-z]{2}))?\.mdx?$/i);
  if (!m) return null;
  const base = m[1];
  const code = m[2] && LANG_CODES.includes(m[2]) ? m[2] : DEFAULT_LANG;
  return { base, code };
}

function buildPostRecord(file, lang) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (data.draft) return null;

  const slug = slugify(data.slug || file.replace(/(\.[a-z]{2})?\.mdx?$/i, ""));
  const date = new Date(data.date || Date.now());
  const updated = data.updated ? new Date(data.updated) : date;
  const tags = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [];

  let html = md.render(content);
  const ui = strings(lang);
  html = html
    .replace(/<p>\s*\[\[cta\]\]\s*<\/p>/gi, ctaInline(ui))
    .replace(/<!--\s*cta\s*-->/gi, ctaInline(ui));
  html = html.replace(
    /<p>(<img\b[^>]*\btitle="([^"]*)"[^>]*>)<\/p>/gi,
    (m, img, title) => `<figure class="fig">${img}<figcaption>${title}</figcaption></figure>`
  );

  const toc = [...html.matchAll(/<h2[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, "").trim(),
  }));

  // Extract Q&A pairs from a FAQ section (any supported language) so the
  // article can ship FAQPage structured data — eligibility for rich results.
  const faq = [];
  const faqHead =
    /(frequently asked|common questions|sık(?:ça)? sorulan|preguntas frecuentes|häufig(?:e|\sgestellte)? fragen|questions fréquentes|foire aux questions|domande frequenti|perguntas frequentes|الأسئلة الشائعة|أسئلة شائعة)/i;
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)];
  for (let i = 0; i < h2s.length; i++) {
    if (!faqHead.test(h2s[i][1].replace(/<[^>]+>/g, ""))) continue;
    const start = h2s[i].index + h2s[i][0].length;
    const end = i + 1 < h2s.length ? h2s[i + 1].index : html.length;
    const section = html.slice(start, end);
    for (const m of section.matchAll(/<p><strong>([\s\S]*?)<\/strong>([\s\S]*?)<\/p>/g)) {
      const q = m[1].replace(/<[^>]+>/g, "").trim();
      const a = m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      if (q && a) faq.push({ q, a });
    }
    break;
  }

  const pre = langPrefix(lang);
  const urlPath = `${pre}${SITE.blogPath}/${slug}`;
  const words = content.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return {
    slug,
    lang,
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
    dateHuman: fmtDate(date, lang),
    updatedHuman: fmtDate(updated, lang),
    reading: readingTime(content),
    words,
    toc,
    faq,
    html,
  };
}

/* Returns { groups: Map<slug, {lang → post}>, byLang: {lang → [posts]} }. */
function loadPosts() {
  const groups = new Map();
  if (fs.existsSync(CONTENT_DIR)) {
    for (const file of fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f))) {
      const parsed = parseLangFromFile(file);
      if (!parsed) continue;
      const rec = buildPostRecord(file, parsed.code);
      if (!rec) continue;
      if (!groups.has(rec.slug)) groups.set(rec.slug, {});
      groups.get(rec.slug)[parsed.code] = rec;
    }
  }

  // Attach reciprocal hreflang alternates to every post in a group.
  for (const byLang of groups.values()) {
    const alternates = {};
    for (const code of LANG_CODES) if (byLang[code]) alternates[code] = byLang[code].canonical;
    for (const code of Object.keys(byLang)) byLang[code].alternates = alternates;
  }

  const byLang = {};
  for (const code of LANG_CODES) {
    byLang[code] = [...groups.values()]
      .map((g) => g[code])
      .filter(Boolean)
      .sort((a, b) => b.date - a.date);
  }
  return { groups, byLang };
}

function writeFileSafe(file, contents) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}

/* ── Build ────────────────────────────────────────────────────────── */
function build() {
  const { byLang } = loadPosts();

  // Which languages have content this build — drives the language switcher.
  AVAILABLE_LANGS = LANG_CODES.filter((c) => byLang[c] && byLang[c].length);
  if (!AVAILABLE_LANGS.includes(DEFAULT_LANG)) AVAILABLE_LANGS.unshift(DEFAULT_LANG);

  // Reset output dirs (default at /blog, others at /<lang>/blog).
  for (const code of LANG_CODES) {
    const dir = path.join(ROOT, ...(code === DEFAULT_LANG ? ["blog"] : [code, "blog"]));
    fs.rmSync(dir, { recursive: true, force: true });
  }

  const sitemapUrls = [
    ...SITE.staticPages.map((u) => ({
      loc: SITE.url + (u === "/" ? "/" : u),
      priority: u === "/" ? "1.0" : "0.7",
    })),
  ];

  for (const code of LANG_CODES) {
    const posts = byLang[code];
    if (!posts.length && code !== DEFAULT_LANG) continue; // no content in this language yet
    const ui = strings(code);
    const pre = langPrefix(code);
    const outDir = path.join(ROOT, ...(code === DEFAULT_LANG ? ["blog"] : [code, "blog"]));
    fs.mkdirSync(outDir, { recursive: true });

    const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b));

    // Individual posts
    for (const p of posts) {
      const related = posts
        .filter((o) => o.slug !== p.slug && o.tags.some((t) => p.tags.includes(t)))
        .slice(0, 3);
      writeFileSafe(path.join(outDir, `${p.slug}.html`), articlePage(p, related));
      sitemapUrls.push({
        loc: p.canonical,
        lastmod: p.isoUpdated.slice(0, 10),
        priority: "0.7",
        image: p.imageAbs,
        imageAlt: p.imageAlt,
        alternates: p.alternates,
      });
    }

    // Listing index — alternates link every language that has a blog index.
    const indexAlternates = {};
    for (const c of LANG_CODES) if (byLang[c] && byLang[c].length) indexAlternates[c] = `${SITE.url}${langPrefix(c)}/blog`;
    writeFileSafe(
      path.join(outDir, "index.html"),
      listingPage({
        posts,
        allTags,
        lang: code,
        alternates: indexAlternates,
        eyebrow: ui.heroEyebrow,
        heading: ui.heroHeading,
        lead: ui.heroLead,
        canonical: SITE.url + pre + "/blog",
        title: ui.listTitle,
        description: ui.listDesc,
      })
    );
    sitemapUrls.push({
      loc: SITE.url + pre + "/blog",
      lastmod: posts[0] ? posts[0].iso.slice(0, 10) : undefined,
      priority: "0.8",
      alternates: indexAlternates,
    });

    // Tag pages (no cross-language hreflang — tags don't map 1:1 across langs)
    for (const tag of allTags) {
      const tagged = posts.filter((p) => p.tags.includes(tag));
      writeFileSafe(
        path.join(outDir, "tag", `${slugify(tag)}.html`),
        listingPage({
          posts: tagged,
          allTags,
          activeTag: tag,
          lang: code,
          eyebrow: ui.topic,
          heading: esc(tag),
          lead: `${SITE.name} · ${esc(tag)}`,
          canonical: `${SITE.url}${pre}/blog/tag/${slugify(tag)}`,
          title: `${tag} — ${SITE.blogName}`,
          description: ui.listDesc,
        })
      );
      sitemapUrls.push({ loc: `${SITE.url}${pre}/blog/tag/${slugify(tag)}`, priority: "0.4" });
    }

    // Per-language RSS feed
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
      `    <link>${SITE.url}${pre}/blog</link>\n` +
      `    <description>${esc(ui.listDesc)}</description>\n` +
      `    <language>${code}</language>\n` +
      `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n` +
      `    <atom:link href="${SITE.url}${pre}/blog/feed.xml" rel="self" type="application/rss+xml" />\n` +
      feedItems +
      `\n  </channel>\n</rss>\n`;
    writeFileSafe(path.join(outDir, "feed.xml"), feed);
  }

  // sitemap.xml (image extension + xhtml hreflang alternates)
  const today = isoDate(new Date()).slice(0, 10);
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    sitemapUrls
      .map((u) => {
        const lastmod = `\n    <lastmod>${u.lastmod || today}</lastmod>`;
        const priority = `\n    <priority>${u.priority}</priority>`;
        const alts =
          u.alternates && Object.keys(u.alternates).length > 1
            ? LANG_CODES.filter((c) => u.alternates[c])
                .map(
                  (c) =>
                    `\n    <xhtml:link rel="alternate" hreflang="${c}" href="${u.alternates[c]}"/>`
                )
                .join("") +
              (u.alternates[DEFAULT_LANG]
                ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${u.alternates[DEFAULT_LANG]}"/>`
                : "")
            : "";
        const img = u.image
          ? `\n    <image:image><image:loc>${u.image}</image:loc><image:title>${esc(u.imageAlt)}</image:title></image:image>`
          : "";
        return `  <url>\n    <loc>${u.loc}</loc>${lastmod}${priority}${alts}${img}\n  </url>`;
      })
      .join("\n") +
    `\n</urlset>\n`;
  writeFileSafe(path.join(ROOT, "sitemap.xml"), sitemap);

  // robots.txt
  writeFileSafe(
    path.join(ROOT, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`
  );

  // llms.txt — a concise, LLM-friendly map of the site so AI assistants
  // (ChatGPT, Perplexity, Claude, etc.) can discover and cite us accurately.
  const enPosts = byLang[DEFAULT_LANG] || [];
  const llms =
    `# Verifyco\n\n` +
    `> Verifyco is an iPhone app for on-device forensic verification of photos and videos. ` +
    `It fuses five forensic signals (C2PA content credentials, metadata forensics, neural face analysis, ` +
    `motion/temporal consistency, DCT frequency analysis) into a 0-100 trust score to detect deepfakes, ` +
    `AI-generated and manipulated media. Analysis runs entirely on-device via Apple's Neural Engine - ` +
    `nothing is uploaded, no account required, works offline. Free to try.\n\n` +
    `App Store: ${SITE.appStore}\n\n` +
    `## Key pages\n\n` +
    `- [Home](${SITE.url}/): product overview, how it works, pricing\n` +
    `- [DeepDetect+](${SITE.url}/deepdetect-plus): the advanced detection engine\n` +
    `- [Support](${SITE.url}/support)\n` +
    `- [Privacy](${SITE.url}/privacy): no uploads, no accounts, on-device only\n\n` +
    `## Blog (guides on deepfake & AI-media detection)\n\n` +
    enPosts.map((p) => `- [${p.title}](${p.canonical}): ${p.description}`).join("\n") +
    `\n\n## Languages\n\nThe blog is also available in: ` +
    LANGS.filter((l) => l.code !== DEFAULT_LANG && AVAILABLE_LANGS.includes(l.code))
      .map((l) => `${l.label} (${SITE.url}/${l.code}/blog)`)
      .join(", ") +
    `\n`;
  writeFileSafe(path.join(ROOT, "llms.txt"), llms);

  const totals = LANG_CODES.map((c) => `${c}:${byLang[c].length}`).join(" · ");
  console.log(`✓ Blog built → ${totals}`);
  console.log(`✓ sitemap.xml (hreflang + images) + robots.txt + per-language feed.xml written`);
}

build();
