import React, { useEffect, useRef, useState } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { SCROLL_EXPERIENCE_MOTION } from './motionConfig';
import { createSeededRandom, randomInRange } from './deterministicRandom';

const ScrollExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const streetlightFlickerRef = useRef<Array<{ duration: number; delay: number }> | null>(null);
  const [isScrollSceneReady, setIsScrollSceneReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  if (!streetlightFlickerRef.current) {
    const rand = createSeededRandom(90210);
    streetlightFlickerRef.current = Array.from({ length: 3 }, () => ({
      duration: randomInRange(rand, 1.5, 3.5),
      delay: randomInRange(rand, 0, 2),
    }));
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsScrollSceneReady(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  // Use direct scroll progress here to avoid perceived lag/desync on fast mobile scrolls.
  // Single scroll scene: shorter hold, then ease out earlier to reduce dead scroll.
  const scene1Opacity = useTransform(
    scrollYProgress,
    SCROLL_EXPERIENCE_MOTION.sceneOpacityRange,
    SCROLL_EXPERIENCE_MOTION.sceneOpacityValues
  );
  const scene1TextY = useTransform(
    scrollYProgress,
    SCROLL_EXPERIENCE_MOTION.textYRange,
    SCROLL_EXPERIENCE_MOTION.textYValues
  );
  const streetlightsOpacity = useTransform(
    scrollYProgress,
    SCROLL_EXPERIENCE_MOTION.streetlightsOpacityRange,
    SCROLL_EXPERIENCE_MOTION.streetlightsOpacityValues
  );

  return (
    <div ref={containerRef} className="h-[130vh] md:h-[150vh] relative">
      <m.div 
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center"
        style={{ opacity: isScrollSceneReady ? 1 : 0 }}
      >
        {/* --- SCENE 1: The Uncertainty (Dark) --- */}
        <m.div 
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ opacity: scene1Opacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/12 via-amber-800/10 to-slate-950/28"></div>
          {/* Dim Flickering Street Lights */}
          <m.div
            className="absolute bottom-0 w-full h-64 flex justify-around px-10"
            style={{ opacity: streetlightsOpacity }}
          >
             {streetlightFlickerRef.current!.map((flicker, index) => {
                return (
                  <div key={index} className="h-full w-3 bg-slate-800 relative">
                     {/* Base */}
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-slate-900 rounded-t-lg"></div>
                     
                     {/* Lamp Head */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded-t-full"></div>
                     
                     <m.div 
                       className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-6 bg-yellow-500 rounded-b-xl shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                       animate={prefersReducedMotion ? { opacity: 0.8 } : { opacity: [0.1, 1, 0.2, 0.9, 0.1, 1] }}
                       transition={
                         prefersReducedMotion
                           ? { duration: 0 }
                           : { duration: flicker.duration, delay: flicker.delay, repeat: Infinity, repeatType: "reverse", ease: "linear" }
                       }
                     ></m.div>
                     
                     {/* Dim light beam */}
                     <m.div 
                       className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-48 bg-gradient-to-b from-yellow-500/30 to-transparent blur-md" 
                       style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)' }}
                       animate={prefersReducedMotion ? { opacity: 0.35 } : { opacity: [0.1, 1, 0.2, 0.9, 0.1, 1] }}
                       transition={
                         prefersReducedMotion
                           ? { duration: 0 }
                           : { duration: flicker.duration, delay: flicker.delay, repeat: Infinity, repeatType: "reverse", ease: "linear" }
                       }
                     ></m.div>
                  </div>
                );
             })}
          </m.div>

          <m.div
            className="relative z-10 text-center text-white px-4 max-w-lg mt-[-200px]"
            style={{ y: scene1TextY }}
          >
             <h2 className="text-5xl mb-4 font-centaur text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">The Usual Walk?</h2>
             <p className="text-2xl text-white/90 font-centaur [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]">Dimly lit streets. Uncertainty. Looking over your shoulder.</p>
          </m.div>
        </m.div>

      </m.div>
    </div>
  );
};

export default ScrollExperience;
