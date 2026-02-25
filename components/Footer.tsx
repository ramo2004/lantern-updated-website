import React from 'react';
import { Sparkles, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent pt-0 pb-12 border-t-0">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center gap-8">
        <a href="mailto:lanternnav@gmail.com" className="inline-block bg-lantern text-white px-8 py-3 rounded-full font-medium hover:bg-lantern-dark transition-colors transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl">
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;