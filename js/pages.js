/* Inner pages: nav, reveal, outlined headings (same behaviour as the home page) */
(function () {
  "use strict";
  var nav = document.getElementById("nav");
  var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 24); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var toggle = document.getElementById("navToggle"), links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = "";
    });
  });

  /* outlined closing words in titles */
  document.querySelectorAll(".ph__title, .section-title, .cta__title").forEach(function (h) {
    if (h.children.length || h.dataset.ol) return;
    var words = h.textContent.trim().split(/\s+/);
    if (words.length < 3) return;
    var n = Math.max(1, Math.round(words.length * 0.4));
    h.textContent = "";
    h.appendChild(document.createTextNode(words.slice(0, words.length - n).join(" ") + " "));
    var s = document.createElement("span"); s.className = "ol"; s.textContent = words.slice(words.length - n).join(" ");
    h.appendChild(s); h.dataset.ol = "1";
  });

  /* italic serif accent on card titles, like the home page */
  document.querySelectorAll(".svc-card h3, .culture-row h3").forEach(function (h) {
    if (h.children.length) return;
    var w = h.textContent.trim().split(/\s+/); if (w.length < 2) return;
    var last = w.pop(); h.textContent = w.join(" ") + " ";
    var em = document.createElement("em"); em.textContent = last; h.appendChild(em);
  });

  /* reveal on scroll, staggered by sibling */
  var els = document.querySelectorAll(".reveal");
  var groups = new Map();
  els.forEach(function (el) { var l = groups.get(el.parentElement) || []; l.push(el); groups.set(el.parentElement, l); });
  groups.forEach(function (l) { l.forEach(function (el, i) { el.style.setProperty("--rd", Math.min(i * 0.07, 0.42) + "s"); }); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("is-visible"); }); }
  /* slow parallax on the CTA arc pattern (same as the home page) */
  var cp = document.querySelector(".cta__pattern");
  if (cp && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var cta = cp.closest(".cta"), pt = false;
    var move = function () {
      pt = false;
      var r = cta.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      cp.style.setProperty("--py", ((0.5 - (vh - r.top) / (vh + r.height)) * 70) + "px");
    };
    window.addEventListener("scroll", function () { if (!pt) { pt = true; requestAnimationFrame(move); } }, { passive: true });
    move();
  }
})();
