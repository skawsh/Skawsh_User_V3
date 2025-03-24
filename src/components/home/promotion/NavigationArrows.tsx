
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface NavigationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const NavigationArrows: React.FC<NavigationArrowsProps> = ({ onPrev, onNext }) => {
  return (
    <>
      <button 
        onClick={onPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/50 flex items-center justify-center backdrop-blur-sm hidden sm:flex"
        aria-label="Previous banner"
      >
        <ArrowRight size={16} className="transform rotate-180" />
      </button>
      
      <button 
        onClick={onNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/50 flex items-center justify-center backdrop-blur-sm hidden sm:flex"
        aria-label="Next banner"
      >
        <ArrowRight size={16} />
      </button>
    </>
  );
};
