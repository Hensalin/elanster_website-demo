# 04 · Design inspiration and direction

Research limits: Awwwards, Godly and the GSAP showcase were reached only through search listings, so no specific winners are cited here as models. Treat this as direction, not a mood board. Run a manual review of those galleries before a major redesign.

## What the competitor review suggests works
- Confident, large typography with short, concrete headlines (ustwo, Fueled, STX Next).
- Dark, cinematic hero with one strong visual idea rather than many effects (Fueled).
- Proof placed immediately after the hero.
- Content as brand: thoughtbot and SoftwareMill build trust through writing.

## Existing Elanster assets worth keeping
Logo mark (bar + two nested arcs) as the core graphic device; dark background; GSAP/ScrollTrigger scene system; Geist/Geist Mono type; reduced-motion handling.

## Motion rules adopted (matching the brief)
- Animate to explain (process, hub, work cards), not to decorate.
- No scroll hijacking beyond the one pinned film already in the build; no bouncing easing.
- Respect `prefers-reduced-motion` (done in JS and now in `pages.css`).
- Mobile: Three.js already switches to a lighter path on small/coarse-pointer screens (`script.js` line 134). Verify frame rate on a real mid-range phone.

## Recommended design direction (needs your approval)
1. Keep the logo-arc motif as the single recurring graphic device across sections.
2. Reduce repeated card grids: Why, Capabilities and Culture currently use similar card patterns.
3. Insert a proof band right after the hero once real proof exists.
4. Decide palette: blue/black (current) or return to orange/red per the original brief.
