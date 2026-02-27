import React from 'react';
import { m } from 'framer-motion';
import { VISUAL_THEME } from './visualTheme';

const FeatureCard: React.FC<{ 
  title: string, 
  desc: string, 
  rotate?: string,
  titleColor: string
}> = ({ title, desc, rotate = "0deg", titleColor }) => {
  return (
    <div style={{ transform: `rotate(${rotate})` }}>
      <m.div
        className="bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-xl cursor-pointer"
        whileHover={{ y: -7, x: 2, rotate: 1.8, scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 420, damping: 18, mass: 0.55 }}
      >
        <h3 
          className="text-3xl mb-3 text-center font-centaur"
          style={{ color: titleColor }}
        >
          <span className="inline-block underline decoration-[3px] underline-offset-8">
            {title}
          </span>
        </h3>
        <p className="text-slate-300 font-centaur text-xl leading-relaxed text-center">{desc}</p>
      </m.div>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="pb-24 pt-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl mb-6 text-white font-centaur">More than just a map.</h2>
          <p className="text-2xl text-slate-400 font-centaur">
            Lantern is built differently. We prioritize safety data, community reports, and lighting conditions over the absolute shortest route.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 px-4">
          <FeatureCard 
            title="Public Data"
            desc="We aggregate lighting, outages, and street conditions to guide you to safer paths."
            rotate="-2deg"
            titleColor={VISUAL_THEME.featureTitleColors.publicData}
          />
          <FeatureCard 
            title="Crowd Source"
            desc="Real-time reports from other walkers about blocked paths, crowds, or unsafe conditions."
            rotate="2deg"
            titleColor={VISUAL_THEME.featureTitleColors.crowdSource}
          />
          <FeatureCard 
            title="AI Safety Layer"
            desc="Computer vision analyzes street-level imagery to estimate perceived safety."
            rotate="-1deg"
            titleColor={VISUAL_THEME.featureTitleColors.aiPowered}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
