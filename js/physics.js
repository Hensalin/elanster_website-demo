/* Interactive tag pills: they pile up under gravity and jump away from the cursor. */
(function () {
  var box = document.getElementById("physics");
  if (!box || !box.getClientRects().length) return; /* card hidden: never load the physics engine */
  function load(cb) {
    if (window.Matter) return cb();
    var s = document.createElement("script"); s.src = "assets/vendor/matter.min.js"; s.onload = cb; document.head.appendChild(s);
  }
  if ("IntersectionObserver" in window) {
    var lo = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { lo.disconnect(); load(init); } }, { rootMargin: "300px" });
    lo.observe(box);
  } else load(init);
  function init() {
  var M = window.Matter;
  var pills = Array.prototype.slice.call(box.querySelectorAll(".pp"));
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var engine, runner, bodies = [], W, H, walls = [], running = false, raf = 0, mouse = { x: -999, y: -999, vx: 0, vy: 0, in: false };

  function build() {
    var r = box.getBoundingClientRect();
    W = r.width; H = r.height;
    if (engine) { M.World.clear(engine.world, false); M.Engine.clear(engine); }
    engine = M.Engine.create({ gravity: { x: 0, y: 1.1 } });
    var t = 80;
    walls = [
      M.Bodies.rectangle(W / 2, H + t / 2, W + 200, t, { isStatic: true }),
      M.Bodies.rectangle(-t / 2, H / 2 - 200, t, H + 600, { isStatic: true }),
      M.Bodies.rectangle(W / 2, -110 - t / 2, W + 200, t, { isStatic: true }),
      M.Bodies.rectangle(W + t / 2, H / 2 - 200, t, H + 600, { isStatic: true })
    ];
    M.World.add(engine.world, walls);
    bodies = pills.map(function (el, i) {
      var w = el.offsetWidth, h = el.offsetHeight;
      var x = W * (0.16 + 0.68 * ((i * 0.41) % 1)), y = 14 + (i % 3) * 22;
      var b = M.Bodies.rectangle(x, reduce ? H - 18 - (i % 3) * 30 : y, w, h, {
        chamfer: { radius: h / 2 }, restitution: 0.55, friction: 0.08, frictionAir: 0.012,
        angle: (Math.random() - 0.5) * 0.9, density: 0.002
      });
      b.__el = el; b.__w = w; b.__h = h;
      M.Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.15);
      return b;
    });
    M.World.add(engine.world, bodies);
    if (reduce) for (var k = 0; k < 90; k++) M.Engine.update(engine, 1000 / 60);
    draw();
  }

  function draw() {
    bodies.forEach(function (b) {
      b.__el.style.transform = "translate(" + (b.position.x - b.__w / 2) + "px," + (b.position.y - b.__h / 2) + "px) rotate(" + b.angle + "rad)";
    });
  }

  function jump(px, py, power) {
    bodies.forEach(function (b) {
      var dx = b.position.x - px, dy = b.position.y - py, d = Math.sqrt(dx * dx + dy * dy);
      var R = 62 + b.__h;
      if (d < R) {
        var k = (1 - d / R);
        var fx = (dx / (d || 1)) * 0.018 * power * k * b.mass * 60;
        var fy = -0.03 * power * k * b.mass * 60 - 0.004 * power * b.mass * 60;
        M.Body.applyForce(b, b.position, { x: fx / 60, y: fy / 60 });
        M.Body.setAngularVelocity(b, b.angularVelocity + (Math.random() - 0.5) * 0.35 * k * power);
      }
    });
  }

  var last = 0;
  function loop(ts) {
    if (!running) return;
    var dt = Math.min(32, ts - last || 16); last = ts;
    if (mouse.in) jump(mouse.x, mouse.y, 1);
    M.Engine.update(engine, dt);
    draw();
    raf = requestAnimationFrame(loop);
  }

  function start() { if (running || reduce) return; running = true; last = 0; raf = requestAnimationFrame(loop); }
  function stop() { running = false; cancelAnimationFrame(raf); }

  box.addEventListener("pointermove", function (e) {
    var r = box.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.in = true;
  });
  box.addEventListener("pointerleave", function () { mouse.in = false; });
  box.addEventListener("pointerdown", function (e) {
    var r = box.getBoundingClientRect();
    jump(e.clientX - r.left, e.clientY - r.top, 5);
  });

  build();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) { en[0].isIntersecting ? start() : stop(); }, { threshold: 0.15 }).observe(box);
  } else start();
  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(build, 250); });
  }
})();
