# 06 · SEO / AEO / GEO audit

Domain used throughout: **https://www.elanster.com** (matches the live site).

## Implemented
| Item | Status |
|---|---|
| Unique `<title>` (46–64 chars) and meta description (141–158 chars) on all 12 pages | Done |
| Canonical URL, robots meta, Open Graph, Twitter card, geo meta | Done |
| One H1 per page; hidden keyword context in home H1 matches visible meaning | Done |
| JSON-LD: Organization/ProfessionalService, WebSite, WebPage, FAQPage, BreadcrumbList, BlogPosting, Service (all parse as valid JSON) | Done (not yet run through Google's Rich Results Test; no access from here) |
| FAQ answers present in static HTML, not only JS-rendered | Done |
| SVG descriptions (`<title>`/`<desc>`, `role="img"`) for work cards, blog heroes and hero banner | Done |
| `sitemap.xml` (12 URLs), `robots.txt` (allows major search and AI crawlers), `llms.txt` | Done |
| OG image 1200×630 and 512px logo | Done |
| Internal links between home, services, work, process, blog, careers | Present |

## AEO/GEO notes
- AI engines cite pages with clear, factual, self-contained answers. The FAQ and `llms.txt` now provide these. Nothing guarantees citation or ranking.
- Consistent business facts (name, city, 8 years, 4–12 weeks, two meetings a week) are repeated identically across schema, FAQ and `llms.txt`.

## Gaps (cannot be fixed by code alone)
1. **Thin content.** Blog posts are short samples; no dates or named authors. Real articles with an author and sources are the main lever for both SEO and AI citation.
2. **No third-party signals**: Clutch/GoodFirms profiles, Google Business Profile for Chennai, LinkedIn activity, press mentions, reviews.
3. **No contact details** for LocalBusiness-style schema (email, phone, street address). Add when available.
4. **Rich-result eligibility:** Google limits FAQ rich results for most sites, so FAQPage markup mainly helps machine understanding, not guaranteed SERP features.
5. **Core Web Vitals not measured.** `three.min.js` (603 KB) is the main risk to LCP/INP.
6. Submit sitemap in Google Search Console and Bing Webmaster Tools; verify `llms.txt` and `robots.txt` are served from the site root.
