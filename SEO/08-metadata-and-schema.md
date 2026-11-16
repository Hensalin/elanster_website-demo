# 08 · Metadata and schema reference

## Per-page metadata (implemented)
| Page | Title | Description length |
|---|---|---|
| index | AI Development Company in Chennai \| Elanster Technologies | 158 |
| services | AI Development, Integration & Consulting Services \| Elanster | 154 |
| work | AI Case Studies & Representative Projects \| Elanster | 155 |
| process | Our AI Development Process: Two Meetings a Week \| Elanster | 157 |
| blog | AI Engineering Blog: RAG, Agents & Delivery \| Elanster | 154 |
| careers | AI Engineer Careers in Chennai \| Join Elanster | 149 |
| 6 blog posts | Topic-specific titles | 141–149 |

Note: `work.html` is titled "Case Studies" but its own copy says the projects are illustrative. If you want strict honesty in metadata, rename to "Representative AI Projects".

## Schema by page
- **Home:** Organization + ProfessionalService (name, logo, address city/region/country, parent org ED Creative Group, sameAs LinkedIn, offers), WebSite, WebPage, FAQPage (6 Q&As identical to visible text), ItemList of services.
- **Services:** WebPage, BreadcrumbList, 5 Service entries.
- **Blog index:** CollectionPage, BreadcrumbList.
- **Blog posts:** BlogPosting (no datePublished/author person because none exist; add both when real), BreadcrumbList.
- Other pages: WebPage, BreadcrumbList.

## To add when facts exist
`datePublished`/`dateModified`, `author` as Person, `telephone`, `email`, `streetAddress`, `foundingDate`, `aggregateRating` (only from a real review source), `Review` (only real).

## Validation
All JSON-LD blocks parse as valid JSON (verified by script). **Not yet validated** in Google Rich Results Test or Schema.org validator. Run both on the deployed URLs.
