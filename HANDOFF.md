# HANDOFF

## Session update (2026-02-26, waitlist success copy + message row polish)
- Updated waitlist success copy in `components/Hero.tsx` to be more explicit/actionable:
- “You’re in. We’ll send your invite as soon as we launch.”
- Added a subtle check mark prefix for clearer positive confirmation.
- Polished message row sizing/placement under the form by increasing reserved row height and normalizing chip padding/shape/line-height so it sits cleaner beneath the CTA on mobile and desktop.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, softened streetlight fade-out)
- Tuned streetlight fade behavior in `components/motionConfig.ts` to reduce snap-off feel.
- Updated streetlight opacity curve from a simple hold->drop to a multi-stop fade:
- `streetlightsOpacityRange: [0, 0.5, 0.74, 0.9]`
- `streetlightsOpacityValues: [0.9, 0.9, 0.45, 0]`
- Result: lights now dim more gradually before disappearing during the section transition.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, softened crowd-zone instant-loss sensitivity)
- Loosened instant-loss crowd collision in `components/MiniGame.tsx` to reduce over-harsh near-edge failures.
- Added `CROWD_COLLISION_PADDING = 3` and updated collision check to `distance <= zone.radius + CROWD_COLLISION_PADDING` (previously used full player radius expansion).
- Result: still difficult and punishing in-zone, but allows closer edge navigation without immediate loss.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, crowd-zone collision expanded to full player body contact)
- Adjusted instant-loss crowd-zone collision logic in `components/MiniGame.tsx` from center-point-only checks to full player-body contact checks.
- Collision now triggers when distance to zone center is `<= zone.radius + PLAYER_SIZE/2`, so touching the outer edge (or grazing while passing through) counts as immediate loss.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, instant loss on crowd-risk zone contact)
- Updated `components/MiniGame.tsx` so entering any red crowd-risk circle now immediately ends the run:
- On crowd-zone contact, score is set to `0` and `gameState` is set to `lost` in the frame update path.
- Removed prior incremental crowd penalty coupling from dark-drain calculation (crowd zones now act as hard fail hazards).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, dark-loss tuned to ~2-3 seconds)
- Increased mini-game dark drain aggressiveness in `components/MiniGame.tsx` to match requested difficulty:
- Dark drain set to `-36/sec` (from `-11/sec`) which yields roughly 2.8s to lose from full score when fully dark.
- Crowd penalty set to an additional `-10/sec` (from `-5/sec`) for ~2.2s loss if dark + inside crowd-risk zone.
- Lit recovery kept at `+8/sec`.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, faster loss when staying in the dark)
- Tuned mini-game score drain in `components/MiniGame.tsx` so players lose faster in dark areas:
- Dark drain rate changed from `-7/sec` to `-11/sec`.
- Crowd-zone penalty increased from `-4/sec` to `-5/sec`.
- Lit recovery remains `+8/sec`.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, gradual light bar depletion smoothing)
- Updated `components/MiniGame.tsx` score/drain logic from fixed per-frame step changes to rate-based (`per second`) updates using animation-frame delta time.
- Added `lastFrameTimeRef` to compute `deltaSec`, clamped to avoid abrupt score jumps after tab background/resume.
- Score now depletes and recovers gradually and consistently across devices instead of dropping in large frame-sized chunks.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, light meter set to single-color depletion)
- Simplified `components/MiniGame.tsx` light score bar further: removed threshold-based color logic entirely.
- Meter fill now uses one constant color (`bg-mustard`) and communicates state only via width from full to empty.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, simplified light meter back to color-only)
- Simplified `components/MiniGame.tsx` light score UI per request: removed added status text (`Safe/Caution/Danger`) and removed the `Dark/Lit` + percentage row.
- Kept only color-based intuitiveness (green/amber/red bar fill by score threshold) with the existing `Light Score` title.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, more intuitive mini-game light meter)
- Improved light score readability in `components/MiniGame.tsx` without changing core mechanics:
- Added explicit status state labels (`Safe`, `Caution`, `Danger`) with color-coded text.
- Added a live `%` readout and `Dark <-> Lit` anchors below the meter.
- Widened and slightly thickened the bar for easier glanceability; fill color now maps directly to state thresholds.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, Safari game render fix + scrollbar color revert)
- Fixed Safari desktop game embed issue in `components/Hero.tsx` by removing SVG `foreignObject` usage for the mini-game preview and replacing it with a regular HTML phone shell (`div` frame + clipped inner viewport). This avoids known Safari `foreignObject` rendering/scale inconsistencies.
- Reverted the scrollbar thumb accent back to the previous pink in `index.html` by changing `blueAccents.scrollbarThumb` from blue to `#FF6B6B`.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, game-side status chips switched from blue to pink)
- Updated both floating status chips next to the desktop mini-game in `components/Hero.tsx`:
- `Street Lighting / Excellent` icon chip accent changed from blue/teal to hero pink.
- `Crowd Report / Safe Zone` icon chip accent changed from blue lantern accent to hero pink.
- Both now share inline accent styling (`rgba(255,107,107,0.2)` background + `heroPink` icon color) for visual consistency with the hero headline/CTA.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, waitlist CTA + hints recolored to hero pink)
- Updated `components/Hero.tsx` so the waitlist submit button uses the same pink as `A Safer Walk.` (`VISUAL_THEME.heroTitleText`) instead of the active `lantern` accent color.
- Recolored waitlist hint/error messaging to the same pink tone and pink-tinted borders for consistency on mobile/desktop.
- Recolored the mobile down-arrow cue near the waitlist form to the same pink tone.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, feature copy refresh)
- Updated feature section copy in `components/Features.tsx`:
- `Public Data` description -> “We aggregate lighting, outages, and street conditions to guide you to safer paths.”
- `Crowd Source` description -> “Real-time reports from other walkers about blocked paths, crowds, or unsafe conditions.”
- Renamed `AI Powered` -> `AI Safety Layer` and description -> “Computer vision analyzes street-level imagery to estimate perceived safety.”
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, mini-game difficulty bump)
- Increased mini-game challenge in `components/MiniGame.tsx` with contained mechanics:
- Added two animated crowd-risk zones (visible red hazard circles) that apply extra score drain while inside.
- Added dynamic flicker multipliers on alternating streetlights so safe coverage is less static.
- Tightened light forgiveness/economy (`effectiveRadius` slightly reduced; gain/drain tuned from `+1/-0.55` to `+0.75/-0.75` plus crowd penalty) for a more significant but still playable challenge.
- Kept controls unchanged (arrow-key only) and preserved win/loss loop.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, removed mini-game on-screen D-pad)
- Removed the on-screen D-pad control cluster from `components/MiniGame.tsx` so the desktop mini-game is keyboard-only (arrow keys).
- Updated hero instruction copy in `components/Hero.tsx` to remove D-pad mention and reference arrow keys only.
- Verified root site still builds: `npm run build` passed (mini-game chunk size dropped from ~9.56 kB to ~7.02 kB).

