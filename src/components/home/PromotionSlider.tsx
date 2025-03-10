
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

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

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mb-8 animate-fade-in animate-stagger-2">
      <div className="relative overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-700 ease-in-out" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div 
              key={banner.id}
              className={`${banner.bgColor} text-white p-5 rounded-xl min-w-[100%] shrink-0 relative overflow-hidden`}
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
      </div>
      
      {/* Dots indicator */}
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
