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
  if (viewport && document.getElementById("svcTotal")) {
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
  }

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


  /* ---------- Theme layer motion (scoped to the themed sections only; hero / work / footer untouched) ---------- */
  const THEMED = ".trusted, .about, .why, .services, .culture, .cta, .insights, .faq, .tech, .process";
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* staggered reveal: siblings enter one after another */
  document.querySelectorAll(THEMED).forEach((sec) => {
    const groups = new Map();
    sec.querySelectorAll(".reveal").forEach((el) => {
      const list = groups.get(el.parentElement) || [];
      list.push(el);
      groups.set(el.parentElement, list);
    });
    groups.forEach((list) => list.forEach((el, i) => el.style.setProperty("--rd", Math.min(i * 0.07, 0.42) + "s")));
  });

  /* about lede: words light up as you scroll */
  const lede = document.querySelector(".about__lede");
  if (lede && !calm) {
    lede.innerHTML = lede.textContent.trim().split(/\s+/).map((w) => '<span class="w">' + w + "</span>").join(" ");
    const words = lede.querySelectorAll(".w");
    let ticking = false;
    const paint = () => {
      ticking = false;
      const r = lede.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (vh * 0.3 + r.height)));
      words.forEach((w, i) => w.classList.toggle("is-lit", (i + 1) / words.length <= p + 0.02));
    };
    const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    paint();
  }

  /* cards: pointer-follow glow + gentle tilt */
  if (finePointer && !calm) {
    document.querySelectorAll(".why-card, .svc-card, .post, .culture-row, .tcards li").forEach((c) => {
      c.classList.add("fx-on");
      if (c.matches(".svc-card, .tcards li")) c.classList.add("fx-flat");
      const g = document.createElement("span");
      g.className = "fx-glow";
      g.setAttribute("aria-hidden", "true");
      c.appendChild(g);
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty("--mx", x * 100 + "%");
        c.style.setProperty("--my", y * 100 + "%");
        const dx = x - 0.5, dy = y - 0.5, m = Math.min(1, Math.hypot(dx, dy) * 2);
        c.style.rotate = (-dy).toFixed(3) + " " + dx.toFixed(3) + " 0 " + (m * 3.2).toFixed(2) + "deg";
      });
      c.addEventListener("pointerleave", () => { c.style.rotate = "none"; });
    });

    /* cursor dot + trailing ring, only while over the themed sections */
    const ring = document.createElement("div"), dot = document.createElement("div");
    ring.className = "fx-ring"; dot.className = "fx-dot";
    ring.setAttribute("aria-hidden", "true"); dot.setAttribute("aria-hidden", "true");
    document.body.append(ring, dot);
    let tx = 0, ty = 0, rx = 0, ry = 0, seen = false, loop = null;
    const spin = () => {
      rx += (tx - rx) * 0.16; ry += (ty - ry) * 0.16;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      loop = seen ? requestAnimationFrame(spin) : null;
    };
    const hide = () => { ring.classList.remove("on"); dot.classList.remove("on"); seen = false; };
    window.addEventListener("pointermove", (e) => {
      if (!e.target.closest || !e.target.closest(THEMED)) return hide();
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = "translate(" + tx + "px," + ty + "px)";
      if (!seen) { seen = true; rx = tx; ry = ty; ring.classList.add("on"); dot.classList.add("on"); }
      if (!loop) loop = requestAnimationFrame(spin);
      ring.classList.toggle("big", !!e.target.closest("a, button, summary, .why-card, .svc-card, .post, .culture-row, .tcards li"));
    }, { passive: true });
    document.addEventListener("pointerleave", hide);
  }

  /* slow parallax on the CTA arc pattern */
  const ctaPattern = document.querySelector(".cta__pattern");
  if (ctaPattern && !calm) {
    const cta = ctaPattern.closest(".cta");
    let pt = false;
    const move = () => {
      pt = false;
      const r = cta.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const prog = (vh - r.top) / (vh + r.height);
      ctaPattern.style.setProperty("--py", (0.5 - prog) * 70 + "px");
    };
    window.addEventListener("scroll", () => { if (!pt) { pt = true; requestAnimationFrame(move); } }, { passive: true });
    move();
  }


  /* side section dots (shown once the hero has scrolled out of view) */
  if (window.matchMedia("(min-width: 900px)").matches) {
    const defs = [["top", "Home"], ["work", "Work"], ["about", "About"], ["services", "Services"], ["tech", "Capabilities"], ["process", "Process"], ["culture", "Culture"], ["contact", "Contact"], ["insights", "Insights"], ["faq", "FAQ"]]
      .map(([id, label]) => [document.getElementById(id), id, label]).filter(([el]) => el);
    const side = document.createElement("nav");
    side.className = "fx-side";
    side.setAttribute("aria-label", "Page sections");
    defs.forEach(([, id, label]) => {
      const a = document.createElement("a");
      a.href = "#" + id; a.dataset.t = label; a.setAttribute("aria-label", label);
      a.appendChild(document.createElement("i"));
      side.appendChild(a);
    });
    document.body.appendChild(side);
    const dots = side.querySelectorAll("a");
    let st = false;
    const sync = () => {
      st = false;
      const mid = window.innerHeight * 0.4;
      let cur = 0;
      defs.forEach(([el], i) => { if (el.getBoundingClientRect().top <= mid) cur = i; });
      dots.forEach((d, i) => d.classList.toggle("on", i === cur));
      side.classList.toggle("is-on", window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", () => { if (!st) { st = true; requestAnimationFrame(sync); } }, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  }


  /* ---------- Round 2: work entrance, heading skew, magnetic buttons, label scramble ---------- */
  const TH2 = ".about, .why, .services, .culture, .cta, .insights, .faq, .tech, .process";
  if (!calm) {
    /* headings lean with scroll velocity */
    const heads = [...document.querySelectorAll(".section-title, .cta__title")].filter((h) => h.closest(TH2));
    let lastY = window.scrollY, lastT = performance.now(), sk = 0, target = 0, skRaf = null;
    const skLoop = () => {
      sk += (target - sk) * 0.2;
      target *= 0.9;
      const on = Math.abs(sk) > 0.01 || Math.abs(target) > 0.01;
      heads.forEach((h) => h.style.setProperty("--sk", (on ? sk : 0).toFixed(3) + "deg"));
      skRaf = on ? requestAnimationFrame(skLoop) : null;
    };
    window.addEventListener("scroll", () => {
      const now = performance.now(), y = window.scrollY, dt = Math.max(16, now - lastT);
      target = Math.max(-1.6, Math.min(1.6, ((y - lastY) / dt * 1000) / -700));
      lastY = y; lastT = now;
      if (!skRaf) skRaf = requestAnimationFrame(skLoop);
    }, { passive: true });

    /* magnetic buttons */
    if (finePointer) {
      document.querySelectorAll(".btn").forEach((b) => {
        if (!b.closest(TH2)) return;
        b.addEventListener("pointermove", (e) => {
          const r = b.getBoundingClientRect();
          b.style.translate = ((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1) + "px";
        });
        b.addEventListener("pointerleave", () => { b.style.translate = "none"; });
      });
    }

    /* mono labels scramble in once */
    const scramble = (el) => {
      const txt = el.textContent, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/_-+";
      let f = 0;
      const id = setInterval(() => {
        f++;
        el.textContent = txt.split("").map((c, i) => (c === " " || i < (f * txt.length) / 16 ? c : chars[Math.floor(Math.random() * chars.length)])).join("");
        if (f >= 16) { clearInterval(id); el.textContent = txt; }
      }, 35);
    };
    if ("IntersectionObserver" in window) {
      const sio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { scramble(e.target); sio.unobserve(e.target); } }), { threshold: 0.8 });
      document.querySelectorAll(".eyebrow").forEach((el) => { if (el.closest(".trusted, " + TH2)) sio.observe(el); });
    }
  }


  /* ---------- Smooth scrolling (Lenis, same settings as the reference) ---------- */
  let lenis = null;
  if (window.Lenis && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    try {
      lenis = new Lenis({ lerp: 0.12, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4, syncTouch: false });
      if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((t) => { if (lenis) lenis.raf(t * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        const lenisFrame = (time) => { if (lenis) { lenis.raf(time); requestAnimationFrame(lenisFrame); } };
        requestAnimationFrame(lenisFrame);
      }
      /* safety net: if the wheel turns but the page does not move, fall back to native scrolling */
      let wTimer = 0;
      window.addEventListener("wheel", (e) => {
        if (!lenis || e.ctrlKey) return;
        const y0 = window.scrollY, dir = Math.sign(e.deltaY);
        clearTimeout(wTimer);
        wTimer = setTimeout(() => {
          if (!lenis) return;
          const max = document.documentElement.scrollHeight - window.innerHeight;
          const atEdge = (dir > 0 && y0 >= max - 2) || (dir < 0 && y0 <= 2);
          if (!atEdge && Math.abs(window.scrollY - y0) < 1) {
            lenis.destroy(); lenis = null;
            document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-scrolling", "lenis-stopped");
          }
        }, 350);
      }, { passive: true });
    } catch (err) { lenis = null; }
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || !lenis) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: id === "#top" ? 0 : -84, duration: 1.1 });
  });


  /* ---------- Round 3: pill marquee, particles, glow parallax ---------- */
  if (!calm) {
    /* "Trusted by" chips -> two counter-moving marquee rows (duplicates are hidden from assistive tech) */
    const chipsUl = document.querySelector(".trusted__chips");
    if (chipsUl) {
      const rows = document.createElement("div");
      rows.className = "fx-mq";
      chipsUl.parentNode.insertBefore(rows, chipsUl);
      const items = [...chipsUl.children];
      const build = (ul, list, hideAll) => {
        ul.innerHTML = "";
        for (let c = 0; c < 3; c++) list.forEach((li) => {
          const n = li.cloneNode(true);
          if (hideAll || c > 0) n.setAttribute("aria-hidden", "true");
          ul.appendChild(n);
        });
      };
      const rev = chipsUl.cloneNode(false);
      rev.classList.add("trusted__chips--rev");
      rev.setAttribute("aria-hidden", "true");
      rev.removeAttribute("role");
      build(rev, items.slice().reverse(), true);
      build(chipsUl, items, false);
      rows.append(chipsUl, rev);
      rows.classList.add("reveal");
      rows.classList.add("is-visible");
    }

    /* floating particles in About */
    const aboutSec = document.querySelector(".about");
    if (aboutSec) {
      for (let i = 0; i < 14; i++) {
        const d = document.createElement("i");
        d.className = "fx-spark";
        d.setAttribute("aria-hidden", "true");
        d.style.cssText = "left:" + (4 + Math.random() * 92).toFixed(1) + "%;top:" + (20 + Math.random() * 70).toFixed(1) + "%;--sz:" + (2 + Math.random() * 2.5).toFixed(1) + "px;--d:" + (7 + Math.random() * 7).toFixed(1) + "s;--dl:" + (Math.random() * 8).toFixed(1) + "s";
        aboutSec.appendChild(d);
      }
    }

    /* glow layers drift against the scroll */
    const parSecs = [...document.querySelectorAll(".trusted, .about, .why, .services, .culture, .insights, .faq, .tech, .process")];
    let pq = false;
    const parallax = () => {
      pq = false;
      const vh = window.innerHeight;
      parSecs.forEach((sec) => {
        const r = sec.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
        sec.style.setProperty("--par", (-p * 50).toFixed(1) + "px");
      });
    };
    window.addEventListener("scroll", () => { if (!pq) { pq = true; requestAnimationFrame(parallax); } }, { passive: true });
    parallax();
  }


  /* ---------- Round 4: manifesto fill, capability marquee, process flow ---------- */
  const mfTexts = [...document.querySelectorAll(".mf-t")];
  if (calm) mfTexts.forEach((m) => m.style.setProperty("--p", 100));
  else if (mfTexts.length) {
    const mfGlow = document.querySelector(".mf-glow"), mfSec = document.querySelector(".manifesto");
    let mq2 = false;
    const mfPaint = () => {
      mq2 = false;
      const vh = window.innerHeight;
      mfTexts.forEach((m) => {
        const top = m.getBoundingClientRect().top;
        m.style.setProperty("--p", (Math.max(0, Math.min(1, (vh * 0.88 - top) / (vh * 0.5))) * 100).toFixed(1));
      });
      if (mfGlow && mfSec) {
        const r = mfSec.getBoundingClientRect(), g = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        mfGlow.style.setProperty("--gs", (0.5 + g * 0.65).toFixed(3));
        mfGlow.style.setProperty("--go", (0.2 + Math.sin(g * Math.PI) * 0.8).toFixed(3));
      }
    };
    window.addEventListener("scroll", () => { if (!mq2) { mq2 = true; requestAnimationFrame(mfPaint); } }, { passive: true });
    window.addEventListener("resize", mfPaint);
    mfPaint();
  }

  const mqRows = [...document.querySelectorAll(".mq-row")];
  if (mqRows.length && !calm) {
    const mqs = mqRows.map((row) => {
      const first = row.querySelector(".mq-in");
      const copy = first.cloneNode(true);
      row.appendChild(copy);
      return { parts: [first, copy], dir: +row.dataset.dir, x: +row.dataset.dir < 0 ? 0 : -1 };
    });
    let boost = 1, lastMy = window.scrollY, lastMt = performance.now();
    window.addEventListener("scroll", () => {
      const now = performance.now(), y = window.scrollY;
      boost = 1 + Math.min(Math.abs((y - lastMy) / Math.max(16, now - lastMt) * 1000) / 260, 7);
      lastMy = y; lastMt = now;
    }, { passive: true });
    const mqTick = () => {
      boost += (1 - boost) * 0.06;
      mqs.forEach((m) => {
        const w = m.parts[0].offsetWidth;
        if (!w) return;
        m.x += m.dir * 0.6 * boost;
        if (m.x <= -w) m.x += w;
        if (m.x > 0) m.x -= w;
        m.parts.forEach((p) => { p.style.transform = "translate3d(" + m.x + "px,0,0)"; });
      });
      requestAnimationFrame(mqTick);
    };
    requestAnimationFrame(mqTick);
  } else if (mqRows.length) {
    mqRows.forEach((row) => { row.style.flexWrap = "wrap"; });
  }

  const ppWrap = document.querySelector(".pp-pills");
  if (ppWrap) {
    const pills = [...ppWrap.querySelectorAll(".ppill")], flow = ppWrap.querySelector(".pp-flow");
    let k = 0;
    const step = () => { pills.forEach((p, i) => p.classList.toggle("on", i === k)); k = (k + 1) % pills.length; };
    step();
    if (!calm) setInterval(step, 2000);
    let dotRaf = null;
    const drawFlow = () => {
      const w = ppWrap.offsetWidth, h = ppWrap.offsetHeight;
      flow.setAttribute("viewBox", "0 0 " + w + " " + h);
      let d = "";
      for (let i = 0; i < pills.length - 1; i++) {
        const a = pills[i], b = pills[i + 1];
        const x1 = a.offsetLeft + a.offsetWidth * 0.3, y1 = a.offsetTop + a.offsetHeight;
        const x2 = b.offsetLeft + b.offsetWidth * 0.18, y2 = b.offsetTop + b.offsetHeight / 2;
        d += "M" + x1 + " " + y1 + " C " + x1 + " " + y2 + ", " + (x1 + 20) + " " + y2 + ", " + x2 + " " + y2 + " ";
      }
      flow.innerHTML = '<path class="fl" d="' + d + '"/><circle class="tr" r="4.5"/>';
      if (calm) return;
      const path = flow.querySelector(".fl"), dot = flow.querySelector(".tr"), len = path.getTotalLength();
      cancelAnimationFrame(dotRaf);
      const t0 = performance.now();
      const run = (now) => {
        const pt = path.getPointAtLength((((now - t0) / 5000) % 1) * len);
        dot.setAttribute("cx", pt.x); dot.setAttribute("cy", pt.y);
        dotRaf = requestAnimationFrame(run);
      };
      dotRaf = requestAnimationFrame(run);
    };
    drawFlow();
    window.addEventListener("resize", drawFlow);
    window.addEventListener("load", drawFlow);
    setTimeout(drawFlow, 500);
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

/* Decorative wavy ribbons + sparkles across themed sections */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cfg = [
    ['.trusted',  null,         'white', '18%', 0.9],
    ['.about',    null,         'blue', '70%', 0.3],
    ['.why',      '.container', 'blue', '38%', 0.22],
    ['.services', null,         'white', '10%', 0.9],
    ['.manifesto',null,         'white', '30%', 0.45],
    ['.tech',     null,         'white', '58%', 0.8],
    ['.process',  '.container', 'blue', '62%', 0.2],
    ['.culture',  null,         'white', '68%', 0.5],
    ['.cta',      null,         'lime', '52%', 0.25],
    ['.insights', null,         'white', '4%',  0.75],
    ['.faq',      null,         'white', '50%', 0.9]
  ];
  var stars = [
    ['6%', '12%', 'indigo', 26], ['92%', '22%', 'coral', 20], ['88%', '82%', 'indigo', 30], ['10%', '78%', 'lime', 22]
  ];
  cfg.forEach(function (c, i) {
    var sec = document.querySelector(c[0]);
    if (!sec) return;
    var host = c[1] ? sec.querySelector(c[1]) : sec;
    if (!host) return;
    host.classList.add('fx-wave-host');
    var w = document.createElement('div');
    w.className = 'fx-wave fx-wave--' + c[2];
    w.setAttribute('aria-hidden', 'true');
    w.style.setProperty('--wt', c[3]);
    w.style.setProperty('--wo', c[4]);
    w.style.setProperty('--wd', (26 + (i % 4) * 5) + 's');
    if (i % 2) w.style.setProperty('--wdir', 'reverse');
    host.insertBefore(w, host.firstChild);
    var pick = stars.slice(i % 2, (i % 2) + 2 + (i % 2));
    pick.forEach(function (s, k) {
      var st = document.createElement('i');
      st.className = 'fx-star2 fx-star2--' + s[2];
      st.setAttribute('aria-hidden', 'true');
      st.style.left = s[0]; st.style.top = s[1];
      st.style.width = st.style.height = s[3] + 'px';
      st.style.animationDelay = (-(i + k) * 0.7) + 's';
      host.insertBefore(st, host.firstChild);
    });
  });
  if (reduce) document.documentElement.classList.add('fx-still');
})();

