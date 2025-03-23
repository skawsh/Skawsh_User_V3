
import React from 'react';
import { cn } from '@/lib/utils';

interface SackFooterAnimationProps {
  showWaterWave: boolean;
  showFirstItemMessage: boolean;
  onAnimationEnd: () => void;
  isFirstItemAdded: boolean;
}

const SackFooterAnimation: React.FC<SackFooterAnimationProps> = ({
  showWaterWave,
  showFirstItemMessage,
  onAnimationEnd,
  isFirstItemAdded
}) => {
  return (
    <>
      {showFirstItemMessage && (
        <div className="first-sack-message">
          You added your 1st service to the sack! 🎉
        </div>
      )}
      
      {showWaterWave && (
        <div 
          className="water-wave"
          onAnimationEnd={onAnimationEnd}
        />
      )}
    </>
  );
};

export default SackFooterAnimation;