## Session update (2026-02-26, instruction clipping fix + removed instruction box)
- Fixed desktop mini-game instruction clipping by removing the fixed-height constraint from the right hero column container and moving the `h-[500px]` constraint to the game illustration block only in `components/Hero.tsx`, so instruction copy below contributes to layout height and no longer gets cut off.
- Removed the styled instruction chip/box and reverted to plain inline text presentation (no background, border, or blur box) in `components/Hero.tsx`.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, top-only pastel rollback while keeping blue accents)
- Rolled back only the top visual treatment in the active `blueAccents` preset: day sky is back to pastel blue (`#BAE6FD`), hero title back to pink (`#FF6B6B`), yellow underline preserved (`#FFE66D`), hero/nav foreground set back to dark for the pastel top, and daytime clouds disabled.
- Kept blue accent system active (`index.html` still `ACTIVE_ACCENT_THEME = 'blueAccents'`), so bottom/CTA accents remain blue (e.g., `Contact Us` button and blue feature title colors).
- Restored sky transition curve to the original pastel/pink/night sequence in `components/motionConfig.ts` (`backgroundRange: [0, 0.3, 0.6]`, values `[dayBlue, #FF8E8E, #0F172A]`).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, softened blue -> pink sky transition)
- Replaced the abrupt blue->pink snap in `components/motionConfig.ts` with a gradual multi-stop transition path:
- `backgroundRange: [0, 0.18, 0.34, 0.5, 0.72]`
- `backgroundValues: [dayBlue, dayBlue, #7FAEEB, #FF8E8E, #0F172A]`
- This preserves the intended sequence (blue -> pink -> navy) but eases the handoff and removes the hard jump.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, game instruction readability + more realistic clouds)
- Improved the desktop mini-game instruction readability in `components/Hero.tsx` by switching from low-contrast gray text to a high-contrast frosted chip (`bg-slate-950/45`, light text, border, blur, shadow) against the blue background.
- Updated daytime cloud rendering in `components/DayNightBackground.tsx` to feel less flat/cartoon: removed blanket blur, added drop shadow depth, soft underside shading, radial body gradients for each cloud puff, and a subtle top highlight strip.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, direct blue -> pink sky transition)
- Updated `components/motionConfig.ts` day/night background color stops to duplicate the blue stop and create a near-instant handoff into pink, avoiding the previous blue->pink interpolation that produced a purple midpoint.
- Sky sequence is now effectively: blue -> pink -> navy (with the pink->navy fade preserved).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, hero underline matched to sun yellow)
- Updated the blue-accent experiment preset so the `A Safer Walk.` underline uses the same mustard yellow as the sun (`#FFE66D`) in `components/visualTheme.ts`.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, swapped day-sky/title colors for blue experiment)
- Updated the blue-accent experiment so the initial day sky uses the prior `A Safer Walk.` blue accent as the background, and the `A Safer Walk.` title text now uses the prior light-sky blue (requested “darker blue in back, light in front” swap).
- To preserve readability on the darker day sky, `components/Hero.tsx` paragraph copy and `components/Navigation.tsx` logo/icon now use theme-driven light foreground colors in the blue experiment preset.
- `components/motionConfig.ts` now sources the day-sky start color from `components/visualTheme.ts`, so the experiment remains controlled by the same one-line preset switch in `index.html` (`ACTIVE_ACCENT_THEME`).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, blue-accent cloud experiment + one-line revert switch)
- Added a soft daytime cloud-blob layer in `components/DayNightBackground.tsx` for the blue accent experiment (fades out before sunset/night, subtle horizontal drift, disabled when theme preset is the original pastel accents).
- Added `components/visualTheme.ts` so component-level accent styling (hero underline, feature title colors, global path stroke, cloud enable/tint) is driven by the active accent preset instead of scattered hardcoded values.
- Updated `index.html` Tailwind color config to select between `pastelOriginal` and `blueAccents` via a single constant (`ACTIVE_ACCENT_THEME`), and synced the scrollbar thumb color through a CSS variable from the same preset.
- Quick revert path: set `ACTIVE_ACCENT_THEME = 'pastelOriginal'` in `index.html` (component accents/cloud behavior follow automatically via `window.__lanternAccentTheme`).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, blue-accent theme experiment)
- Applied a contained blue-accent experiment (no layout revamp): changed Tailwind `lantern`/`teal` palette to blues in `index.html`, changed scrollbar thumb to blue, switched hero title underline to `lantern-light`, updated feature title colors to darker blue variants, and changed the global path stroke to a soft light blue.
- This is intended as an A/B visual experiment and can be reverted/tuned quickly.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, rounded Chrome autofill email input fix)
- Fixed sharp-corner rectangle appearance in the waitlist email field caused by Chrome/WebKit autofill styling:
- Added `overflow-hidden` to the rounded waitlist form container and rounded classes to the email input in `components/Hero.tsx`.
- Added WebKit autofill CSS override in `index.css` to keep autofill fill/text consistent with the site and preserve rounded corners.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, rounded waitlist validation/status message styling)
- Restyled the inline waitlist validation/error/success messages in `components/Hero.tsx` as rounded pill chips (`rounded-2xl`, soft white background, subtle border/shadow) to match the site language and avoid the harsh rectangular look under the form.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, custom waitlist email validation message)
- Replaced native browser email validation popup with a site-styled inline validation message in `components/Hero.tsx` using `noValidate` + custom `validity` checks (`Please enter a valid email address.` / `Please enter your email address.`).
- Waitlist input is now controlled and clears validation/submission messages on edit.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, reverted temporary darker day-sky test)
- Reverted the temporary darker initial day-sky color test in `components/motionConfig.ts` back to the original pastel blue (`#BAE6FD`).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, further shorten 2nd -> 3rd section scroll distance)
- Reduced the `The Usual Walk?` sticky section height again in `components/ScrollExperience.tsx` from `145/170vh` to `130/150vh` (mobile/desktop) to make the 2nd -> 3rd transition shorter relative to 1st -> 2nd.
- Updated the deferred placeholder height in `App.tsx` to match (`130/150vh`) so initial mount spacing stays consistent.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, temporary darker initial day-sky test)
- Darkened the initial day sky color slightly in `components/motionConfig.ts` (`#BAE6FD` -> `#9CC9E4`) to test a less pastel/whimsical hero tone. User may revert later.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, Netlify Forms waitlist wired to existing form name)
- Wired the waitlist CTA form in `components/Hero.tsx` to submit to Netlify Forms via POST (`application/x-www-form-urlencoded`) using the existing form name `waitlist` (from the current Netlify project form list).
- Added hidden static Netlify form markup in `index.html` so Netlify can detect the `waitlist` form during build for this React/Vite SPA.
- Added minimal submit UX states (`Joining...`, success/error message) without changing layout design.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, overscroll + theme-color sync hardening for Chrome bottom bar)
- Added `<meta name="theme-color">` fallback and enabled `overscroll-behavior-y: none` on `html, body` in `index.html` to reduce janky bottom bounce and improve Chrome UI bar behavior.
- Extended `components/DayNightBackground.tsx` live sky-color sync to also update the browser `theme-color` meta during scroll so Chrome UI/bottom bar color tracks the current section.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, body/html background synced to animated sky color)
- Added a stronger fix for Chrome/mobile canvas/bar color mismatch: `components/DayNightBackground.tsx` now syncs `document.body` and `document.documentElement` background color to the same scroll-driven sky `MotionValue` via `useMotionValueEvent`.
- This is intended to prevent any exposed browser/page canvas (overscroll/viewport UI transitions/tab restore) from showing a mismatched static color.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, proper background layering fix for mobile bottom bar reveal)
- Implemented the stacking-context fix for the mobile bottom bar reveal issue:
- App root now uses `relative isolate` and foreground content (`main` + `Footer` wrapper) is explicitly layered above the background in `App.tsx`.
- `DayNightBackground` moved from negative z-index to non-negative z (`z-0`) in `components/DayNightBackground.tsx` so the sky layer is no longer behind the browser/body canvas.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, mobile Chrome bottom white bar fix)
- Fixed bottom white bar/gap showing on mobile Chrome by setting `body { margin: 0; background: #0F172A; }` in `index.html` and applying `minHeight: '100dvh'` to the root app container in `App.tsx` (with existing `min-h-screen` fallback class kept).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, mobile scroll arrow spacing tweak)
- Moved the mobile scroll cue arrow slightly farther below the waitlist form in `components/Hero.tsx` (`pt-3` -> `pt-5`) so it is less visually crowded against the CTA.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, desktop-random stars per load / mobile-stable stars)
- Updated `components/DayNightBackground.tsx` star field seeding so desktop/laptop gets a different star layout each page load, while mobile/coarse-pointer devices keep a stable deterministic star layout (and still avoid twinkle animation for performance).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, crash-risk review + Safari mediaQuery fallback)
- Reviewed recent website-shell changes for runtime crash risks (lazy loading, scroll provider, idle callback defer, deterministic decorative generation).
- Fixed a real compatibility crash risk in `components/Hero.tsx`: older Safari/WebViews may not support `MediaQueryList.addEventListener/removeEventListener`; added `addListener/removeListener` fallback and `matchMedia` existence guards.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, deterministic first-paint + a11y + QA checklist + font trim)
- Finished deterministic decorative first-paint work for the website shell:
- Added seeded RNG helper (`components/deterministicRandom.ts`) and replaced remaining `Math.random()` usage in `components/DayNightBackground.tsx` (stars) and `components/ScrollExperience.tsx` (streetlight flicker timings) with deterministic seeded generation.
- Tightened accessibility (non-visual) in `components/Navigation.tsx`, `components/Hero.tsx`, `components/MiniGame.tsx`, `components/GlobalPath.tsx`, and `components/DayNightBackground.tsx`:
- semantic nav link (`Lantern` logo), decorative `aria-hidden`/`focusable=false` where appropriate, waitlist `label` + input id, button `type`, minigame control `aria-label`s, and dialog semantics on win/lose overlay.
- Added manual QA checklist doc for cross-device/mobile regression testing: `docs/qa-checklist.md`.
- Trimmed Google Fonts payload in `index.html` to used families/weights only (`Cormorant Garamond` + `Playfair Display`) and removed unused custom `.font-hand` / `.font-sans` CSS blocks.
- Build result: `npm run build` passed (`dist/index.html` shrank further after font URL trim).

