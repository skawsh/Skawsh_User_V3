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
const PromotionSlider: React.FC<PromotionSliderProps> = ({
  banners
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };
  return <div className="mb-8 animate-fade-in animate-stagger-2 relative">
      <div className={`${banners[currentIndex].bgColor} text-white p-5 rounded-xl shadow-md overflow-hidden relative`}>
        <div className="relative z-10">
          <h3 className="font-semibold text-xl mb-1">{banners[currentIndex].title}</h3>
          <p className="text-white/90 text-sm mb-4">
            {banners[currentIndex].description}
          </p>
          <button className={`${banners[currentIndex].buttonColor} ${banners[currentIndex].textColor} font-medium text-sm py-1.5 px-4 rounded-full flex items-center gap-2`}>
            EXPLORE <ArrowRight size={16} />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-full h-full bg-no-repeat bg-right bg-contain opacity-20" style={{
        backgroundImage: `url('${banners[currentIndex].image}')`
      }}>
        </div>
      </div>
      
      {/* Dots indicator */}
      
    </div>;
};
export default PromotionSlider;