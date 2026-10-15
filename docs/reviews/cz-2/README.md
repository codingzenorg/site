# CZ-2 website branding review

Implemented 2026-10-15. Screenshots compare the previous homepage with the
Flow introduction and channel navigation. Desktop captures use 1440 × 1000.
The final mobile capture uses a 390 × 844 touch viewport; the baseline
headless Chromium capture has a 500 px minimum layout viewport.

- Approved v1.0.0 wordmark replaces the legacy header image.
- Approved symbol SVG/ICO favicons and Apple touch icon replace the old icon.
- Title, description, Open Graph and Twitter metadata use shared positioning.
- Social preview is a dedicated 1200 × 630 image using the approved lockup.
- GitHub links to codingzenorg; YouTube links to @coding-zen. Shesha's source
  link now points to its own repository.
- The overworld remains playable, with AI-assisted wording in project/process
  context. Channel links and the introduction remain visible on mobile.
- Focus outlines cover links and the map. Arrow/Enter controls run only while
  the map has focus, preserving keyboard activation of channel/source links.
- Shesha's staged wrapper and staging template use the approved favicon.
  First Fire contains no site logo/favicon references. Legacy files remain
  historical assets; the homepage no longer references them.

Validation: `npm run build`, `git diff --check`, rendered desktop/mobile
inspection, loaded wordmark and WebGL canvas, no horizontal overflow at
1440 px or 390 px, and metadata destination inspection. The build retains
Vite's existing advisory about the Three.js bundle exceeding 500 kB.
Deployment and live social-network cache refresh are outside this local check.
