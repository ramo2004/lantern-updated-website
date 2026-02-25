import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Moon, Home } from 'lucide-react';

const ScrollExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress with gentler spring physics
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });

  // Transforms for background elements (Parallax effect)
  // Scene 1: Dark Street (Holds until 0.2, slides out by 0.35)
  const scene1Opacity = useTransform(smoothProgress, [0, 0.2, 0.35], [1, 1, 0]);
  const scene1X = useTransform(smoothProgress, [0, 0.2, 0.35], ["0%", "0%", "-100%"]);

  // Scene 2: Bright Path (Slides in 0.25-0.4, holds until 0.6, slides out by 0.75)
  const scene2Opacity = useTransform(smoothProgress, [0.25, 0.4, 0.6, 0.75], [0, 1, 1, 0]);
  const scene2X = useTransform(smoothProgress, [0.25, 0.4, 0.6, 0.75], ["100%", "0%", "0%", "-100%"]);

  // Scene 3: Home (Slides in 0.65-0.8, holds until 1.0)
  const scene3Opacity = useTransform(smoothProgress, [0.65, 0.8, 1], [0, 1, 1]);
  const scene3X = useTransform(smoothProgress, [0.65, 0.8, 1], ["100%", "0%", "0%"]);

  return (
    <div ref={containerRef} className="h-[400vh] relative">
      <motion.div 
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center"
      >
        
        {/* --- SCENE 1: The Uncertainty (Dark) --- */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ opacity: scene1Opacity, x: scene1X }}
        >
          {/* Dim Flickering Street Lights */}
          <div className="absolute bottom-0 w-full h-64 flex justify-around px-10 opacity-90">
             {[1,2,3].map(i => {
                // Randomize flicker timing for each light
                const duration = 1.5 + Math.random() * 2;
                const delay = Math.random() * 2;
                return (
                  <div key={i} className="h-full w-3 bg-slate-800 relative">
                     {/* Base */}
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-slate-900 rounded-t-lg"></div>
                     
                     {/* Lamp Head */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded-t-full"></div>
                     
                     <motion.div 
                       className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-6 bg-yellow-500 rounded-b-xl shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                       animate={{ opacity: [0.1, 1, 0.2, 0.9, 0.1, 1] }}
                       transition={{ duration, delay, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                     ></motion.div>
                     
                     {/* Dim light beam */}
                     <motion.div 
                       className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-48 bg-gradient-to-b from-yellow-500/30 to-transparent blur-md" 
                       style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)' }}
                       animate={{ opacity: [0.1, 1, 0.2, 0.9, 0.1, 1] }}
                       transition={{ duration, delay, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                     ></motion.div>
                  </div>
                );
             })}
          </div>

          <div className="relative z-10 text-center text-white px-4 max-w-lg mt-[-200px]">
             <h2 className="text-5xl mb-4 font-centaur">The Usual Walk?</h2>
             <p className="text-2xl opacity-80 font-centaur">Dimly lit streets. Uncertainty. Looking over your shoulder.</p>
          </div>
        </motion.div>

        {/* --- SCENE 2: The Lantern Path (Bright) --- */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ opacity: scene2Opacity, x: scene2X }}
        >

          
          <div className="relative z-10 text-center text-ink px-4 max-w-lg mt-[-200px] bg-white/90 p-8 rounded-2xl backdrop-blur-sm shadow-xl border-2 border-ink">
             <h2 className="text-5xl mb-4 text-lantern font-centaur">The Lantern Way</h2>
             <p className="text-2xl font-centaur">We guide you through verified, well-lit routes populated by local businesses and safe zones.</p>
          </div>
        </motion.div>

        {/* --- SCENE 3: Arrival (Safe) --- */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ opacity: scene3Opacity, x: scene3X }}
        >
           <div className="absolute bottom-0 right-10 md:right-32">
              <div className="relative">
                 <Home size={300} strokeWidth={1} className="text-teal" />
                 <div className="absolute top-20 left-20 w-12 h-12 bg-mustard opacity-50 blur-lg rounded-full animate-ping"></div>
              </div>
           </div>
           
           <div className="relative z-10 text-center text-white px-4 max-w-lg mt-[-200px] mr-auto ml-10 md:ml-32">
             <h2 className="text-5xl mb-4 text-teal-400 font-centaur">Arrive Smiling.</h2>
             <p className="text-2xl font-centaur">Share your status automatically with friends when you get home safe.</p>
             <button className="mt-6 bg-white text-ink px-8 py-3 rounded-full hover:bg-teal hover:text-white transition-colors shadow-lg font-centaur text-xl">Start Walking Today</button>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ScrollExperience;