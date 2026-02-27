import { VISUAL_THEME } from './visualTheme';

export const GLOBAL_PATH_SPRING = {
  stiffness: 80,
  damping: 20,
  restDelta: 0.001,
};

export const SCROLL_EXPERIENCE_MOTION = {
  sceneOpacityRange: [0, 0.6, 0.9],
  sceneOpacityValues: [1, 1, 0],
  textYRange: [0, 0.72, 0.9],
  textYValues: ["0%", "0%", "10%"],
  // Ease lights out in two steps so they don't feel like a hard snap-off.
  streetlightsOpacityRange: [0, 0.5, 0.74, 0.9],
  streetlightsOpacityValues: [0.9, 0.9, 0.45, 0],
} as const;

export const DAY_NIGHT_MOTION = {
  backgroundRange: [0, 0.3, 0.6],
  backgroundValues: [VISUAL_THEME.daySkyBackground, "#FF8E8E", "#0F172A"],
  sunPositionRange: [0, 0.3],
  sunOpacityRange: [0, 0.2, 0.4],
  sunOpacityValues: [1, 1, 0],
  moonPathRange: [0.18, 0.3, 0.48, 0.78, 1],
  moonYValues: ["110%", "36%", "18%", "12%", "11%"],
  moonXValues: ["97%", "91%", "84%", "77%", "76%"],
  moonOpacityRange: [0.26, 0.34, 1],
  moonOpacityValues: [0, 1, 1],
  starsOpacityRange: [0.24, 0.38, 1],
  starsOpacityValues: [0, 1, 1],
} as const;