/* Brand-book logo-arc pieces as corner decoration */
(function () {
  var cfg = [
    ['.trusted', 'br', 'blue'], ['.services', 'bl', 'coral'], ['.manifesto', 'br', 'blue'],
    ['.tech', 'bl', 'lime'], ['.culture', 'br', 'coral'], ['.insights', 'bl', 'blue'], ['.faq', 'br', 'lime']
  ];
  cfg.forEach(function (c) {
    var host = document.querySelector(c[0]);
    if (!host) return;
    var a = document.createElement('i');
    a.className = 'fx-arc fx-arc--' + c[1] + ' fx-arc--' + c[2];
    a.setAttribute('aria-hidden', 'true');
    host.insertBefore(a, host.firstChild);
  });
})();

/* Outlined closing words in section titles (hero-style emphasis) */
(function () {
  document.querySelectorAll('.services .section-title, .tech .section-title, .culture .section-title, .insights .section-title, .faq .section-title, .why .section-title, .process .section-title, .cta__title, .cta .section-title').forEach(function (h) {
    if (h.children.length || h.dataset.ol) return;
    var words = h.textContent.trim().split(/\s+/);
    if (words.length < 3) return;
    var n = Math.max(1, Math.round(words.length * 0.4));
    var head = words.slice(0, words.length - n).join(' ');
    var tail = words.slice(words.length - n).join(' ');
    h.textContent = '';
    h.appendChild(document.createTextNode(head + ' '));
    var s = document.createElement('span'); s.className = 'ol'; s.textContent = tail; h.appendChild(s);
    h.dataset.ol = '1';
  });
})();