## Session update (2026-02-26, non-visual optimization implementation pass)
- Implemented the requested contained optimization fixes (excluding analytics and capability gating by request; Tailwind CDN replacement not completed due dependency/build-pipeline change requirement):
- `#1` Desktop-only lazy `MiniGame`: `components/Hero.tsx` now lazy-loads `MiniGame` and only renders the desktop preview block when viewport is `md+` (mobile no longer mounts the hidden game).
- `#2` Moved inline twinkle keyframes/media query out of `components/DayNightBackground.tsx` into `index.css`.
- Removed the legacy `<link href="/index.css">` from `index.html` after importing `index.css` in `index.tsx` to avoid duplicate stylesheet loading.
- `#3` Shared global page scroll progress via `components/ScrollProgressContext.tsx`; `DayNightBackground` and `GlobalPath` now consume a single scroll `MotionValue`.
- `#5` Added `LazyMotion` with async feature loading in `index.tsx` and migrated Framer components to `m.*` usage.
- `#6` Deferred below-the-fold mount in `App.tsx` (idle callback + placeholder), reducing immediate startup work without intended visual changes.
- Also added/kept non-visual improvements from earlier pass: reduced-motion handling for decorative animations and better waitlist form semantics.
- Build result: `npm run build` passed with split chunks (`MiniGame` and `framerFeatures`) and reduced main JS bundle (`dist/assets/index-*.js` now ~278 kB vs prior ~352 kB).

