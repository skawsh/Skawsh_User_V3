
import { useState, useEffect, useRef, TouchEvent } from 'react';

export const usePromotionSlider = (totalBanners: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isSwiping = useRef(false);

  // Auto slide every 5 seconds when autoplay is enabled
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPlayEnabled) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalBanners);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [totalBanners, autoPlayEnabled]);

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
    isSwiping.current = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    
    // If the user has moved more than a small threshold, consider it a swipe
    if (touchStartX.current && touchEndX.current && 
        Math.abs(touchStartX.current - touchEndX.current) > 10) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - go to next
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalBanners);
      } else {
        // Swipe right - go to previous
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalBanners - 1 : prevIndex - 1));
      }
      isSwiping.current = true; // This was definitely a swipe
    }
    
    // Reset touch points
    touchStartX.current = null;
    touchEndX.current = null;
    
    // Re-enable autoplay after a short delay
    setTimeout(() => setAutoPlayEnabled(true), 5000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalBanners);
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 5000);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalBanners - 1 : prevIndex - 1));
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 5000);
  };

  return {
    currentIndex,
    isSwiping,
    handleDotClick,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    goToNext,
    goToPrev
  };
};
