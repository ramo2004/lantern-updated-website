type AccentThemeKey = 'pastelOriginal' | 'blueAccents';

type VisualTheme = {
  daySkyBackground: string;
  heroTitleText: string;
  heroUnderline: string;
  heroParagraphText: string;
  navForeground: string;
  featureTitleColors: {
    publicData: string;
    crowdSource: string;
    aiPowered: string;
  };
  pathStroke: string;
  clouds: {
    enabled: boolean;
    tint: string;
    glow: string;
  };
};

const FALLBACK_ACCENT_THEME: AccentThemeKey = 'blueAccents';

const resolveAccentThemeKey = (): AccentThemeKey => {
  if (typeof window === 'undefined') return FALLBACK_ACCENT_THEME;
  const value = (window as Window & { __lanternAccentTheme?: string }).__lanternAccentTheme;
  return value === 'pastelOriginal' ? 'pastelOriginal' : 'blueAccents';
};

const ACCENT_THEME_KEY = resolveAccentThemeKey();

const VISUAL_THEME_BY_ACCENT: Record<AccentThemeKey, VisualTheme> = {
  pastelOriginal: {
    daySkyBackground: '#BAE6FD',
    heroTitleText: '#FF6B6B',
    heroUnderline: '#FFE66D',
    heroParagraphText: '#4B5563',
    navForeground: '#1a1a1a',
    featureTitleColors: {
      publicData: '#FFE66D',
      crowdSource: '#4ECDC4',
      aiPowered: '#FF6B6B',
    },
    pathStroke: '#FFE66D',
    clouds: {
      enabled: false,
      tint: 'rgba(255, 255, 255, 0.72)',
      glow: 'rgba(255, 230, 109, 0.16)',
    },
  },
  blueAccents: {
    daySkyBackground: '#BAE6FD',
    heroTitleText: '#FF6B6B',
    heroUnderline: '#FFE66D',
    heroParagraphText: '#4B5563',
    navForeground: '#1a1a1a',
    featureTitleColors: {
      publicData: '#6F9CFF',
      crowdSource: '#6CC7F7',
      aiPowered: '#4F72D8',
    },
    pathStroke: '#A8D8FF',
    clouds: {
      enabled: false,
      tint: 'rgba(255, 255, 255, 0.7)',
      glow: 'rgba(140, 184, 255, 0.22)',
    },
  },
};

export const VISUAL_THEME = VISUAL_THEME_BY_ACCENT[ACCENT_THEME_KEY];
export const ACTIVE_ACCENT_THEME_KEY = ACCENT_THEME_KEY;
