/* Footer: scroll-scrubbed reveal (parallax rise, masked letter rise, line draw). Colours untouched. */
(function () {
  var f = document.querySelector(".footer"); if (!f) return;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var loc = f.querySelector(".footer__col--location p");
  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  f.classList.add("ft3");

  /* masked letters */
  var name = f.querySelector(".footer__name"), chars = [];
  if (name) {
    var text = name.textContent; name.setAttribute("aria-label", text); name.textContent = "";
    text.split(/(\s+)/).forEach(function (w) {
      if (/^\s+$/.test(w)) { name.appendChild(document.createTextNode(" ")); return; }
      var word = document.createElement("span"); word.className = "ft3-word"; word.setAttribute("aria-hidden", "true");
      w.split("").forEach(function (ch) { var m = document.createElement("span"); m.className = "ft3-mask"; var s = document.createElement("span"); s.className = "ft3-ch"; s.textContent = ch; m.appendChild(s); word.appendChild(m); chars.push(s); });
      name.appendChild(word);
    });
  }

  var tl = gsap.timeline({ scrollTrigger: { trigger: f, start: "top 95%", end: "bottom bottom", scrub: 0.9 } });
  var cols = f.querySelectorAll(".footer__col:not(.footer__col--location)");
  tl.from(cols, { y: 90, opacity: 0, stagger: 0.12, ease: "none", duration: 1 }, 0);
  var map = f.querySelector(".footer__map");
  if (map) tl.from(map, { scale: 0.88, opacity: 0, transformOrigin: "50% 60%", ease: "none", duration: 1 }, 0.1);
  if (loc) tl.from([loc], { y: 60, opacity: 0, stagger: 0.1, ease: "none", duration: 1 }, 0.25);
  var lines = f.querySelectorAll(".footer__brand, .footer__legal");
  lines.forEach(function (l) { l.classList.add("ft3-line"); });
  tl.fromTo(lines, { "--ln": 0 }, { "--ln": 1, ease: "none", duration: 1.2, stagger: 0.2 }, 0.5);
  if (chars.length) tl.from(chars, { yPercent: 125, rotate: 6, stagger: 0.05, ease: "none", duration: 1.4 }, 0.6);
  var tag = f.querySelector(".footer__tagline, .footer__mark");
  tl.from(f.querySelectorAll(".footer__mark, .footer__tagline"), { opacity: 0, y: 30, stagger: 0.2, ease: "none", duration: 1 }, 1.1);
  tl.from(f.querySelectorAll(".footer__legal > *"), { opacity: 0, y: 20, stagger: 0.1, ease: "none", duration: 0.8 }, 1.5);
})();
