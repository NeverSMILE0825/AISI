# AISI VIDEO CLUB — Apu Is Super Intelligent / $AISI

An interactive retro VHS rental-store Ethereum meme-token website adapted from the **user-supplied saved reference** `sibeauty.fun`. This deliverable includes functional VHS cassette shelf, 3D tape previews, CRT television, VCR controls and remote, arcade game, printable rental receipt, secret codes, sound toggle, and cinematic AISI assets. The provided reference was minified; see `source/ABOUT_THE_SOURCE.md` and `js/site.js`.

## Quick start

Requirements: Node.js 18+. No `npm install` needed.

```bash
npm run dev
```

Then open http://localhost:4173. Alternatively serve the folder with `python -m http.server 4173`; don't open `index.html` as `file://` because browsers block module/file fetches.

To create a static deploy folder:

```bash
npm run build
```

Upload `dist/` to Netlify or Cloudflare Pages, or use this repo’s GitHub Pages site at https://neversmile0825.github.io/AISI/ (serves the repository root from `main`). Asset paths are relative so the project Pages subdirectory works without rewriting.

## Prelaunch configuration

- Name: Apu Is Super Intelligent
- Ticker: AISI
- Network: Ethereum mainnet
- CA: `Coming Soon..` and Copy button copies exactly that literal text.
- Token supply: 1,000,000,000; tax: 0%.
- Uniswap V3 liquidity lock **planned, not yet verified**. Never advertise lock as a fact without an onchain link.
- No wallet-connection UI or contract transaction functionality in this website. The tutorial points to Uniswap's own site only after launch.
- X / Telegram are displayed as `Soon` until you edit `site-links.json` and republish.
- The Buy button remains disabled until a real onchain contract and official swap URL are configured. Don't replace this with a fake wallet button.

## Editing

`css/aisi.css` is your Ethereum-themed custom style layer; `assets/` has the branded banners, covers and scenery; `site-links.json` stores future social URLs. The reference JavaScript is prebuilt and patched in `js/site.js`, so deeper changes to on-screen scripted content require editing those string literals. To update social links throughout the app, edit `site-links.json` and run `npm run configure` before `npm run build`. After independent onchain verification, you may set a real contract with `npm run configure -- --contract 0xYOUR_40_HEX_CHARACTERS`, then run `npm run build`. Full React/TypeScript unminified source of the original site was not part of the provided reference ZIP.

Use `assets/cover-000.webp` through `cover-007.webp` for the VHS shelf (420x740). The original standalone artworks are also in assets under descriptive file names. Some image-generated episode labels differ from the interface labels, because those images were generated earlier. You can replace their .webp files with updated posters without editing React code.

## Functional details

- Clicking a tape loads it into the TV; press PLAY. Use NEXT/PREVIOUS/EJECT or the remote controls.
- Try the night lighting by clicking the wall clock, the sound switch and skip-animations toggle.
- The arcade game is playable with arrows (desktop) or dragging (touch).
- Rental receipt downloads as an image.
- Secret VHS tape is unlocked by cheat codes and interacting with the clerk.
- The featured opening transmission is an original local video `assets/aisi-transmission.mp4`; no original SIB video is linked.

## License and reference

The reference files were supplied by the project owner; this package retains a compiled portion of that reference site's frontend code with AISI-specific modifications. Ensure you have appropriate rights to reuse the original site's implementation and styling before publishing a public clone. All newly generated AISI media are provided in assets.

## Quality checks

The compiled script passes `node --check` and every referenced local asset is included. A headless Chromium screenshot was not available in the generation environment, so visually inspect desktop/mobile on your hosting preview before public launch.

## Visual/media repair — October 29, 2026

This revision fixes the screenshot issues in the first published ZIP:

- **TV opening:** the former 16:9 source was already cropped before playback. A new 1280×960 (4:3) `assets/aisi-transmission.mp4` and matching `assets/video-poster.webp` preserve the Apu character and all on-screen lettering inside the CRT.
- **Documentary:** `assets/portrait-sm.webp`, `portrait-md.webp`, and `portrait-lg.webp` are actual 4:5 documentary portraits, not landscape artwork forced into a portrait frame. The `doc-film` CSS preserves the entire character.
- **Found footage:** all nine B-roll scene names now have `-sm`, `-md`, and `-lg` local image variants; the original archive omitted some `-lg` assets, causing an image-error and permanent `Loading reel…` overlay. The reel now has a local fallback and a 16:9 presentation for complete image visibility.
- **Wall art:** the small entrance posters are actual portrait compositions, not wide images cropped into vertical slots.
- **CSS:** removed broad `!important` image rules and late MutationObservers that interfered with the original React layouts; added scoped fit rules for only the affected components.

Run `npm run build` and replace the entire published `dist/` folder when deploying so old cached footage cannot persist. On localhost stop and restart `npm run dev`, then hard-refresh with **Ctrl+Shift+R**.

Image/JS/static assets were audited; a complete interactive browser regression test was not possible in the execution environment, so preview your desktop and mobile layout before launch.

## VHS 007 React crash fix — October 29, 2026

**Symptom:** Clicking tape `007` after unlocking it could leave only the social links and footer note visible on a navy background, instead of the secret news screen.

**Cause:** The AISI conversion updated the cheat-code display dictionary to `aisi`, but the secret-tape list still contained `sib`. When unlocked, the renderer attempted to read `Op['sib'][1]`, threw a TypeError, and unmounted the React interface.

**Fix:** Aligned the secret-tape code list and keyboard detection to `aisi`, kept the AISI-specific CRT code animation, and made cheat-code metadata display resilient to missing keys. VHS 007 continues to show the breaking-news desk, achievement, and four cheat codes. Saved secret-tape unlock progress stays compatible with previous versions.

**Test:** `npm test` runs the tape-007 component through both locked and unlocked rendering, including all 16 possible cheat-code combinations. `npm run build` copies the repaired JavaScript into `dist/`. This is a source-level and component-level regression check; full end-to-end graphical browser testing was not available here.

**Replace old version:** Stop the old server with Ctrl+C (or close its terminal), replace the entire old project folder with this version, run `npm run dev`, and hard-refresh the browser using Ctrl+Shift+R. If port 4173 is already occupied, close the previous server before starting a new one. For production, replace the full deployed `dist/` directory.
