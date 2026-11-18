/* Blog: reads articles from the Elanster CMS when it is set up, otherwise shows the built-in articles.
   To connect the CMS, fill CMS_URL (your CMS web address, no slash at the end) and KEY (the website's read-only key). */
(function () {
  "use strict";
  var CFG = window.ELANSTER_CMS || {};   // set in js/cms-config.js
  var CMS_URL = CFG.url || "", SITE = CFG.site || "elanster", KEY = CFG.key || "";

  var FALLBACK = [
    { slug: "why-most-ai-products-fail-after-launch-and-what-production-ready-actually-means", title: "Why most AI products fail after launch — and what production-ready actually means",
      excerpt: "Most AI projects stall after the demo. Here is what separates the ones that survive production.", category: { name: "AI Strategy", slug: "ai-strategy" },
      image: "https://images.unsplash.com/photo-1746286720965-cccf57e56c68?auto=format&fit=crop&w=1200&h=750&q=70", alt: "Laptop showing an AI code editor", content: "" },
    { slug: "how-much-does-it-cost-to-build-an-ai-product-a-real-breakdown", title: "How much does it cost to build an AI product? A real breakdown",
      excerpt: "What actually decides where your build lands, and where budgets quietly leak.", category: { name: "AI Economics", slug: "ai-economics" },
      image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&w=1200&h=750&q=70", alt: "Stacks of coins on a table", content: "" },
    { slug: "vibe-coding-technical-debt-what-happens-to-your-codebase-at-month-six", title: "Vibe coding technical debt: what happens to your codebase at month six",
      excerpt: "AI-assisted coding ships fast until debugging eats the gains. Here is when to bring in engineers.", category: { name: "AI Engineering", slug: "ai-engineering" },
      image: "https://images.unsplash.com/photo-1763568258244-9d5aa9c3ce45?auto=format&fit=crop&w=1200&h=750&q=70", alt: "Laptop screen with code and an orange glow", content: "" }
  ];

  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var fmt = function (d) { if (!d) return ""; var x = new Date(d); return isNaN(x) ? "" : x.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); };
  var mins = function (html) { var w = String(html || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length; return w > 120 ? Math.max(1, Math.round(w / 200)) + " min read" : ""; };
  var norm = function (b) {
    return { slug: b.slug, title: b.title, excerpt: b.excerpt || "", content: b.content || "", date: b.publishedAt || "",
      category: b.category || { name: "Insights", slug: "insights" }, author: b.author || "",
      image: b.image || (b.featuredImage && b.featuredImage.url) || "", alt: b.alt || (b.featuredImage && b.featuredImage.alt) || "",
      seo: b.seo || null };
  };
  var api = function (path) {
    return fetch(CMS_URL + "/api/v1/websites/" + SITE + path, { headers: { "X-API-Key": KEY } }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
  };
  var useCms = function () { return !!(CMS_URL && KEY); };
  var loadList = function () {
    if (!useCms()) return Promise.resolve(FALLBACK.map(norm));
    return api("/blogs?limit=50").then(function (d) { return d.items.map(norm); }).catch(function () { return FALLBACK.map(norm); });
  };
  var loadOne = function (slug) {
    if (!useCms()) return Promise.resolve(FALLBACK.map(norm).filter(function (b) { return b.slug === slug; })[0] || null);
    return api("/blogs/" + encodeURIComponent(slug)).then(norm).catch(function () { return FALLBACK.map(norm).filter(function (b) { return b.slug === slug; })[0] || null; });
  };

  var cats = [];
  var badge = function (b) { var i = Math.max(0, cats.indexOf(b.category.slug)) % 4; return '<span class="bl-badge bl-badge--' + i + '">' + esc(b.category.name) + "</span>"; };
  var cover = function (b, cls) { return b.image ? '<img class="' + cls + '" src="' + esc(b.image) + '" alt="' + esc(b.alt || b.title) + '" loading="lazy">' : '<div class="bl-ph"></div>'; };
  var meta = function (b) { var m = [fmt(b.date), mins(b.content), b.author].filter(Boolean); return m.length ? '<div class="bl-meta">' + m.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("<span>·</span>") + "</div>" : ""; };
  var href = function (b) { return "article.html?slug=" + encodeURIComponent(b.slug); };
  var TAGS = ["orange", "blue", "lime"];
  var postHtml = function (b) {
    var t = TAGS[Math.max(0, cats.indexOf(b.category.slug)) % 3];
    return '<a class="post" href="' + href(b) + '">' + (b.image ? '<img class="post__photo" src="' + esc(b.image) + '" alt="' + esc(b.alt || b.title) + '" loading="lazy" width="800" height="480">' : "") +
      '<span class="post__tag post__tag--' + t + '">' + esc(b.category.name) + "</span><h3>" + esc(b.title) + "</h3><p>" + esc(b.excerpt) + '</p><span class="post__link">Read article &rarr;</span></a>';
  };
  var featHtml = function (b) {
    return '<a class="bl-feat" href="' + href(b) + '">' + cover(b, "bl-feat__img") + '<div class="bl-feat__body">' + badge(b) +
      "<h2>" + esc(b.title) + "</h2><p>" + esc(b.excerpt) + "</p>" + meta(b) + '<span class="bl-more">Read article &rarr;</span></div></a>';
  };
  var cardHtml = function (b) {
    return '<a class="bl-card" href="' + href(b) + '">' + cover(b, "bl-card__img") + badge(b) + "<h3>" + esc(b.title) + "</h3><p>" + esc(b.excerpt) + "</p>" + meta(b) + '<span class="bl-more">Read article &rarr;</span></a>';
  };

  function initList() {
    var root = document.getElementById("blogApp"); if (!root) return;
    loadList().then(function (posts) {
      posts.forEach(function (p) { if (cats.indexOf(p.category.slug) < 0) cats.push(p.category.slug); });
      root.innerHTML = posts.length ? posts.map(postHtml).join("") : "<p>No articles yet.</p>";
    });
  }

  function showArticle(root, a, all) {
    all.forEach(function (p) { if (cats.indexOf(p.category.slug) < 0) cats.push(p.category.slug); });
    if (!a) { root.innerHTML = '<a class="art__back" href="blog.html">&larr; All articles</a><h1>Article not found</h1><p class="art__lede">It may have been unpublished or moved.</p>'; return; }
    if (cats.indexOf(a.category.slug) < 0) cats.push(a.category.slug);
    document.title = ((a.seo && a.seo.title) || a.title) + " | Elanster";
    var md = document.querySelector('meta[name="description"]'); if (md) md.content = (a.seo && a.seo.description) || a.excerpt;
    var body = a.content ? a.content : '<p class="art__note">The full article is being prepared and will be published here soon.</p>';
    var more = all.filter(function (p) { return p.slug !== a.slug; }).slice(0, 3);
    root.innerHTML = '<a class="art__back" href="blog.html">&larr; All articles</a>' + badge(a) + "<h1>" + esc(a.title) + "</h1>" +
      '<p class="art__lede">' + esc(a.excerpt) + "</p>" + meta(a) + (a.image ? '<img class="art__cover" src="' + esc(a.image) + '" alt="' + esc(a.alt || a.title) + '">' : "") +
      '<div class="art__body">' + body + "</div>" +
      (more.length ? '<div class="art__more"><h2>Keep reading</h2><div class="insights__grid">' + more.map(postHtml).join("") + "</div></div>" : "");
  }
  function initArticle() {
    var root = document.getElementById("articleApp"); if (!root) return;
    var preview = /[?&]cms-preview=1/.test(location.search) && window.parent !== window;
    if (preview) {                                   // inside the CMS editor: show the draft the editor sends, in this real design
      loadList().then(function (all) {
        window.addEventListener("message", function (e) {
          var d = e.data; if (!d || d.source !== "elanster-cms" || d.type !== "article") return;
          showArticle(root, norm(d.article), all);
        });
        window.parent.postMessage({ source: "elanster-site", type: "ready" }, "*");
      });
      return;
    }
    var slug = new URLSearchParams(location.search).get("slug") || "";
    Promise.all([loadOne(slug), loadList()]).then(function (r) { showArticle(root, r[0] || null, r[1]); });
  }
  initList(); initArticle();
})();
