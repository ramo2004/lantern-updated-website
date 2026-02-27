import React, { useRef } from 'react';
import { m, useMotionValueEvent, useReducedMotion, useTransform } from 'framer-motion';
import { DAY_NIGHT_MOTION } from './motionConfig';
import { useGlobalScrollProgress } from './ScrollProgressContext';
import { createSeededRandom, randomInRange } from './deterministicRandom';
import { VISUAL_THEME } from './visualTheme';

const MOBILE_STAR_SEED = 424242;
const DESKTOP_STAR_SEED_PER_LOAD = Math.floor(Math.random() * 0xffffffff);
const CLOUD_GROUPS = [
  {
    top: '6%',
    left: '-6%',
    width: '42vw',
    maxWidth: 520,
    height: '14vw',
    maxHeight: 170,
    rotate: -5,
    parts: [
      { left: '0%', top: '16%', width: '52%', height: '70%' },
      { left: '26%', top: '0%', width: '42%', height: '88%' },
      { left: '50%', top: '18%', width: '44%', height: '68%' },
    ],
  },
  {
    top: '15%',
    right: '-10%',
    width: '38vw',
    maxWidth: 460,
    height: '13vw',
    maxHeight: 156,
    rotate: 7,
    parts: [
      { left: '8%', top: '20%', width: '44%', height: '64%' },
      { left: '28%', top: '2%', width: '42%', height: '84%' },
      { left: '54%', top: '22%', width: '38%', height: '60%' },
    ],
  },
  {
    top: '31%',
    left: '18%',
    width: '30vw',
    maxWidth: 360,
    height: '10vw',
    maxHeight: 126,
    rotate: -3,
    parts: [
      { left: '5%', top: '22%', width: '42%', height: '58%' },
      { left: '24%', top: '8%', width: '38%', height: '72%' },
      { left: '48%', top: '24%', width: '34%', height: '52%' },
    ],
  },
] as const;