## Session update (2026-02-26, desktop star twinkle + mobile animation guard)
- Increased star twinkle visibility slightly on desktop/laptop in `components/DayNightBackground.tsx`.
- Disabled star twinkle animation on mobile/coarse-pointer devices via media query to reduce decorative animation work on mobile GPUs while keeping stars visible.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, non-visual holistic improvements pass)
- Implemented non-visual codebase improvements without changing the default visual design:
- Added shared motion timing/spring constants in `components/motionConfig.ts` and refactored `DayNightBackground`, `ScrollExperience`, and `GlobalPath` to use them (maintainability / motion consistency).
- Stabilized `ScrollExperience` streetlight flicker randomness via `useRef` so timings don't regenerate on rerenders (perf + visual stability without intended look change).
- Added reduced-motion support for decorative motion only (scroll cue bounce, global path spring smoothing, star twinkle, streetlight flicker) while preserving the default experience for users without reduced-motion enabled.
- Improved waitlist form semantics in `components/Hero.tsx` with `aria-label`, `autocomplete`, `inputMode`, `enterKeyHint`, and explicit `type="submit"` (accessibility/mobile UX).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, desktop moon/stars restored + brightened)
- Restored/strengthened the moon and stars visibility in `components/DayNightBackground.tsx` for the bottom of the page on desktop: earlier night fade-in, brighter moon glow, stronger star glow, and persistent visibility through the end of scroll.
- Reworked stars to use a stable generated field (`useRef`) with guaranteed lower-half coverage so they don't appear to vanish or randomly redistribute on rerenders.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, mobile arrow placement + seamless streetlight fade)
- Moved the mobile scroll cue arrow in `components/Hero.tsx` from an absolute side position to directly below the waitlist form/button (still hidden while email input is focused), so it signals scrolling without overlapping or sitting above the CTA.
- Improved `The Usual Walk?` mobile fade-out in `components/ScrollExperience.tsx` by fading the streetlights separately and removing vertical drift from the full scene container; only the text now drifts slightly while the lights fade smoothly (prevents the “shorten then disappear” clipping effect).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, global path startup pop-in fix)
- Added a first-frame mount guard in `components/GlobalPath.tsx` so the top-page walking path overlay stays hidden until after initial layout/paint settles, preventing the path from popping in/out on first load.
- Kept the existing path style/animation behavior after mount.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, mobile scroll cue + smoother fast scroll feel)
- Reintroduced a mobile-only scroll indicator in `components/Hero.tsx` as a small bouncing side arrow (`md:hidden`, right-side placement) so it no longer overlaps the waitlist CTA while still signaling users to scroll.
- Removed `useSpring` smoothing from `components/ScrollExperience.tsx` and now drive `The Usual Walk?` transition directly from `scrollYProgress` to reduce perceived lag/desync during fast mobile scrolling.
- Added `will-change: transform, opacity` hints to sun/moon motion layers in `components/DayNightBackground.tsx` for smoother mobile compositing.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, mobile hero cross-device fit tuning)
- Tightened the mobile hero vertical footprint in `components/Hero.tsx` (smaller mobile heading/body/button sizing, reduced mobile spacing/margins) while keeping extra space between the logo/nav and `A Safer Walk.`.
- Preserved the `Join Waitlist` button peach color on hover (`hover:bg-lantern` unchanged).
- Goal: keep the waitlist CTA fully visible above the fold more consistently across different iPhone viewport heights/browser chrome states.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, loading background gradient removed)
- Removed the temporary fallback `body` background gradient from `index.html` so the page no longer flashes the peach/red gradient while loading before React mounts.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, mobile hero spacing + button color + arrow)
- Hid the bottom bouncing scroll `ArrowDown` on mobile in `components/Hero.tsx` (`hidden md:block`), while preserving focus-based hide behavior for desktop.
- Kept the `Join Waitlist` button peach color unchanged on hover by replacing `hover:bg-lantern-dark` with `hover:bg-lantern`.
- Added more mobile spacing between the logo/nav area and `A Safer Walk.` by increasing hero top padding and removing the mobile negative top margin on the hero text column.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, mobile email typing arrow overlap fix)
- Updated `components/Hero.tsx` to hide the bouncing bottom `ArrowDown` scroll indicator while the waitlist email input is focused (prevents overlap with the `Join Waitlist` area when the mobile keyboard opens).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, extra scroll distance reduction)
- Further shortened the `The Usual Walk?` sticky scroll segment in `components/ScrollExperience.tsx` by reducing container height from `170/200vh` to `145/170vh` (mobile/desktop).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, scroll direction consistency fix)
- Fixed the `The Usual Walk?` scene transition in `components/ScrollExperience.tsx` to use vertical drift (`y`) instead of horizontal slide (`x`) during fade-out, so scrolling back up/down feels directionally consistent with page motion.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, scroll transition length reduction)
- Reduced the scroll scene length between `The Usual Walk?` and the features section in `components/ScrollExperience.tsx` (container height `220/260vh` -> `170/200vh`) and made the scene fade/slide out earlier.
- Sped up moon + stars transition timing in `components/DayNightBackground.tsx` so the night transition completes earlier by the features section.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, minigame end-state copy tweak)
- Removed the `(Enter)` hint text from the end-state `Play Again` button in `components/MiniGame.tsx` (applies to win/lose overlay flow).
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, feature hover snapback refinement)
- Replaced feature-card hover keyframe wobble with a Framer spring hover transform in `components/Features.tsx` so cards snap back cleanly on cursor leave and re-trigger on repeated hover on/off.
- Removed Tailwind `hover:translate-*` transform classes from the cards to avoid CSS transform conflicts with Framer Motion.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, features hover + copy tweak)
- Updated `components/Features.tsx` hover wobble behavior to play once on hover-in and snap back to neutral (removed infinite wobble loop while cursor remains on card).
- Renamed first feature title from `Public Infrastructure Data` to `Public Data`.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, sun visual cleanup)
- Removed the temporary sun ray streak elements in `components/DayNightBackground.tsx` (they looked scratched).
- Brightened the sun using a stronger glow shadow + soft outer glow layer and stronger inner highlight/ring.
- Verified root site still builds: `npm run build` passed.

