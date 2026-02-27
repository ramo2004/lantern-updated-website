import React, { useEffect, useState } from 'react';
import { m, useReducedMotion, useSpring } from 'framer-motion';
import { GLOBAL_PATH_SPRING } from './motionConfig';
import { useGlobalScrollProgress } from './ScrollProgressContext';
import { VISUAL_THEME } from './visualTheme';

const GlobalPath: React.FC = () => {
  const [isPathReady, setIsPathReady] = useState(false);
  const scrollYProgress = useGlobalScrollProgress();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsPathReady(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);
  
  // Smooth the scroll input slightly so the drawing doesn't instantly snap
  const smoothProgress = useSpring(scrollYProgress, GLOBAL_PATH_SPRING);
  const pathProgress = prefersReducedMotion ? scrollYProgress : smoothProgress;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[5] pointer-events-none opacity-50 mix-blend-overlay transition-opacity duration-200"
      style={{ opacity: isPathReady ? 0.5 : 0 }}
    >
      <svg 
        focusable="false"
        className="w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <m.path 
          d="
            M 10 -5 
            C 90 15, 90 30, 50 40 
            C 10 50, 10 70, 50 80 
            C 90 90, 70 105, 50 105
          "
          fill="none" 
          stroke={VISUAL_THEME.pathStroke}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1.5 3"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: pathProgress }}
        />
        
        {/* The character walking dot at the tip of the line */}
        {/* We can achieve this by animating offsetDistance if we used CSS motion paths, but Framer Motion's pathLength gives a great drawing effect. The dashed line is enough for "swirling its way down". */}
      </svg>
    </div>
  );
};

export default GlobalPath;
