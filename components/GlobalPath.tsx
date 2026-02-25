import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const GlobalPath: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth the scroll input slightly so the drawing doesn't instantly snap
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 20, 
    restDelta: 0.001 
  });

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none opacity-50 mix-blend-overlay">
      <svg 
        className="w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <motion.path 
          d="
            M 10 -5 
            C 90 15, 90 30, 50 40 
            C 10 50, 10 70, 50 80 
            C 90 90, 70 105, 50 105
          "
          fill="none" 
          stroke="#FFE66D" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="4 6"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: smoothProgress }}
        />
        
        {/* The character walking dot at the tip of the line */}
        {/* We can achieve this by animating offsetDistance if we used CSS motion paths, but Framer Motion's pathLength gives a great drawing effect. The dashed line is enough for "swirling its way down". */}
      </svg>
    </div>
  );
};

export default GlobalPath;
