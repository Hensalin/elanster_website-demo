/* index2: three interactive components — 3D globe, gravity tag pile, wave text. Original implementations. */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches;
  function onVisible(el, cb, margin) {
    if (!("IntersectionObserver" in window)) return cb(true);
    new IntersectionObserver(function (es) { cb(es[0].isIntersecting); }, { rootMargin: margin || "0px" }).observe(el);
  }

  /* ============================== 1. 3D GLOBE ============================== */
  (function globe() {
    var host = document.getElementById("globe3d"); if (!host || !window.GLOBE_LAND) return;
    var cv = host.querySelector("canvas"), ctx = cv.getContext("2d");
    var D2R = Math.PI / 180;
    function ll(lon, lat) { var a = lon * D2R, b = lat * D2R; return [Math.cos(b) * Math.sin(a), Math.sin(b), Math.cos(b) * Math.cos(a)]; }
    /* land mask from the existing map artwork (Mercator source map: lon=(x-479.5)/2.7667) */
    var mc = document.createElement("canvas"); mc.width = 1010; mc.height = 666;
    var mx = mc.getContext("2d"); mx.fillStyle = "#fff";
    window.GLOBE_LAND.forEach(function (d) { try { mx.fill(new Path2D(d)); } catch (e) {} });
    var mask = mx.getImageData(0, 0, 1010, 666).data, dots = [];
    function mercY(lat) { return 465.5 - 158.5 * Math.asinh(Math.tan(lat * D2R)); }
    for (var lat = -58; lat <= 82; lat += 2.2) {
      var step = 2.2 / Math.max(Math.cos(lat * D2R), 0.2);
      for (var lon = -179; lon <= 180; lon += step) {
        var px = Math.round(479.5 + 2.7667 * lon), py = Math.round(mercY(lat));
        if (px < 0 || px > 1009 || py < 0 || py > 665) continue;
        if (mask[(py * 1010 + px) * 4 + 3] > 90) dots.push(ll(lon, lat));
      }
    }
    var nodes = dots.filter(function (d, i) { return i % 2 === 0; }), edges = [];
    for (var a = 0; a < nodes.length; a++) {
      var cnt = 0;
      for (var b2 = a + 1; b2 < nodes.length && cnt < 3; b2++) {
        var dd = nodes[a][0] * nodes[b2][0] + nodes[a][1] * nodes[b2][1] + nodes[a][2] * nodes[b2][2];
        if (dd > 0.9935 && dd < 0.9992) { edges.push([a, b2]); cnt++; }
      }
    }
    var HOME = { n: "Chennai", lon: 80.27, lat: 13.08 };
    var CITIES = [["London", -0.12, 51.5], ["New York", -74, 40.7], ["San Francisco", -122.4, 37.8], ["Dubai", 55.3, 25.2], ["Singapore", 103.8, 1.35], ["Sydney", 151.2, -33.9], ["Berlin", 13.4, 52.5]];
    var hv = ll(HOME.lon, HOME.lat);
    var routes = CITIES.map(function (c, i) {
      var b = ll(c[1], c[2]), dot = hv[0] * b[0] + hv[1] * b[1] + hv[2] * b[2], ang = Math.acos(Math.max(-1, Math.min(1, dot)));
      return { n: c[0], b: b, ang: ang, off: i * 0.14 };
    });
    var W = 0, H = 0, R = 0, dpr = 1, yaw = HOME.lon * D2R, pitch = 0.38, vel = 0.0035, base = 0.0035;
    var drag = null, hover = false, live = false, raf = 0, t0 = performance.now();

    function size() {
      var r = host.getBoundingClientRect(); dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, r.width); H = Math.max(1, r.height); cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = W + "px"; cv.style.height = H + "px"; R = Math.min(W, H) / 2 * 0.9;
    }
    function rot(p) {
      var ca = Math.cos(yaw), sa = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      var x1 = p[0] * ca - p[2] * sa, z1 = p[0] * sa + p[2] * ca;
      return [x1, p[1] * cp - z1 * sp, p[1] * sp + z1 * cp];
    }
    function scr(q, k) { k = k || 1; return [W / 2 + R * k * q[0], H / 2 - R * k * q[1]]; }
    function slerp(a, b, ang, t, h) {
      var s = Math.sin(ang) || 1e-6, f = Math.sin((1 - t) * ang) / s, g = Math.sin(t * ang) / s, k = 1 + h * Math.sin(Math.PI * t);
      return [(a[0] * f + b[0] * g) * k, (a[1] * f + b[1] * g) * k, (a[2] * f + b[2] * g) * k];
    }
    function draw(now) {
      var t = (now - t0) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      var cx = W / 2, cy = H / 2;
      /* sphere */
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fillStyle = "rgba(60,80,230,.06)"; ctx.fill();
      /* network lines between neighbouring land nodes */
      var pr = new Array(nodes.length);
      for (var n = 0; n < nodes.length; n++) { var qn = rot(nodes[n]); pr[n] = qn[2] > 0.02 ? [W / 2 + R * qn[0], H / 2 - R * qn[1], qn[2]] : null; }
      ctx.lineWidth = 0.8; ctx.strokeStyle = "rgba(90,130,255,.30)"; ctx.beginPath();
      for (var e = 0; e < edges.length; e++) { var p1 = pr[edges[e][0]], p2 = pr[edges[e][1]]; if (p1 && p2) { ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); } }
      ctx.stroke();
      /* land dots */
      var rr = Math.max(1.6, R / 95);
      for (var i = 0; i < dots.length; i++) {
        var q = rot(dots[i]); if (q[2] <= 0.02) continue;
        var s = scr(q), tw = 0.5 + 0.5 * Math.sin(t * 1.6 + i * 1.7);
        ctx.fillStyle = "rgba(" + (70 + 60 * tw | 0) + "," + (120 + 60 * tw | 0) + ",255," + (0.25 + 0.7 * q[2]).toFixed(2) + ")";
        ctx.fillRect(s[0] - rr / 2, s[1] - rr / 2, rr, rr);
      }
      /* routes */
      routes.forEach(function (r) {
        var h = 0.04 + r.ang * 0.09;
        ctx.lineWidth = 1.6; ctx.strokeStyle = "rgba(190,215,255,.9)"; ctx.beginPath();
        var started = false;
        for (var k = 0; k <= 48; k++) {
          var p = slerp(hv, r.b, r.ang, k / 48, h), q = rot(p);
          if (q[2] < 0 || q[0] * q[0] + q[1] * q[1] > 1.14) { started = false; continue; }
          var s = scr(q); if (!started) { ctx.moveTo(s[0], s[1]); started = true; } else ctx.lineTo(s[0], s[1]);
        }
        ctx.stroke();
        /* travelling spark */
        var ph = ((t / 3.8) + r.off) % 1, e = ph < .5 ? 2 * ph * ph : 1 - Math.pow(-2 * ph + 2, 2) / 2;
        var sp = rot(slerp(hv, r.b, r.ang, e, h));
        if (sp[2] > 0) { var ss = scr(sp); ctx.fillStyle = "#E2F8AC"; ctx.shadowColor = "#E2F8AC"; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(ss[0], ss[1], 3, 0, 6.2832); ctx.fill(); ctx.shadowBlur = 0; }
        /* city */
        var cq = rot(r.b);
        if (cq[2] > 0) {
          var cs = scr(cq), pul = (t * 0.55 + r.off * 3) % 1;
          ctx.strokeStyle = "rgba(226,248,172," + (0.6 * (1 - pul)).toFixed(2) + ")"; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(cs[0], cs[1], 3 + pul * 12, 0, 6.2832); ctx.stroke();
          ctx.fillStyle = "#E2F8AC"; ctx.beginPath(); ctx.arc(cs[0], cs[1], 3.2, 0, 6.2832); ctx.fill();
          if (cq[2] > 0.35) { ctx.font = "600 " + Math.min(13, Math.max(9, R / 24)) + "px 'Sharp Grotesk', system-ui, sans-serif"; ctx.fillStyle = "rgba(240,240,249," + Math.min(1, (cq[2] - 0.35) * 2).toFixed(2) + ")"; ctx.fillText(r.n, cs[0] + 7, cs[1] - 6); }
        }
      });
      /* home beacon */
      var hq = rot(hv);
      if (hq[2] > 0) {
        var hs = scr(hq);
        for (var j = 0; j < 3; j++) { var pp = ((t * 0.5) + j / 3) % 1; ctx.strokeStyle = "rgba(230,90,51," + (0.8 * (1 - pp)).toFixed(2) + ")"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(hs[0], hs[1], 5 + pp * 26, 0, 6.2832); ctx.stroke(); }
        ctx.fillStyle = "#E65A33"; ctx.beginPath(); ctx.arc(hs[0], hs[1], 5.5, 0, 6.2832); ctx.fill();
        ctx.font = "700 " + Math.min(16, Math.max(11, R / 18)) + "px 'Sharp Grotesk', system-ui, sans-serif"; ctx.fillStyle = "#fff"; ctx.fillText(HOME.n, hs[0] + 11, hs[1] - 9);
      }
    }
    function frame(now) {
      if (!drag) { var target = (hover ? base * 0.35 : base) * (reduce ? 0 : 1); vel += (target - vel) * 0.04; yaw += vel; }
      draw(now); raf = live ? requestAnimationFrame(frame) : 0;
    }
    function go() { if (live && !raf) raf = requestAnimationFrame(frame); }
    size(); draw(performance.now());
    if ("ResizeObserver" in window) new ResizeObserver(function () { size(); draw(performance.now()); }).observe(host);
    onVisible(host, function (v) { live = v; if (v) go(); }, "80px");

    cv.addEventListener("pointerdown", function (e) { drag = { x: e.clientX, y: e.clientY, id: e.pointerId }; cv.setPointerCapture(e.pointerId); host.classList.add("is-drag"); go(); });
    cv.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY;
      yaw -= dx * 0.0075; vel = -dx * 0.0075; if (e.pointerType === "mouse") pitch = Math.max(0.05, Math.min(1.0, pitch + dy * 0.004));
      if (reduce) draw(performance.now());
    });
    function up() { drag = null; host.classList.remove("is-drag"); if (Math.abs(vel) < base) vel = base; }
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
    cv.addEventListener("pointerenter", function () { hover = true; }); cv.addEventListener("pointerleave", function () { hover = false; });
    host.classList.add("is-ready");
  })();

  /* ============================== 2. GRAVITY TAG PILE ============================== */
  (function pile() {
    var box = document.getElementById("tagpile"); if (!box) return;
    var els = [].slice.call(box.querySelectorAll(".tp")), replay = box.querySelector(".tagpile__replay");
    var M, engine, bodies = [], walls = [], W = 0, H = 0, running = false, raf = 0, started = false, timers = [];
    var grab = null;
    function load(cb) { if (window.Matter) return cb(); var s = document.createElement("script"); s.src = "assets/vendor/matter.min.js"; s.onload = cb; document.head.appendChild(s); }
    function setup() {
      M = window.Matter; var r = box.getBoundingClientRect(); W = r.width; H = r.height;
      engine = M.Engine.create({ gravity: { x: 0, y: 1.1 } }); engine.positionIterations = 8;
      var t = 120;
      walls = [M.Bodies.rectangle(W / 2, H + t / 2, W + 400, t, { isStatic: true, friction: .4 }),
        M.Bodies.rectangle(-t / 2, H / 2 - 600, t, H * 2 + 1400, { isStatic: true }),
        M.Bodies.rectangle(W + t / 2, H / 2 - 600, t, H * 2 + 1400, { isStatic: true })];
      M.World.add(engine.world, walls);
      M.Events.on(engine, "collisionStart", function (ev) {
        ev.pairs.forEach(function (p) {
          if (p.bodyA.speed + p.bodyB.speed < 6) return;
          [p.bodyA, p.bodyB].forEach(function (b) { if (b.__el) { b.__el.classList.remove("sq"); void b.__el.offsetWidth; b.__el.classList.add("sq"); } });
        });
      });
      bodies = els.map(function (el, i) {
        var w = el.offsetWidth, h = el.offsetHeight;
        var b = M.Bodies.rectangle(W / 2, -200 - i * 40, w, h, { chamfer: { radius: h / 2 }, restitution: .5, friction: .12, frictionAir: .006, density: .0012 });
        b.__el = el; b.__w = w; b.__h = h; b.__in = false; return b;
      });
      els.forEach(function (el) { el.style.opacity = 0; });
    }
    function drop() {
      timers.forEach(clearTimeout); timers = [];
      bodies.forEach(function (b, i) {
        function go() {
          M.Body.setPosition(b, { x: W * (0.12 + 0.76 * Math.random()), y: -b.__h - 10 });
          M.Body.setAngle(b, (Math.random() - .5) * 1.4); M.Body.setVelocity(b, { x: (Math.random() - .5) * 4, y: 2 });
          M.Body.setAngularVelocity(b, (Math.random() - .5) * .2); b.__in = true; b.__el.style.opacity = 1; M.World.add(engine.world, b);
        }
        if (reduce) { M.Body.setPosition(b, { x: W * (0.12 + 0.76 * Math.random()), y: H * 0.2 }); b.__in = true; b.__el.style.opacity = 1; M.World.add(engine.world, b); }
        else timers.push(setTimeout(go, 250 + i * 170));
      });
      if (reduce) { for (var k = 0; k < 700; k++) M.Engine.update(engine, 1000 / 60); render(); }
      else run();
    }
    function render() {
      bodies.forEach(function (b) { if (!b.__in) return; b.__el.style.transform = "translate3d(" + (b.position.x - b.__w / 2).toFixed(1) + "px," + (b.position.y - b.__h / 2).toFixed(1) + "px,0) rotate(" + b.angle.toFixed(3) + "rad)"; });
    }
    function loop() {
      bodies.forEach(function (b) {
        if (!b.__in || (grab && bodies[els.indexOf(grab.el)] === b)) return;
        var a = Math.atan2(Math.sin(b.angle), Math.cos(b.angle)); M.Body.setAngularVelocity(b, b.angularVelocity * 0.985 - a * 0.0045);
        var sp = Math.hypot(b.velocity.x, b.velocity.y); if (sp > 32) M.Body.setVelocity(b, { x: b.velocity.x * 32 / sp, y: b.velocity.y * 32 / sp });
      });
      M.Engine.update(engine, 1000 / 60); render(); raf = running ? requestAnimationFrame(loop) : 0; }
    function run() { if (!running) { running = true; raf = requestAnimationFrame(loop); } }
    function reset() {
      timers.forEach(clearTimeout); running = false; cancelAnimationFrame(raf); raf = 0;
      if (engine) { M.World.clear(engine.world, false); M.Engine.clear(engine); }
      setup(); drop();
    }
    /* grab / throw / click-pop */
    function localPt(e) { var r = box.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
    els.forEach(function (el, i) {
      el.addEventListener("pointerdown", function (e) {
        if (!M) return; e.preventDefault(); el.setPointerCapture(e.pointerId);
        var b = bodies[i], p = localPt(e);
        var c = M.Constraint.create({ pointA: { x: p.x, y: p.y }, bodyB: b, pointB: { x: p.x - b.position.x, y: p.y - b.position.y }, stiffness: .4, damping: .08, length: 0 });
        M.World.add(engine.world, c); grab = { c: c, el: el, sx: e.clientX, sy: e.clientY, moved: false }; el.classList.add("is-held"); run();
      });
      el.addEventListener("pointermove", function (e) {
        if (!grab || grab.el !== el) return; var p = localPt(e); grab.c.pointA = { x: p.x, y: p.y };
        if (Math.abs(e.clientX - grab.sx) + Math.abs(e.clientY - grab.sy) > 6) grab.moved = true;
      });
      function release() {
        if (!grab || grab.el !== el) return; M.World.remove(engine.world, grab.c); el.classList.remove("is-held");
        if (!grab.moved) { el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); M.Body.setVelocity(bodies[i], { x: (Math.random() - .5) * 8, y: -9 }); }
        grab = null;
      }
      el.addEventListener("pointerup", release); el.addEventListener("pointercancel", release);
    });
    /* cursor pushes nearby tags */
    if (fine && !reduce) box.addEventListener("pointermove", function (e) {
      if (!M || grab || !running) return; var p = localPt(e);
      bodies.forEach(function (b) {
        if (!b.__in) return; var dx = b.position.x - p.x, dy = b.position.y - p.y, d = Math.hypot(dx, dy);
        if (d < 150 && d > 1) { var f = (1 - d / 150) * 0.03 * b.mass; M.Body.applyForce(b, b.position, { x: dx / d * f, y: dy / d * f - 0.002 * b.mass }); }
      });
    });
    replay.addEventListener("click", function () { if (M) reset(); });
    onVisible(box, function (v) {
      if (v && !started) { started = true; load(function () { setup(); drop(); }); }
      else if (started && M) { if (v && bodies.some(function (b) { return b.__in; })) run(); else { running = false; } }
    }, "-12% 0px");
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { if (M && started && Math.abs(box.getBoundingClientRect().width - W) > 40) reset(); }, 300); });
  })();

  /* ============================== 3. WAVE TEXT ============================== */
  (function wave() {
    var hosts = [].slice.call(document.querySelectorAll("[data-wave]")); if (!hosts.length || reduce) return;
    var items = [];
    hosts.forEach(function (h) {
      var text = h.textContent; h.setAttribute("aria-label", text); h.textContent = ""; h.classList.add("wave");
      var letters = [];
      text.split(/(\s+)/).forEach(function (w) {
        if (/^\s+$/.test(w)) { h.appendChild(document.createTextNode(" ")); return; }
        var word = document.createElement("span"); word.className = "wave__word"; word.setAttribute("aria-hidden", "true");
        w.split("").forEach(function (ch) { var s = document.createElement("span"); s.className = "wave__ch"; s.textContent = ch; word.appendChild(s); letters.push(s); });
        h.appendChild(word);
      });
      items.push({ el: h, letters: letters, vis: false, rects: [] });
      onVisible(h, function (v) { items[items.length - 1].vis = v; }, "60px");
    });
    var mouse = { x: -9999, y: -9999 }, lastY = window.scrollY, boost = 0;
    if (fine) window.addEventListener("pointermove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    function tick(now) {
      var t = now / 1000, sy = window.scrollY; boost += (Math.min(Math.abs(sy - lastY) * 0.12, 14) - boost) * 0.1; lastY = sy;
      items.forEach(function (it) {
        if (!it.vis) return;
        var fs = parseFloat(getComputedStyle(it.el).fontSize) || 40, amp = fs * 0.11 + boost;
        it.letters.forEach(function (l, i) {
          var y = Math.sin(t * 2.1 + i * 0.55) * amp, rz = Math.cos(t * 2.1 + i * 0.55) * 1.6, sc = 1;
          if (mouse.x > -9000) {
            var r = l.getBoundingClientRect(), dx = r.left + r.width / 2 - mouse.x, dy = r.top + r.height / 2 - mouse.y, d = Math.hypot(dx, dy);
            if (d < 170) { var k = 1 - d / 170; y -= k * fs * 0.35; sc = 1 + k * 0.28; rz += (dx > 0 ? 1 : -1) * k * 6; }
          }
          l.style.transform = "translateY(" + y.toFixed(2) + "px) rotate(" + rz.toFixed(2) + "deg) scale(" + sc.toFixed(3) + ")";
        });
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* ============================== 4. FOOTER MOTION ============================== */
  (function footerFx() {
    var f = document.querySelector(".footer"); if (!f) return;
    /* twinkling stars + shooting stars */
    var sky = document.createElement("div"); sky.className = "footer__sky"; sky.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 46; i++) {
      var st = document.createElement("i"); st.style.left = (Math.random() * 100).toFixed(1) + "%"; st.style.top = (Math.random() * 100).toFixed(1) + "%";
      var sz = 1 + Math.random() * 2.2; st.style.width = st.style.height = sz.toFixed(1) + "px";
      st.style.animationDelay = (Math.random() * 5).toFixed(2) + "s"; st.style.animationDuration = (2.5 + Math.random() * 4).toFixed(2) + "s"; sky.appendChild(st);
    }
    for (var k = 0; k < 3; k++) { var sh = document.createElement("b"); sh.style.top = (8 + k * 22) + "%"; sh.style.animationDelay = (k * 4.3 + 1) + "s"; sky.appendChild(sh); }
    f.insertBefore(sky, f.firstChild);
    /* reveal sequence on entry */
    onVisible(f, function (v) { if (v) f.classList.add("is-in"); }, "-8% 0px");
    /* count-up style hover glow follows the pointer across the footer */
    if (fine && !reduce) {
      f.addEventListener("pointermove", function (e) { var r = f.getBoundingClientRect(); f.style.setProperty("--fx", (e.clientX - r.left) + "px"); f.style.setProperty("--fy", (e.clientY - r.top) + "px"); });
    }
  })();
})();