/* Italic serif accent on the last word of card titles */
(function () {
  document.querySelectorAll('.svc-card h3, .culture-row h3').forEach(function (h) {
    if (h.children.length) return;
    var w = h.textContent.trim().split(/\s+/);
    if (w.length < 2) return;
    var last = w.pop();
    h.textContent = w.join(' ') + ' ';
    var em = document.createElement('em'); em.textContent = last; h.appendChild(em);
  });
})();

/* Floating animated decorations (sparkle, ring, plus, blob) in a few sections */
(function () {
  var plan = {
    '.services':  [['spark','4%','12%','indigo',34], ['ring','94%','8%','coral',46], ['plus','95%','86%','lime',26]],
    '.manifesto': [['ring','5%','14%','indigo',44], ['spark','93%','18%','coral',30], ['blob','8%','82%','blue',40]],
    '.tech':      [['spark','5%','10%','coral',32], ['plus','94%','14%','indigo',26], ['ring','93%','84%','lime',48]],
    '.culture':   [['blob','4%','8%','lime',44], ['spark','95%','10%','indigo',30], ['ring','5%','88%','coral',40]],
    '.insights':  [['spark','95%','14%','coral',32], ['ring','3%','10%','blue',42], ['plus','94%','90%','indigo',24]],
    '.faq':       [['spark','5%','78%','indigo',32], ['blob','93%','12%','lime',46], ['plus','4%','10%','coral',24]]
  };
  Object.keys(plan).forEach(function (sel, i) {
    var host = document.querySelector(sel);
    if (!host) return;
    plan[sel].forEach(function (p, k) {
      var el = document.createElement('i');
      el.className = 'fx-float fx-float--' + p[0] + ' fx-float--' + p[3];
      el.setAttribute('aria-hidden', 'true');
      el.style.left = p[1]; el.style.top = p[2];
      el.style.width = el.style.height = p[4] + 'px';
      el.style.animationDelay = (-(i * 1.3 + k * 2.1)) + 's';
      el.style.animationDuration = (6 + ((i + k) % 4) * 1.5) + 's';
      host.insertBefore(el, host.firstChild);
    });
  });
})();

