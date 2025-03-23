
import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

interface Banner {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  buttonColor: string;
  textColor: string;
  image: string;
}

interface PromotionSliderProps {
  banners: Banner[];
}

const PromotionSlider: React.FC<PromotionSliderProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto slide every 5 seconds when autoplay is enabled
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPlayEnabled) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [banners.length, autoPlayEnabled]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    // Temporarily pause autoplay for a few seconds when user interacts
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 5000);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    // Pause autoplay while user is interacting
    setAutoPlayEnabled(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - go to next
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      } else {
        // Swipe right - go to previous
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
      }
    }
    
    // Reset touch points
    touchStartX.current = null;
    touchEndX.current = null;
    
    // Re-enable autoplay after a short delay
    setTimeout(() => setAutoPlayEnabled(true), 5000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 5000);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 5000);
  };

  return (
    <div className="mb-6 animate-fade-in animate-stagger-2">
      <div 
        className="relative overflow-hidden rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-700 ease-in-out" 
          style={{ transform: `translateX(-${currentIndex * 92}%)` }}
        >
          {banners.map((banner, index) => (
            <div 
              key={banner.id}
              className={`${banner.bgColor} text-white p-5 rounded-xl min-w-[92%] mr-[1%] shrink-0 relative overflow-hidden`}
            >
              <div className="relative z-10">
                <h3 className="font-semibold text-xl mb-1">{banner.title}</h3>
                <p className="text-white/90 text-sm mb-4">
                  {banner.description}
                </p>
                <button className={`${banner.buttonColor} ${banner.textColor} font-medium text-sm py-1.5 px-4 rounded-full flex items-center gap-2`}>
                  EXPLORE <ArrowRight size={16} />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-no-repeat bg-right bg-contain opacity-20"
                   style={{ backgroundImage: `url('${banner.image}')` }}>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation arrows - only shown on desktop or larger screens */}
        <button 
          onClick={goToPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/50 flex items-center justify-center backdrop-blur-sm hidden sm:flex"
          aria-label="Previous banner"
        >
          <ArrowRight size={16} className="transform rotate-180" />
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/50 flex items-center justify-center backdrop-blur-sm hidden sm:flex"
          aria-label="Next banner"
        >
          <ArrowRight size={16} />
        </button>
      </div>
      
      {/* Dots indicator with improved interaction */}
      <div className="flex justify-center gap-2 mt-3">
        {banners.map((_, index) => (
          <button 
            key={index} 
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary-500 w-4' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionSlider;
