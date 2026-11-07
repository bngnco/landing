/* ════════════════════════════════════════════════════════════
   VERIFYCO — corpus-ai.js
   Behaviour layer for the Corpus AI page: navigation, reveals,
   the living eye, the scripted chat with its visual cards, the
   section illustrations and the honest mailto access form.
   Static HTML remains the source of truth.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  root.classList.add("corpus-ready");
  /* This page is where the homepage splash sends people; do not show it to them again. */
  try { localStorage.setItem("verifyco_splash_corpus_v1", String(Date.now())); } catch (error) {}

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function svgEl(markup) {
    var wrap = document.createElement("div");
    wrap.innerHTML = markup.trim();
    return wrap.firstChild;
  }

  /* ── Header announcement (CMS JSON replaces the static text) ── */
  (function setupAnnouncement() {
    var announcements = Array.prototype.slice.call(document.querySelectorAll("[data-announcement]"));
    if (!announcements.length) return;
    var mobileNav = document.querySelector("[data-mmenu] nav");
    if (mobileNav && !mobileNav.querySelector("[data-announcement]")) {
      var mobileAnnouncement = announcements[0].cloneNode(true);
      mobileNav.insertBefore(mobileAnnouncement, mobileNav.firstChild);
      announcements.push(mobileAnnouncement);
    }
    var first = announcements[0];
    var defaults = {
      href: first.getAttribute("href") || "/blog",
      kicker: (first.querySelector("[data-announcement-kicker]") || {}).textContent || "NEWS",
      title: (first.querySelector("[data-announcement-title]") || {}).textContent || ""
    };
    function apply(config) {
      var enabled = !config || config.enabled !== false;
      var href = config && typeof config.url === "string" && config.url.trim() ? config.url.trim() : defaults.href;
      try {
        var parsed = new URL(href || defaults.href, window.location.origin);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") href = defaults.href;
        /* The site-wide announcement may point at this very page; keep the static text then. */
        if (parsed.origin === window.location.origin && parsed.pathname.replace(/\.html$/, "") === window.location.pathname.replace(/\.html$/, "")) config = null;
      } catch (error) { href = defaults.href; }
      if (!config) href = defaults.href;
      announcements.forEach(function (announcement) {
        announcement.hidden = !enabled;
        announcement.href = href || defaults.href;
        var kicker = announcement.querySelector("[data-announcement-kicker]");
        var title = announcement.querySelector("[data-announcement-title]");
        if (kicker) kicker.textContent = config && config.kicker ? config.kicker : defaults.kicker;
        if (title) title.textContent = config && config.title ? config.title : defaults.title;
      });
    }
    fetch("/assets/announcement.json", { cache: "no-store" })
      .then(function (response) { return response.ok ? response.json() : null; })
      .then(function (config) { if (config) apply(config); })
      .catch(function () {});
  })();

  /* ── Scroll state ─────────────────────────────────────────── */
  var nav = document.getElementById("nav");
  var scrollFrame = 0;
  function updateScrollState() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (nav) nav.classList.toggle("is-solid", y > 8);
    scrollFrame = 0;
  }
  function requestScrollUpdate() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollState);
  }
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  updateScrollState();

  /* ── Accessible mobile navigation ─────────────────────────── */
  var burger = document.querySelector("[data-burger]");
  var menu = document.querySelector("[data-mmenu]");
  if (burger && menu) {
    var menuId = menu.id || "corpus-mobile-menu";
    var lastFocused = null;
    var lockedScrollY = 0;
    var previousBodyOverflow = "";
    var previousBodyPaddingRight = "";
    var previousRootOverflow = "";
    var menuOpen = false;
    var focusableSelector = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex='-1'])";

    menu.id = menuId;
    menu.setAttribute("role", "dialog");
    menu.setAttribute("aria-modal", "true");
    menu.setAttribute("aria-label", "Site navigation");
    menu.setAttribute("aria-hidden", "true");
    menu.tabIndex = -1;
    burger.setAttribute("aria-controls", menuId);
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");

    function visibleMenuItems() {
      return Array.prototype.slice.call(menu.querySelectorAll(focusableSelector)).filter(function (element) {
        return element.getClientRects().length > 0;
      });
    }
    function setMenuItemsVisible(visible) {
      menu.querySelectorAll(".mlink").forEach(function (link) {
        link.style.opacity = visible ? "1" : "";
        link.style.transform = visible ? "none" : "";
      });
      var foot = menu.querySelector(".mmenu-foot");
      if (foot) foot.style.opacity = visible ? "1" : "";
    }
    function lockPageScroll() {
      lockedScrollY = window.scrollY || window.pageYOffset || 0;
      previousBodyOverflow = body.style.overflow;
      previousBodyPaddingRight = body.style.paddingRight;
      previousRootOverflow = root.style.overflow;
      var scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
      if (scrollbarWidth) body.style.paddingRight = scrollbarWidth + "px";
    }
    function unlockPageScroll() {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
      window.scrollTo(0, lockedScrollY);
      requestScrollUpdate();
    }
    function setMenu(open, restoreFocus) {
      if (menuOpen === open) return;
      menuOpen = open;
      if (open) {
        lastFocused = document.activeElement;
        body.classList.add("menu-open");
        burger.setAttribute("aria-expanded", "true");
        burger.setAttribute("aria-label", "Close menu");
        menu.setAttribute("aria-hidden", "false");
        setMenuItemsVisible(true);
        lockPageScroll();
        var items = visibleMenuItems();
        (items[0] || menu).focus();
        return;
      }
      body.classList.remove("menu-open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open menu");
      menu.setAttribute("aria-hidden", "true");
      setMenuItemsVisible(false);
      unlockPageScroll();
      if (restoreFocus !== false && lastFocused && typeof lastFocused.focus === "function" && document.contains(lastFocused)) lastFocused.focus();
      lastFocused = null;
    }
    burger.addEventListener("click", function () { setMenu(!menuOpen, true); });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) { setMenu(false, false); return; }
      if (event.target.closest("[data-mclose]") || event.target === menu) setMenu(false, true);
    });
    document.addEventListener("keydown", function (event) {
      if (!menuOpen) return;
      if (event.key === "Escape") { event.preventDefault(); setMenu(false, true); return; }
      if (event.key !== "Tab") return;
      var items = [burger].concat(visibleMenuItems());
      if (!items.length) { event.preventDefault(); menu.focus(); return; }
      var first = items[0], last = items[items.length - 1], active = document.activeElement;
      if (event.shiftKey && (active === first || items.indexOf(active) === -1)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && active === last) { event.preventDefault(); first.focus(); }
    });
    var desktopQuery = window.matchMedia("(min-width: 1201px)");
    var closeAtDesktop = function (event) { if (event.matches && menuOpen) setMenu(false, true); };
    if (typeof desktopQuery.addEventListener === "function") desktopQuery.addEventListener("change", closeAtDesktop);
    else if (typeof desktopQuery.addListener === "function") desktopQuery.addListener(closeAtDesktop);
  }

  /* ── Hero entrance + progressive reveals ──────────────────── */
  var hero = document.querySelector(".vr-hero");
  if (hero) {
    if (reduceMotion) hero.classList.add("in");
    else window.requestAnimationFrame(function () { hero.classList.add("in"); });
  }
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".v-rv"));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (element) { element.classList.add("in"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealItems.forEach(function (element) { revealObserver.observe(element); });
    window.setTimeout(function () {
      revealItems.forEach(function (element) { element.classList.add("in"); revealObserver.unobserve(element); });
    }, 2600);
  }

  /* ── The living eye: gaze, saccades, blinks, pupil ────────── */
  (function mountEye() {
    var canvas = document.querySelector("[data-eye]");
    var stage = document.querySelector("[data-eye-stage]");
    var mover = document.querySelector("[data-eye-move]");
    var lids = document.querySelector("[data-eye-lids]");
    if (!canvas || !stage || !mover || !window.CorpusEye || !canvas.getContext) return;
    var image = stage.querySelector(".vr-eye-img");
    var eye = null;
    var resizeTimer = 0;
    function size() { return Math.max(240, Math.round(Math.min(stage.clientWidth, stage.clientHeight || stage.clientWidth))); }
    function build() {
      if (eye) eye.stop();
      var px = size();
      if (reduceMotion) { window.CorpusEye.render(canvas, { size: px, time: 2.3 }); eye = null; }
      else eye = window.CorpusEye.mount(canvas, { size: px, fps: 30 });
      stage.classList.add("has-eye");
      if (image) image.style.opacity = "0";
    }
    try { build(); } catch (error) { return; }
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () { if (Math.abs(size() - canvas.clientWidth) > 24) build(); }, 180);
    });

    var visible = true;
    function setPaused(flag) { if (eye) eye.pause(flag); }
    if ("IntersectionObserver" in window) {
      var eyeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { visible = entry.isIntersecting; setPaused(document.hidden || !visible); });
      }, { threshold: 0 });
      eyeObserver.observe(canvas);
      document.addEventListener("visibilitychange", function () { setPaused(document.hidden || !visible); });
    }
    if (reduceMotion) return;

    /* Gaze: the iris drifts like a resting eye (fixations and quick jumps),
       and follows a fine pointer when one is over the hero. */
    var gaze = { x: 0, y: 0 };      /* current, in units of max shift */
    var target = { x: 0, y: 0 };
    var pointer = null;
    var pointerSeen = 0;
    var nextSaccade = 0;
    var moveSpeed = 0.12;
    var heroEl = document.querySelector("[data-hero]");
    function pickFixation(now) {
      var big = Math.random() < 0.3;
      var reach = big ? 1 : 0.45;
      target = { x: (Math.random() * 2 - 1) * reach, y: (Math.random() * 2 - 1) * reach * 0.7 };
      moveSpeed = 0.22;  /* a saccade is quick */
      nextSaccade = now + 1800 + Math.random() * 3400;
    }
    if (finePointer && heroEl) {
      heroEl.addEventListener("pointermove", function (event) {
        var rect = stage.getBoundingClientRect();
        var cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
        var dx = (event.clientX - cx) / (window.innerWidth * 0.5);
        var dy = (event.clientY - cy) / (window.innerHeight * 0.5);
        pointer = { x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) };
        pointerSeen = performance.now();
      }, { passive: true });
      heroEl.addEventListener("pointerleave", function () { pointer = null; });
    }
    function gazeTick(now) {
      window.requestAnimationFrame(gazeTick);
      if (document.hidden || !visible) return;
      if (pointer && now - pointerSeen < 2500) {
        target = pointer;
        moveSpeed = 0.1;
        nextSaccade = now + 1200;
        /* near the centre the pupil narrows a little, as if looking at a light */
        var d = Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y);
        if (eye) eye.setDilation(0.96 + Math.min(0.1, d * 0.08));
      } else {
        if (now > nextSaccade) pickFixation(now);
        if (eye) eye.setDilation(1);
      }
      gaze.x += (target.x - gaze.x) * moveSpeed;
      gaze.y += (target.y - gaze.y) * moveSpeed;
      moveSpeed += (0.06 - moveSpeed) * 0.05; /* settle into a slow drift after each jump */
      var max = stage.clientWidth * 0.035;
      var drift = Math.sin(now / 1900) * 0.6;
      mover.style.transform = "translate(" + (gaze.x * max + drift).toFixed(2) + "px," + (gaze.y * max).toFixed(2) + "px)";
    }
    window.requestAnimationFrame(gazeTick);

    /* Blinks: a quick lid close every few seconds, sometimes twice. */
    function blink(times) {
      if (document.hidden || !visible) return;
      lids.classList.add("is-blinking");
      window.setTimeout(function () {
        lids.classList.remove("is-blinking");
        if (eye) { eye.setDilation(1.06); window.setTimeout(function () { eye.setDilation(1); }, 500); }
        if (times > 1) window.setTimeout(function () { blink(times - 1); }, 190);
      }, 230);
    }
    function scheduleBlink() {
      window.setTimeout(function () {
        blink(Math.random() < 0.18 ? 2 : 1);
        scheduleBlink();
      }, 3200 + Math.random() * 5200);
    }
    window.setTimeout(scheduleBlink, 2600);
  })();

  /* ── Pause ambient CSS animation outside the viewport ─────── */
  var animationRoots = [hero].concat(Array.prototype.slice.call(document.querySelectorAll(".sec"))).filter(Boolean);
  var rootVisibility = new WeakMap();
  function updateAnimationState(element) {
    var outsideViewport = rootVisibility.get(element) === false;
    element.classList.toggle("vr-off", document.hidden || outsideViewport);
  }
  if ("IntersectionObserver" in window) {
    var animationObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { rootVisibility.set(entry.target, entry.isIntersecting); updateAnimationState(entry.target); });
    }, { rootMargin: "120px 0px 120px 0px", threshold: 0 });
    animationRoots.forEach(function (element) { rootVisibility.set(element, false); element.classList.add("vr-off"); animationObserver.observe(element); });
  } else {
    animationRoots.forEach(function (element) { rootVisibility.set(element, true); });
  }
  document.addEventListener("visibilitychange", function () {
    body.classList.toggle("vr-off", document.hidden);
    animationRoots.forEach(updateAnimationState);
  });

  /* ── Shared visual builders (SVG strings) ─────────────────── */
  var ICONS = {
    cc: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    meta: '<path d="M4 6h16M4 12h10M4 18h7"/><circle cx="18" cy="16" r="3"/>',
    ai: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    freq: '<path d="M2 12h3l2-6 3 12 3-9 2 6 2-3h5"/>',
    temporal: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M3 15h18M8 5v14M16 5v14"/>',
    photo: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-7 8"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',
    upload: '<path d="M12 16V5m0 0-4 4m4-4 4 4M5 19h14"/>',
    frames: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    file: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/>',
    pin: '<path d="M12 21s6-5.5 6-11a6 6 0 0 0-12 0c0 5.5 6 11 6 11Z"/><circle cx="12" cy="10" r="2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };
  var LAYER_ICON = { "Content Credentials": "cc", "Metadata Forensics": "meta", "AI Detection": "ai", "Frequency Analysis": "freq", "Temporal Consistency": "temporal" };
  function icon(name, cls) { return '<svg class="vr-ic ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>"; }
  var STATUS_TEXT = { ok: "Ran · agrees", flag: "Ran · finding", weak: "Ran · weak", na: "Could not run" };

  function coverageRing(ran, total, tone) {
    var r = 26, c = 2 * Math.PI * r, frac = ran / total;
    return '<svg class="vr-ring tone-' + tone + '" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="' + r + '" class="vr-ring-bg"/><circle cx="32" cy="32" r="' + r + '" class="vr-ring-fg" style="stroke-dasharray:' + c.toFixed(1) + ';stroke-dashoffset:' + (c * (1 - frac)).toFixed(1) + '"/><text x="32" y="30" text-anchor="middle" class="vr-ring-n">' + ran + '/' + total + '</text><text x="32" y="41" text-anchor="middle" class="vr-ring-l">ran</text></svg>';
  }
  function layerRows(layers) {
    return '<ul class="vr-lrows">' + layers.map(function (l) {
      return '<li class="st-' + l.status + '">' + icon(LAYER_ICON[l.name] || "file") + '<span class="vr-lrow-txt"><b>' + l.name + '</b><small>' + l.text + '</small></span><em>' + STATUS_TEXT[l.status] + '</em></li>';
    }).join("") + "</ul>";
  }

  /* A seeded "sample file" thumbnail: a soft mosaic, deliberately not a real photo. */
  function mosaic(canvas, seed, palette) {
    var ctx = canvas.getContext("2d");
    var w = canvas.width, h = canvas.height;
    var s = seed >>> 0 || 1;
    function rnd() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
    ctx.fillStyle = palette[0];
    ctx.fillRect(0, 0, w, h);
    for (var i = 0; i < 28; i += 1) {
      var x = rnd() * w, y = rnd() * h, r = (0.18 + rnd() * 0.5) * Math.max(w, h);
      var g = ctx.createRadialGradient(x, y, 0, x, y, r);
      var col = palette[1 + Math.floor(rnd() * (palette.length - 1))];
      g.addColorStop(0, col);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.globalAlpha = 1;
    /* blocky grain, like a heavily compressed copy */
    var cell = Math.max(6, Math.round(w / 26));
    for (var yy = 0; yy < h; yy += cell) for (var xx = 0; xx < w; xx += cell) {
      ctx.fillStyle = "rgba(" + (rnd() < 0.5 ? "255,255,255" : "0,0,0") + "," + (rnd() * 0.08).toFixed(3) + ")";
      ctx.fillRect(xx, yy, cell, cell);
    }
  }

  /* ── The scripted chat ────────────────────────────────────── */
  (function initialiseChat() {
    var consoleEl = document.querySelector("[data-console]");
    if (!consoleEl) return;
    var caseList = consoleEl.querySelector("[data-cases]");
    var log = consoleEl.querySelector("[data-log]");
    var askRow = consoleEl.querySelector("[data-ask]");
    var replay = consoleEl.querySelector("[data-replay]");
    var srStatus = consoleEl.querySelector("[data-log-sr]");

    /* Layer status: ok (agrees), flag (finding), weak (low-confidence), na (could not run). */
    var CASES = [
      {
        id: "protest", label: "Protest photo", kind: "Forwarded from a chat app", type: "photo", seed: 11,
        palette: ["#2a2f36", "#5b6b78", "#9b7b5a", "#c9b79c", "#3d4f66", "#8a8f94"],
        file: "protest_photo.jpg", meta: "1280 × 960 · JPEG · re-encoded · SHA-256 9c1e…4b07",
        headline: "Inconclusive", tone: "inconclusive", ran: 2, total: 5,
        layers: [
          { name: "Content Credentials", status: "na", text: "Content credentials could not be checked on this file. That is not evidence that none exist." },
          { name: "Metadata Forensics", status: "na", text: "Metadata is not available" },
          { name: "AI Detection", status: "weak", text: "Leans synthetic · low confidence · screenshot-like compression" },
          { name: "Frequency Analysis", status: "flag", text: "Consistent with a second compression pass" },
          { name: "Temporal Consistency", status: "na", text: "Not applicable to a still image" }
        ],
        turns: [
          { q: "A newsroom says a chatbot called this photo fake. What do you see?",
            a: "I see a forwarded copy, not the photo. The file has been re-encoded at least once and every camera field is gone, so only two of the five checks could run. **AI Detection leans synthetic at low confidence, and I would not act on it:** the compression it is reading matches what chat apps do to every image, a pattern my memory holds as a re-encode, not as a generator mark. **Verdict from this file: inconclusive.**",
            visual: "coverage" },
          { q: "So is it real or not?",
            a: "This copy cannot answer that, and a sentence from any model would not change the evidence. What would: **the earliest upload of this image, a second photo from the same moment, or the original file from the photographer.** Bring one of those back and I will compare them at full resolution.",
            visual: "change" },
          { q: "What should I write in the fact-check?",
            a: "Say what was checked, what could not be, and why. A line you can defend: **\"A re-encoded copy of the photo was examined; provenance and camera data were unavailable, and the image-level check was inconclusive.\"** That is weaker than a verdict and more honest than one." }
        ]
      },
      {
        id: "clip", label: "Press clip", kind: "Downloaded from X", type: "video", seed: 23,
        palette: ["#161b24", "#2b3d57", "#6d7f94", "#b8c4d1", "#3a2f27", "#8c5f3b"],
        file: "press_clip.mp4", meta: "1280 × 720 · 00:41 · H.264 · SHA-256 4fd8…a21c",
        headline: "Needs a Closer Look", tone: "look", ran: 4, total: 5,
        layers: [
          { name: "Content Credentials", status: "na", text: "Content credentials could not be checked on this file. That is not evidence that none exist." },
          { name: "Metadata Forensics", status: "ok", text: "Container labels match a platform re-encode" },
          { name: "AI Detection", status: "ok", text: "No synthetic lean on sampled frames" },
          { name: "Frequency Analysis", status: "ok", text: "Consistent with a platform re-encode" },
          { name: "Temporal Consistency", status: "flag", text: "Experimental · motion discontinuity at 00:23" }
        ],
        turns: [
          { q: "Was this clip edited?",
            a: "Something changes at 00:23. The experimental temporal layer flags a motion discontinuity there: the frame-to-frame change spikes the way a cut does. The visual layer finds no synthetic lean on the sampled frames, and the container labels say the file came through the platform's encoder, which is expected for a download. **So: a cut is likely, generation is not indicated.** A cut can be ordinary editing. I would ask what was removed, not whether the clip is fake.",
            visual: "spike" },
          { q: "Can you tell what was cut?",
            a: "Not from this file. **I can tell you where, not what.** Compare it against a longer or earlier upload: if the sentence before 00:23 ends differently in the other copy, you have your answer. I keep the counterevidence in the record as well: clean frames and platform-standard labels." },
          { q: "How sure is the temporal layer?",
            a: "Less sure than the others, and it says so. It is marked experimental in the app and it is the weakest part of the engine today, which is why the 2026 video corpus comes first on the roadmap. **One spike is a reason to look, not a conclusion.**" }
        ]
      },
      {
        id: "claim", label: "Claim photo", kind: "From the policyholder's phone", type: "photo", seed: 37,
        palette: ["#2b2420", "#6b5a4a", "#a98c6c", "#d9c7ad", "#4a4a4a", "#8c8277"],
        file: "claim_photo.jpg", meta: "4032 × 3024 · JPEG · capture credential · SHA-256 b7a0…e913",
        headline: "Likely Authentic", tone: "authentic", ran: 4, total: 5,
        layers: [
          { name: "Content Credentials", status: "ok", text: "Signed capture credential · verified offline against the trust list" },
          { name: "Metadata Forensics", status: "ok", text: "Camera make, model, lens and GPS present · capture 14:02 local" },
          { name: "AI Detection", status: "ok", text: "No synthetic lean" },
          { name: "Frequency Analysis", status: "ok", text: "Consistent with a single capture" },
          { name: "Temporal Consistency", status: "na", text: "Not applicable to a still image" }
        ],
        turns: [
          { q: "Can I rely on this photo for the claim?",
            a: "This is the strongest kind of file I see. It carries a **signed capture credential that verified against the trust list, and the visual reading agrees with it.** Under the engine's own rule, a capture credential counts as authentic evidence only when the visual reading agrees; here it does. The camera fields are complete and the capture time sits forty minutes after the reported incident. One thing to confirm outside the file: that the GPS location matches the address on the claim.",
            visual: "chain" },
          { q: "Could a credential be faked?",
            a: "A credential can be stripped, but it cannot be moved onto different pixels or survive an undeclared edit: the hash would no longer match and verification would fail. What a valid capture credential cannot tell me is whether the camera was pointed at something real; a photo of a screen or a print carries a genuine capture credential too. **That is why the visual reading has to agree, and here it does.**" },
          { q: "What would make you change your mind?",
            a: "A second photo of the same damage with a different timestamp, GPS fields that put the phone somewhere else, or a visual finding at the edges of the damaged area. **None of those are present in this file.** I would still have a human look at the damage itself; repair costs are outside what a file can show." }
        ]
      },
      {
        id: "listing", label: "Listing image", kind: "Marketplace listing", type: "photo", seed: 53,
        palette: ["#1f2022", "#5a5e63", "#b9bcc0", "#e2ddd5", "#7a6a5a", "#3b3f45"],
        file: "IMG_4821.JPG", meta: "2304 × 1792 · PNG inside a JPG name · SHA-256 e0c4…77d2",
        headline: "Likely AI-Generated", tone: "ai", ran: 4, total: 5,
        layers: [
          { name: "Content Credentials", status: "flag", text: "Credential present · signed by the generator's maker · declares AI-generated" },
          { name: "Metadata Forensics", status: "weak", text: "No camera fields · expected for a PNG" },
          { name: "AI Detection", status: "flag", text: "Leans synthetic · high confidence" },
          { name: "Frequency Analysis", status: "flag", text: "Pattern consistent with a generator family" },
          { name: "Temporal Consistency", status: "na", text: "Not applicable to a still image" }
        ],
        turns: [
          { q: "The seller says this is a photo of the actual item.",
            a: "The file says otherwise, twice. It carries a **Content Credential signed by the tool that made it, and that credential declares the image as AI-generated.** Independently, the visual layer leans synthetic and the pattern matches a generator family in my memory. The name was changed to look like a camera file; it is still a PNG inside. Names are the easiest field to change.",
            visual: "name" },
          { q: "Could the seller have used AI to clean up a real photo?",
            a: "Then the credential would usually record an edit on top of a capture, and the camera fields would survive. **Here there is no capture underneath: the credential's origin is a generation, and there are no camera fields at all.** Ask the seller for a photo from a phone, with its original file." },
          { q: "What do I tell the buyer?",
            a: "That the listing image is a generated render, declared as such by its own credential, and that no photo of the item has been provided yet. **Keep the file and its hash with the case**; the credential verifies again on any copy that has not been re-saved." }
        ]
      }
    ];

    /* Inline visuals shown under an answer. Values are illustrative and say so. */
    var VISUALS = {
      coverage: function (c) {
        return '<div class="vr-vis"><div class="vr-vis-head"><span>Evidence coverage</span><b>' + c.ran + ' of ' + c.total + ' checks ran</b></div>' + layerRows(c.layers) + '<p class="vr-vis-note">Layer names as in the Verifyco app · sample values</p></div>';
      },
      change: function () {
        var items = [["upload", "Earliest upload", "Find the first place this image appeared"], ["frames", "Second photo", "Another frame or angle from the same moment"], ["file", "Original file", "From the photographer's device, not a copy"]];
        return '<div class="vr-vis"><div class="vr-vis-head"><span>What would change the answer</span></div><ul class="vr-steps">' + items.map(function (i) { return '<li>' + icon(i[0]) + '<b>' + i[1] + '</b><small>' + i[2] + '</small></li>'; }).join("") + '</ul></div>';
      },
      spike: function () {
        var n = 48, bars = [], seed = 5;
        function rnd() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
        for (var i = 0; i < n; i += 1) { var v = 6 + rnd() * 10; if (i === 27) v = 86; if (i === 26 || i === 28) v = 18 + rnd() * 6; bars.push(v); }
        var w = 480, h = 120, bw = w / n;
        var rects = bars.map(function (v, i) { var bh = v / 100 * 96; return '<rect x="' + (i * bw + 1).toFixed(1) + '" y="' + (110 - bh).toFixed(1) + '" width="' + (bw - 2).toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="1.5" class="' + (i === 27 ? "hot" : "") + '"/>'; }).join("");
        return '<div class="vr-vis"><div class="vr-vis-head"><span>Frame-to-frame change</span><b>spike at 00:23</b></div><svg class="vr-spike" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">' + rects + '<text x="' + (27 * bw + bw / 2).toFixed(1) + '" y="12" text-anchor="middle" class="vr-spike-t">00:23</text><text x="2" y="118" class="vr-spike-a">00:00</text><text x="' + (w - 2) + '" y="118" text-anchor="end" class="vr-spike-a">00:41</text></svg><p class="vr-vis-note">Temporal Consistency is experimental in the app · illustrative values</p></div>';
      },
      chain: function () {
        var steps = [["cc", "Capture credential signed"], ["cc", "Verified against the trust list"], ["ai", "Visual reading agrees"], ["meta", "Camera fields complete"]];
        return '<div class="vr-vis"><div class="vr-vis-head"><span>Why the engine says Likely Authentic</span></div><ol class="vr-chain">' + steps.map(function (s) { return '<li>' + icon(s[0]) + '<span>' + s[1] + '</span></li>'; }).join("") + '</ol><div class="vr-timebar"><span><i>' + icon("clock") + '</i><b>13:22</b><small>reported incident</small></span><em>40 min</em><span><i>' + icon("photo") + '</i><b>14:02</b><small>capture time in the file</small></span></div><p class="vr-vis-note">' + icon("pin") + ' GPS vs the address on the claim: to be confirmed outside the file</p></div>';
      },
      name: function () {
        return '<div class="vr-vis"><div class="vr-vis-head"><span>The name and the contents disagree</span></div><div class="vr-namevs"><div class="vr-namevs-a">' + icon("file") + '<b>IMG_4821.JPG</b><small>what the name says</small></div><span class="vr-namevs-x">≠</span><div class="vr-namevs-b">' + icon("cc") + '<b>PNG · Content Credential</b><small>signed by the generator\'s maker · declares AI-generated</small></div></div><p class="vr-vis-note">Two independent signals agree: the credential and the visual layer</p></div>';
      }
    };

    var current = 0, playing = false, token = 0, started = false;

    function thumb(c, w, h) {
      var cv = document.createElement("canvas");
      cv.width = w; cv.height = h; cv.className = "vr-thumb";
      try { mosaic(cv, c.seed, c.palette); } catch (error) {}
      return cv;
    }
    function announce(text) { if (srStatus) srStatus.textContent = text; }
    function stamp() { var d = new Date(); return d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0"); }

    function renderCases() {
      caseList.innerHTML = "";
      CASES.forEach(function (c, index) {
        var button = el("button", "vr-thread" + (index === current ? " is-on" : ""));
        button.type = "button";
        button.setAttribute("aria-pressed", index === current ? "true" : "false");
        var pic = el("span", "vr-thread-pic");
        pic.appendChild(thumb(c, 88, 88));
        pic.appendChild(svgEl(icon(c.type === "video" ? "video" : "photo", "vr-thread-type")));
        var txt = el("span", "vr-thread-txt");
        txt.appendChild(el("b", null, c.label));
        txt.appendChild(el("small", null, c.kind));
        var dot = el("i", "vr-thread-dot tone-" + c.tone);
        button.appendChild(pic); button.appendChild(txt); button.appendChild(dot);
        button.addEventListener("click", function () { selectCase(index); });
        caseList.appendChild(button);
      });
    }

    function message(kind) {
      var row = el("div", "vr-m vr-m--" + kind);
      if (kind === "ai") {
        var av = el("span", "vr-m-avatar");
        var img = document.createElement("img");
        img.src = "assets/corpus-eye-700.jpg"; img.alt = ""; img.width = 700; img.height = 700; img.loading = "lazy"; img.decoding = "async";
        av.appendChild(img);
        row.appendChild(av);
      }
      var col = el("div", "vr-m-col");
      var bubble = el("div", "vr-m-bubble");
      col.appendChild(bubble);
      col.appendChild(el("span", "vr-m-time", stamp()));
      row.appendChild(col);
      log.appendChild(row);
      log.scrollTop = log.scrollHeight;
      return bubble;
    }

    function fileCard(c) {
      var card = el("div", "vr-filecard");
      var pic = el("span", "vr-filecard-pic");
      pic.appendChild(thumb(c, c.type === "video" ? 240 : 200, c.type === "video" ? 135 : 150));
      if (c.type === "video") pic.appendChild(svgEl('<span class="vr-filecard-play">' + icon("video") + "</span>"));
      pic.appendChild(el("em", "vr-filecard-sample", "sample"));
      var txt = el("span", "vr-filecard-txt");
      txt.appendChild(el("b", null, c.file));
      txt.appendChild(el("small", null, c.meta));
      card.appendChild(pic); card.appendChild(txt);
      return card;
    }

    function engineCard(c) {
      var card = el("div", "vr-engine-card tone-" + c.tone);
      card.innerHTML = '<div class="vr-engine-top"><span class="vr-engine-who"><i></i>Verifyco engine · report</span><b>5 layers</b></div>'
        + '<div class="vr-engine-verdict">' + coverageRing(c.ran, c.total, c.tone) + '<div><span>Headline</span><strong>' + c.headline + '</strong><small>Evidence coverage · ' + c.ran + ' of ' + c.total + ' checks ran</small></div></div>'
        + layerRows(c.layers)
        + '<p class="vr-engine-note">Layer names and headline labels are the ones the Verifyco app uses. Values are illustrative.</p>';
      return card;
    }

    function segments(text) {
      var parts = text.split("**");
      return parts.map(function (part, index) { return { text: part, bold: index % 2 === 1 }; }).filter(function (part) { return part.text.length; });
    }
    function wait(ms, myToken) {
      return new Promise(function (resolve) { window.setTimeout(function () { if (myToken === token) resolve(); }, ms); });
    }
    function typeInto(content, text, myToken) {
      return new Promise(function (resolve) {
        var segs = segments(text);
        if (reduceMotion) {
          segs.forEach(function (seg) { content.appendChild(seg.bold ? el("b", null, seg.text) : document.createTextNode(seg.text)); });
          log.scrollTop = log.scrollHeight;
          resolve();
          return;
        }
        var total = text.length;
        var perFrame = Math.max(1, Math.round(total / 110));
        var si = 0, ci = 0, node = null;
        function step() {
          if (myToken !== token) return;
          var budget = perFrame;
          while (budget > 0 && si < segs.length) {
            var seg = segs[si];
            if (!node) { node = seg.bold ? el("b") : document.createTextNode(""); content.appendChild(node); }
            var slice = seg.text.slice(ci, ci + budget);
            if (seg.bold) node.textContent += slice; else node.data += slice;
            ci += slice.length;
            budget -= slice.length;
            if (ci >= seg.text.length) { si += 1; ci = 0; node = null; }
          }
          log.scrollTop = log.scrollHeight;
          if (si < segs.length) window.requestAnimationFrame(step);
          else resolve();
        }
        window.requestAnimationFrame(step);
      });
    }

    function setChipsDisabled(flag) {
      Array.prototype.forEach.call(askRow.querySelectorAll(".vr-ask-chip"), function (chip) { chip.disabled = flag; });
    }
    function typingBubble() {
      var b = message("ai");
      b.classList.add("is-typing");
      var dots = el("span", "vr-typing");
      dots.innerHTML = "<i></i><i></i><i></i>";
      b.appendChild(dots);
      return { bubble: b, dots: dots };
    }

    function playPair(c, pair, myToken) {
      playing = true;
      consoleEl.classList.add("is-playing");
      setChipsDisabled(true);
      var user = message("user");
      user.textContent = pair.q;
      announce("You: " + pair.q);
      return wait(reduceMotion ? 0 : 520, myToken).then(function () {
        if (myToken !== token) return;
        var t = typingBubble();
        return wait(reduceMotion ? 0 : 820, myToken).then(function () {
          if (myToken !== token) return;
          t.bubble.removeChild(t.dots);
          t.bubble.classList.remove("is-typing");
          return typeInto(t.bubble, pair.a, myToken).then(function () {
            if (myToken !== token) return;
            if (pair.visual && VISUALS[pair.visual]) {
              var vis = svgEl(VISUALS[pair.visual](c));
              vis.classList.add("is-new");
              t.bubble.appendChild(vis);
              log.scrollTop = log.scrollHeight;
            }
          });
        });
      }).then(function () {
        if (myToken !== token) return;
        playing = false;
        consoleEl.classList.remove("is-playing");
        announce("Corpus AI: " + pair.a.replace(/\*\*/g, ""));
        setChipsDisabled(false);
      });
    }

    function chip(tag, text, onClick) {
      var button = el("button", "vr-ask-chip");
      button.type = "button";
      button.innerHTML = "<i></i><span></span>";
      button.querySelector("i").textContent = tag;
      button.querySelector("span").textContent = text;
      button.addEventListener("click", onClick);
      return button;
    }
    function focusAsk() {
      var first = askRow.querySelector(".vr-ask-chip:not([hidden])");
      (first || askRow).focus({ preventScroll: true });
    }
    function renderAsk(c, remaining) {
      askRow.innerHTML = "";
      if (!remaining.length) {
        var nextIndex = (current + 1) % CASES.length;
        askRow.appendChild(chip("Again", "Replay this conversation", function () { if (!playing) selectCase(current); }));
        askRow.appendChild(chip("Next", CASES[nextIndex].label + ": " + CASES[nextIndex].kind, function () { if (!playing) selectCase(nextIndex); }));
        return;
      }
      remaining.forEach(function (index) {
        var button = chip("Ask", c.turns[index].q, function () {
          if (playing) return;
          var myToken = token;
          var rest = remaining.filter(function (i) { return i !== index; });
          button.hidden = true;
          playPair(c, c.turns[index], myToken).then(function () {
            if (myToken !== token) return;
            renderAsk(c, rest);
            focusAsk();
          });
        });
        askRow.appendChild(button);
      });
    }

    function selectCase(index) {
      current = index;
      token += 1;
      var myToken = token;
      playing = false;
      consoleEl.classList.remove("is-playing");
      var c = CASES[index];
      Array.prototype.forEach.call(caseList.children, function (button, i) {
        button.classList.toggle("is-on", i === index);
        button.setAttribute("aria-pressed", i === index ? "true" : "false");
      });
      log.innerHTML = "";
      askRow.innerHTML = "";
      /* 1. the user sends the file */
      var sent = message("user");
      sent.classList.add("vr-m-bubble--file");
      sent.appendChild(fileCard(c));
      sent.appendChild(el("p", "vr-m-filetext", "Here is the file."));
      announce("You sent " + c.file);
      /* 2. the engine reports */
      wait(reduceMotion ? 0 : 700, myToken).then(function () {
        if (myToken !== token) return;
        var t = typingBubble();
        t.bubble.classList.add("vr-m-bubble--engine");
        t.dots.insertAdjacentText("afterbegin", "Running the five layers ");
        return wait(reduceMotion ? 0 : 1100, myToken).then(function () {
          if (myToken !== token) return;
          t.bubble.innerHTML = "";
          t.bubble.classList.remove("is-typing");
          t.bubble.appendChild(engineCard(c));
          log.scrollTop = log.scrollHeight;
          announce("Verifyco engine: " + c.headline + ". Evidence coverage " + c.ran + " of " + c.total + " checks ran.");
        });
      }).then(function () {
        if (myToken !== token) return;
        return wait(reduceMotion ? 0 : 600, myToken);
      }).then(function () {
        if (myToken !== token) return;
        return playPair(c, c.turns[0], myToken);
      }).then(function () {
        if (myToken !== token) return;
        renderAsk(c, c.turns.map(function (t, i) { return i; }).slice(1));
      });
    }

    renderCases();
    replay.addEventListener("click", function () { selectCase(current); });

    function start() { if (started) return; started = true; selectCase(0); }
    if (reduceMotion || !("IntersectionObserver" in window)) start();
    else {
      var consoleObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) { start(); consoleObserver.disconnect(); } });
      }, { threshold: 0.2 });
      consoleObserver.observe(consoleEl);
      window.setTimeout(start, 9000);
    }

    /* "A sentence vs evidence": the same report renderer, outside the chat. */
    var versus = document.querySelector("[data-versus-report]");
    if (versus) {
      var c0 = CASES[0];
      versus.innerHTML = '<div class="vr-versus-file">' + icon("photo") + '<b>' + c0.file + '</b><small>' + c0.meta + '</small></div>'
        + '<div class="vr-engine-verdict">' + coverageRing(c0.ran, c0.total, c0.tone) + '<div><span>Headline</span><strong>' + c0.headline + '</strong><small>what could not be checked is listed, not hidden</small></div></div>'
        + layerRows(c0.layers)
        + '<p class="vr-vis-note">What would change it: the earliest upload, a second photo, or the original file.</p>';
    }
  })();

  /* ── Section illustrations ────────────────────────────────── */
  (function illustrations() {
    var mini = document.querySelector("[data-mini-eye]");
    if (mini && window.CorpusEye && mini.getContext) {
      try { window.CorpusEye.render(mini, { size: 300, dpr: 1, keepStyle: true, time: 3.1, seed: 9 }); } catch (error) {}
    }
    var mem = document.querySelector("[data-memory]");
    if (mem && mem.getContext) {
      var ctx = mem.getContext("2d");
      var W = mem.width, H = mem.height, cols = 22, rows = 11;
      var cw = W / cols, ch = H / rows;
      var s = 42;
      function rnd() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
      var cellsM = [];
      for (var r = 0; r < rows; r += 1) for (var q = 0; q < cols; q += 1) {
        var v = rnd();
        cellsM.push({ x: q * cw, y: r * ch, kind: v > 0.93 ? "ice" : v > 0.6 ? "bronze" : "deep", phase: rnd() * 6.28, speed: 0.4 + rnd() * 0.9 });
      }
      function paint(t) {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < cellsM.length; i += 1) {
          var c = cellsM[i];
          var pulse = 0.5 + 0.5 * Math.sin(t * c.speed + c.phase);
          var fill = c.kind === "ice" ? "rgba(159,196,218," + (0.35 + pulse * 0.6).toFixed(2) + ")" : c.kind === "bronze" ? "rgba(188,142,100," + (0.18 + pulse * 0.22).toFixed(2) + ")" : "rgba(74,44,24," + (0.25 + pulse * 0.15).toFixed(2) + ")";
          ctx.fillStyle = fill;
          ctx.fillRect(c.x + 2, c.y + 2, cw - 4, ch - 4);
        }
      }
      paint(1);
      if (!reduceMotion) {
        var memVisible = false, memStart = null;
        function memTick(now) {
          window.requestAnimationFrame(memTick);
          if (!memVisible || document.hidden) return;
          if (memStart === null) memStart = now;
          paint((now - memStart) / 1000);
        }
        if ("IntersectionObserver" in window) {
          new IntersectionObserver(function (entries) { entries.forEach(function (e) { memVisible = e.isIntersecting; }); }, { threshold: 0 }).observe(mem);
        } else memVisible = true;
        window.requestAnimationFrame(memTick);
      }
    }
    var judge = document.querySelector("[data-judge]");
    if (judge) {
      var layers = ["Content Credentials", "Metadata Forensics", "AI Detection", "Frequency Analysis", "Temporal Consistency"];
      var allowed = ["may decide the verdict when trusted", "context, never a verdict alone", "supporting signal until the benchmark", "can only argue against", "experimental, flags for review"];
      judge.innerHTML = '<svg viewBox="0 0 600 300" aria-hidden="true" class="vr-judge">'
        + layers.map(function (l, i) { var y = 30 + i * 54; return '<g class="vr-judge-row" style="animation-delay:' + (i * 0.4) + 's"><rect x="20" y="' + (y - 16) + '" width="190" height="32" rx="8"/><text x="34" y="' + (y + 5) + '" class="vr-judge-l">' + l + '</text><path d="M212 ' + y + ' C 260 ' + y + ', 270 150, 318 150" /></g>'; }).join("")
        + '<rect x="318" y="118" width="110" height="64" rx="12" class="vr-judge-rule"/><text x="373" y="146" text-anchor="middle" class="vr-judge-rt">RULE SET</text><text x="373" y="164" text-anchor="middle" class="vr-judge-rs">what each may claim</text>'
        + '<path d="M428 150 C 470 150, 480 60, 520 60 M428 150 C 470 150, 480 150, 520 150 M428 150 C 470 150, 480 240, 520 240" class="vr-judge-out"/>'
        + '<text x="528" y="64" class="vr-judge-o">Likely Authentic</text><text x="528" y="154" class="vr-judge-o hot">Inconclusive</text><text x="528" y="244" class="vr-judge-o">Likely AI-Generated</text>'
        + '</svg><ul class="vr-judge-legend">' + layers.map(function (l, i) { return "<li><b>" + l + "</b><span>" + allowed[i] + "</span></li>"; }).join("") + "</ul>";
    }
  })();

  /* ── Access request: honest mailto hand-off ───────────────── */
  var form = document.querySelector("[data-waitlist]");
  if (form) {
    var emailInput = form.querySelector("input[type=email]");
    var formMessage = form.querySelector("[data-msg]");
    if (emailInput && formMessage) {
      if (!formMessage.id) formMessage.id = "vr-wait-status";
      emailInput.setAttribute("aria-describedby", formMessage.id);
      emailInput.addEventListener("input", function () {
        emailInput.removeAttribute("aria-invalid");
        formMessage.textContent = "";
        formMessage.className = "vr-wait-msg";
      });
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var email = emailInput.value.trim();
        emailInput.value = email;
        if (!email || !emailInput.validity.valid) {
          emailInput.setAttribute("aria-invalid", "true");
          formMessage.textContent = "Please enter a valid email address.";
          formMessage.className = "vr-wait-msg err";
          emailInput.focus();
          return;
        }
        emailInput.setAttribute("aria-invalid", "false");
        formMessage.textContent = "Email draft opened; send it to complete your request.";
        formMessage.className = "vr-wait-msg ok";
        var subject = encodeURIComponent("Corpus AI early access request");
        var message = encodeURIComponent("Please add me to the Corpus AI by Verifyco early-access list.\n\nEmail: " + email + "\nSector: \nThe file type that costs us the most time: ");
        window.location.href = "mailto:support@verifyco.app?subject=" + subject + "&body=" + message;
      });
    }
  }
})();
