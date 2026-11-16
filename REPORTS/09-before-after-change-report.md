# 09 · Before / after change report

Backup of the originals: `_backup_pre_seo/` (HTML, CSS, JS from before any change). Delete before deploying.

| # | Page | Section | Before | After | Reason | Customer benefit | Business benefit | Files | Status | Testing |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | All 12 | `<head>` | Short titles/descriptions; no canonical, OG, Twitter or schema | Keyword-led titles and descriptions, canonical, OG/Twitter, geo meta, JSON-LD | Search and AI visibility | Accurate previews in search and when shared | Better discoverability | all `*.html` | Completed | JSON parses; lengths checked; schema not yet run in Google's validator |
| 2 | Home | FAQ | Rendered only by JavaScript | Six Q&As in static HTML + FAQPage schema | Crawlers and AI tools may not run JS | Answers visible without JS | AI/answer-engine eligibility | `index.html` | Completed | 6 `<details>` present at 1280px; JS still replaces them identically |
| 3 | Home | Hero H1 | No keyword context | Visually hidden lead-in "Elanster Technologies, AI development company in Chennai:" | Describes the page to search engines without changing design | n/a | Relevance signal | `index.html` | Completed | Renders; visual unchanged |
| 4 | Home | Hero banner | Hidden from assistive tech | Described via `role="img"` + `aria-label`; logo has title/desc | Image description request | Screen-reader users get the banner | Accessibility compliance | `index.html` | Completed | Attribute present |
| 5 | Work, 6 blog posts | Illustrations | `aria-hidden` SVGs | `role="img"` with `<title>`/`<desc>` per project/article | Image descriptions | Meaningful for screen readers | Image/AEO context | `work.html`, `blog-*.html` | Completed | Rendered, no errors |
| 6 | Home | Social share | No OG image | `og-image.png` (1200×630), `logo-512.png` | Link previews | Recognisable share card | Higher click-through from shares | `assets/images/` | Completed | Viewed |
| 7 | Site root | Crawl files | None | `robots.txt`, `sitemap.xml` (12 URLs), `llms.txt` | Indexing and AI discovery | n/a | Indexing | root | Completed | Files written; must be deployed to the domain root |
| 8 | All | Responsive | 2–4px horizontal overflow on home at 375/414px | `overflow-x:clip`, 44px tap targets on touch widths, text wrap guards | Mobile usability | No sideways scroll; easier taps | Lower mobile bounce | `css/style.css`, `css/pages.css` | Completed | 12 pages × 375/1280px: no overflow |
| 9 | Home | New "Project fit" section (before FAQ) | Only path was a 30-min call | 4-question tool → indicative first step, copyable summary, links to booking | Lower-commitment step | Clear next step without committing to a call | More qualified enquiries | `index.html`, `js/estimator.js`, `css/style.css` | Completed | Validation error, submit, copy fallback, events fire; desktop screenshot reviewed |
| 10 | All | Tracking | No measurement | `js/track.js`: cta_click, internal_nav, faq_open, section_view, estimator_* → `dataLayer` + DOM event. No cookies or third-party scripts | Measure what drives leads | n/a | Data for decisions | `js/track.js`, all `*.html` | Completed (no analytics vendor connected) | Events observed in test |
| 11 | Sub-pages | Accessibility | No focus-visible, smooth scroll ignored reduced-motion | Focus ring + reduced-motion rules | Keyboard/vestibular users | Visible focus | Compliance | `css/pages.css` | Completed | Focus outline confirmed on home |

## Not changed (needs your decision or content)
Terms/Privacy links, "80% less manual review" claim, palette, proof/testimonials, contact email, real case studies, blog content.