const DayNightBackground: React.FC = () => {
  const scrollYProgress = useGlobalScrollProgress();
  const prefersReducedMotion = useReducedMotion();
  const starsRef = useRef<Array<{
    top: number;
    left: number;
    size: number;
    twinkleDuration: number;
    twinkleDelay: number;
    minOpacity: number;
    maxOpacity: number;
  }> | null>(null);

  if (!starsRef.current) {
    const isCoarseOrMobile =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;

    const rand = createSeededRandom(isCoarseOrMobile ? MOBILE_STAR_SEED : DESKTOP_STAR_SEED_PER_LOAD);
    starsRef.current = Array.from({ length: 68 }, (_, i) => {
      // Keep a visible spread near the lower half so stars don't feel "gone" at page bottom on larger screens.
      const bottomBiased = i < 16;
      const upperBiased = i >= 16 && i < 28;

      const top = bottomBiased
        ? randomInRange(rand, 52, 95)
        : upperBiased
          ? randomInRange(rand, 6, 34)
          : randomInRange(rand, 0, 100);

      return {
        top,
        left: randomInRange(rand, 0, 100),
        size: randomInRange(rand, 1.2, 4),
        twinkleDuration: randomInRange(rand, 2, 5),
        twinkleDelay: randomInRange(rand, 0, 2.5),
        minOpacity: randomInRange(rand, 0.62, 0.82),
        maxOpacity: randomInRange(rand, 0.9, 1.02),
      };
    });
  }

  // Background color transition: Day (Blue) -> Sunset -> Night
  const backgroundColor = useTransform(
    scrollYProgress,
    DAY_NIGHT_MOTION.backgroundRange,
    DAY_NIGHT_MOTION.backgroundValues
  );

  useMotionValueEvent(backgroundColor, 'change', (latest) => {
    if (typeof document === 'undefined') return;
    document.body.style.backgroundColor = latest;
    document.documentElement.style.backgroundColor = latest;
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', latest);
    }
  });

  // Sun position and opacity
  const sunY = useTransform(scrollYProgress, DAY_NIGHT_MOTION.sunPositionRange, ["10%", "110%"]);
  const sunX = useTransform(scrollYProgress, DAY_NIGHT_MOTION.sunPositionRange, ["80%", "20%"]);
  const sunOpacity = useTransform(
    scrollYProgress,
    DAY_NIGHT_MOTION.sunOpacityRange,
    DAY_NIGHT_MOTION.sunOpacityValues
  );

  // Moon position and opacity
  // Moonrise path: rise from the far-right horizon, then continue drifting left/up (no direction reversal).
  const moonY = useTransform(scrollYProgress, DAY_NIGHT_MOTION.moonPathRange, DAY_NIGHT_MOTION.moonYValues);
  const moonX = useTransform(scrollYProgress, DAY_NIGHT_MOTION.moonPathRange, DAY_NIGHT_MOTION.moonXValues);
  // Fade in only after it has cleared the streetlight region.
  const moonOpacity = useTransform(
    scrollYProgress,
    DAY_NIGHT_MOTION.moonOpacityRange,
    DAY_NIGHT_MOTION.moonOpacityValues
  );

  // Stars opacity
  const starsOpacity = useTransform(
    scrollYProgress,
    DAY_NIGHT_MOTION.starsOpacityRange,
    DAY_NIGHT_MOTION.starsOpacityValues
  );
  const cloudOpacity = useTransform(scrollYProgress, [0, 0.16, 0.3], [0.8, 0.78, 0]);
  const cloudDriftX = useTransform(scrollYProgress, [0, 0.3], ['0%', '4%']);

  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ backgroundColor }}
    >
      {VISUAL_THEME.clouds.enabled && (
        <m.div
          className="absolute inset-0"
          style={{ opacity: cloudOpacity, x: prefersReducedMotion ? '0%' : cloudDriftX }}
        >
          {CLOUD_GROUPS.map((group, idx) => (
            <div
              key={idx}
              className="absolute pointer-events-none"
              style={{
                top: group.top,
                left: 'left' in group ? group.left : undefined,
                right: 'right' in group ? group.right : undefined,
                width: group.width,
                maxWidth: group.maxWidth,
                height: group.height,
                maxHeight: group.maxHeight,
                transform: `rotate(${group.rotate}deg)`,
                filter: 'drop-shadow(0 12px 20px rgba(30,60,110,0.18))',
              }}
            >
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: VISUAL_THEME.clouds.glow, opacity: 0.9 }}
              />
              <div
                className="absolute left-[10%] right-[10%] bottom-[8%] h-[34%] rounded-[999px]"
                style={{
                  background: 'linear-gradient(180deg, rgba(112, 152, 196, 0.16) 0%, rgba(72, 116, 165, 0.26) 100%)',
                  filter: 'blur(6px)',
                }}
              />
              {group.parts.map((part, partIdx) => (
                <div
                  key={partIdx}
                  className="absolute rounded-full"
                  style={{
                    left: part.left,
                    top: part.top,
                    width: part.width,
                    height: part.height,
                    background: `radial-gradient(140% 120% at 32% 22%, rgba(255,255,255,0.96) 0%, ${VISUAL_THEME.clouds.tint} 46%, rgba(205, 226, 245, 0.78) 100%)`,
                    boxShadow: 'inset 0 1px 8px rgba(255,255,255,0.35), 0 6px 18px rgba(173,208,238,0.22)',
                  }}
                />
              ))}
              <div
                className="absolute left-[18%] right-[18%] top-[12%] h-[18%] rounded-[999px]"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)',
                  filter: 'blur(3px)',
                }}
              />
            </div>
          ))}
        </m.div>
      )}

      {/* Sun */}
      <m.div
        className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-mustard shadow-[0_0_70px_rgba(250,204,21,0.65)]"
        style={{ top: sunY, left: sunX, opacity: sunOpacity, x: "-50%", y: "-50%", willChange: 'transform, opacity' }}
      >
        {/* Smooth sun shading/highlight (no crater-like spots) */}
        <div className="absolute -inset-3 md:-inset-4 rounded-full bg-yellow-200/25 blur-xl"></div>
        <div className="absolute inset-1 md:inset-2 rounded-full bg-gradient-to-br from-yellow-50/75 via-amber-100/25 to-transparent"></div>
        <div className="absolute inset-0 rounded-full ring-1 ring-yellow-100/45"></div>
      </m.div>

      {/* Moon */}
      <m.div 
        className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-slate-100 shadow-[0_0_58px_rgba(241,245,249,0.4)]"
        style={{ top: moonY, left: moonX, opacity: moonOpacity, x: "-50%", y: "-50%", willChange: 'transform, opacity' }}
      >
        <div className="absolute -inset-4 md:-inset-5 rounded-full bg-slate-100/14 blur-2xl"></div>
        {/* Moon Craters */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-slate-200 opacity-60"></div>
        <div className="absolute top-1/2 left-2/3 w-6 h-6 rounded-full bg-slate-200 opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-slate-200 opacity-70"></div>
        <div className="absolute inset-0 rounded-full ring-1 ring-white/40"></div>
      </m.div>

      {/* Stars */}
      <m.div 
        className="absolute inset-0"
        style={{ opacity: starsOpacity }}
      >
        {starsRef.current!.map((star, i) => (
          <div 
            key={i}
            className="star-dot absolute bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)]"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: prefersReducedMotion ? star.minOpacity : star.maxOpacity,
              animation: prefersReducedMotion
                ? undefined
                : `twinkle ${star.twinkleDuration}s ${star.twinkleDelay}s infinite ease-in-out`,
              ['--twinkle-min' as string]: String(star.minOpacity),
              ['--twinkle-max' as string]: String(star.maxOpacity),
            }}
          />
        ))}
      </m.div>
    </m.div>
  );
};

export default DayNightBackground;
