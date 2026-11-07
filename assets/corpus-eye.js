/* ════════════════════════════════════════════════════════════
   VERIFYCO — corpus-eye.js
   The Corpus AI "big eye": an iris built from thousands of memory
   tiles, drawn on a canvas. Deterministic (seeded noise), no
   dependencies. Used by the Corpus AI page, the homepage splash
   and the banner renderer.

   window.CorpusEye.render(canvas, options) -> draws one frame
   window.CorpusEye.mount(canvas, options)  -> animates; returns
     { stop(), pause(flag), setDilation(d), state }
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* Seeded value noise: smooth, repeatable, cheap. */
  function makeNoise(seed) {
    var SIZE = 256;
    var perm = new Uint8Array(SIZE * 2);
    var s = seed >>> 0 || 1;
    function rnd() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
    var base = [];
    for (var i = 0; i < SIZE; i += 1) base.push(i);
    for (var j = SIZE - 1; j > 0; j -= 1) { var k = Math.floor(rnd() * (j + 1)); var t = base[j]; base[j] = base[k]; base[k] = t; }
    for (var m = 0; m < SIZE * 2; m += 1) perm[m] = base[m % SIZE];
    function hash(x, y) { return perm[(perm[x & 255] + (y & 255)) & 255] / 255; }
    function fade(t) { return t * t * (3 - 2 * t); }
    return function noise(x, y) {
      var xi = Math.floor(x), yi = Math.floor(y);
      var xf = x - xi, yf = y - yi;
      var a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
      var u = fade(xf), v = fade(yf);
      return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
    };
  }

  function mix(a, b, t) { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }
  function lerpColor(c1, c2, t) { return [Math.round(mix(c1[0], c2[0], t)), Math.round(mix(c1[1], c2[1], t)), Math.round(mix(c1[2], c2[2], t))]; }

  /* Iris palette: umber rim, bronze body, cream collarette, ice memory cells. */
  var PALETTE = {
    rim: [28, 17, 10],
    deep: [74, 44, 24],
    bronze: [188, 142, 100],
    bright: [232, 201, 164],
    cream: [247, 230, 205],
    ice: [159, 196, 218],
    iceBright: [226, 241, 250],
    pupil: [3, 4, 7]
  };

  /* Build the static tile list once per size: radial fibers, crypts, cells.
     Tiles start inside the resting pupil radius so the pupil can contract. */
  function buildTiles(S, seed) {
    var noise = makeNoise(seed || 7);
    var noise2 = makeNoise((seed || 7) + 101);
    var noise3 = makeNoise((seed || 7) + 211);
    var R = S * 0.47;
    var P = S * 0.185;
    var tileLen = Math.max(3, S / 58);
    var ringGap = tileLen * 0.66;
    var tiles = [];
    var cells = [];
    var inner = P * 0.78;
    var rings = Math.floor((R - inner - tileLen * 0.3) / ringGap);
    for (var ri = 0; ri < rings; ri += 1) {
      var r = inner + tileLen * 0.4 + ri * ringGap;
      var f = clamp((r - P) / (R - P), 0, 1); /* 0 at resting pupil, 1 at rim */
      var circ = 2 * Math.PI * r;
      var tileW = Math.max(1.2, S / 210) * (0.8 + 0.5 * f);
      var count = Math.floor(circ / (tileW * 1.7));
      var offset = noise3(ri * 0.77, 3);
      for (var ti = 0; ti < count; ti += 1) {
        var a = ((ti + offset) / count) * Math.PI * 2;
        var fiber = noise(Math.cos(a) * 11 + 50, Math.sin(a) * 11 + 50);
        var fine = noise2(a * 9.5 + 2, f * 3.1 + 1);
        var crypt = noise2(Math.cos(a) * 3.4 + f * 2.8 + 9, Math.sin(a) * 3.4 + 9);
        var furrow = noise3(Math.cos(a) * 5.5 + 20, Math.sin(a) * 5.5 + 20);
        var jitter = (noise(ti * 0.37 + ri * 11.3, ri * 0.9) - 0.5) * tileLen * 0.45;
        var aj = (noise3(ti * 1.7, ri * 0.31) - 0.5) * (tileW * 0.9 / r);
        var bright = 0.40 + fiber * 0.62 + (fine - 0.5) * 0.42 - Math.pow(crypt, 2.4) * 0.6 - (furrow < 0.22 ? 0.25 : 0);
        var collar = Math.exp(-Math.pow((f - 0.14 - fine * 0.05) / 0.16, 2)) * 0.55;
        var midDark = Math.exp(-Math.pow((f - 0.5) / 0.22, 2)) * 0.12;
        var rimDark = Math.pow(f, 3.4) * 0.95;
        bright = clamp(bright + collar - midDark - rimDark, 0, 1.15);
        var col;
        if (f > 0.88) col = lerpColor(PALETTE.deep, PALETTE.rim, (f - 0.88) / 0.12);
        else if (bright > 0.95) col = lerpColor(PALETTE.bright, PALETTE.cream, clamp((bright - 0.95) / 0.2, 0, 1));
        else if (bright > 0.62) col = lerpColor(PALETTE.bronze, PALETTE.bright, (bright - 0.62) / 0.33);
        else col = lerpColor(PALETTE.deep, PALETTE.bronze, bright / 0.62);
        var alpha = clamp(0.5 + bright * 0.55, 0.3, 1);
        var len = tileLen * (0.7 + fine * 0.8);
        tiles.push({ a: a + aj, r: r + jitter, w: tileW, l: len, col: col, alpha: alpha, d: f * 0.7 + noise3(ti * 0.13, ri * 0.7) * 0.3, fly: S * (0.25 + noise2(ti * 0.3, ri) * 0.45), spin: (noise(ti * 0.11, ri * 0.19) - 0.5) * 0.9 });
        var isCell = noise(ti * 1.91 + 3, ri * 2.73 + 7) > 0.935 && f > 0.06 && f < 0.9;
        if (isCell) cells.push({ a: a + aj, r: r + jitter, w: tileW * 0.9, l: len * 1.1, phase: noise(ti, ri) * Math.PI * 2, speed: 0.5 + noise2(ti, ri) * 1.3 });
      }
    }
    return { R: R, P: P, tiles: tiles, cells: cells, tileLen: tileLen };
  }

  function drawTile(ctx, cx, cy, t, fill) {
    var x = cx + Math.cos(t.a) * t.r;
    var y = cy + Math.sin(t.a) * t.r;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(t.a);
    ctx.fillStyle = fill;
    ctx.fillRect(-t.l / 2, -t.w / 2, t.l, t.w);
    ctx.restore();
  }

  /* Static layers: glow, iris ground, tiles, limbus. The pupil is dynamic. */
  /* progress 0..1 draws the tiles mid-flight (intro); 1 draws them settled. */
  function paintStatic(ctx, S, model, progress) {
    var cx = S / 2, cy = S / 2, R = model.R, P = model.P;
    var pr = progress == null ? 1 : progress;
    ctx.clearRect(0, 0, S, S);
    var glow = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, S * 0.5);
    glow.addColorStop(0, "rgba(188,142,100,0.20)");
    glow.addColorStop(0.55, "rgba(188,142,100,0.05)");
    glow.addColorStop(1, "rgba(188,142,100,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, S, S);
    var ground = ctx.createRadialGradient(cx, cy, P * 0.7, cx, cy, R);
    ground.addColorStop(0, "rgba(120,80,46,0.95)");
    ground.addColorStop(0.5, "rgba(70,42,24,0.95)");
    ground.addColorStop(1, "rgba(16,10,6,1)");
    ctx.save(); ctx.globalAlpha = pr; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = ground; ctx.fill(); ctx.restore();
    for (var i = 0; i < model.tiles.length; i += 1) {
      var t = model.tiles[i];
      if (pr >= 1) { drawTile(ctx, cx, cy, t, rgba(t.col, t.alpha)); continue; }
      /* each tile has its own start time so the iris knits together ring by ring */
      var e = clamp((pr - t.d * 0.55) / 0.45, 0, 1);
      e = 1 - Math.pow(1 - e, 3);
      if (e <= 0) continue;
      drawTile(ctx, cx, cy, { a: t.a + (1 - e) * t.spin, r: t.r + (1 - e) * t.fly, w: t.w, l: t.l }, rgba(t.col, t.alpha * e));
    }
    var limbus = ctx.createRadialGradient(cx, cy, R * 0.78, cx, cy, R);
    limbus.addColorStop(0, "rgba(6,4,2,0)");
    limbus.addColorStop(0.86, "rgba(6,4,2,0.35)");
    limbus.addColorStop(1, "rgba(6,4,2,0.95)");
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = limbus; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, R - 0.6, 0, Math.PI * 2);
    ctx.lineWidth = Math.max(1, S / 520);
    ctx.strokeStyle = "rgba(159,196,218,0.35)";
    ctx.stroke();
  }

  /* Dynamic layer: memory cells in slow waves, the pupil at its current
     dilation, and the catchlight. */
  function paintDynamic(ctx, S, model, time, dil) {
    var cx = S / 2, cy = S / 2, P = model.P * (dil || 1);
    ctx.clearRect(0, 0, S, S);
    for (var i = 0; i < model.cells.length; i += 1) {
      var c = model.cells[i];
      var pulse = 0.5 + 0.5 * Math.sin(time * c.speed + c.phase + c.a * 1.6 + c.r / model.R * 2.2);
      var col = lerpColor(PALETTE.ice, PALETTE.iceBright, pulse);
      drawTile(ctx, cx, cy, c, rgba(col, 0.22 + pulse * 0.62));
      if (pulse > 0.82) {
        ctx.save();
        ctx.globalAlpha = (pulse - 0.82) * 1.8;
        drawTile(ctx, cx, cy, { a: c.a, r: c.r, w: c.w * 3.2, l: c.l * 1.5 }, "rgba(159,196,218,0.18)");
        ctx.restore();
      }
    }
    /* a reading sweep: a faint ice wedge crosses the iris every few seconds */
    var sweepT = (time % 7.5);
    if (sweepT < 2.2) {
      var ang = -Math.PI * 0.75 + (sweepT / 2.2) * Math.PI * 2;
      var fade = Math.sin((sweepT / 2.2) * Math.PI);
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, model.R, 0, Math.PI * 2); ctx.clip();
      ctx.translate(cx, cy); ctx.rotate(ang);
      var wedge = ctx.createLinearGradient(0, 0, 0, model.R);
      wedge.addColorStop(0, "rgba(159,196,218,0)");
      wedge.addColorStop(0.5, "rgba(159,196,218," + (0.16 * fade).toFixed(3) + ")");
      wedge.addColorStop(1, "rgba(226,241,250," + (0.05 * fade).toFixed(3) + ")");
      ctx.fillStyle = wedge;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, model.R, -0.22, 0.22); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    /* pupil */
    var pupil = ctx.createRadialGradient(cx - P * 0.1, cy - P * 0.1, P * 0.1, cx, cy, P);
    pupil.addColorStop(0, "rgba(10,12,16,1)");
    pupil.addColorStop(0.85, "rgba(3,4,7,1)");
    pupil.addColorStop(1, "rgba(3,4,7,1)");
    ctx.beginPath(); ctx.arc(cx, cy, P, 0, Math.PI * 2); ctx.fillStyle = pupil; ctx.fill();
    var edge = ctx.createRadialGradient(cx, cy, P, cx, cy, P * 1.22);
    edge.addColorStop(0, "rgba(3,4,7,0.9)");
    edge.addColorStop(1, "rgba(3,4,7,0)");
    ctx.beginPath(); ctx.arc(cx, cy, P * 1.22, 0, Math.PI * 2); ctx.fillStyle = edge; ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, P * 0.82, Math.PI * 1.08, Math.PI * 1.62);
    ctx.lineWidth = Math.max(1, S / 300);
    ctx.strokeStyle = "rgba(159,196,218,0.22)";
    ctx.stroke();
    /* catchlight */
    var kx = cx - P * 0.52, ky = cy - P * 0.58;
    var kr = P * 0.30;
    var light = ctx.createRadialGradient(kx, ky, 0, kx, ky, kr);
    var flicker = 0.82 + 0.08 * Math.sin(time * 0.9);
    light.addColorStop(0, "rgba(236,245,250," + flicker + ")");
    light.addColorStop(0.45, "rgba(214,232,242," + (flicker * 0.55) + ")");
    light.addColorStop(1, "rgba(159,196,218,0)");
    ctx.beginPath(); ctx.ellipse(kx, ky, kr, kr * 0.78, -0.5, 0, Math.PI * 2); ctx.fillStyle = light; ctx.fill();
    var k2x = cx + P * 0.38, k2y = cy + P * 0.46;
    var l2 = ctx.createRadialGradient(k2x, k2y, 0, k2x, k2y, P * 0.11);
    l2.addColorStop(0, "rgba(214,232,242,0.55)");
    l2.addColorStop(1, "rgba(159,196,218,0)");
    ctx.beginPath(); ctx.arc(k2x, k2y, P * 0.11, 0, Math.PI * 2); ctx.fillStyle = l2; ctx.fill();
  }

  function setup(canvas, options) {
    var opts = options || {};
    var dpr = opts.dpr || Math.min(window.devicePixelRatio || 1, 2);
    var cssSize = opts.size || canvas.clientWidth || 600;
    var S = Math.round(cssSize * dpr);
    canvas.width = S; canvas.height = S;
    if (!opts.keepStyle) { canvas.style.width = cssSize + "px"; canvas.style.height = cssSize + "px"; }
    var model = buildTiles(S, opts.seed);
    var base = document.createElement("canvas"); base.width = S; base.height = S;
    if (!opts.intro) paintStatic(base.getContext("2d"), S, model);
    var dyn = document.createElement("canvas"); dyn.width = S; dyn.height = S;
    return { S: S, model: model, base: base, dyn: dyn, ctx: canvas.getContext("2d"), dil: 1, target: 1 };
  }

  function compose(state, time) {
    paintDynamic(state.dyn.getContext("2d"), state.S, state.model, time, state.dil);
    state.ctx.clearRect(0, 0, state.S, state.S);
    state.ctx.drawImage(state.base, 0, 0);
    state.ctx.drawImage(state.dyn, 0, 0);
  }

  function render(canvas, options) {
    var state = setup(canvas, options);
    compose(state, (options && options.time) || 1.7);
    return state;
  }

  function mount(canvas, options) {
    var opts = options || {};
    var state = setup(canvas, opts);
    var running = true, paused = false, frame = 0, start = null;
    var fps = opts.fps || 30, interval = 1000 / fps, last = 0;
    var introDur = opts.intro ? (opts.introDuration || 1.6) : 0, introLeft = introDur, introLast = performance.now();
    function tick(now) {
      if (!running) return;
      frame = window.requestAnimationFrame(tick);
      if (paused) return;
      if (now - last < interval) return;
      last = now;
      if (start === null) { start = now; introLast = now; }
      var t = (now - start) / 1000 + 1.7;
      if (introLeft > 0) {
        introLeft = Math.max(0, introLeft - (now - introLast) / 1000);
        introLast = now;
        var pr = 1 - introLeft / introDur;
        paintStatic(state.base.getContext("2d"), state.S, state.model, pr >= 0.999 ? 1 : pr);
        if (introLeft <= 0 && opts.onIntroEnd) opts.onIntroEnd();
      }
      /* slow breathing plus a smoothed target set from outside */
      var breathe = 1 + 0.025 * Math.sin(t * 0.55);
      state.dil += (state.target * breathe - state.dil) * 0.08;
      compose(state, t);
    }
    if (!opts.intro) compose(state, 1.7);
    frame = window.requestAnimationFrame(tick);
    return {
      stop: function () { running = false; if (frame) window.cancelAnimationFrame(frame); },
      pause: function (flag) { paused = !!flag; },
      setDilation: function (d) { state.target = clamp(d, 0.8, 1.2); },
      state: state
    };
  }

  window.CorpusEye = { render: render, mount: mount, buildTiles: buildTiles };
})();
