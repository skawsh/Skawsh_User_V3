
import React from 'react';

interface DotIndicatorProps {
  count: number;
  currentIndex: number;
  onClick: (index: number) => void;
}

export const DotIndicator: React.FC<DotIndicatorProps> = ({ 
  count, 
  currentIndex, 
  onClick 
}) => {
  return (
    <div className="flex justify-center gap-2 mt-3">
      {Array.from({ length: count }).map((_, index) => (
        <button 
          key={index} 
          onClick={() => onClick(index)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentIndex ? 'bg-primary-500 w-4' : 'bg-gray-300'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};
