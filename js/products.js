(function () {
  document.querySelectorAll(".pr").forEach(function (root) {
    var view = root.querySelector(".pr__view"), cards = root.querySelectorAll(".pr-card");
    var prev = root.querySelector(".pr__prev"), next = root.querySelector(".pr__next"), cur = root.querySelector(".pr__cur");
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var step = function () { return cards[0].offsetWidth + 22; };
    var update = function () {
      var i = Math.min(cards.length - 1, Math.round(view.scrollLeft / step()));
      cur.textContent = pad(i + 1);
      prev.disabled = view.scrollLeft < 8;
      next.disabled = view.scrollLeft + view.clientWidth >= view.scrollWidth - 8;
    };
    view.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    prev.addEventListener("click", function () { view.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { view.scrollBy({ left: step(), behavior: "smooth" }); });
    update();
    root.querySelectorAll(".section-title").forEach(function (h) {
      if (h.children.length) return;
      var w = h.textContent.trim().split(/\s+/); if (w.length < 3) return;
      var n = Math.max(1, Math.round(w.length * 0.4));
      h.textContent = w.slice(0, w.length - n).join(" ") + " ";
      var s = document.createElement("span"); s.className = "ol"; s.textContent = w.slice(w.length - n).join(" "); h.appendChild(s);
    });
  });
})();
