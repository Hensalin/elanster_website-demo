/* Work page: stacked card deck of product banners */
(function () {
  var root = document.querySelector(".wd"); if (!root) return;
  var cards = [].slice.call(root.querySelectorAll(".wd__card")), texts = root.querySelectorAll(".wd__text");
  var cur = root.querySelector(".wd__cur"), deck = root.querySelector(".wd__deck"), n = cards.length, at = 0;
  var pad = function (k) { return String(k).padStart(2, "0"); };
  var paint = function () {
    cards.forEach(function (c, i) {
      var p = (i - at + n) % n;
      c.style.setProperty("--p", Math.min(p, 4));
      c.classList.toggle("is-front", p === 0);
      c.classList.toggle("is-gone", p >= 4);
      c.setAttribute("aria-hidden", p === 0 ? "false" : "true");
    });
    texts.forEach(function (t, i) { t.classList.toggle("is-on", i === at); });
    cur.textContent = pad(at + 1);
  };
  var go = function (d) { at = (at + d + n) % n; paint(); };
  root.querySelector(".wd__next").addEventListener("click", function () { go(1); });
  root.querySelector(".wd__prev").addEventListener("click", function () { go(-1); });
  deck.addEventListener("click", function (e) { if (e.target.closest(".wd__card.is-front")) go(1); });
  deck.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  });
  var x0 = null;
  deck.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
  deck.addEventListener("pointerup", function (e) { if (x0 !== null && Math.abs(e.clientX - x0) > 50) go(e.clientX < x0 ? 1 : -1); x0 = null; });
  paint();
})();
