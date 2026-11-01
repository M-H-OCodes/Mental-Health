import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#5AA59E] text-[#F3F9F7] py-8 border-t border-[#488b85]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:opacity-80 transition-all p-2 rounded-full bg-[#488b85]/40 hover:bg-[#488b85] cursor-pointer group"
            title="Scroll to Top"
            aria-label="Back to top"
          >
            <img
              src="Arrow.png"
              alt="Back to top"
              className="w-7 h-7 transform -rotate-90 group-hover:-translate-y-1 transition-transform"
            />
            <span className="text-xs uppercase font-bold tracking-wider sm:inline hidden text-white">Back to top</span>
          </button>

          <p className="text-sm sm:text-base font-medium text-black">
            &copy; 2025 Mindful Youth / EcoMind. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:opacity-80 transition-all p-2 rounded-full bg-[#488b85]/40 hover:bg-[#488b85] cursor-pointer group"
            title="Scroll to Top"
            aria-label="Back to top"
          >
            <img
              src="Arrow.png"
              alt="Back to top"
              className="w-7 h-7 transform -rotate-90 group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </div>

        <div className="mt-2 text-xs text-[#d2f8eb] max-w-md mx-auto flex items-center justify-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-[#F2A7A7]" />
          <span>Built with care for adolescent mental health awareness</span>
        </div>
      </div>
    </footer>
  );
};
