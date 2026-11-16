# 01 · Website audit — Elanster v7

Scope: all 12 HTML pages, `css/style.css`, `css/pages.css`, `js/script.js`, `js/pages.js`, assets, plus the live homepage (https://www.elanster.com/) as fetched on 2026-11-13.
Method: file inspection, headless-browser run of every page at 375px and 1280px (console, failed requests, internal links, anchors, horizontal overflow, H1 count), keyboard focus check, interaction tests.
Priority: **P1** = fix before launch, **P2** = next sprint, **P3** = polish.

## What the audit verified (passes)
- 12/12 pages: one H1, no horizontal overflow at 375px or 1280px, no broken internal links or anchors, no failed local requests, no JavaScript errors. (The only console errors in my test were Google Fonts, blocked by my sandbox, not a site fault.)
- The site contains no raster `<img>`; all art is inline SVG or canvas, so there are no heavy images to compress.
- GSAP animations are skipped under `prefers-reduced-motion` in `js/script.js`.

## Issues

| # | Area | Current problem | Why it matters | Recommendation | Pri | Where |
|---|---|---|---|---|---|---|
| 1 | Trust | No named clients, logos, testimonials, certifications or verified outcomes anywhere. | B2B buyers look for proof first; every competitor reviewed shows some. | Supply real, approved proof (see REPORTS/10 "Missing content"). Do not invent. | P1 | Home "Work"/"Why"; `work.html` |
| 2 | Trust/Legal | "Terms of Service" and "Privacy Notice" link to `#top`. | Placeholder links; a privacy notice is expected once any analytics is added. | Publish real legal pages, then link them. Needs legal text from the business. | P1 | `index.html` footer |
| 3 | Contact | No email, phone or contact form; the only path is the `meete.be` booking link and LinkedIn. | Visitors who won't book a call have no way to reach you. | Provide a monitored email and/or decide on a form backend. | P1 | All footers |
| 4 | Claims | "80% less manual review" appears on the Document Intelligence card, but the projects are illustrative, not client results. | An unverified statistic is a credibility and compliance risk. | Remove the number or replace it with a verified result. | P1 | `js/script.js` line 14 |
| 5 | Live site | The fetched live homepage shows stat counters as 0 without JavaScript ("0 Years of delivery"). Not present in the local v7 markup. | Crawlers, AI engines and no-JS users read 0. | Confirm the deployed build matches v7; put final values in the HTML and animate up. | P1 | Live site vs v7 |
| 6 | Brand | Brief asks to keep the orange/red identity, but v39/v40 deliberately moved to blue/black (CSS variable `--orange` is now indigo). | Possible mismatch between intent and implementation. | Decide the palette; one-variable change in `:root`. | P2 | `css/style.css` `:root` |
| 7 | Conversion | Single conversion path (30-min call). No lower-commitment step. | Many visitors aren't ready to book. | Done: project-fit tool added (see report 09). Next: a downloadable guide once content exists. | P2 | Home |
| 8 | Measurement | No analytics or event tracking. | Cannot tell which CTAs or pages produce leads. | Done: event layer added. Next: connect GA4/GTM and add a privacy notice. | P2 | `js/track.js` |
| 9 | Accessibility | `pages.css` had no focus-visible styling and smooth-scroll ignored reduced-motion. | Keyboard users lose their place. | Done. Home already had focus styles. | P2 | `css/pages.css` |
| 10 | Content depth | 6 blog posts are short sample drafts (about 4–5 KB of HTML each); no dates, authors or sources. | Thin content ranks poorly and gives AI engines little to cite. | Replace with real, author-attributed articles. | P2 | `blog-*.html` |
| 11 | Content | Careers has no roles ("open application" only). | Fine if true; just ensure it is current. | Keep honest. | P3 | `careers.html` |
| 12 | Structure | Home is long (about 11,000px); two inconsistent nav systems (home vs sub-pages). | Slower orientation. | Unify nav in a later pass. | P3 | `index.html`, sub-pages |
| 13 | Performance | `three.min.js` (603 KB) loads on every home visit, including mobile. | Largest single JS cost. | Lazy-load Three.js after first paint or only on desktop. Not changed here. Needs a performance test on real devices. | P2 | `index.html` scripts |
| 14 | SEO | Earlier version had no meta, canonical, schema, sitemap. | Weak search/AI visibility. | Done (see SEO folder). | P1 | All pages |

## Not audited (be aware)
- Real-device performance (Lighthouse/Core Web Vitals): no network access to the deployed site from the test environment, so no scores are claimed.
- Contrast ratios were not measured numerically.
- The deployed site was only read as text, not visually.
