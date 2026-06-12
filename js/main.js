/* Elanster Technologies — landing page interactions */
(function () {
  "use strict";

  /* ---------- Sticky nav state ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    })
  );

  /* ---------- Marquee: duplicate track for seamless loop ---------- */
  const track = document.querySelector(".marquee__track");
  if (track && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    track.innerHTML += track.innerHTML;
  }

  /* ---------- Services carousel ---------- */
  const viewport = document.getElementById("svcViewport");
  const svcTrack = viewport.querySelector(".services__track");
  const cards = svcTrack.querySelectorAll(".svc-card");
  const current = document.getElementById("svcCurrent");
  const total = document.getElementById("svcTotal");
  const prev = document.getElementById("svcPrev");
  const next = document.getElementById("svcNext");
  const pad = (n) => String(n).padStart(2, "0");
  total.textContent = pad(cards.length);

  const cardStep = () => cards[0].offsetWidth + 24;
  const index = () => Math.min(cards.length - 1, Math.round(viewport.scrollLeft / cardStep()));

  const update = () => {
    const i = index();
    current.textContent = pad(i + 1);
    prev.disabled = i === 0;
    next.disabled = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 8;
  };
  viewport.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  prev.addEventListener("click", () => viewport.scrollBy({ left: -cardStep(), behavior: "smooth" }));
  next.addEventListener("click", () => viewport.scrollBy({ left: cardStep(), behavior: "smooth" }));
  update();

  /* ---------- Hero: mouse parallax on the arc pattern ---------- */
  const hero = document.querySelector(".hero");
  const pattern = document.querySelector(".hero__pattern svg");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (hero && pattern && !reducedMotion) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const step = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      pattern.style.transform = `translate(${-cx}px, ${-cy}px)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(step);
      } else {
        raf = null;
      }
    };
    hero.addEventListener("mousemove", (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 26;
      ty = (e.clientY / window.innerHeight - 0.5) * 18;
      if (!raf) raf = requestAnimationFrame(step);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Stat counters ---------- */
  const counters = document.querySelectorAll(".stat__num[data-count]");
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const dur = 1200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = el.dataset.count + (el.dataset.suffix || "")));
  }

  /* ---------- External links: never silently blocked ---------- */
  /* Webviews and embedded previews can swallow target="_blank" popups.
     Try the new tab first; if the environment refuses, navigate in place. */
  document.querySelectorAll('a[href^="http"]').forEach((a) => {
    if (a.host === window.location.host) return;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const w = window.open(a.href, "_blank", "noopener");
      if (!w) window.location.assign(a.href);
    });
  });

  /* ---------- FAQ: close others on open ---------- */
  const items = document.querySelectorAll(".faq__item");
  items.forEach((item) =>
    item.addEventListener("toggle", () => {
      if (item.open) items.forEach((other) => other !== item && (other.open = false));
    })
  );
})();
