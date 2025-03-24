
import React from 'react';
import { PromotionSliderProps } from './promotion/types';
import { BannerItem } from './promotion/BannerItem';
import { DotIndicator } from './promotion/DotIndicator';
import { NavigationArrows } from './promotion/NavigationArrows';
import { usePromotionSlider } from './promotion/usePromotionSlider';

const PromotionSlider: React.FC<PromotionSliderProps> = ({ banners }) => {
  const {
    currentIndex,
    isSwiping,
    handleDotClick,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    goToNext,
    goToPrev
  } = usePromotionSlider(banners.length);

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
          {banners.map((banner) => (
            <BannerItem 
              key={banner.id} 
              banner={banner} 
              isSwiping={isSwiping} 
            />
          ))}
        </div>
        
        <NavigationArrows onPrev={goToPrev} onNext={goToNext} />
      </div>
      
      <DotIndicator 
        count={banners.length} 
        currentIndex={currentIndex} 
        onClick={handleDotClick} 
      />
    </div>
  );
};

export default PromotionSlider;
