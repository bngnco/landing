/* ════════════════════════════════════════════════════════════
   VERIFYCO — vera.js
   Vera by Verifyco research page. Zero dependencies.
   IntersectionObserver reveals, a typed illustrative-conversation
   engine, a deterministic "Ask the evidence" demo, 3D deck
   parallax, the mobile menu and the preview form. All motion
   honours prefers-reduced-motion; all content survives no-JS.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Gate the hidden reveal states on JS being present (no-JS shows everything).
  document.documentElement.classList.add("vera-ready");

  /* ── Nav solid state ──────────────────────────────────────── */
  var nav = document.getElementById("nav");
  function navState() { if (nav) nav.classList.toggle("is-solid", window.scrollY > 8); }
  window.addEventListener("scroll", navState, { passive: true });
  navState();

  /* ── Scroll cue hides once the visitor scrolls ────────────── */
  var cue = document.querySelector(".vr-scrollcue");
  if (cue) {
    window.addEventListener("scroll", function once() {
      if (window.scrollY > 40) { cue.classList.add("hide"); window.removeEventListener("scroll", once); }
    }, { passive: true });
  }

  /* ── Mobile menu ──────────────────────────────────────────── */
  var burger = document.querySelector("[data-burger]");
  var menu = document.querySelector("[data-mmenu]");
  if (burger && menu) {
    function setMenu(open) {
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        menu.querySelectorAll(".mlink").forEach(function (l) { l.style.opacity = 1; l.style.transform = "none"; });
        var foot = menu.querySelector(".mmenu-foot");
        if (foot) foot.style.opacity = 1;
      }
    }
    burger.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
    // Close on: a link, the ✕ button, a tap on the empty backdrop, or Escape.
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.closest("[data-mclose]") || e.target === menu || e.target.tagName === "NAV") setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) setMenu(false);
    });
  }

  /* ── Hero word entrance ───────────────────────────────────── */
  var hero = document.querySelector(".vr-hero");
  if (hero) requestAnimationFrame(function () { hero.classList.add("in"); });

  /* ── 3D deck: pointer parallax (rAF-throttled, fine pointers) ─ */
  var deck = document.querySelector("[data-deck]");
  var stage = document.querySelector("[data-tilt]");
  if (deck && stage && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    var BX = 7, BY = -21, tx = BX, ty = BY, cx = BX, cy = BY, raf = 0;
    function loop() {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      deck.style.setProperty("--rx", cx.toFixed(2) + "deg");
      deck.style.setProperty("--ry", cy.toFixed(2) + "deg");
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(loop) : 0;
    }
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      tx = BX - py * 12; ty = BY + px * 20;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    stage.addEventListener("pointerleave", function () { tx = BX; ty = BY; if (!raf) raf = requestAnimationFrame(loop); });
  }

  /* ── Scroll reveals ───────────────────────────────────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
  document.querySelectorAll(".v-rv, .vr-arch").forEach(function (el) { io.observe(el); });

  /* ── Pause continuous animations in off-screen sections ──────
     Only the section on screen keeps compositing — big win for
     scroll smoothness and battery on a long, animated page. */
  var animRoots = [hero].concat(Array.prototype.slice.call(document.querySelectorAll(".sec"))).filter(Boolean);
  var visIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { en.target.classList.toggle("vr-off", !en.isIntersecting); });
  }, { rootMargin: "120px 0px 120px 0px" });
  animRoots.forEach(function (el) { visIO.observe(el); });
  document.addEventListener("visibilitychange", function () {
    animRoots.forEach(function (el) { el.classList.toggle("vr-off", document.hidden); });
  });

  /* ══════════════════════════════════════════════════════════
     E · "Ask the evidence" — deterministic, honest sample data.
     Not connected to a live model; Vera is in training.
     ══════════════════════════════════════════════════════════ */
  (function ask() {
    var body = document.getElementById("vr-ans-body");
    if (!body) return;
    var chips = Array.prototype.slice.call(document.querySelectorAll(".vr-chip-q"));
    var enodes = document.querySelectorAll(".vr-enode");
    var confEl = document.querySelector("[data-conf]");
    var usedEl = document.querySelector("[data-used]");
    var uncEl = document.querySelector("[data-unc]");
    var nextEl = document.querySelector("[data-next]");

    var DATA = {
      flag: {
        html: "Three signals contributed. <b>Neural (DeepDetect+)</b> found a face-region anomaly near the jawline, and <b>frequency</b> analysis shows a GAN-typical ridge. <b>Temporal</b> lip-sync drifts about <span class=\"warn\">3 frames</span> behind the audio. One signal is strong, one is contextual, and provenance stays <span class=\"warn\">inconclusive</span>.",
        conf: "Confidence: moderate", hit: ["neural", "freq", "temporal"], against: [],
        used: "Neural · Frequency · Temporal", unc: "No C2PA provenance — common for social exports, not proof of fakery.", next: "Find the original source to compare."
      },
      strong: {
        html: "The <b>neural face-region anomaly</b> (0.83) combined with the <b>audio-visual desync</b> is the strongest thread — two independent layers pointing the same way. Frequency supports it; metadata only shows re-encoding, which is weak on its own.",
        conf: "Confidence: moderate–high", hit: ["neural", "temporal"], against: [],
        used: "Neural · Temporal (corroborating)", unc: "Re-encoding can also come from ordinary platform compression.", next: "Inspect frames 112–178 where the anomaly peaks."
      },
      against: {
        html: "A few things argue the other way. The <b class=\"ok\">audio track is clean</b> with no splice artefacts, lighting is broadly consistent, and re-encoding alone is expected for any shared file. Absence of C2PA is <span class=\"ok\">not</span> evidence of fakery.",
        conf: "Confidence: keep open", hit: [], against: ["audio"],
        used: "Audio · Metadata (context)", unc: "Clean audio doesn't rule out a visual-only manipulation.", next: "Weigh the visual signals against a verified original."
      },
      next: {
        html: "Two steps. First, <b>reverse-search for the original</b> — this copy was re-encoded twice, so provenance is stripped. Second, <b>examine frames 112–178</b> at the jawline where the boundary artefact peaks. If an untouched source exists, compare directly.",
        conf: "Confidence: n/a — next steps", hit: ["meta", "neural"], against: [],
        used: "Metadata · Neural", unc: "Some manipulations leave no recoverable original.", next: "Reverse image/video search, then frame inspection."
      }
    };

    function select(key, btn) {
      var d = DATA[key];
      if (!d) return;
      chips.forEach(function (c) { c.classList.toggle("is-on", c === btn); c.setAttribute("aria-pressed", c === btn ? "true" : "false"); });
      body.innerHTML = d.html;
      if (confEl) confEl.textContent = d.conf;
      if (usedEl) usedEl.textContent = d.used;
      if (uncEl) uncEl.textContent = d.unc;
      if (nextEl) nextEl.textContent = d.next;
      enodes.forEach(function (n) {
        var k = n.getAttribute("data-node");
        n.classList.toggle("is-hit", d.hit.indexOf(k) > -1);
        n.classList.toggle("is-against", d.against.indexOf(k) > -1);
      });
    }

    chips.forEach(function (btn) {
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", function () { select(btn.getAttribute("data-q"), btn); });
    });
    // Preselect the first question so the panel is never empty.
    if (chips.length) select(chips[0].getAttribute("data-q"), chips[0]);
  })();

  /* ══════════════════════════════════════════════════════════
     D · Illustrative conversation + chapter-beat highlighting
     ══════════════════════════════════════════════════════════ */
  var chat = document.getElementById("vr-chat");
  if (!chat) return;

  var beats = document.querySelectorAll(".vr-beats li");
  function setBeat(i) {
    if (i == null) return;
    beats.forEach(function (b) { b.classList.toggle("is-active", +b.getAttribute("data-beat") === i); });
  }

  // A realistic media attachment card — a video thumbnail with a face,
  // play control, duration and file facts, the way a person would share it.
  var MEDIA_CARD =
    '<div class="vr-att">' +
      '<span class="vr-att-thumb" aria-hidden="true">' +
        '<span class="vr-att-scene"></span><span class="vr-att-face"></span>' +
        '<span class="vr-att-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>' +
        '<span class="vr-att-dur">0:41</span>' +
      "</span>" +
      '<span class="vr-att-meta"><b>press_statement.mp4</b>' +
        '<span>1080×1920 · 8.4&nbsp;MB · shared clip</span></span>' +
    "</div>";

  var LAYERS = [
    ["C2PA PROVENANCE", "none found"], ["METADATA", "re-encoded ×2"], ["NEURAL · DEEPDETECT+", "anomaly 0.83"],
    ["TEMPORAL", "desync 3f"], ["FREQUENCY", "GAN ridge"], ["AUDIO", "clean"]
  ];
  function layersHTML() {
    return '<div class="vr-layers">' + LAYERS.map(function (l) {
      return '<span class="vr-layer"><span class="tick"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2"><path d="M1.5 5.5l2.5 2.5 4.5-5"/></svg></span>' +
        l[0] + '<span class="ln"></span><span class="st">' + l[1] + "</span></span>";
    }).join("") + "</div>";
  }

  var FRAMES = [
    { cap: "FRAME 112", box: "left:38%;top:52%;width:26%;height:24%;" },
    { cap: "FRAME 141", box: "left:40%;top:50%;width:27%;height:26%;" },
    { cap: "FRAME 178", box: "left:36%;top:53%;width:26%;height:23%;" }
  ];
  function framesHTML() {
    return '<div class="vr-frames">' + FRAMES.map(function (f) {
      return '<figure class="vr-frame"><span class="sil"></span><span class="box" style="' + f.box + '"></span>' +
        '<span class="an">JAWLINE 0.83</span><figcaption class="cap">' + f.cap + "</figcaption></figure>";
    }).join("") + "</div>";
  }

  var SCRIPT = [
    { type: "u", beat: 0, html: MEDIA_CARD + "<div>Someone forwarded me this clip of the minister. Can you check if it's actually real?</div>" },
    { type: "a", beat: 1, text: "Of course — give me a moment. I'll read all six evidence layers across the video and the audio.", post: layersHTML(), afterLayers: true },
    { type: "a", beat: 2, typed:
      "Here's what stood out. <b>Provenance:</b> no C2PA credentials — that's common for social exports, so <i>not</i> proof of fakery on its own. " +
      "<b>Metadata:</b> the file was re-encoded twice. " +
      "<b>Neural (DeepDetect+):</b> a face-region anomaly of <span class=\"warn\">0.83</span> around the jawline, frames 112–178. " +
      "<b>Temporal:</b> the lip-sync drifts <span class=\"warn\">3 frames</span> behind the audio in two segments. " +
      "<b>Frequency:</b> a GAN-typical spectral ridge is present." },
    { type: "a", beat: 2, pre:
      '<div class="vr-meter"><span class="num">27<small>/100</small></span>' +
      '<span class="track"><span class="fill"></span></span><span class="lab">LIKELY MANIPULATED</span></div>',
      typed: "So my read: the strongest thread is the audio-visual desync lining up with that jawline boundary — two independent layers agreeing. Want me to show you exactly where?" },
    { type: "u", beat: 3, html: "<div>Yes please — show me where.</div>" },
    { type: "a", beat: 4, typed: "Here are the three frames where the artefact peaks. The dashed region is what DeepDetect+ flagged — notice how the jawline edge doesn't quite settle:", post: framesHTML() }
  ];

  var playing = false, timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function bubble(step) {
    var wrap = document.createElement("div");
    wrap.className = "vr-msg vr-msg--" + (step.type === "u" ? "u" : "a");
    wrap.innerHTML = '<div class="vr-msg-who">' + (step.type === "u" ? "You" : "Vera · illustrative") + "</div><div class=\"vr-bubble\"></div>";
    chat.appendChild(wrap);
    return wrap;
  }
  function show(el) { requestAnimationFrame(function () { el.classList.add("on"); scrollChat(); }); }
  // Keep the newest message pinned to the bottom of the console — inside
  // the chat box only, so the page itself never scrolls during playback.
  function scrollChat() { if (chat) chat.scrollTop = chat.scrollHeight; }

  function typeHTML(target, html, done) {
    if (reduceMotion) { target.insertAdjacentHTML("beforeend", html); done(); return; }
    var tpl = document.createElement("template");
    tpl.innerHTML = html;
    var caret = document.createElement("span");
    caret.className = "vr-caret";
    target.appendChild(caret);
    function walk(srcParent, dstParent, next) {
      var nodes = Array.prototype.slice.call(srcParent.childNodes), i = 0;
      (function step() {
        if (i >= nodes.length) { next(); return; }
        var n = nodes[i++];
        if (n.nodeType === 3) {
          var text = n.textContent, j = 0, t = document.createTextNode("");
          dstParent.insertBefore(t, dstParent === target ? caret : null);
          (function tick() {
            var burst = 2 + ((Math.random() * 2) | 0);
            t.textContent = text.slice(0, (j += burst));
            scrollChat();
            if (j < text.length) later(tick, 14); else step();
          })();
        } else {
          var clone = n.cloneNode(false);
          dstParent.insertBefore(clone, dstParent === target ? caret : null);
          walk(n, clone, step);
        }
      })();
    }
    walk(tpl.content, target, function () { caret.remove(); done(); });
  }

  function revealLayers(msg, done) {
    var rows = msg.querySelectorAll(".vr-layer"), i = 0;
    (function next() {
      if (i >= rows.length) { later(done, 250); return; }
      rows[i++].classList.add("on"); scrollChat();
      later(next, reduceMotion ? 0 : 340);
    })();
  }

  function play() {
    if (playing) return;
    playing = true; clearTimers(); chat.innerHTML = ""; setBeat(0);
    var i = 0;
    (function next() {
      if (i >= SCRIPT.length) { playing = false; return; }
      var step = SCRIPT[i++];
      if (step.beat != null) setBeat(step.beat);
      var msg = bubble(step);
      var el = msg.querySelector(".vr-bubble");
      show(msg);
      if (step.type === "u") { el.innerHTML = step.html; later(next, reduceMotion ? 0 : 750); return; }
      var typed = step.typed || step.text || "";
      var startType = function () {
        if (step.pre) { el.insertAdjacentHTML("beforeend", step.pre); scrollChat(); }
        typeHTML(el, typed, function () {
          if (step.post) { el.insertAdjacentHTML("beforeend", step.post); scrollChat(); }
          if (step.afterLayers) revealLayers(msg, next); else later(next, reduceMotion ? 0 : 550);
        });
      };
      if (reduceMotion) { startType(); return; }
      var t = document.createElement("div");
      t.className = "vr-typing"; t.innerHTML = "<i></i><i></i><i></i>";
      el.appendChild(t);
      later(function () { t.remove(); startType(); }, 720);
    })();
  }

  var console_ = document.querySelector(".vr-console");
  if (console_) {
    var chatIO = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { chatIO.disconnect(); play(); }
    }, { threshold: 0.2 });
    chatIO.observe(console_);
  }
  var replay = document.querySelector("[data-replay]");
  if (replay) replay.addEventListener("click", function () { playing = false; play(); });

  /* ── Preview form (mailto fallback + real validation states) ── */
  var form = document.querySelector("[data-waitlist]");
  if (form) {
    var input = form.querySelector("input[type=email]");
    var msg = form.querySelector("[data-msg]");
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (input.value || "").trim();
      if (!valid.test(email)) {
        msg.textContent = "Please enter a valid email address.";
        msg.className = "vr-wait-msg err";
        input.focus();
        return;
      }
      msg.textContent = "";
      msg.className = "vr-wait-msg";
      var subject = encodeURIComponent("Vera preview access request");
      var b = encodeURIComponent("Please add me to the Vera by Verifyco preview list.\n\nEmail: " + email);
      window.location.href = "mailto:support@verifyco.info?subject=" + subject + "&body=" + b;
      form.closest(".vr-wait").classList.add("sent");
    });
  }
})();
