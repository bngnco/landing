/* ════════════════════════════════════════════════════════════
   VERIFYCO — site.js (Fable redesign)
   GSAP 3.13 + ScrollTrigger + Lenis · i18n · hero · menus
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var LANG_KEY = "verifyco_lang";
  var RTL = { ar: true };
  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var hasGSAP = false;

  /* ── i18n ─────────────────────────────────────────────── */
  function detectLang() {
    // 1) Honour an explicit choice the visitor made before.
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved && window.VERIFYCO_I18N[saved]) return saved;
    } catch (e) {}
    // 2) Otherwise auto-select from the visitor's locale preferences,
    //    walking the full ordered list the browser/region exposes.
    var prefs = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || "en"];
    for (var i = 0; i < prefs.length; i++) {
      var code = (prefs[i] || "").slice(0, 2).toLowerCase();
      if (code && window.VERIFYCO_I18N[code]) return code;
    }
    return "en";
  }

  function applyLang(code) {
    if (!window.VERIFYCO_I18N) return;
    var lang = window.VERIFYCO_I18N[code] ? code : "en";
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    doc.lang = lang;
    doc.dir = RTL[lang] ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.innerHTML = window.VERIFYCO_TR(lang, el.getAttribute("data-i18n"));
    });

    var cur = document.querySelector("[data-lang-current]");
    if (cur) cur.textContent = lang.toUpperCase();

    document.querySelectorAll("[data-lang-option]").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-lang-option") === lang);
    });
  }

  function buildLangUIs() {
    if (!window.VERIFYCO_LANGS) return;
    var menu = document.querySelector("[data-lang-menu]");
    var cloud = document.querySelector("[data-lang-cloud]");
    var mob = document.querySelector("[data-mmenu-langs]");

    window.VERIFYCO_LANGS.forEach(function (l) {
      if (menu) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("data-lang-option", l.code);
        b.setAttribute("role", "option");
        b.innerHTML = "<span>" + l.native + "</span><span class=\"cd\">" + l.code + "</span>";
        b.addEventListener("click", function () {
          applyLang(l.code);
          document.querySelector("[data-lang]").classList.remove("open");
        });
        menu.appendChild(b);
      }
      if (cloud) {
        var c = document.createElement("button");
        c.type = "button";
        c.setAttribute("data-lang-option", l.code);
        c.textContent = l.native;
        c.addEventListener("click", function () { applyLang(l.code); });
        cloud.appendChild(c);
      }
      if (mob) {
        var m = document.createElement("button");
        m.type = "button";
        m.setAttribute("data-lang-option", l.code);
        m.textContent = l.code.toUpperCase();
        m.addEventListener("click", function () { applyLang(l.code); });
        mob.appendChild(m);
      }
    });

    var wrap = document.querySelector("[data-lang]");
    if (wrap) {
      var btn = wrap.querySelector(".lang-btn");
      var sync = function () {
        btn.setAttribute("aria-expanded", wrap.classList.contains("open") ? "true" : "false");
      };
      sync();
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        wrap.classList.toggle("open");
        sync();
      });
      document.addEventListener("click", function (e) {
        if (!wrap.contains(e.target)) { wrap.classList.remove("open"); sync(); }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && wrap.classList.contains("open")) {
          wrap.classList.remove("open"); sync(); btn.focus();
        }
      });
    }
  }

  /* ── Word splitter (keeps .hl spans) ──────────────────── */
  function splitWords(el) {
    var inners = [];
    function process(node, hl) {
      var out = document.createDocumentFragment();
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { out.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span");
            w.className = "w";
            var wi = document.createElement("span");
            wi.className = "wi" + (hl ? " hl" : "");
            wi.textContent = part;
            w.appendChild(wi);
            out.appendChild(w);
            inners.push(wi);
          });
        } else if (child.nodeType === 1) {
          out.appendChild(process(child, child.classList.contains("hl") || hl));
        }
      });
      return out;
    }
    var frag = process(el, false);
    el.innerHTML = "";
    el.appendChild(frag);
    return inners;
  }

  /* ── Hero entrance ────────────────────────────────────── */
  function heroIn() {
    if (!hasGSAP) { doc.classList.add("no-anim"); return; }

    // Respect reduced-motion: present the hero instantly, no entrance tween.
    // (CSS reveals these elements for the reduced-motion case.)
    if (reduceMotion) { doc.classList.add("hero-ready"); return; }

    doc.classList.add("hero-ready");

    var title = document.querySelector("[data-hero-title]");
    var words = title ? splitWords(title) : [];

    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from("#nav", { y: -28, opacity: 0, duration: 0.7 }, 0);
    if (words.length) {
      tl.to(words, { y: 0, duration: 0.95, stagger: 0.07, ease: "power4.out" }, 0.08);
    }
    tl.fromTo("[data-hero-el]",
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.3)
      .fromTo("[data-hero-ph]",
        { opacity: 0, y: 90, rotateY: -22, rotateZ: -4 },
        { opacity: 1, y: 0, rotateY: -8, rotateZ: -1.6, duration: 1.25, ease: "power4.out" }, 0.35)
      .fromTo("[data-chip]",
        { opacity: 0, scale: 0.7, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(2)", stagger: 0.14 }, 0.95)
      .fromTo(".scroll-cue", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.4);

    // looping scanline on the hero phone — animate transform (composited),
    // not `top`, which would relayout/repaint the clipped phone every frame.
    if (!reduceMotion) {
      gsap.fromTo("[data-scan]",
        { yPercent: 0 },
        {
          yPercent: 515,
          duration: 2.6,
          ease: "none",
          repeat: -1,
          repeatDelay: 2.0,
          delay: 1.6
        });
      // slow float
      gsap.to("[data-hero-ph]", {
        y: -12,
        duration: 3.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 2.0
      });
    }
  }

  /* ── Scroll effects ───────────────────────────────────── */
  function scrollFX() {
    if (!hasGSAP || !window.ScrollTrigger) { doc.classList.add("no-anim"); return; }
    gsap.registerPlugin(ScrollTrigger);

    // reveals
    gsap.utils.toArray("[data-rv]").forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onStart: function () {
            if (el.classList.contains("sig-row")) el.classList.add("lit");
          }
        });
    });

    // parallax phones (desktop only)
    if (window.matchMedia("(min-width: 861px)").matches && !reduceMotion) {
      gsap.utils.toArray("[data-speed]").forEach(function (el) {
        var sp = parseFloat(el.getAttribute("data-speed")) || 0;
        gsap.to(el, {
          y: sp * 420,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest(".sec") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });
      });

      // hero phone gentle parallax out
      gsap.to(".hero-stage", {
        y: 70,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 }
      });
    }

    // nav solid state
    ScrollTrigger.create({
      start: 8,
      onUpdate: function (self) {
        document.getElementById("nav").classList.toggle("is-solid", self.scroll() > 8);
      }
    });
    document.getElementById("nav").classList.toggle("is-solid", window.scrollY > 8);

    // stat scramble
    var GLYPHS = "0123456789ABCDEF·-";
    gsap.utils.toArray("[data-scramble]").forEach(function (el) {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: function () {
          var final = el.textContent;
          var t = { p: 0 };
          gsap.to(t, {
            p: 1,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: function () {
              var n = Math.floor(final.length * t.p);
              var s = final.slice(0, n);
              for (var i = n; i < final.length; i++) {
                s += final[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
              }
              el.textContent = s;
            },
            onComplete: function () { el.textContent = final; }
          });
        }
      });
    });

    // refresh once images settle
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  }

  /* ── Lenis smooth scroll ──────────────────────────────── */
  var lenis = null;
  function smoothScroll() {
    if (typeof Lenis === "undefined" || reduceMotion || !finePointer || !hasGSAP) return;
    lenis = new Lenis({ lerp: 0.115, wheelMultiplier: 1.0 });
    lenis.on("scroll", function () { if (window.ScrollTrigger) ScrollTrigger.update(); });
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  function anchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        closeMenu();
        var top = target.getBoundingClientRect().top + window.scrollY - 70;
        if (lenis) lenis.scrollTo(top, { duration: 1.15 });
        else window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
  }

  /* ── Mobile menu ──────────────────────────────────────── */
  function closeMenu() { document.body.classList.remove("menu-open"); }

  function mobileMenu() {
    var burger = document.querySelector("[data-burger]");
    var menu = document.querySelector("[data-mmenu]");
    if (!burger || !menu) return;

    burger.addEventListener("click", function () {
      var opening = !document.body.classList.contains("menu-open");
      document.body.classList.toggle("menu-open");
      if (opening && hasGSAP) {
        gsap.fromTo(".mmenu .mlink",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power3.out", delay: 0.12 });
        gsap.fromTo(".mmenu-foot",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, delay: 0.42 });
      } else if (opening) {
        menu.querySelectorAll(".mlink").forEach(function (l) { l.style.opacity = 1; l.style.transform = "none"; });
        menu.querySelector(".mmenu-foot").style.opacity = 1;
      }
    });

    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ── Active section → nav link ────────────────────────── */
  function activeNav() {
    if (!("IntersectionObserver" in window)) return;
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav-links a[href^="#"]')
    );
    var map = [];
    links.forEach(function (a) {
      var sec = document.querySelector(a.getAttribute("href"));
      if (sec) map.push({ a: a, sec: sec });
    });
    if (!map.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        for (var i = 0; i < map.length; i++) {
          map[i].a.classList.toggle("is-here", map[i].sec === en.target);
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    map.forEach(function (m) { io.observe(m.sec); });
  }

  /* ── Magnetic buttons ─────────────────────────────────── */
  function magnets() {
    if (!finePointer || reduceMotion || !hasGSAP) return;
    document.querySelectorAll("[data-magnet]").forEach(function (el) {
      var xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      var yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.18);
        yTo((e.clientY - r.top - r.height / 2) * 0.3);
      });
      el.addEventListener("pointerleave", function () { xTo(0); yTo(0); });
    });
  }

  /* ── Boot ─────────────────────────────────────────────── */
  function boot() {
    hasGSAP = typeof window.gsap !== "undefined";

    buildLangUIs();
    applyLang(detectLang());
    mobileMenu();
    anchors();
    smoothScroll();
    scrollFX();
    magnets();
    activeNav();

    // No splash — the page is interactive immediately; the hero simply
    // animates in on load.
    heroIn();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
