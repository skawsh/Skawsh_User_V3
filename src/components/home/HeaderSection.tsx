
import React, { useEffect, useRef } from 'react';
import LocationBar from './LocationBar';
import SearchBar from './SearchBar';
import PromotionSlider from './PromotionSlider';
import { Heart, Sparkles } from 'lucide-react';
import { startBubblesAnimation, stopBubblesAnimation } from '@/utils/animationUtils';

interface Banner {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  buttonColor: string;
  textColor: string;
  image: string;
  serviceId?: string;
}

interface HeaderSectionProps {
  banners: Banner[];
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ banners }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Start the bubbles animation when component mounts
    if (headerRef.current) {
      const interval = startBubblesAnimation(headerRef.current);
      
      // Clean up the animation when component unmounts
      return () => {
        stopBubblesAnimation();
      };
    }
  }, []);
  
  return (
    <div 
      ref={headerRef}
      className="px-4 -mx-4 -mt-10 pt-4 pb-3 rounded-b-3xl relative overflow-hidden" 
      style={{
        backgroundImage: 'linear-gradient(90.1deg, rgba(8,81,98,1) 14.5%, rgba(198,231,249,1) 135.4%)'
      }}
    >
      <div className="relative z-10">
        <LocationBar />
        <SearchBar />
        <PromotionSlider banners={banners} />
        <div className="flex items-center justify-center text-white text-sm mt-0 pb-1">
          <span className="font-bold text-xs">Welcome to Skawsh</span>
          <Heart size={14} className="ml-1 text-white" fill="white" />
          <Sparkles size={14} className="ml-1 text-white animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
