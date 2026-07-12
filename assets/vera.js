/* ════════════════════════════════════════════════════════════
   VERIFYCO — vera.js
   Vera research page. Zero dependencies: IntersectionObserver
   reveals, a typed simulated-conversation engine, and the
   mobile menu. All motion honours prefers-reduced-motion.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Nav solid state ──────────────────────────────────────── */
  var nav = document.getElementById("nav");
  function navState() { nav.classList.toggle("is-solid", window.scrollY > 8); }
  window.addEventListener("scroll", navState, { passive: true });
  navState();

  /* ── Mobile menu (no-GSAP path, mirrors site.js behaviour) ── */
  var burger = document.querySelector("[data-burger]");
  var menu = document.querySelector("[data-mmenu]");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var opening = !document.body.classList.contains("menu-open");
      document.body.classList.toggle("menu-open");
      if (opening) {
        menu.querySelectorAll(".mlink").forEach(function (l) {
          l.style.opacity = 1; l.style.transform = "none";
        });
        var foot = menu.querySelector(".mmenu-foot");
        if (foot) foot.style.opacity = 1;
      }
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("menu-open"); });
    });
  }

  /* ── Hero word entrance ───────────────────────────────────── */
  var hero = document.querySelector(".vr-hero");
  if (hero) requestAnimationFrame(function () { hero.classList.add("in"); });

  /* ── 3D deck: pointer parallax + device tilt (rAF-throttled) ─ */
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
      var px = (e.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
      var py = (e.clientY - r.top) / r.height - 0.5;
      tx = BX - py * 12; ty = BY + px * 20;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    stage.addEventListener("pointerleave", function () {
      tx = BX; ty = BY; if (!raf) raf = requestAnimationFrame(loop);
    });
  }

  /* ── Scroll reveals ───────────────────────────────────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
  document.querySelectorAll(".v-rv, .vr-arch, .vr-road").forEach(function (el) { io.observe(el); });

  /* ══════════════════════════════════════════════════════════
     Simulated conversation
     Hard-coded script — Vera is in training; this is a preview
     of the report format, not a live model.
     ══════════════════════════════════════════════════════════ */
  var chat = document.getElementById("vr-chat");
  if (!chat) return;

  var FILE_CHIP =
    '<span class="vr-file"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">' +
    '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none"/></svg>' +
    "press_statement.mp4 · 00:41</span>";

  var LAYERS = [
    ["C2PA PROVENANCE", "none found"],
    ["METADATA", "re-encoded ×2"],
    ["NEURAL · DEEPDETECT+", "anomaly 0.83"],
    ["TEMPORAL", "desync 3f"],
    ["FREQUENCY", "GAN ridge"],
    ["AUDIO", "clean"]
  ];

  function layersHTML() {
    return (
      '<div class="vr-layers">' +
      LAYERS.map(function (l) {
        return (
          '<span class="vr-layer"><span class="tick"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2"><path d="M1.5 5.5l2.5 2.5 4.5-5"/></svg></span>' +
          l[0] + '<span class="ln"></span><span class="st">' + l[1] + "</span></span>"
        );
      }).join("") +
      "</div>"
    );
  }

  var FRAMES = [
    { cap: "FRAME 112", box: "left:38%;top:52%;width:26%;height:24%;" },
    { cap: "FRAME 141", box: "left:40%;top:50%;width:27%;height:26%;" },
    { cap: "FRAME 178", box: "left:36%;top:53%;width:26%;height:23%;" }
  ];
  function framesHTML() {
    return (
      '<div class="vr-frames">' +
      FRAMES.map(function (f) {
        return (
          '<figure class="vr-frame"><span class="sil"></span><span class="box" style="' + f.box + '"></span>' +
          '<span class="an">JAWLINE 0.83</span><figcaption class="cap">' + f.cap + "</figcaption></figure>"
        );
      }).join("") +
      "</div>"
    );
  }

  /* Script steps.
     type:"u"  → user bubble (slides in)
     type:"a"  → Vera bubble (typed character by character; `html` after typing)
     pre/post  → extra HTML injected before/after the typed text            */
  var SCRIPT = [
    { type: "u", html: FILE_CHIP + "<div>Is this statement real?</div>" },
    {
      type: "a",
      text: "Running 6 evidence layers…",
      post: layersHTML(),
      afterLayers: true
    },
    {
      type: "a",
      typed:
        "<b>Provenance:</b> no C2PA credentials — common for social exports, <i>not</i> proof of fakery. " +
        "<b>Metadata:</b> re-encoded twice. " +
        "<b>Neural (DeepDetect+):</b> face-region anomaly <span class=\"warn\">0.83</span> around the jawline, frames 112–178. " +
        "<b>Temporal:</b> lip-sync drifts <span class=\"warn\">3 frames</span> behind audio in two segments. " +
        "<b>Frequency:</b> GAN-typical spectral ridge detected."
    },
    {
      type: "a",
      pre:
        '<div class="vr-meter"><span class="num">27<small>/100</small></span>' +
        '<span class="track"><span class="fill"></span></span>' +
        '<span class="lab">LIKELY MANIPULATED</span></div>',
      typed:
        "<b>Assessment:</b> the strongest evidence is the audio-visual desync combined with the jawline boundary. " +
        "Want me to show the frames?"
    },
    { type: "u", html: "<div>Show me.</div>" },
    {
      type: "a",
      typed: "Here are the three frames where the boundary artefact peaks — the dashed region is what DeepDetect+ flagged:",
      post: framesHTML()
    }
  ];

  var playing = false;
  var timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function bubble(step) {
    var wrap = document.createElement("div");
    wrap.className = "vr-msg vr-msg--" + (step.type === "u" ? "u" : "a");
    wrap.innerHTML =
      '<div class="vr-msg-who">' + (step.type === "u" ? "You" : "Vera · simulated") + "</div>" +
      '<div class="vr-bubble"></div>';
    chat.appendChild(wrap);
    return wrap;
  }
  function show(el) { requestAnimationFrame(function () { el.classList.add("on"); }); }

  /* Type rich HTML by walking its text nodes so tags never break. */
  function typeHTML(target, html, done) {
    if (reduceMotion) { target.insertAdjacentHTML("beforeend", html); done(); return; }
    var tpl = document.createElement("template");
    tpl.innerHTML = html;
    var caret = document.createElement("span");
    caret.className = "vr-caret";
    target.appendChild(caret);

    function walk(srcParent, dstParent, next) {
      var nodes = Array.prototype.slice.call(srcParent.childNodes);
      var i = 0;
      (function step() {
        if (i >= nodes.length) { next(); return; }
        var n = nodes[i++];
        if (n.nodeType === 3) {
          var text = n.textContent, j = 0;
          var t = document.createTextNode("");
          dstParent.insertBefore(t, dstParent === target ? caret : null);
          (function tick() {
            var burst = 2 + ((Math.random() * 2) | 0);
            t.textContent = text.slice(0, (j += burst));
            if (j < text.length) later(tick, 14);
            else step();
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
    var rows = msg.querySelectorAll(".vr-layer");
    var i = 0;
    (function next() {
      if (i >= rows.length) { later(done, 250); return; }
      rows[i++].classList.add("on");
      later(next, reduceMotion ? 0 : 340);
    })();
  }

  function play() {
    if (playing) return;
    playing = true;
    clearTimers();
    chat.innerHTML = "";
    var i = 0;

    (function next() {
      if (i >= SCRIPT.length) { playing = false; return; }
      var step = SCRIPT[i++];
      var msg = bubble(step);
      var body = msg.querySelector(".vr-bubble");
      show(msg);

      if (step.type === "u") {
        body.innerHTML = step.html;
        later(next, reduceMotion ? 0 : 750);
        return;
      }
      var typed = step.typed || step.text || "";
      var startType = function () {
        if (step.pre) body.insertAdjacentHTML("beforeend", step.pre);
        typeHTML(body, typed, function () {
          if (step.post) body.insertAdjacentHTML("beforeend", step.post);
          if (step.afterLayers) revealLayers(msg, next);
          else later(next, reduceMotion ? 0 : 550);
        });
      };
      if (reduceMotion) { startType(); return; }
      // show a typing indicator before Vera answers
      var typingEl = document.createElement("div");
      typingEl.className = "vr-typing";
      typingEl.innerHTML = "<i></i><i></i><i></i>";
      body.appendChild(typingEl);
      later(function () { typingEl.remove(); startType(); }, 720);
    })();
  }

  /* Start when the console scrolls into view; replay on demand. */
  var console_ = document.querySelector(".vr-console");
  var chatIO = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) { chatIO.disconnect(); play(); }
  }, { threshold: 0.25 });
  chatIO.observe(console_);

  var replay = document.querySelector("[data-replay]");
  if (replay) replay.addEventListener("click", function () { playing = false; play(); });

  /* ── Waitlist (mailto fallback — no backend on this static site) ── */
  var form = document.querySelector("[data-waitlist]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.querySelector("input").value.trim();
      if (!email) return;
      var subject = encodeURIComponent("Vera Waitlist");
      var body = encodeURIComponent("Please add me to the Vera waitlist.\n\nEmail: " + email);
      window.location.href = "mailto:support@verifyco.info?subject=" + subject + "&body=" + body;
      form.closest(".vr-wait").classList.add("sent");
    });
  }
})();
