
import React from 'react';
import { cn } from '@/lib/utils';

interface SackAnimationProps {
  showWaterWave: boolean;
  showFirstItemMessage: boolean;
  onAnimationEnd: () => void;
}

const SackAnimation: React.FC<SackAnimationProps> = ({
  showWaterWave,
  showFirstItemMessage,
  onAnimationEnd
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

export default SackAnimation;
