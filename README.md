# Elanster website (v7 build)

Your `index7.html`, split into a normal static-site structure. Design, copy and animations are unchanged.

## Run
Open `index.html` in a browser. No build step and no server needed.

## Structure
- `index.html`: markup
- `css/style.css`: all styles
- `js/script.js`: content data, 3D logo (Three.js), GSAP/ScrollTrigger scenes, Lenis smooth scroll
- `assets/vendor/`: gsap 3.12.5 + ScrollTrigger, lenis 1.1.13 (local copies, no CDN needed)
- `assets/images/favicon.svg`: placeholder favicon. Replace it with the real mark.

## Changes from index7.html
- v15: removed the grain/dot speckle from the hero background.
- v14: hero background restored to the original index7 look (orange/blue arcs, soft streaks, grain), with the metallic 3D logo on top.
- v13: full Elanster palette back (orange, light blue, lime, pink, navy) used across Why, Services, Process, project cards, stats and footer. Hero stays orange.
- v12: Elanster-orange fabric-streak hero (animated bands, texture, pointer parallax), orbiting ring and cycling cards in Why, flowing light between Process steps, live mock screens in project cards, count-up stats, line-draw dividers, card tilt.
- v11: red theme everywhere (no blue). Hero has black + red streaked background like Imaginary Space. Services is a hub diagram (Elanster in the centre, 5 services around it, click + to expand). Why Elanster is a ring panel with 4 glass cards. Fixed the footer wordmark getting stuck invisible.
- v10: 3D logo is back as polished silver metal (no red grain, no sparkle). About is now a split layout (statement + button, industries grid on the right). Process is a blue gradient panel with staggered step pills. three.min.js is back in assets/vendor.
- v9: removed the 3D logo (Three.js) for a flat brand-colour logo, replaced the pinned scroll scenes (project films, Why stack, Process, Journey) with card grids, added a short loading screen. Page height about 11,000px, down from about 34,000px.
- v8: calmer hero (no sparkle dust, no floating binary text, no cursor glow, softer background glow), plain About section (headline, statement, 3 stats, industries) replacing the pinned stage, and about 25% less scroll length. The 3D logo now appears only in the hero.
- Split into separate files and vendored the libraries locally.
- Fixed a bug where the Culture value icons logged `<feTurbulence> seed NaN` errors.
- Added a favicon, doctype, charset and viewport tags.

## Needs your confirmation
- The booking link `https://meete.be`, the LinkedIn link `linkedin.com/company/elanster`, and the "A unit of ED Creative Group" footer line come from your file and are unchanged.
- Culture values 2 to 5 (Integrity, Continuous Learning, Ownership, Collaboration) and the FAQ answers come from your file. Confirm they are approved wording.
- The project "films" use illustrative mock UIs, not real client work.
- Terms of Service and Privacy Notice links point to `#top`. Add the real pages.

- v16: removed cursor ring and dotted patterns; new animated Work cards; Services hub with 6th point (Strategy Call) and travelling pulses; aligned Why grid; Process timeline; logo assembles and picks up brand-colour light.
- v17: Process section restored to the staircase animation; Why panel and hub core recoloured from red to the blue/navy theme.
- v18: About re-aligned into palette cards; Contact and footer recoloured to the blue theme; 3D tilt, spotlight, drifting palette orbs, depth reveals and scroll-spin logo added.
- v19: banded palette preloader; one pinned scroll film ('What did we build for...') cycling the six work areas.
- v20: About as a bordered animated cell grid; Services on the hero shade with 3D orbiting centre and no lines; Work cards get a scan line and shimmer.
- v21: Imaginary-Space-style fabric banner in the Elanster palette; About widened to the reference layout; side section dots and plain-English hints added.
- v22/v23: Work cards now stack on scroll with a tilting mock; editorial preloader with large counter; nav text links.
- v24: preloader = black screen with centred white Elanster logo (reference style); banner bands recoloured to navy/blue/light-blue; About grid uses hairline 2-col cells.
- v25: static About/Featured-work backgrounds, neat equal stat cards, glass service cards, endless manifesto marquee, livelier Why animation, contact→footer gap closed.
- v26: banner bands flow continuously, Featured-work film removed, simple About, all service cards open + glass, Why cards animated.
- v27: static banner bands, About matches reference (smaller statement, 2x3 grid), flat accent service cards with readable text, Why = outlined cards + wipe reveal.
- v28: Services = hub diagram with connector lines and collapsed cards; About matched to reference scale.
- v29: Services connectors curved into centred core; Why ring replaced by radar sweep.
- v30: Services = radar + 5 service features (Strategy Call removed).
- v31: Work = 2x2 glass cards, About lines closed like reference, Why cards without left accent/cycle.
- v32: Work cards use animated illustrations (orbit, hub, panels, flow).
- v33: each Work card has its own relevant animation; Why centre = glowing orb with orbits.
- v34: refined Services radar (clean sweep beam, synced blips, ripples, full logo).
- v35: removed Services radar.
- v36: added multi-page set (services, process, work, careers, blog index + 6 sample posts) with css/pages.css and js/pages.js. Blog posts are SAMPLE drafts derived from existing site copy; no dates/authors. Careers has no invented job listings.
- v36b: Why orbit animation removed, 5th Why card (Accountable After Launch), home links wired to new pages.
- v37: sub-pages restyled flat/minimal to match Imaginary Space layouts (no glows/rounded cards); footer split CTA in Elanster palette.
- v37b: fixed top nav links not clickable (pointer-events), guarded missing #spot, restored Why orbit animation.
- v37c: removed big ripple/orbit circles in Why.
- v38: navbar background bar; Blog section on landing page linking to blog pages.
- v39: all orange/red tones recoloured to blue/black palette across the landing page.
- v40: hero banner restored to black + orange/red glow + blue corner, red logo (per reference); rest of page stays blue/black.
