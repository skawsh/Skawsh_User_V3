
import React, { useEffect } from 'react';
import { startBubblesAnimation, stopBubblesAnimation } from '@/utils/animationUtils';

interface BubbleAnimationProps {
  isOpen: boolean;
}

const BubbleAnimation: React.FC<BubbleAnimationProps> = ({ isOpen }) => {
  useEffect(() => {
    let bubbleContainer: HTMLDivElement | null = null;
    
    if (isOpen) {
      // Create and setup bubble container
      setTimeout(() => {
        const popupContent = document.querySelector('.service-order-popup-content');
        if (popupContent) {
          bubbleContainer = document.createElement('div');
          bubbleContainer.className = 'bubble-container';
          bubbleContainer.style.position = 'absolute';
          bubbleContainer.style.bottom = '0';
          bubbleContainer.style.left = '0';
          bubbleContainer.style.width = '100%';
          bubbleContainer.style.height = '100%';
          bubbleContainer.style.overflow = 'hidden';
          bubbleContainer.style.pointerEvents = 'none';
          bubbleContainer.style.zIndex = '0';
          
          popupContent.appendChild(bubbleContainer);
          startBubblesAnimation(bubbleContainer);
        }
      }, 300);
    }
    
    // Cleanup bubbles when popup closes
    return () => {
      if (bubbleContainer) {
        stopBubblesAnimation();
      }
    };
  }, [isOpen]);

  return null;
};

export default BubbleAnimation;
