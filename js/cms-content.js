/* Framer-style content connection: the page design stays in HTML, the text comes from the CMS.
   Every editable text carries a data-cms="key" attribute. Published text from the CMS replaces it on load.
   If the CMS is unreachable the text already in the HTML is shown, so the site never breaks. */
(function () {
  "use strict";
  var cfg = window.ELANSTER_CMS || {};
  var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var MAP = { "index.html": "home", "work.html": "products", "services.html": "services", "careers.html": "culture", "process.html": "process", "blog.html": "insights" };
  // Any page works: known files use the map, other pages use the name in their tags (data-cms="privacy.x" → "privacy").
  var firstTag = document.querySelector('[data-cms]:not([data-cms^="global."])');
  var slug = MAP[file] || (firstTag ? firstTag.getAttribute("data-cms").split(".")[0] : ""); if (!slug) return;
  var edit = /[?&]cms-edit=1/.test(location.search) && window.parent !== window;
  var norm = function (s) { return String(s).replace(/\s+/g, " ").trim(); };

  function setText(el, text) {
    if (norm(el.textContent) === norm(text)) return;
    if (el.hasAttribute("data-cms-wrap")) {                       // keeps the spaces around the text
      var m = /^(\s*)[\s\S]*?(\s*)$/.exec(el.textContent); el.textContent = m[1] + text + m[2]; return;
    }
    var hasKids = Array.prototype.some.call(el.childNodes, function (n) { return n.nodeType === 1; });
    if (!hasKids) { el.textContent = text; return; }
    var words = text.split(/\s+/);                                // heading was split by the page script: rebuild the same way
    var last = el.lastElementChild;
    if (el.dataset.ol && words.length > 1) {
      var n = Math.max(1, Math.round(words.length * 0.4));
      el.textContent = words.slice(0, words.length - n).join(" ") + " ";
      var s = document.createElement("span"); s.className = "ol"; s.textContent = words.slice(words.length - n).join(" "); el.appendChild(s);
    } else if (last && last === el.lastChild && words.length > 1) {
      var tag = last.tagName.toLowerCase(), cls = last.className;
      el.textContent = words.slice(0, -1).join(" ") + " ";
      var e = document.createElement(tag); e.className = cls; e.textContent = words[words.length - 1]; el.appendChild(e);
    } else el.textContent = text;
  }
  function metaSet(sel, v) { var m = document.querySelector(sel); if (m) m.setAttribute("content", v); }
  function apply(values) {
    Object.keys(values).forEach(function (key) {
      var v = values[key];
      if (key === slug + ".seo.title") { document.title = v; metaSet('meta[property="og:title"]', v); metaSet('meta[name="twitter:title"]', v); return; }
      if (key === slug + ".seo.description") { metaSet('meta[name="description"]', v); metaSet('meta[property="og:description"]', v); metaSet('meta[name="twitter:description"]', v); return; }
      var k = key.replace(/"/g, "");
      if (/\.link$/.test(k)) { document.querySelectorAll('[data-cms-link="' + k + '"]').forEach(function (el) { if (el.getAttribute("href") !== v) el.setAttribute("href", v); }); return; }
      if (/\.alt$/.test(k)) { document.querySelectorAll('[data-cms-img="' + k.replace(/\.alt$/, "") + '"]').forEach(function (el) { el.setAttribute("alt", v); }); return; }
      var imgs = document.querySelectorAll('[data-cms-img="' + k + '"]');
      if (imgs.length) { imgs.forEach(function (el) { if (el.getAttribute("src") !== v) { el.removeAttribute("srcset"); el.setAttribute("src", v); } }); return; }
      document.querySelectorAll('[data-cms="' + k + '"]').forEach(function (el) { setText(el, v); });
    });
  }
  var ready = function (fn) { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn(); };

  /* ---------- Editor preview (inside the CMS): click to select, live updates ---------- */
  if (edit) {
    var st = document.createElement("style");
    st.textContent = "[data-cms],[data-cms-img]{cursor:pointer}[data-cms]:hover,[data-cms-img]:hover{outline:2px dashed #E65A33;outline-offset:3px}.cms-active{outline:2px solid #E65A33!important;outline-offset:3px;background:rgba(230,90,51,.1)}.reveal{opacity:1!important;transform:none!important}";
    document.head.appendChild(st);
    var post = function (m) { m.source = "elanster-site"; window.parent.postMessage(m, "*"); };
    document.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest("[data-cms],[data-cms-img]");
      if (e.target.closest && e.target.closest("a,button,summary")) e.preventDefault();
      if (!t) return; e.preventDefault(); e.stopPropagation();
      post({ type: "select", key: t.getAttribute("data-cms") || t.getAttribute("data-cms-img") });
    }, true);
    window.addEventListener("message", function (e) {
      var d = e.data; if (!d || d.source !== "elanster-cms") return;
      if (d.type === "values") apply(d.values);
      if (d.type === "focus") {
        document.querySelectorAll(".cms-active").forEach(function (x) { x.classList.remove("cms-active"); });
        var kk = String(d.key).replace(/"/g, "").replace(/\.(link|alt)$/, "");
        var el = document.querySelector('[data-cms="' + kk + '"],[data-cms-img="' + kk + '"]');
        if (el) { el.classList.add("cms-active"); el.scrollIntoView({ block: "center", behavior: "smooth" }); }
      }
    });
    window.addEventListener("load", function () { setTimeout(function () { post({ type: "ready", slug: slug }); }, 500); });
    return;
  }

  /* ---------- Live website: read published text from the CMS ---------- */
  if (!cfg.url || !cfg.key) return;
  var get = function (s) {
    return fetch(cfg.url + "/api/v1/websites/" + cfg.site + "/pages/" + s, { headers: { "X-API-Key": cfg.key } })
      .then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  };
  var cacheKey = "elanster-cms:" + slug;
  try { var c = JSON.parse(localStorage.getItem(cacheKey) || "null"); if (c) ready(function () { apply(c); }); } catch (e) { /* ignore */ }
  Promise.all([get(slug), get("_global")]).then(function (r) {
    var all = {}; r.forEach(function (p) { if (p && p.fields) Object.keys(p.fields).forEach(function (k) { all[k] = p.fields[k]; }); });
    try { localStorage.setItem(cacheKey, JSON.stringify(all)); } catch (e) { /* ignore */ }
    ready(function () { apply(all); });
  });
})();
