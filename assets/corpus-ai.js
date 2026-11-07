/* ════════════════════════════════════════════════════════════
   VERIFYCO — corpus-ai.js
   Behaviour layer for the Corpus AI page: navigation, reveals,
   the animated eye, the scripted console and the honest mailto
   access form. Static HTML remains the source of truth.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("corpus-ready");

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

  /* ── The eye ──────────────────────────────────────────────── */
  (function mountEye() {
    var canvas = document.querySelector("[data-eye]");
    var stage = canvas && canvas.parentNode;
    if (!canvas || !window.CorpusEye || !canvas.getContext) return;
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
    function setPaused(flag) { if (eye) eye.pause(flag); }
    if ("IntersectionObserver" in window) {
      var eyeVisible = true;
      var eyeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { eyeVisible = entry.isIntersecting; setPaused(document.hidden || !eyeVisible); });
      }, { threshold: 0 });
      eyeObserver.observe(canvas);
      document.addEventListener("visibilitychange", function () { setPaused(document.hidden || !eyeVisible); });
    }
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

  /* ── The scripted console ─────────────────────────────────── */
  (function initialiseConsole() {
    var consoleEl = document.querySelector("[data-console]");
    if (!consoleEl) return;
    var caseList = consoleEl.querySelector("[data-cases]");
    var log = consoleEl.querySelector("[data-log]");
    var askRow = consoleEl.querySelector("[data-ask]");
    var fileName = consoleEl.querySelector("[data-file-name]");
    var fileMeta = consoleEl.querySelector("[data-file-meta]");
    var headline = consoleEl.querySelector("[data-headline]");
    var coverage = consoleEl.querySelector("[data-coverage]");
    var verdict = consoleEl.querySelector("[data-verdict]");
    var layers = consoleEl.querySelector("[data-layers]");
    var replay = consoleEl.querySelector("[data-replay]");

    /* Layer status: ok (agrees), flag (finding), weak (low-confidence), na (could not run). */
    var CASES = [
      {
        id: "protest",
        label: "Protest photo",
        kind: "Forwarded from a chat app",
        file: "protest_photo.jpg",
        meta: "1280 × 960 · JPEG · re-encoded · SHA-256 9c1e…4b07",
        headline: "Inconclusive",
        tone: "inconclusive",
        coverage: "Evidence coverage · 2 of 5 checks ran",
        layers: [
          { name: "Content Credentials", status: "na", text: "Content credentials could not be checked on this file. That is not evidence that none exist." },
          { name: "Metadata Forensics", status: "na", text: "Metadata is not available" },
          { name: "AI Detection", status: "weak", text: "Leans synthetic · low confidence · screenshot-like compression" },
          { name: "Frequency Analysis", status: "flag", text: "Consistent with a second compression pass" },
          { name: "Temporal Consistency", status: "na", text: "Not applicable to a still image" }
        ],
        turns: [
          { q: "A newsroom says a chatbot called this photo fake. What do you see?",
            a: "I see a forwarded copy, not the photo. The file has been re-encoded at least once and every camera field is gone, so two of the five checks could not run. **AI Detection leans synthetic at low confidence, and I would not act on it:** the compression it is reading matches what chat apps do to every image, a pattern my memory holds as a re-encode, not as a generator mark. **Verdict from this file: inconclusive.**" },
          { q: "So is it real or not?",
            a: "This copy cannot answer that, and a sentence from any model would not change the evidence. What would: **the earliest upload of this image, a second photo from the same moment, or the original file from the photographer.** Bring one of those back and I will compare them at full resolution." },
          { q: "What should I write in the fact-check?",
            a: "Say what was checked, what could not be, and why. A line you can defend: **\"A re-encoded copy of the photo was examined; provenance and camera data were unavailable, and the image-level check was inconclusive.\"** That is weaker than a verdict and more honest than one." }
        ]
      },
      {
        id: "clip",
        label: "Press clip",
        kind: "Downloaded from X",
        file: "press_clip.mp4",
        meta: "1280 × 720 · 00:41 · H.264 · SHA-256 4fd8…a21c",
        headline: "Needs a Closer Look",
        tone: "look",
        coverage: "Evidence coverage · 4 of 5 checks ran",
        layers: [
          { name: "Content Credentials", status: "na", text: "No credentials found on this file" },
          { name: "Metadata Forensics", status: "ok", text: "Container labels match a platform re-encode" },
          { name: "AI Detection", status: "ok", text: "No synthetic lean on sampled frames" },
          { name: "Frequency Analysis", status: "ok", text: "Consistent with a platform re-encode" },
          { name: "Temporal Consistency", status: "flag", text: "Experimental · motion discontinuity at 00:23" }
        ],
        turns: [
          { q: "Was this clip edited?",
            a: "Something changes at 00:23. The experimental temporal layer flags a motion discontinuity there: the frame-to-frame change spikes the way a cut does. The visual layer finds no synthetic lean on the sampled frames, and the container labels say the file came through the platform's encoder, which is expected for a download. **So: a cut is likely, generation is not indicated.** A cut can be ordinary editing. I would ask what was removed, not whether the clip is fake." },
          { q: "Can you tell what was cut?",
            a: "Not from this file. **I can tell you where, not what.** Compare it against a longer or earlier upload: if the sentence before 00:23 ends differently in the other copy, you have your answer. I keep the counterevidence in the record as well: clean frames and platform-standard labels." },
          { q: "How sure is the temporal layer?",
            a: "Less sure than the others, and it says so. It is marked experimental in the app and it is the weakest part of the engine today, which is why the 2026 video corpus comes first on the roadmap. **One spike is a reason to look, not a conclusion.**" }
        ]
      },
      {
        id: "claim",
        label: "Claim photo",
        kind: "From the policyholder's phone",
        file: "claim_photo.heic",
        meta: "4032 × 3024 · HEIC · capture credential · SHA-256 b7a0…e913",
        headline: "Likely Authentic",
        tone: "authentic",
        coverage: "Evidence coverage · 4 of 5 checks ran",
        layers: [
          { name: "Content Credentials", status: "ok", text: "Signed capture credential · verified offline against the trust list" },
          { name: "Metadata Forensics", status: "ok", text: "Camera make, model, lens and GPS present · capture 14:02 local" },
          { name: "AI Detection", status: "ok", text: "No synthetic lean" },
          { name: "Frequency Analysis", status: "ok", text: "Consistent with a single capture" },
          { name: "Temporal Consistency", status: "na", text: "Not applicable to a still image" }
        ],
        turns: [
          { q: "Can I rely on this photo for the claim?",
            a: "This is the strongest kind of file I see. It carries a **signed capture credential that verified against the trust list, and the visual reading agrees with it.** Under the engine's own rule, a capture credential counts as authentic evidence only when the visual reading agrees; here it does. The camera fields are complete and the capture time sits forty minutes after the reported incident. One thing to confirm outside the file: that the GPS location matches the address on the claim." },
          { q: "Could a credential be faked?",
            a: "A signature can be copied onto another file; it cannot be created for new pixels without the signer's key. What I guard against is a genuine credential on an image edited after capture. **That is why the visual reading has to agree, and here it does.**" },
          { q: "What would make you change your mind?",
            a: "A second photo of the same damage with a different timestamp, GPS fields that put the phone somewhere else, or a visual finding at the edges of the damaged area. **None of those are present in this file.** I would still have a human look at the damage itself; I read files, not repair costs." }
        ]
      },
      {
        id: "listing",
        label: "Listing image",
        kind: "Marketplace listing",
        file: "IMG_4821.JPG",
        meta: "2304 × 1792 · PNG inside a JPG name · SHA-256 e0c4…77d2",
        headline: "Likely AI-Generated",
        tone: "ai",
        coverage: "Evidence coverage · 4 of 5 checks ran",
        layers: [
          { name: "Content Credentials", status: "flag", text: "Credential present · signed by the generator's maker · declares AI-generated" },
          { name: "Metadata Forensics", status: "weak", text: "No camera fields · expected for a PNG" },
          { name: "AI Detection", status: "flag", text: "Leans synthetic · high confidence" },
          { name: "Frequency Analysis", status: "flag", text: "Pattern consistent with a generator family" },
          { name: "Temporal Consistency", status: "na", text: "Not applicable to a still image" }
        ],
        turns: [
          { q: "The seller says this is a photo of the actual item.",
            a: "The file says otherwise, twice. It carries a **Content Credential signed by the tool that made it, and that credential declares the image as AI-generated.** Independently, the visual layer leans synthetic and the pattern matches a generator family in my memory. The name was changed to look like a camera file; it is still a PNG inside. Names are the easiest field to change." },
          { q: "Could the seller have used AI to clean up a real photo?",
            a: "Then the credential would usually record an edit on top of a capture, and the camera fields would survive. **Here there is no capture underneath: the credential's origin is a generation, and there are no camera fields at all.** Ask the seller for a photo from a phone, with its original file." },
          { q: "What do I tell the buyer?",
            a: "That the listing image is a generated render, declared as such by its own credential, and that no photo of the item has been provided yet. **Keep the file and its hash with the case**; the credential verifies again on any copy that has not been re-saved." }
        ]
      }
    ];

    var current = 0;
    var playing = false;
    var token = 0;
    var started = false;

    function el(tag, className, text) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      if (text != null) node.textContent = text;
      return node;
    }

    function renderCases() {
      caseList.innerHTML = "";
      CASES.forEach(function (c, index) {
        var button = el("button", "vr-case-btn" + (index === current ? " is-on" : ""));
        button.type = "button";
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", index === current ? "true" : "false");
        button.setAttribute("data-index", String(index));
        button.innerHTML = "<b></b><span></span><small></small>";
        button.querySelector("b").textContent = "0" + (index + 1);
        button.querySelector("span").textContent = c.label;
        button.querySelector("small").textContent = c.kind;
        button.addEventListener("click", function () { selectCase(index); });
        caseList.appendChild(button);
      });
    }

    function renderEngine(c) {
      fileName.textContent = c.file;
      fileMeta.textContent = c.meta;
      headline.textContent = c.headline;
      coverage.textContent = c.coverage;
      verdict.className = "vr-verdict tone-" + c.tone;
      layers.innerHTML = "";
      c.layers.forEach(function (layer) {
        var item = el("li", "vr-layer st-" + layer.status);
        item.innerHTML = "<i></i><div><b></b><span></span></div>";
        item.querySelector("b").textContent = layer.name;
        item.querySelector("span").textContent = layer.text;
        layers.appendChild(item);
      });
    }

    /* **bold** segments become <b>; everything else is text. */
    function segments(text) {
      var parts = text.split("**");
      return parts.map(function (part, index) { return { text: part, bold: index % 2 === 1 }; }).filter(function (part) { return part.text.length; });
    }

    function bubble(who) {
      var wrap = el("div", "vr-msg vr-msg--" + who);
      var avatar = el("span", "vr-msg-who", who === "c" ? "C" : "You");
      var content = el("div", "vr-msg-body");
      wrap.appendChild(avatar);
      wrap.appendChild(content);
      log.appendChild(wrap);
      log.scrollTop = log.scrollHeight;
      return content;
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
            if (!node) {
              node = seg.bold ? el("b") : document.createTextNode("");
              content.appendChild(node);
            }
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

    function playPair(pair, myToken) {
      playing = true;
      consoleEl.classList.add("is-playing");
      var user = bubble("u");
      user.textContent = pair.q;
      return wait(reduceMotion ? 0 : 520, myToken).then(function () {
        if (myToken !== token) return;
        var assistant = bubble("c");
        var dots = el("span", "vr-typing");
        dots.innerHTML = "<i></i><i></i><i></i>";
        assistant.appendChild(dots);
        return wait(reduceMotion ? 0 : 760, myToken).then(function () {
          if (myToken !== token) return;
          assistant.removeChild(dots);
          return typeInto(assistant, pair.a, myToken);
        });
      }).then(function () {
        if (myToken !== token) return;
        playing = false;
        consoleEl.classList.remove("is-playing");
      });
    }

    function renderAsk(c, remaining) {
      askRow.innerHTML = "";
      if (!remaining.length) {
        var done = el("span", "vr-ask-done", "End of sample. Pick another case or replay.");
        askRow.appendChild(done);
        return;
      }
      remaining.forEach(function (index) {
        var chip = el("button", "vr-ask-chip");
        chip.type = "button";
        chip.innerHTML = "<i>Ask</i><span></span>";
        chip.querySelector("span").textContent = c.turns[index].q;
        chip.addEventListener("click", function () {
          if (playing) return;
          var myToken = token;
          var rest = remaining.filter(function (i) { return i !== index; });
          askRow.innerHTML = "";
          playPair(c.turns[index], myToken).then(function () { if (myToken === token) renderAsk(c, rest); });
        });
        askRow.appendChild(chip);
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
        button.setAttribute("aria-selected", i === index ? "true" : "false");
      });
      renderEngine(c);
      log.innerHTML = "";
      askRow.innerHTML = "";
      playPair(c.turns[0], myToken).then(function () {
        if (myToken !== token) return;
        renderAsk(c, c.turns.map(function (t, i) { return i; }).slice(1));
      });
    }

    renderCases();
    renderEngine(CASES[0]);
    replay.addEventListener("click", function () { selectCase(current); });

    function start() {
      if (started) return;
      started = true;
      selectCase(0);
    }
    if (reduceMotion || !("IntersectionObserver" in window)) start();
    else {
      var consoleObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) { start(); consoleObserver.disconnect(); } });
      }, { threshold: 0.25 });
      consoleObserver.observe(consoleEl);
      window.setTimeout(start, 9000);
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
