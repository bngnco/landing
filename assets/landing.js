/* Legacy/static Verifyco pages — dependency-free, low-work interaction layer. */
(function () {
  "use strict";

  var STORAGE_KEY = "verifyco_lang";
  var RTL = { ar: true };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function detectLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && window.VERIFYCO_I18N && window.VERIFYCO_I18N[saved]) return saved;
    } catch (error) {}
    var preferences = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    for (var i = 0; i < preferences.length; i += 1) {
      var code = (preferences[i] || "").slice(0, 2).toLowerCase();
      if (window.VERIFYCO_I18N && window.VERIFYCO_I18N[code]) return code;
    }
    return "en";
  }

  function applyLang(code) {
    if (!window.VERIFYCO_I18N || !window.VERIFYCO_TR) return;
    var lang = window.VERIFYCO_I18N[code] ? code : "en";
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (error) {}
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL[lang] ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      element.innerHTML = window.VERIFYCO_TR(lang, element.getAttribute("data-i18n"));
    });
    var current = document.querySelector("[data-lang-current]");
    if (current) current.textContent = lang.toUpperCase();
    document.querySelectorAll("[data-lang-option]").forEach(function (button) {
      var selected = button.getAttribute("data-lang-option") === lang;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", selected ? "true" : "false");
    });
    document.dispatchEvent(new CustomEvent("verifyco:lang", { detail: { lang: lang } }));
  }

  function setupLanguages() {
    var menu = document.querySelector("[data-lang-menu]");
    if (menu && window.VERIFYCO_LANGS) {
      window.VERIFYCO_LANGS.forEach(function (language) {
        var button = document.createElement("button");
        button.type = "button";
        button.setAttribute("data-lang-option", language.code);
        button.setAttribute("role", "option");
        button.innerHTML = "<span>" + language.native + "</span><span class=\"lang__code\">" + language.code + "</span>";
        button.addEventListener("click", function () {
          applyLang(language.code);
          var wrap = document.querySelector(".lang");
          if (wrap) wrap.classList.remove("is-open");
        });
        menu.appendChild(button);
      });
    }

    var wrap = document.querySelector(".lang");
    var trigger = wrap && wrap.querySelector(".lang__btn");
    if (wrap && trigger) {
      function setOpen(open) {
        wrap.classList.toggle("is-open", open);
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
      }
      setOpen(false);
      trigger.addEventListener("click", function (event) {
        event.stopPropagation();
        setOpen(!wrap.classList.contains("is-open"));
      });
      document.addEventListener("click", function (event) { if (!wrap.contains(event.target)) setOpen(false); });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && wrap.classList.contains("is-open")) { setOpen(false); trigger.focus(); }
      });
    }
    applyLang(detectLang());
  }

  function setupNav() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    var scheduled = false;
    function update() {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
      scheduled = false;
    }
    update();
    window.addEventListener("scroll", function () {
      if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  function setupReveals() {
    var elements = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!elements.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach(function (element) { element.classList.add("is-in"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: .05, rootMargin: "0px 0px -7% 0px" });
    elements.forEach(function (element) { observer.observe(element); });
  }

  function setupAmbientPause() {
    if (!("IntersectionObserver" in window)) return;
    var roots = Array.prototype.slice.call(document.querySelectorAll(".hero, .ddx-hero, .section"));
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-offscreen", !entry.isIntersecting || document.hidden);
        entry.target.querySelectorAll("svg").forEach(function (svg) {
          try {
            if ((!entry.isIntersecting || document.hidden) && svg.pauseAnimations) svg.pauseAnimations();
            else if (svg.unpauseAnimations) svg.unpauseAnimations();
          } catch (error) {}
        });
      });
    }, { rootMargin: "130px 0px", threshold: 0 });
    roots.forEach(function (root) { observer.observe(root); });
    document.addEventListener("visibilitychange", function () {
      roots.forEach(function (root) { root.classList.toggle("is-offscreen", document.hidden); });
    });
  }

  function dismissSplash() {
    var splash = document.getElementById("splash");
    if (!splash) return;
    document.documentElement.classList.remove("splash-locked");
    splash.remove();
  }

  function setupStaticReadouts() {
    document.querySelectorAll("[data-sha-ticker]").forEach(function (element, index) {
      element.textContent = index % 2 ? "A91C…7E42" : "4FD8…A21C";
    });
  }

  function boot() {
    dismissSplash();
    setupLanguages();
    setupNav();
    setupReveals();
    setupAmbientPause();
    setupStaticReadouts();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
