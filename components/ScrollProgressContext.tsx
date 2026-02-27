import React, { createContext, useContext } from 'react';
import { useScroll, type MotionValue } from 'framer-motion';

const ScrollProgressContext = createContext<MotionValue<number> | null>(null);

export const GlobalScrollProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollYProgress } = useScroll();

  return (
    <ScrollProgressContext.Provider value={scrollYProgress}>
      {children}
    </ScrollProgressContext.Provider>
  );
};

export const useGlobalScrollProgress = (): MotionValue<number> => {
  const value = useContext(ScrollProgressContext);
  if (!value) {
    throw new Error('useGlobalScrollProgress must be used within GlobalScrollProgressProvider');
  }
  return value;
};
