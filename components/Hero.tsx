import React from 'react';
import { ArrowDown, MapPin, ShieldCheck, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { MiniGame } from './MiniGame';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-10 md:pt-48 md:pb-16 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col justify-center -mt-8 md:-mt-20 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-8xl font-normal leading-tight tracking-tight mb-8 text-ink">
                <span className="text-lantern relative inline-block drop-shadow-sm">
                  A Safer Walk.
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-600 font-centaur max-w-md leading-relaxed">
                Lantern finds the best-lit, most populated routes for your walk home. Because peace of mind is the best destination.
              </p>
            </motion.div>

            <motion.div 
              className="w-full max-w-lg mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form 
                className="flex items-center w-full bg-white rounded-full p-2 border-2 border-transparent focus-within:border-lantern/50 focus-within:shadow-[0_0_25px_rgba(255,107,107,0.3)] transition-all duration-300 shadow-xl"
                onSubmit={(e) => e.preventDefault()}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-transparent px-6 py-2 focus:outline-none font-centaur text-xl placeholder:text-gray-400 text-ink"
                  required
                />
                <button className="bg-lantern text-white px-8 py-3 rounded-full font-centaur font-bold text-xl hover:bg-lantern-dark transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap shadow-md">
                  Join Waitlist
                </button>
              </form>
            </motion.div>
          </div>

          <div className="relative hidden md:block h-[500px]">
             {/* Decorative blob background */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-mustard/20 rounded-full blur-3xl -z-10 animate-pulse" />
             
             {/* Abstract Map Illustration */}
             <motion.div 
               className="relative w-full h-full"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
             >
                <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-2xl overflow-visible">
                   {/* Simplified Phone Frame */}
                   <rect x="50" y="20" width="300" height="460" rx="40" fill="#fff" stroke="#1a1a1a" strokeWidth="6" />
                   
                   <foreignObject x="65" y="35" width="270" height="430" style={{ borderRadius: '25px', overflow: 'hidden' }}>
                     <MiniGame />
                   </foreignObject>
                </svg>

                {/* Floating Elements */}
                <motion.div 
                  className="absolute top-20 -right-4 bg-white p-3 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] pointer-events-none"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-teal/20 p-1.5 rounded-lg text-teal">
                      <Sun size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500">Street Lighting</div>
                      <div className="font-bold text-slate-900">Excellent</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute bottom-32 -left-8 bg-white p-3 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] pointer-events-none"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-lantern/20 p-1.5 rounded-lg text-lantern">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500">Crowd Report</div>
                      <div className="font-bold text-slate-900">Safe Zone</div>
                    </div>
                  </div>
                </motion.div>

             </motion.div>
             
             <div className="text-center mt-6">
               <p className="text-sm text-gray-500 font-centaur px-6">
                 Use your <strong className="text-ink">arrow keys</strong> or the <strong className="text-ink">on-screen D-Pad</strong> to move. Stay in the light to maximize your score. Reach the Lantern to win!
               </p>
             </div>
          </div>

        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-400">
          <ArrowDown />
        </div>
      </div>
    </section>
  );
};

export default Hero;