## Session update (2026-02-26, root Vite server restart)
- Restarted root Vite dev server from `/Users/omarmian/dev/lantern-new-website`.
- Active command: `npm run dev -- --host 0.0.0.0 --port 3000`.
- Vite reported ready and serving at `http://localhost:3000/` (session `6158` in this terminal tool).

## Session update (2026-02-26, v1-stable preview worktree)
- Kept the main working tree on `main` because it has uncommitted changes.
- Created sibling worktree `../lantern-new-website-v1-stable` checked out to `v1-stable` for safe previewing.
- Installed dependencies in the worktree with `npm ci`.
- Started Vite dev server from the worktree on `http://localhost:3001/` (`--host 0.0.0.0 --port 3001`).

## Session update (2026-02-26, root Vite preview)
- Switched repo to `main` branch for website preview work and ran Vite locally on `0.0.0.0:3000`.
- Updated root `vite.config.ts` to set `server.allowedHosts = true` for Cloudflare Tunnel/mobile share links.
- Fixed mobile hero waitlist CTA overflow in `components/Hero.tsx` by stacking the email input + button on small screens.
- Restored the black walking figure icon in `components/Navigation.tsx` after briefly removing it.
- Styled hero headline text `A Safer Walk.` with italic + yellow underline in `components/Hero.tsx`.
- Removed animated character illustrations from `components/Features.tsx` (text-only feature cards remain).
- Added colored underline streaks to feature titles and reduced underline thickness.
- Shortened `components/ScrollExperience.tsx` scroll length and removed hidden/dead arrival scene content (`Arrive Smiling.` + CTA) plus related transforms.
- Removed flashing/dead scroll artifacts (intermediate “Lantern Way” scene, house outline, right-side glow).
- Restored the large sun/moon background transition in `components/DayNightBackground.tsx`; restyled the sun to match the moon’s orb style (no center icon glyph).
- Removed crater-like sun spots and replaced them with smooth sun shading/highlight in `components/DayNightBackground.tsx`.
- Temporary visual test: changed day->sunset background transition to blue -> pink -> dark and set “The Usual Walk?” copy back to white for comparison (`components/DayNightBackground.tsx`, `components/ScrollExperience.tsx`).
- Moon overlap fix test: kept moon path in the top-right and faded it down near the features section to avoid sitting under “More than just a map”.
- Star field tuning: stars reach full opacity earlier and twinkle with a brighter minimum + soft glow so they stay bright at the bottom of the page.
- Added subtle staggered idle wobble animation to the three feature cards (`components/Features.tsx`) and verified root `npm run build` still passes.
- Refresh flicker mitigation: `components/ScrollExperience.tsx` now hides the sticky scroll scene until the first animation frame after mount to avoid wrong-state overlay flashes when refreshing at deep scroll positions.
- Increased feature-card hover wobble intensity in `components/Features.tsx` (cursor hover only, more visible).
- Added a fallback page background gradient in `index.html` so rapid refreshes don’t flash white before React/Framer backgrounds mount.
- Added more pronounced warm streak rays around the sun orb in `components/DayNightBackground.tsx` (still no center sun icon).
- Tuned “The Usual Walk?” scene readability (warm tint overlay + darker Lantern-pink copy).
- Verified root site build: `npm run build` passed.
- Active dev command used: `npm run dev -- --host 0.0.0.0 --port 3000` (running during session).

