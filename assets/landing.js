/* ============================================================
   Verifyco landing — interaction script (GSAP-powered)
   - Cinematic 5-act splash via GSAP timeline
   - Scroll-triggered reveals + parallax
   - Language switcher with persistence
   - Live tracker scene rotation
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "verifyco_lang";
  const RTL_CODES = new Set(["ar"]);

  // ---- Language switcher --------------------------------------------------

  function detectLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && window.VERIFYCO_I18N[saved]) return saved;
    const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
    if (window.VERIFYCO_I18N[browser]) return browser;
    return "en";
  }

  function applyLang(code) {
    const lang = window.VERIFYCO_I18N[code] ? code : "en";
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_CODES.has(lang) ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const html = window.VERIFYCO_TR(lang, key);
      el.innerHTML = html;
    });

    const langBtn = document.querySelector("[data-lang-current]");
    if (langBtn) {
      const meta = window.VERIFYCO_LANGS.find((l) => l.code === lang);
      langBtn.textContent = meta ? meta.code.toUpperCase() : "EN";
    }

    document.querySelectorAll("[data-lang-option]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.langOption === lang);
    });

    // Notify listeners (e.g. legal pages) that language changed
    document.dispatchEvent(new CustomEvent("verifyco:lang", { detail: { lang } }));
  }

  function buildLangMenu() {
    const menu = document.querySelector("[data-lang-menu]");
    if (!menu) return;
    menu.innerHTML = window.VERIFYCO_LANGS.map((l) =>
      `<button type="button" data-lang-option="${l.code}">
        <span>${l.native}</span>
        <span class="lang__code">${l.code}</span>
      </button>`
    ).join("");
    menu.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyLang(btn.dataset.langOption);
        document.querySelector(".lang")?.classList.remove("is-open");
      });
    });
  }

  function wireLangToggle() {
    const wrap = document.querySelector(".lang");
    const btn = wrap?.querySelector(".lang__btn");
    if (!wrap || !btn) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      wrap.classList.toggle("is-open");
    });
    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) wrap.classList.remove("is-open");
    });
  }

  // ---- Stamp animation utility -------------------------------------------

  function buildStamp(el) {
    if (!el) return null;
    const text = el.dataset.text || el.textContent;
    el.innerHTML = "";
    const cuts = el.dataset.cuts ? el.dataset.cuts.split("|") : [text];
    const chars = [];
    cuts.forEach((segText, segIdx) => {
      const isItalic = (segIdx === cuts.length - 1) && cuts.length > 1;
      const wrap = isItalic ? document.createElement("em") : document.createElement("span");
      [...segText].forEach((ch) => {
        const span = document.createElement("span");
        span.className = el.classList.contains("splash__wordmark") ? "splash__char" : "stamp__char";
        span.textContent = ch === " " ? "\u00A0" : ch;
        wrap.appendChild(span);
        chars.push(span);
      });
      el.appendChild(wrap);
    });
    return chars;
  }

  // ---- Premium GSAP splash (~3.5s) ---------------------------------------

  function runSplash() {
    const splash = document.getElementById("splash");
    if (!splash) return;
    document.documentElement.classList.add("splash-locked");
    splash.addEventListener("click", () => dismiss(), { once: true });

    const stampEl = splash.querySelector("[data-splash-stamp]");
    const chars = buildStamp(stampEl);
    const hasGSAP = typeof window.gsap !== "undefined";

    function dismiss() {
      if (hasGSAP) {
        gsap.to(splash, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            document.documentElement.classList.remove("splash-locked");
            splash.remove();
          },
        });
      } else {
        splash.style.transition = "opacity 600ms ease";
        splash.style.opacity = 0;
        setTimeout(() => {
          document.documentElement.classList.remove("splash-locked");
          splash.remove();
        }, 700);
      }
    }

    if (!hasGSAP) {
      setTimeout(() => {
        const brand = splash.querySelector(".splash__brand");
        if (brand) brand.style.opacity = 1;
        if (stampEl) stampEl.classList.add("is-revealed");
      }, 400);
      setTimeout(dismiss, 3400);
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => setTimeout(dismiss, 200),
    });

    // Bronze top + bottom lines slice across
    tl.to(".splash__hline--top",    { width: "70%", duration: 0.55, ease: "power3.inOut" }, 0)
      .to(".splash__hline--bottom", { width: "70%", duration: 0.55, ease: "power3.inOut" }, 0.05)
      .to(".splash__grid",          { opacity: 1, duration: 0.8 }, 0.1);

    // Top/bottom readout strips fade in
    tl.to([".splash__topbar", ".splash__bottombar"], { opacity: 1, duration: 0.4 }, 0.5);

    // Brand container appears
    tl.to(".splash__brand", { opacity: 1, duration: 0.3 }, 0.5);

    // Icon scales in with overshoot
    tl.to(".splash__icon", {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.9,
      ease: "back.out(1.4)",
    }, 0.6);

    // Wordmark chars stagger in
    if (chars && chars.length) {
      tl.to(chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        stagger: 0.05,
        ease: "power3.out",
      }, 1.2);
    }

    // Tagline fades in
    tl.to(".splash__tagline", { opacity: 1, duration: 0.5 }, 1.8);

    // Subtle icon glow pulse
    tl.to(".splash__icon", {
      boxShadow: "0 36px 80px -16px rgba(188,142,100,0.7), 0 0 0 1px rgba(214,172,134,0.30), 0 0 120px rgba(188,142,100,0.45)",
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
    }, 2.4);

    // Hold ~0.4s
    tl.to({}, { duration: 0.4 });
  }

  // Counter
  function animateNumber(el, from, to, duration) {
    if (!el) return;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(from + (to - from) * e).toString().padStart(2, "0");
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ---- Reveal-on-scroll (GSAP ScrollTrigger when available) --------------

  function setupReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      els.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    } else if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
        { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
      );
      els.forEach((el) => io.observe(el));
    } else {
      els.forEach((el) => el.classList.add("is-in"));
    }
  }

  // ---- Hero parallax (subtle mouse-tilt on icon + phone) -----------------

  function setupHeroParallax() {
    if (!window.gsap) return;
    const hero = document.querySelector(".hero");
    const icon = document.querySelector(".hero__icon");
    const phone = document.querySelector(".hero__phone-stack");
    const rings = document.querySelector(".hero__rings svg");
    if (!hero) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = null;
    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5..0.5
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
      if (!raf) loop();
    });
    hero.addEventListener("mouseleave", () => {
      targetX = 0; targetY = 0;
      if (!raf) loop();
    });

    function loop() {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      if (icon)  gsap.set(icon,  { x: curX * 24, y: curY * 16 });
      if (phone) gsap.set(phone, { x: curX * -14, y: curY * -8 });
      if (rings) gsap.set(rings, { x: curX * 32, y: curY * 22 });
      if (Math.abs(targetX - curX) > 0.001 || Math.abs(targetY - curY) > 0.001) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    }
  }

  // ---- Sticky nav scroll state -------------------------------------------

  function wireNavScroll() {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---- Live forensic ticker (rotates SHA) --------------------------------

  function wireScannerTicker() {
    const shaEls = document.querySelectorAll("[data-sha-ticker]");
    if (!shaEls.length) return;
    const hex = "0123456789ABCDEF";
    function pick(n) {
      let s = "";
      for (let i = 0; i < n; i++) s += hex[(Math.random() * 16) | 0];
      return s;
    }
    const tick = () => {
      shaEls.forEach((el) => { el.textContent = pick(4) + "…" + pick(4); });
    };
    tick();
    setInterval(tick, 1800);
  }

  // ---- Boot ---------------------------------------------------------------

  function boot() {
    runSplash();
    buildLangMenu();
    wireLangToggle();
    wireNavScroll();
    setupReveal();
    setupHeroParallax();
    wireScannerTicker();
    applyLang(detectLang());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
