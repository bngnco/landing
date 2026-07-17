/* Verifyco marketing site — dependency-free interaction layer. */
(function () {
  "use strict";

  var LANG_KEY = "verifyco_lang";
  var RTL = { ar: true };
  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function detectLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved && window.VERIFYCO_I18N && window.VERIFYCO_I18N[saved]) return saved;
    } catch (error) {}

    var prefs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];
    for (var i = 0; i < prefs.length; i += 1) {
      var code = (prefs[i] || "").slice(0, 2).toLowerCase();
      if (code && window.VERIFYCO_I18N && window.VERIFYCO_I18N[code]) return code;
    }
    return "en";
  }

  function applyLang(code) {
    if (!window.VERIFYCO_I18N || !window.VERIFYCO_TR) return;
    var lang = window.VERIFYCO_I18N[code] ? code : "en";
    try { localStorage.setItem(LANG_KEY, lang); } catch (error) {}

    doc.lang = lang;
    doc.dir = RTL[lang] ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      element.innerHTML = window.VERIFYCO_TR(lang, element.getAttribute("data-i18n"));
    });

    var current = document.querySelector("[data-lang-current]");
    if (current) current.textContent = lang.toUpperCase();
    document.querySelectorAll("[data-lang-option]").forEach(function (button) {
      var selected = button.getAttribute("data-lang-option") === lang;
      button.classList.toggle("on", selected);
      button.setAttribute("aria-selected", selected ? "true" : "false");
    });
  }

  function buildLangUIs() {
    if (!window.VERIFYCO_LANGS) return;
    var menu = document.querySelector("[data-lang-menu]");
    var cloud = document.querySelector("[data-lang-cloud]");
    var mobile = document.querySelector("[data-mmenu-langs]");

    window.VERIFYCO_LANGS.forEach(function (language) {
      function choose() {
        applyLang(language.code);
        var wrap = document.querySelector("[data-lang]");
        if (wrap) wrap.classList.remove("open");
      }

      if (menu) {
        var option = document.createElement("button");
        option.type = "button";
        option.setAttribute("data-lang-option", language.code);
        option.setAttribute("role", "option");
        option.innerHTML = "<span>" + language.native + "</span><span class=\"cd\">" + language.code + "</span>";
        option.addEventListener("click", choose);
        menu.appendChild(option);
      }
      if (cloud) {
        var cloudOption = document.createElement("button");
        cloudOption.type = "button";
        cloudOption.setAttribute("data-lang-option", language.code);
        cloudOption.textContent = language.native;
        cloudOption.addEventListener("click", choose);
        cloud.appendChild(cloudOption);
      }
      if (mobile) {
        var mobileOption = document.createElement("button");
        mobileOption.type = "button";
        mobileOption.setAttribute("data-lang-option", language.code);
        mobileOption.textContent = language.code.toUpperCase();
        mobileOption.addEventListener("click", choose);
        mobile.appendChild(mobileOption);
      }
    });

    var wrap = document.querySelector("[data-lang]");
    if (!wrap) return;
    var trigger = wrap.querySelector(".lang-btn");
    function setOpen(open) {
      wrap.classList.toggle("open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }
    setOpen(false);
    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      setOpen(!wrap.classList.contains("open"));
    });
    document.addEventListener("click", function (event) {
      if (!wrap.contains(event.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && wrap.classList.contains("open")) {
        setOpen(false);
        trigger.focus();
      }
    });
  }

  var burger;
  var mobileMenu;
  var menuReturnFocus;

  function setMobileMenu(open) {
    if (!burger || !mobileMenu) return;
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");

    mobileMenu.querySelectorAll(".mlink").forEach(function (link, index) {
      link.style.opacity = open ? "1" : "";
      link.style.transform = open ? "none" : "";
      link.style.transitionDelay = open ? (80 + index * 35) + "ms" : "0ms";
    });
    var foot = mobileMenu.querySelector(".mmenu-foot");
    if (foot) {
      foot.style.opacity = open ? "1" : "";
      foot.style.transitionDelay = open ? "220ms" : "0ms";
    }

    if (open) {
      menuReturnFocus = document.activeElement;
      var first = mobileMenu.querySelector("a, button");
      if (first) requestAnimationFrame(function () { first.focus(); });
    } else if (menuReturnFocus && menuReturnFocus.focus) {
      menuReturnFocus.focus();
      menuReturnFocus = null;
    }
  }

  function setupMobileMenu() {
    burger = document.querySelector("[data-burger]");
    mobileMenu = document.querySelector("[data-mmenu]");
    if (!burger || !mobileMenu) return;

    burger.setAttribute("aria-controls", "mobile-menu");
    mobileMenu.id = "mobile-menu";
    setMobileMenu(false);
    burger.addEventListener("click", function () {
      setMobileMenu(!document.body.classList.contains("menu-open"));
    });
    mobileMenu.addEventListener("click", function (event) {
      if (event.target.closest("a") || event.target === mobileMenu) setMobileMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && document.body.classList.contains("menu-open")) setMobileMenu(false);
      if (event.key !== "Tab" || !document.body.classList.contains("menu-open")) return;
      var focusable = Array.prototype.slice.call(mobileMenu.querySelectorAll("a[href], button:not([disabled])"));
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }

  function setupAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (event) {
        var id = anchor.getAttribute("href");
        if (!id || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        setMobileMenu(false);
        var top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
        if (history.replaceState) history.replaceState(null, "", id);
      });
    });
  }

  function setupNavState() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var scheduled = false;
    function update() {
      nav.classList.toggle("is-solid", window.scrollY > 8);
      scheduled = false;
    }
    update();
    window.addEventListener("scroll", function () {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
  }

  function setupReveals() {
    var elements = Array.prototype.slice.call(document.querySelectorAll("[data-rv]"));
    if (!elements.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
        if (element.classList.contains("sig-row")) element.classList.add("lit");
      });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        if (entry.target.classList.contains("sig-row")) entry.target.classList.add("lit");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -7% 0px", threshold: 0.04 });
    elements.forEach(function (element) { observer.observe(element); });
  }

  function setupNavDropdown() {
    var drop = document.querySelector("[data-navdrop]");
    if (!drop) return;
    var trigger = drop.querySelector(".navdrop-btn");
    function setOpen(open) {
      drop.classList.toggle("open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }
    setOpen(false);
    // Hover opens/closes on fine pointers; click only ever OPENS (a click
    // right after pointerenter must not toggle the menu straight back shut).
    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      setOpen(true);
    });
    drop.addEventListener("pointerenter", function () { setOpen(true); });
    drop.addEventListener("pointerleave", function () { setOpen(false); });
    document.addEventListener("click", function (event) {
      if (!drop.contains(event.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && drop.classList.contains("open")) {
        setOpen(false);
        trigger.focus();
      }
    });
  }

  function setupActiveNav() {
    if (!("IntersectionObserver" in window)) return;
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
    var items = links.map(function (link) {
      return { link: link, section: document.querySelector(link.getAttribute("href")) };
    }).filter(function (item) { return item.section; });
    if (!items.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        items.forEach(function (item) {
          item.link.classList.toggle("is-here", item.section === entry.target);
        });
      });
    }, { rootMargin: "-42% 0px -52% 0px", threshold: 0 });
    items.forEach(function (item) { observer.observe(item.section); });
  }

  function setupPricing() {
    var switcher = document.querySelector("[data-price-switch]");
    if (!switcher) return;
    var buttons = Array.prototype.slice.call(switcher.querySelectorAll(".ps-btn"));
    var glider = switcher.querySelector(".ps-glider");

    buttons.forEach(function (button) {
      var tab = button.getAttribute("data-ptab");
      button.id = "pricing-tab-" + tab;
      button.setAttribute("aria-controls", "pricing-panel-" + tab);
      var panel = document.querySelector('[data-ppanel="' + tab + '"]');
      if (panel) {
        panel.id = "pricing-panel-" + tab;
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", button.id);
      }
    });

    function move(button) {
      if (!glider || !button) return;
      glider.style.width = button.offsetWidth + "px";
      glider.style.transform = "translateX(" + button.offsetLeft + "px)";
    }
    function select(tab) {
      var selected;
      buttons.forEach(function (button) {
        var on = button.getAttribute("data-ptab") === tab;
        button.classList.toggle("is-on", on);
        button.setAttribute("aria-selected", on ? "true" : "false");
        button.tabIndex = on ? 0 : -1;
        if (on) selected = button;
      });
      document.querySelectorAll("[data-ppanel]").forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-ppanel") !== tab;
      });
      document.querySelectorAll("[data-ppanel-note]").forEach(function (note) {
        note.hidden = note.getAttribute("data-ppanel-note") !== tab;
      });
      requestAnimationFrame(function () { move(selected); });
    }
    buttons.forEach(function (button, index) {
      button.addEventListener("click", function () { select(button.getAttribute("data-ptab")); });
      button.addEventListener("keydown", function (event) {
        var nextIndex = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % buttons.length;
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + buttons.length) % buttons.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = buttons.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        select(buttons[nextIndex].getAttribute("data-ptab"));
        buttons[nextIndex].focus();
      });
    });
    select((switcher.querySelector(".ps-btn.is-on") || buttons[0]).getAttribute("data-ptab"));
    var resizeFrame;
    window.addEventListener("resize", function () {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(function () { move(switcher.querySelector(".ps-btn.is-on")); });
    }, { passive: true });
  }

  function setupScreenViewer() {
    var dialog = document.querySelector("[data-screen-dialog]");
    if (!dialog) return;
    var image = dialog.querySelector("[data-screen-image]");
    var caption = dialog.querySelector("[data-screen-caption]");
    var close = dialog.querySelector("[data-screen-close]");
    var returnFocus;

    document.querySelectorAll("[data-screen-src]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        image.src = trigger.getAttribute("data-screen-src");
        image.alt = trigger.getAttribute("data-screen-title") || "Verifyco interface preview";
        caption.textContent = trigger.getAttribute("data-screen-title") || "Verifyco interface";
        returnFocus = trigger;
        if (dialog.showModal) dialog.showModal();
        else dialog.setAttribute("open", "");
      });
    });
    function closeDialog() {
      if (dialog.close) dialog.close();
      else dialog.removeAttribute("open");
      if (returnFocus) returnFocus.focus();
    }
    close.addEventListener("click", closeDialog);
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeDialog();
    });
  }

  function setupAmbientWork() {
    var roots = Array.prototype.slice.call(document.querySelectorAll(".hero, .mq, [data-dd-visual], .vera-teaser"));
    if (!("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-ambient-paused", !entry.isIntersecting || document.hidden);
        if (entry.isIntersecting && entry.target.hasAttribute("data-dd-visual")) {
          entry.target.classList.add("is-active");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "140px 0px", threshold: 0 });
    roots.forEach(function (root) { observer.observe(root); });
    document.addEventListener("visibilitychange", function () {
      roots.forEach(function (root) { root.classList.toggle("is-ambient-paused", document.hidden); });
    });
  }

  function startHero() {
    var hero = document.querySelector(".hero");
    if (hero) requestAnimationFrame(function () { hero.classList.add("hero-ready"); });
    var ufo = document.querySelector("[data-ufo]");
    if (!ufo || reduceMotion) return;
    var launch = function () { ufo.classList.add("is-flying"); };
    if ("requestIdleCallback" in window) requestIdleCallback(launch, { timeout: 1300 });
    else window.setTimeout(launch, 700);
  }

  function boot() {
    buildLangUIs();
    applyLang(detectLang());
    setupMobileMenu();
    setupAnchors();
    setupNavState();
    setupReveals();
    setupActiveNav();
    setupNavDropdown();
    setupPricing();
    setupScreenViewer();
    setupAmbientWork();
    startHero();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
