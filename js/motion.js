/* Elanster motion layer (GSAP + ScrollTrigger). Progressive enhancement: the site works without it. */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var root = document.documentElement;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (reduce) return;
  root.classList.add("gsap-ok");

  /* ---------- Hero headline: masked word-by-word reveal ---------- */
  var inners = document.querySelectorAll(".hero__line-inner");
  var words = [];
  inners.forEach(function (el) {
    var text = el.textContent.trim().split(/\s+/);
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = text.map(function (w) { return '<span class="hw" aria-hidden="true"><span class="hwi">' + w + "</span></span>"; }).join(" ");
    el.querySelectorAll(".hwi").forEach(function (n) { words.push(n); });
  });
  if (words.length) {
    gsap.set(words, { yPercent: 115, rotate: 3 });
    gsap.to(words, { yPercent: 0, rotate: 0, duration: 1.15, ease: "power4.out", stagger: 0.09, delay: 0.1 });
  }

  /* ---------- Hero arcs: scroll parallax + gentle pointer drift ---------- */
  var pattern = document.querySelector(".hero__pattern");
  var hero = document.querySelector(".hero");
  if (pattern && hero) {
    gsap.to(pattern, { yPercent: -10, scale: 1.05, ease: "none", transformOrigin: "100% 100%",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } });
    if (fine) {
      var qx = gsap.quickTo(pattern, "x", { duration: 1.2, ease: "power3.out" });
      var qy = gsap.quickTo(pattern, "y", { duration: 1.2, ease: "power3.out" });
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        qx(-((e.clientX - r.left) / r.width - 0.5) * 28);
        qy(-((e.clientY - r.top) / r.height - 0.5) * 20);
      }, { passive: true });
      hero.addEventListener("pointerleave", function () { qx(0); qy(0); });
    }
  }

  /* ---------- Magnetic buttons ---------- */
  if (fine) {
    document.querySelectorAll(".hero .btn, .nav__cta, .cta .btn").forEach(function (b) {
      var x = gsap.quickTo(b, "x", { duration: 0.5, ease: "power3.out" });
      var y = gsap.quickTo(b, "y", { duration: 0.5, ease: "power3.out" });
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * 0.28);
        y((e.clientY - (r.top + r.height / 2)) * 0.4);
      });
      b.addEventListener("pointerleave", function () { gsap.to(b, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,0.4)" }); });
    });
  }

  /* ---------- Navigation: sliding indicator + active section ---------- */
  var navLinks = document.getElementById("navLinks");
  var anchors = navLinks ? [].slice.call(navLinks.querySelectorAll("a:not(.btn)")) : [];
  if (navLinks && anchors.length) {
    var ind = document.createElement("span");
    ind.className = "nav__ind"; ind.setAttribute("aria-hidden", "true");
    navLinks.appendChild(ind);
    var active = null;
    var place = function (a, instant) {
      if (!a || window.innerWidth <= 760) { gsap.to(ind, { opacity: 0, duration: 0.2 }); return; }
      var lr = navLinks.getBoundingClientRect(), ar = a.getBoundingClientRect();
      var props = { x: ar.left - lr.left, width: ar.width, opacity: 1 };
      instant ? gsap.set(ind, props) : gsap.to(ind, Object.assign({ duration: 0.45, ease: "power3.out" }, props));
    };
    anchors.forEach(function (a) {
      a.addEventListener("pointerenter", function () { place(a); });
      a.addEventListener("focus", function () { place(a); });
      a.addEventListener("pointerleave", function () { place(active); });
      a.addEventListener("blur", function () { place(active); });
    });
    var setActive = function (id) {
      active = anchors.filter(function (a) { return a.getAttribute("href") === "#" + id; })[0] || null;
      anchors.forEach(function (a) { a.classList.toggle("is-active", a === active); a.toggleAttribute("aria-current", a === active); if (a !== active) a.removeAttribute("aria-current"); else a.setAttribute("aria-current", "true"); });
      place(active, !ind._seen); ind._seen = true;
    };
    anchors.forEach(function (a) {
      var id = a.getAttribute("href").slice(1), sec = document.getElementById(id);
      if (!sec) return;
      ScrollTrigger.create({ trigger: sec, start: "top 45%", end: "bottom 45%", onToggle: function (s) { if (s.isActive) setActive(id); else if (active && active.getAttribute("href") === "#" + id) setActive(""); } });
    });
    window.addEventListener("resize", function () { place(active, true); });

    /* mobile menu: staggered links when it opens */
    var mo = new MutationObserver(function () {
      if (navLinks.classList.contains("is-open")) {
        gsap.fromTo(navLinks.children, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.06, delay: 0.12, clearProps: "transform,opacity" });
      }
    });
    mo.observe(navLinks, { attributes: true, attributeFilter: ["class"] });
  }

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