## Goal + current status
Continue shipping the Lantern cinematic waitlist backlog in Taskmaster dependency order with verified milestones. Tasks `#1`-`#9` and `#13` are complete and verified; Task `#10` (Movement + Camera Control / Cinematic Glide) is now `in-progress` with a working implementation pass and green checks (`tsc`, targeted specs, full tests, build).

## Key decisions (what/why)
- Kept Phaser bootstrap lazy-loaded from Angular host to preserve bundle budgets.
- Implemented chunk streaming as a reusable/testable `ChunkManager` + `ChunkStreamSystem` instead of scene-specific logic.
- Implemented Task `#9` factories as placeholder-but-structured runtime renderers (tile/props/landmarks/routes/atmosphere) so streaming now instantiates real chunk layer content instead of debug chunk boxes.
- Added a pure `TriggerSystem` for non-render trigger enter/exit registration + cooldown handling.
- Added a testable keyed reuse pool in `landmark-factory.ts` to validate prop pooling reuse counters.
- Implemented Task `#10` movement/camera foundations as pure systems (`GlideInputAdapter` + `MovementSystem` + `CameraSystem`) and wired them into the placeholder world scene so chunk streaming anchor updates are now input-driven instead of synthetic sinusoidal motion.
- Reduced-motion support for Task `#10` currently reads `prefers-reduced-motion` directly in the placeholder scene and scales camera look-ahead/drift intensity in `CameraSystem`.

