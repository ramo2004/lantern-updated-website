import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ScrollExperience from './components/ScrollExperience';
import Features from './components/Features';
import Footer from './components/Footer';
import DayNightBackground from './components/DayNightBackground';
import GlobalPath from './components/GlobalPath';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden selection:bg-lantern/30">
      <DayNightBackground />
      <GlobalPath />
      <Navigation />
      <main>
        <Hero />
        <ScrollExperience />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default App;