/* Why cards: fly-in + 3D tilt */
(function(){
  var grid=document.querySelector('.why__grid'); if(!grid) return;
  var cards=[].slice.call(grid.querySelectorAll('.why-card'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){ if(en[0].isIntersecting){ grid.classList.add('is-in'); io.disconnect(); } },{threshold:.25});
    io.observe(grid);
  } else grid.classList.add('is-in');
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover:hover)').matches) return;
  cards.forEach(function(c){
    c.addEventListener('pointermove',function(e){
      var r=c.getBoundingClientRect(), dx=(e.clientX-r.left)/r.width-.5, dy=(e.clientY-r.top)/r.height-.5;
      c.classList.add('tilting');
      c.style.rotate=(dy*2).toFixed(3)+' '+(-dx*2).toFixed(3)+' 0 '+(Math.hypot(dx,dy)*16).toFixed(2)+'deg';
    });
    c.addEventListener('pointerleave',function(){ c.classList.remove('tilting'); c.style.rotate=''; });
  });
})();

/* Why: energy beams from the center orb to the cards */
(function(){
  var grid=document.querySelector('.why__grid'); if(!grid) return;
  var NS='http://www.w3.org/2000/svg', svg=document.createElementNS(NS,'svg'); svg.setAttribute('class','why-beams'); svg.setAttribute('aria-hidden','true');
  grid.appendChild(svg);
  var cols=['#E2F8AC','#4B46E0','#4B46E0','#F0553F','#F0553F'];
  function draw(){
    if(window.innerWidth<=900){ svg.innerHTML=''; return; }
    var cards=grid.querySelectorAll('.why-card'); if(cards.length<5) return;
    var g={width:grid.offsetWidth};
    /* layout positions (offset*) ignore the entrance/idle transforms, so the beams always land on the real card edges */
    var r=function(i){var e=cards[i]; return {l:e.offsetLeft,r:e.offsetLeft+e.offsetWidth,t:e.offsetTop,b:e.offsetTop+e.offsetHeight,w:e.offsetWidth,h:e.offsetHeight};};
    var c1=r(0),c3=r(2),c2=r(1),c5=r(4);
    var ring=parseFloat(getComputedStyle(grid,'::after').width)||270;
    var cx=(c1.r+c2.l)/2, cy=(c1.t+c3.b)/2, R=ring/2;
    var p=[
      [c1.r, c1.t+c1.h/2, -1,-1],[c2.l, c2.t+c2.h/2, 1,-1],[c3.r, c3.t+c3.h/2, -1,1],[r(3).l, r(3).t+r(3).h/2, 1,1],[c5.l+c5.w/2, c5.t, 0,1]
    ], out='';
    p.forEach(function(q,i){
      var sx=cx+q[2]*R*0.72, sy=cy+q[3]*R*0.72; if(i===4){sx=cx; sy=cy+R;}
      var mx=(sx+q[0])/2, my=(sy+q[1])/2+(i===4?0:(q[3]*14));
      out+='<path d="M'+sx.toFixed(1)+' '+sy.toFixed(1)+' Q'+mx.toFixed(1)+' '+my.toFixed(1)+' '+q[0].toFixed(1)+' '+q[1].toFixed(1)+'" stroke="'+cols[i]+'"></path>';
    });
    svg.innerHTML=out;
  }
  draw(); window.addEventListener('resize',draw); window.addEventListener('load',draw); [300,900,1800,3000].forEach(function(t){setTimeout(draw,t)});
  if(window.MutationObserver) new MutationObserver(function(){draw();setTimeout(draw,1500)}).observe(grid,{attributes:true,attributeFilter:['class']});
})();