## Assumptions/invariants + env notes
- Active rebuild work remains under `apps/experience`; root React/Vite prototype is untouched.
- Angular 19 + Phaser 3 stack; Phaser CommonJS Angular warning remains expected/non-fatal.
- Node version: `v22.21.1`.
- Taskmaster MCP working; `expand_task` unavailable (`PERPLEXITY_API_KEY` missing).
- Disk-space incident occurred this session and was mitigated by clearing generated artifacts (`.angular`, `dist`, `.tmp/task7-smoke`).

## Files touched (path + intent)
- `.taskmaster/tasks/tasks.json` — Task `#8` and `#9` status updates (`in-progress` -> `done`).
- `apps/experience/src/engine/phaser/world/chunk-manager.ts` — Chunk streaming policy (active set, ring/predictive prefetch, unload grace, frame-budgeted instantiation).
- `apps/experience/src/engine/phaser/world/chunk-manager.spec.ts` — Streaming behavior tests.
- `apps/experience/src/engine/phaser/systems/chunk-stream-system.ts` — Phaser streaming wrapper; now composes Task `#9` factories + trigger system.
- `apps/experience/src/engine/phaser/world/tile-layer-factory.ts` — Tile layer chunk renderer (stable z-order placeholder rendering).
- `apps/experience/src/engine/phaser/world/landmark-factory.ts` — Props/landmarks/routes/atmosphere chunk visuals + pooled props (`KeyedReusePool`).
- `apps/experience/src/engine/phaser/world/landmark-factory.spec.ts` — Pool reuse counter tests.
- `apps/experience/src/engine/phaser/systems/trigger-system.ts` — Trigger enter/exit/cooldown registry.
- `apps/experience/src/engine/phaser/systems/trigger-system.spec.ts` — Trigger registration/cooldown/teardown tests.
- `apps/experience/src/engine/phaser/scenes/placeholder-world.scene.ts` — Uses `ChunkStreamSystem` with static fixture world and factory-backed adapter.
- `apps/experience/src/engine/phaser/systems/movement-system.ts` — New input abstraction + inertial movement integrator with bounds constraints.
- `apps/experience/src/engine/phaser/systems/movement-system.spec.ts` — Input normalization and bounded inertial movement tests.
- `apps/experience/src/engine/phaser/systems/camera-system.ts` — New cinematic camera rig math (smoothing, look-ahead, drift, reduced-motion scaling, clamp/zoom).
- `apps/experience/src/engine/phaser/systems/camera-system.spec.ts` — Camera clamp/scroll and reduced-motion scaling tests.
- `apps/experience/src/engine/phaser/scenes/placeholder-world.scene.ts` — Task `#10` integration: drag/touch/keyboard input wiring, movement/camera update loop, chunk stream anchor sync, resize handling.
- `apps/experience/src/engine/phaser/audio/*` and `apps/experience/src/engine/runtime/engine.ts` — Task `#13` audio lifecycle work (kept, verified).
- Task `#7` tooling files in `apps/experience/src/tools/*` — deterministic world/chunk pipeline (kept, used by streaming tests).
- `HANDOFF.md` / `CONTEXT_HANDOFF.md` — updated through Task `#9`.

## Commands run + outcomes (pass/fail)
### Task `#8`
- `mcp__task-master-ai__set_task_status(id=8,status=in-progress)` — pass
- `cd apps/experience && npx tsc -p tsconfig.spec.json --noEmit` — pass
- `cd apps/experience && npm test -- --watch=false --browsers=ChromeHeadless --include src/engine/phaser/world/chunk-manager.spec.ts` — initial fail (test tie-break expectation), then pass (`TOTAL: 4 SUCCESS`)
- `cd apps/experience && npm test -- --watch=false --browsers=ChromeHeadless` — pass (`TOTAL: 42 SUCCESS`)
- `cd apps/experience && npm run build` — pass (Phaser CommonJS warning only)
- `mcp__task-master-ai__set_task_status(id=8,status=done)` — pass

