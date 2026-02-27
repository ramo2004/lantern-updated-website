import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ScrollExperience from './components/ScrollExperience';
import Features from './components/Features';
import Footer from './components/Footer';
import DayNightBackground from './components/DayNightBackground';
import GlobalPath from './components/GlobalPath';
import { GlobalScrollProgressProvider } from './components/ScrollProgressContext';

const App: React.FC = () => {
  const [isBelowFoldReady, setIsBelowFoldReady] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;
    let idleId: number | undefined;

    const markReady = () => setIsBelowFoldReady(true);

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback(markReady, { timeout: 180 });
    } else if (typeof window !== 'undefined') {
      timeoutId = window.setTimeout(markReady, 16);
    }

    return () => {
      if (typeof window !== 'undefined') {
        if (idleId !== undefined && 'cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
        if (timeoutId !== undefined) {
          window.clearTimeout(timeoutId);
        }
      }
    };
  }, []);

  return (
    <GlobalScrollProgressProvider>
      <div className="relative isolate min-h-screen w-full overflow-x-hidden selection:bg-lantern/30" style={{ minHeight: '100dvh' }}>
        <DayNightBackground />
        <GlobalPath />
        <Navigation />
        <main className="relative z-10">
          <Hero />
          {isBelowFoldReady ? (
            <>
              <ScrollExperience />
              <Features />
            </>
          ) : (
            <div aria-hidden="true" className="h-[130vh] md:h-[150vh]" />
          )}
        </main>
        {isBelowFoldReady ? <div className="relative z-10"><Footer /></div> : null}
      </div>
    </GlobalScrollProgressProvider>
  );
};

export default App;
