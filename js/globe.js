/* Footer world map: 1) pulsing Chennai beacon  2) routes flying out to world cities  3) touch/pointer tilt + tap ripples */
(function () {
  var img = document.querySelector(".footer__map");
  if (!img || !img.parentNode) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS = "http://www.w3.org/2000/svg";
  var HOME = [701, 429];
  var CITIES = [
    ["London", 479, 299],
    ["New York", 275, 342],
    ["San Francisco", 141, 352],
    ["Dubai", 632, 393],
    ["Singapore", 767, 462],
    ["Sydney", 898, 565]
  ];

  var wrap = document.createElement("div"); wrap.className = "footer__globe";
  var inner = document.createElement("div"); inner.className = "footer__globe-in";
  img.parentNode.insertBefore(wrap, img); wrap.appendChild(inner); inner.appendChild(img);

  var svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 1010 666"); svg.setAttribute("class", "footer__globe-fx");
  svg.setAttribute("aria-hidden", "true");
  inner.appendChild(svg);

  function el(n, a, p) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); (p || svg).appendChild(e); return e; }

  /* 1) beacon rings at Chennai */
  for (var r = 0; r < 3; r++) {
    var ring = el("circle", { cx: HOME[0], cy: HOME[1], r: 14, class: "gl-ring" });
    ring.style.animationDelay = (r * 0.9) + "s";
  }

  /* 2) routes */
  CITIES.forEach(function (c, i) {
    var x2 = c[1], y2 = c[2], mx = (HOME[0] + x2) / 2, d = Math.hypot(x2 - HOME[0], y2 - HOME[1]);
    var my = Math.min(HOME[1], y2) - d * 0.32;
    var path = "M" + HOME[0] + " " + HOME[1] + " Q" + mx + " " + my + " " + x2 + " " + y2;
    var p = el("path", { d: path, class: "gl-arc", pathLength: 100 });
    p.style.animationDelay = (i * 0.35) + "s";
    var dot = el("circle", { r: 5, class: "gl-dot" });
    var am = el("animateMotion", { dur: "3.6s", begin: (1.2 + i * 0.6) + "s", repeatCount: "indefinite", path: path, calcMode: "spline", keyTimes: "0;1", keySplines: ".4 0 .2 1" }, dot);
    var end = el("circle", { cx: x2, cy: y2, r: 6, class: "gl-city" });
    end.style.animationDelay = (1.2 + i * 0.6 + 3.6 * 0.9) + "s";
    var pulse = el("circle", { cx: x2, cy: y2, r: 6, class: "gl-pulse" });
    pulse.style.animationDelay = (1.2 + i * 0.6 + 3.6 * 0.9) + "s";
  });

  /* start only when visible */
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es, o) {
      es.forEach(function (e) { if (e.isIntersecting) { wrap.classList.add("is-live"); o.disconnect(); } });
    }, { threshold: 0.25 }).observe(wrap);
  } else wrap.classList.add("is-live");

  if (reduce) return;

  /* 3) pointer / touch tilt and tap ripples */
  var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, active = false;
  function loop() {
    cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
    inner.style.transform = "rotateX(" + cy.toFixed(2) + "deg) rotateY(" + cx.toFixed(2) + "deg)";
    if (active || Math.abs(tx - cx) > 0.02 || Math.abs(ty - cy) > 0.02) raf = requestAnimationFrame(loop); else raf = 0;
  }
  function kick() { if (!raf) raf = requestAnimationFrame(loop); }
  function tilt(e) {
    var b = wrap.getBoundingClientRect();
    var px = (e.clientX - b.left) / b.width - 0.5, py = (e.clientY - b.top) / b.height - 0.5;
    tx = px * 18; ty = -py * 14; active = true; kick();
  }
  wrap.addEventListener("pointermove", tilt);
  wrap.addEventListener("pointerenter", function (e) { wrap.classList.add("is-hot"); tilt(e); });
  wrap.addEventListener("pointerleave", function () { tx = ty = 0; active = false; wrap.classList.remove("is-hot"); kick(); });
  wrap.addEventListener("pointerdown", function (e) {
    var b = svg.getBoundingClientRect();
    var x = (e.clientX - b.left) / b.width * 1010, y = (e.clientY - b.top) / b.height * 666;
    var t = el("circle", { cx: x, cy: y, r: 8, class: "gl-tap" });
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 1200);
    var ln = el("line", { x1: x, y1: y, x2: HOME[0], y2: HOME[1], class: "gl-link" });
    setTimeout(function () { if (ln.parentNode) ln.parentNode.removeChild(ln); }, 900);
    wrap.classList.add("is-tap"); setTimeout(function () { wrap.classList.remove("is-tap"); }, 500);
  });
})();