### Task `#9`
- `mcp__task-master-ai__set_task_status(id=9,status=in-progress)` — pass
- `cd apps/experience && npx tsc -p tsconfig.spec.json --noEmit` — pass
- `cd apps/experience && npm test -- --watch=false --browsers=ChromeHeadless --include src/engine/phaser/{systems/trigger-system.spec.ts,world/landmark-factory.spec.ts,world/chunk-manager.spec.ts}` — fail (Angular CLI `--include` only accepts a single pattern; command shape invalid)
- `cd apps/experience && npm test -- --watch=false --browsers=ChromeHeadless` — pass (`TOTAL: 45 SUCCESS`)
- `cd apps/experience && npm run build` — pass (Phaser CommonJS warning only)
- `mcp__task-master-ai__set_task_status(id=9,status=done)` — pass
- `mcp__task-master-ai__next_task(...)` — pass; returns Task `#10`

### Task `#13` (completed earlier this session chain)
- `tsc` + targeted audio specs + full tests + build all passed; task marked `done`

### Task `#10` (in progress)
- `mcp__task-master-ai__set_task_status(id=10,status=in-progress)` — pass
- `cd apps/experience && npx tsc -p tsconfig.spec.json --noEmit` — pass (baseline)
- `cd apps/experience && npm test -- --watch=false --browsers=ChromeHeadless` — pass (baseline, `TOTAL: 45 SUCCESS`)
- `cd apps/experience && npm run build` — pass (baseline; Phaser CommonJS warning only)
- `cd apps/experience && npx tsc -p tsconfig.spec.json --noEmit` — pass (after Task `#10` implementation)
- `cd apps/experience && npm test -- --watch=false --browsers=ChromeHeadless --include src/engine/phaser/systems/*.spec.ts` — initial fail because shell expanded glob into multiple args; rerun quoted pattern
- `cd apps/experience && npm test -- --watch=false --browsers=ChromeHeadless --include 'src/engine/phaser/systems/*.spec.ts'` — pass (`TOTAL: 8 SUCCESS`)
- `cd apps/experience && npm test -- --watch=false --browsers=ChromeHeadless` — pass (`TOTAL: 51 SUCCESS`)
- `cd apps/experience && npm run build` — pass (Phaser CommonJS warning only)

## Current blockers/unknowns
- No hard blocker.
- Task `#9` renderers are intentionally scaffold-level visuals (simple Phaser primitives) to validate ordering, pooling, and trigger registration before real asset-backed factories are implemented.
- Trigger events currently emit a simple debug event (`lantern:trigger-enter`) on the Phaser game event bus; full runtime/HUD bridge integration remains future work.
- Task `#10` camera behavior is implemented/tested in the placeholder scene, but the acceptance "comfort" / mobile touch feel still needs manual QA (desktop + touch emulation).
- Task `#10` reduced-motion scaling is scene-local (`matchMedia`) and not yet sourced from the app capability profile/runtime bridge.

## Next steps checklist
- [x] Start Task `#10` and mark it `in-progress`.
- [x] Implement input abstraction (mouse/touch, optional keyboard fallback).
- [x] Implement smoothed movement integrator + world bounds constraints.
- [x] Implement cinematic camera smoothing/follow and reduced-motion parameter path.
- [x] Integrate movement/camera updates with chunk streaming anchor updates in placeholder world scene.
- [x] Add unit tests for movement/camera behavior and run full `tsc`/tests/build.
- [ ] Manual QA Task `#10` feel/comfort on desktop mouse + touch emulation (speed caps, inertia, camera framing stability).
- [ ] Decide whether to thread reduced-motion from runtime capability profile into Phaser scene/engine instead of direct `matchMedia`.
- [ ] If QA passes, mark Task `#10` `done` in Taskmaster and refresh handoff docs.

## Verification plan
- `cat HANDOFF.md`
- `cat CONTEXT_HANDOFF.md`
- `git status --short`
- `git diff --stat`
- `mcp__task-master-ai__next_task(projectRoot=/Users/omarmian/dev/lantern-new-website)` (should return `#10`)
- `mcp__task-master-ai__get_task(projectRoot=/Users/omarmian/dev/lantern-new-website,id=10)` (should show `in-progress`)
- `cd apps/experience && npx tsc -p tsconfig.spec.json --noEmit`
- `cd apps/experience && npm test -- --watch=false --browsers=ChromeHeadless --include 'src/engine/phaser/systems/*.spec.ts'`
- `cd apps/experience && npm test -- --watch=false --browsers=ChromeHeadless`
- `cd apps/experience && npm run build`

## Risks/watchouts
- Keep Phaser bootstrap lazy-loaded; eager imports into Angular startup can regress bundle budgets.
- Task `#7` Tiled pipeline supports a deliberate subset of Tiled JSON; extend with fixtures/regression tests.
- `ChunkManager` predictive prefetch is simple dominant-axis lookahead; preserve deterministic ordering when refining.
- Placeholder scene visual factories are scaffolding and should not be mistaken for final art/asset rendering behavior.
- Placeholder world fixture bounds are tiny; camera auto-zoom intentionally overscans to make glide/camera motion visible for Task `#10` demo behavior.
- Disk space can fill quickly due Angular cache/build outputs; safe cleanup targets: `apps/experience/.angular`, `apps/experience/dist`, generated smoke temp dirs.
