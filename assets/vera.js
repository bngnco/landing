/* ════════════════════════════════════════════════════════════
   VERIFYCO — vera.js
   Small, dependency-free behaviour layer for the Vera preview.
   Static HTML remains the source of truth; JavaScript adds
   navigation, progressive reveals and deterministic sample data.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("vera-ready");

  /* ── Scroll state (one rAF-throttled listener) ───────────── */
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

  /* ── Accessible mobile navigation ────────────────────────── */
  var burger = document.querySelector("[data-burger]");
  var menu = document.querySelector("[data-mmenu]");

  if (burger && menu) {
    var menuId = menu.id || "vera-mobile-menu";
    var lastFocused = null;
    var lockedScrollY = 0;
    var previousBodyOverflow = "";
    var previousBodyPaddingRight = "";
    var previousRootOverflow = "";
    var menuOpen = false;
    var focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");

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

      if (restoreFocus !== false && lastFocused && typeof lastFocused.focus === "function" && document.contains(lastFocused)) {
        lastFocused.focus();
      }
      lastFocused = null;
    }

    burger.addEventListener("click", function () {
      setMenu(!menuOpen, true);
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenu(false, false);
        return;
      }
      if (event.target.closest("[data-mclose]") || event.target === menu) setMenu(false, true);
    });

    document.addEventListener("keydown", function (event) {
      if (!menuOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setMenu(false, true);
        return;
      }

      if (event.key !== "Tab") return;

      var items = [burger].concat(visibleMenuItems());
      if (!items.length) {
        event.preventDefault();
        menu.focus();
        return;
      }

      var first = items[0];
      var last = items[items.length - 1];
      var active = document.activeElement;

      if (event.shiftKey && (active === first || items.indexOf(active) === -1)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    });

    var desktopQuery = window.matchMedia("(min-width: 1201px)");
    var closeAtDesktop = function (event) {
      if (event.matches && menuOpen) setMenu(false, true);
    };
    if (typeof desktopQuery.addEventListener === "function") desktopQuery.addEventListener("change", closeAtDesktop);
    else if (typeof desktopQuery.addListener === "function") desktopQuery.addListener(closeAtDesktop);
  }

  /* ── Hero entrance + progressive section reveals ─────────── */
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
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });

    revealItems.forEach(function (element) { revealObserver.observe(element); });
  }

  /* ── Pause CSS animation outside the viewport or hidden tab ─ */
  var animationRoots = [hero].concat(Array.prototype.slice.call(document.querySelectorAll(".sec"))).filter(Boolean);
  var rootVisibility = new WeakMap();

  function updateAnimationState(element) {
    var outsideViewport = rootVisibility.get(element) === false;
    element.classList.toggle("vr-off", document.hidden || outsideViewport);
  }

  if ("IntersectionObserver" in window) {
    var animationObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        rootVisibility.set(entry.target, entry.isIntersecting);
        updateAnimationState(entry.target);
      });
    }, { rootMargin: "120px 0px 120px 0px", threshold: 0 });

    animationRoots.forEach(function (element) {
      rootVisibility.set(element, false);
      element.classList.add("vr-off");
      animationObserver.observe(element);
    });
  } else {
    animationRoots.forEach(function (element) { rootVisibility.set(element, true); });
  }

  document.addEventListener("visibilitychange", function () {
    body.classList.toggle("vr-off", document.hidden);
    animationRoots.forEach(updateAnimationState);
  });

  /* ── Ask the evidence: deterministic illustrative states ─── */
  (function initialiseEvidencePanel() {
    var answer = document.getElementById("vr-ans-body");
    if (!answer) return;

    var chips = Array.prototype.slice.call(document.querySelectorAll(".vr-chip-q"));
    var evidenceNodes = document.querySelectorAll(".vr-enode");
    var support = document.querySelector("[data-conf]");
    var used = document.querySelector("[data-used]");
    var uncertainty = document.querySelector("[data-unc]");
    var nextCheck = document.querySelector("[data-next]");

    var states = {
      flag: {
        html: "<b>[E-03] Neural</b> marks a face-region boundary in frames 112–178. <b>[E-04] Temporal</b> finds audio-visual drift in the same interval, while <b>[E-06] Frequency</b> adds contextual support. <b>Counterevidence:</b> <span class=\"ok\">[E-05] Audio</span> contains no detected splice artefact. Together these signals justify review, not a final authenticity verdict.",
        support: "Evidence support: moderate",
        hit: ["neural", "temporal", "freq"],
        against: ["audio"],
        used: "[E-03] Neural · [E-04] Temporal · [E-06] Frequency",
        uncertainty: "[E-01] No C2PA record was found; absence of provenance is not evidence of manipulation.",
        next: "Next check — obtain the earliest available source and compare frames 112–178."
      },
      strong: {
        html: "The strongest corroboration is between <b>[E-03] Neural</b> and <b>[E-04] Temporal</b>: independent layers point to the same segment. <b>[E-06] Frequency</b> supports that lead but is not decisive by itself. <b>Counterevidence:</b> <span class=\"ok\">[E-05] Audio</span> remains internally consistent.",
        support: "Evidence support: converging",
        hit: ["neural", "temporal"],
        against: ["audio"],
        used: "[E-03] Neural · [E-04] Temporal; [E-06] contextual",
        uncertainty: "The sample is re-encoded, so compression may amplify or imitate some visual artefacts.",
        next: "Next check — inspect the cited segment against a verified original, frame by frame."
      },
      against: {
        html: "Several observations keep the case open. <b class=\"ok\">[E-05] Audio</b> shows no detected splice artefact; <b class=\"ok\">[E-02] Metadata</b> is consistent with ordinary platform re-encoding; and missing <b class=\"ok\">[E-01] C2PA</b> credentials do not imply fakery. These are counterevidence, not proof of authenticity.",
        support: "Evidence support: mixed",
        hit: [],
        against: ["c2pa", "meta", "audio"],
        used: "[E-05] Audio · [E-02] Metadata · [E-01] C2PA",
        uncertainty: "Clean audio does not rule out visual-only manipulation, and re-encoding limits provenance checks.",
        next: "Next check — weigh the counterevidence against [E-03] and [E-04] using a verified source."
      },
      next: {
        html: "Start with provenance: locate the earliest copy and check whether <b>[E-01] C2PA</b> credentials or a source hash exist. Then examine the segment cited by <b>[E-03] Neural</b> and <b>[E-04] Temporal</b>. <b>Counterevidence:</b> retain <span class=\"ok\">[E-05] Audio</span> in the record so the review does not over-weight one modality.",
        support: "Action: verify the source",
        hit: ["c2pa", "neural", "temporal"],
        against: ["audio"],
        used: "[E-01] C2PA · [E-03] Neural · [E-04] Temporal",
        uncertainty: "A verified original may not exist; if it cannot be found, the examination should remain inconclusive.",
        next: "Next check — source search, provenance verification, then targeted frame comparison."
      }
    };

    function selectState(key, selectedButton) {
      var state = states[key];
      if (!state) return;

      chips.forEach(function (chip) {
        var selected = chip === selectedButton;
        chip.classList.toggle("is-on", selected);
        chip.setAttribute("aria-pressed", selected ? "true" : "false");
      });

      answer.innerHTML = state.html;
      if (support) support.textContent = state.support;
      if (used) used.textContent = state.used;
      if (uncertainty) uncertainty.textContent = state.uncertainty;
      if (nextCheck) nextCheck.textContent = state.next;

      evidenceNodes.forEach(function (node) {
        var keyName = node.getAttribute("data-node");
        node.classList.toggle("is-hit", state.hit.indexOf(keyName) !== -1);
        node.classList.toggle("is-against", state.against.indexOf(keyName) !== -1);
      });
    }

    chips.forEach(function (chip, index) {
      chip.setAttribute("aria-pressed", chip.classList.contains("is-on") ? "true" : "false");
      chip.addEventListener("click", function () {
        selectState(chip.getAttribute("data-q"), chip);
      });
      chip.addEventListener("keydown", function (event) {
        var targetIndex = null;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") targetIndex = (index + 1) % chips.length;
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") targetIndex = (index - 1 + chips.length) % chips.length;
        if (event.key === "Home") targetIndex = 0;
        if (event.key === "End") targetIndex = chips.length - 1;
        if (targetIndex === null) return;
        event.preventDefault();
        chips[targetIndex].focus();
      });
    });
  })();

  /* ── Preview request: honest mailto hand-off ─────────────── */
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

        var subject = encodeURIComponent("Vera preview access request");
        var message = encodeURIComponent("Please add me to the Vera by Verifyco preview list.\n\nEmail: " + email);
        window.location.href = "mailto:support@verifyco.app?subject=" + subject + "&body=" + message;
      });
    }
  }
})();
