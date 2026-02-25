import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun, Moon, Star } from 'lucide-react';

const DayNightBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Background color transition: Day (Blue) -> Sunset -> Night
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    ["#BAE6FD", "#FDBA74", "#0F172A"] // Sky Blue -> Orange -> Slate 900
  );

  // Sun position and opacity
  const sunY = useTransform(scrollYProgress, [0, 0.3], ["10%", "110%"]);
  const sunX = useTransform(scrollYProgress, [0, 0.3], ["80%", "20%"]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);

  // Moon position and opacity
  const moonY = useTransform(scrollYProgress, [0.2, 0.7], ["110%", "20%"]);
  const moonX = useTransform(scrollYProgress, [0.2, 0.7], ["80%", "50%"]);
  const moonOpacity = useTransform(scrollYProgress, [0.2, 0.4, 1], [0, 1, 1]);

  // Stars opacity
  const starsOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  return (
    <motion.div 
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
      style={{ backgroundColor }}
    >


      {/* Moon */}
      <motion.div 
        className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-slate-100 shadow-[0_0_40px_rgba(241,245,249,0.3)]"
        style={{ top: moonY, left: moonX, opacity: moonOpacity, x: "-50%", y: "-50%" }}
      >
        {/* Moon Craters */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-slate-200 opacity-60"></div>
        <div className="absolute top-1/2 left-2/3 w-6 h-6 rounded-full bg-slate-200 opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-slate-200 opacity-70"></div>
      </motion.div>

      {/* Stars */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: starsOpacity }}
      >
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`
            }}
          />
        ))}
      </motion.div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </motion.div>
  );
};

export default DayNightBackground;
