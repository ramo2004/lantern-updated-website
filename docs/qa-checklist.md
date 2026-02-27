# Lantern Website QA Checklist

## Goal
- Catch layout, motion, and conversion regressions quickly across mobile and desktop without requiring a full test suite.

## Devices / Browsers (minimum matrix)
- iPhone Safari (small viewport): e.g. iPhone SE / mini class
- iPhone Safari (tall viewport): e.g. iPhone 14/15/16 Pro class
- Android Chrome (mid-size viewport)
- Desktop Safari or Chrome (laptop)
- Desktop Chrome (large monitor width)

## Hero / Above-the-fold
- Logo and `A Safer Walk.` have comfortable spacing on mobile (no crowding with browser chrome)
- Waitlist input + `Join Waitlist` button are fully visible on first load (no clipping)
- Mobile scroll arrow appears below the waitlist form and does not overlap CTA
- Arrow hides while email input is focused / keyboard open
- Waitlist button hover does not darken (peach color remains consistent)

## Scroll + Motion
- Fast scroll up/down on mobile does not cause noticeable lag in `The Usual Walk?` scene
- Streetlights fade out smoothly (no sudden shortening/clipping pop)
- Moon and stars remain visible and bright near page bottom on desktop
- Global walking path does not pop in/out on first load
- Feature card hover motion snaps back cleanly on hover-out (no looping wobble)

## Accessibility / Interaction
- Tab order reaches nav/logo link, email input, waitlist button, and footer CTA
- Nav logo is keyboard-focusable and activates as a link
- Waitlist input announces as email field in screen reader
- MiniGame controls have accessible names (restart + directional controls)
- Reduced-motion setting: decorative bouncing/twinkle/flicker is reduced/disabled

## Viewport State Checks (mobile Safari especially)
- Fresh load with URL bar expanded
- After scrolling down (URL bar collapsed)
- Scroll back to top quickly
- Open keyboard in email field, then dismiss keyboard
- Rotate portrait <-> landscape (sanity check; no broken layout)

## Performance Sanity (manual)
- First load feels responsive; no obvious jank before hero appears
- No large visual flicker/popping of decorative elements on mount
- Scrolling remains smooth through hero -> `The Usual Walk?` -> features

## Regression Quick Commands
- `npm run build`
- Manual local check: `npm run dev -- --host 0.0.0.0 --port 3000`
