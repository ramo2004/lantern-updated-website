import React, { useState } from 'react';
import { Lightbulb, Users, BellRing, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const HandDrawnFilter = () => (
  <defs>
    <filter id="hand-drawn-feature">
      <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
    </filter>
  </defs>
);

interface CharacterProps {
  color: string;
  accessory: 'phone' | 'shield' | 'map';
  outfit: 'coat' | 'hoodie' | 'vest';
  isActive: boolean;
}

const Character: React.FC<CharacterProps> = ({ color, accessory, outfit, isActive }) => {
  return (
    <motion.div 
      className="relative w-24 h-36 md:w-32 md:h-48 mx-auto mb-4"
      whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
    >
      <svg viewBox="0 0 200 300" className="w-full h-full overflow-visible">
        <HandDrawnFilter />
        <g filter="url(#hand-drawn-feature)">
           {/* Shadow */}
           <ellipse cx="100" cy="290" rx="40" ry="10" fill="#000" opacity="0.1" />

           {/* Legs */}
           <motion.path 
             d="M100 200 Q 80 250 80 290" 
             stroke="#1a1a1a" strokeWidth="16" strokeLinecap="round" fill="none" 
             animate={isActive ? { d: ["M100 200 Q 80 250 80 290", "M100 200 Q 80 240 80 280", "M100 200 Q 80 250 80 290"] } : {}}
             transition={{ repeat: Infinity, duration: 0.5 }}
           />
           <motion.path 
             d="M100 200 Q 120 250 120 290" 
             stroke="#1a1a1a" strokeWidth="16" strokeLinecap="round" fill="none"
             animate={isActive ? { d: ["M100 200 Q 120 250 120 290", "M100 200 Q 120 240 120 280", "M100 200 Q 120 250 120 290"] } : {}}
             transition={{ repeat: Infinity, duration: 0.5, delay: 0.25 }}
           />
           
           {/* Body (Outfits) */}
           {outfit === 'coat' && (
             <path 
               d="M60 220 L 50 100 C 50 80 150 80 150 100 L 140 220 C 140 240 60 240 60 220 Z" 
               fill={color} 
               stroke="#1a1a1a" 
               strokeWidth="4" 
             />
           )}
           {outfit === 'hoodie' && (
             <g>
               <path 
                 d="M60 210 L 55 110 C 55 90 145 90 145 110 L 140 210 C 140 220 60 220 60 210 Z" 
                 fill={color} 
                 stroke="#1a1a1a" 
                 strokeWidth="4" 
               />
               <path d="M60 210 L 140 210" stroke="#1a1a1a" strokeWidth="4" />
               <path d="M100 110 L 100 180" stroke="#1a1a1a" strokeWidth="2" opacity="0.5" /> {/* Zipper */}
               <path d="M70 110 Q 100 130 130 110" stroke="#1a1a1a" strokeWidth="2" fill="none" /> {/* Hood line */}
             </g>
           )}
           {outfit === 'vest' && (
             <g>
               <path 
                 d="M65 210 L 60 100 C 60 85 140 85 140 100 L 135 210 C 135 220 65 220 65 210 Z" 
                 fill={color} 
                 stroke="#1a1a1a" 
                 strokeWidth="4" 
               />
               <path d="M60 100 L 50 140" stroke="#1a1a1a" strokeWidth="4" fill="none" /> {/* Arm hole L */}
               <path d="M140 100 L 150 140" stroke="#1a1a1a" strokeWidth="4" fill="none" /> {/* Arm hole R */}
               <rect x="90" y="120" width="20" height="20" fill="none" stroke="#1a1a1a" strokeWidth="2" /> {/* Pocket */}
             </g>
           )}
           
           {/* Buttons (only for coat) */}
           {outfit === 'coat' && (
             <>
               <circle cx="100" cy="130" r="4" fill="#1a1a1a" opacity="0.5" />
               <circle cx="100" cy="160" r="4" fill="#1a1a1a" opacity="0.5" />
             </>
           )}

           {/* Head */}
           <circle cx="100" cy="70" r="35" fill="#FFE66D" stroke="#1a1a1a" strokeWidth="4" />
           
           {/* Face */}
           <circle cx="115" cy="65" r="3" fill="#1a1a1a" />
           <circle cx="85" cy="65" r="3" fill="#1a1a1a" />
           {isActive ? (
             <path d="M90 80 Q 100 90 110 80" stroke="#1a1a1a" strokeWidth="2" fill="none" />
           ) : (
             <path d="M95 80 Q 100 85 105 80" stroke="#1a1a1a" strokeWidth="2" fill="none" />
           )}
           <path d="M65 70 Q 55 40 80 35 Q 110 20 120 40" stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round" fill="none" />

           {/* Lantern (Held by all characters) */}
           <g transform="translate(140, 140) rotate(-10)">
             <path d="M0 0 L0 -20" stroke="#1a1a1a" strokeWidth="2" /> {/* Handle */}
             <rect x="-10" y="0" width="20" height="25" rx="5" fill="#FF6B6B" stroke="#1a1a1a" strokeWidth="2" />
             <circle cx="0" cy="12" r="6" fill="#FFE66D" opacity="0.8" />
             {/* Glow */}
             <circle cx="0" cy="12" r="20" fill="#FFE66D" opacity="0.2" filter="blur(4px)" />
           </g>

           {/* Arm holding lantern */}
           <path d="M130 110 Q 150 130 140 140" stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round" fill="none" />

           {/* Accessories (Other hand) */}
           {accessory === 'phone' && (
             <g transform="translate(10, 10)">
               <rect x="60" y="120" width="20" height="30" rx="4" fill="#4ECDC4" stroke="#1a1a1a" strokeWidth="2" transform="rotate(-15 70 135)" />
               <path d="M70 110 Q 50 130 60 140" stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round" fill="none" />
             </g>
           )}
           {accessory === 'shield' && (
             <g transform="translate(-10, 10)">
               <path d="M60 130 L 80 130 L 70 160 Z" fill="#3AB7AF" stroke="#1a1a1a" strokeWidth="2" />
               <path d="M70 110 Q 50 130 50 140" stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round" fill="none" />
             </g>
           )}
           {accessory === 'map' && (
             <g transform="translate(0, 0)">
               <rect x="40" y="130" width="30" height="25" fill="#fff" stroke="#1a1a1a" strokeWidth="2" transform="rotate(10 55 142)" />
               <path d="M70 110 Q 50 130 55 140" stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round" fill="none" />
             </g>
           )}
        </g>
      </svg>
    </motion.div>
  );
};

const FeatureCard: React.FC<{ 
  title: string, 
  desc: string, 
  rotate?: string,
  characterProps: CharacterProps
}> = ({ title, desc, rotate = "0deg", characterProps }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-xl hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer`}
      style={{ transform: `rotate(${rotate})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Character {...characterProps} isActive={isHovered} />
      <h3 
        className="text-3xl mb-3 text-center font-centaur"
        style={{ color: characterProps.color }}
      >
        {title}
      </h3>
      <p className="text-slate-300 font-centaur text-xl leading-relaxed text-center">{desc}</p>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="pb-24 pt-20 px-6 relative overflow-hidden">
      {/* Decorative Doodles */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Winding path going downwards */}
        <path 
          d="M50 0 Q 60 10 50 20 T 40 40 T 60 60 T 50 80 T 40 100" 
          fill="none" 
          stroke="#FF8E8E" 
          strokeWidth="0.5" 
          strokeDasharray="2,2" 
        />
        <circle cx="50" cy="20" r="2" fill="none" stroke="#4ECDC4" strokeWidth="0.5" />
        <circle cx="40" cy="60" r="3" fill="none" stroke="#FFE66D" strokeWidth="0.5" />
      </svg>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl mb-6 text-white font-centaur">More than just a map.</h2>
          <p className="text-2xl text-slate-400 font-centaur">
            Lantern is built differently. We prioritize safety data, community reports, and lighting conditions over the absolute shortest route.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 px-4">
          <FeatureCard 
            title="Public Infrastructure Data"
            desc="We aggregate streetlamp data, business hours, and infrastructure details to find the safest path."
            rotate="-2deg"
            characterProps={{
              color: "#FFE66D", // Mustard
              accessory: "map",
              outfit: "coat",
              isActive: false
            }}
          />
          <FeatureCard 
            title="Crowd Source"
            desc="Real-time reports from other walkers about blocked paths, crowds, or sketchy vibes."
            rotate="2deg"
            characterProps={{
              color: "#4ECDC4", // Teal
              accessory: "shield",
              outfit: "hoodie",
              isActive: false
            }}
          />
          <FeatureCard 
            title="AI Powered"
            desc="We use computer vision on street level imagery for perceived safety."
            rotate="-1deg"
            characterProps={{
              color: "#FF6B6B", // Lantern Red
              accessory: "phone",
              outfit: "vest",
              isActive: false
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;