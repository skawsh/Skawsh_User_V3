
import React, { useEffect, useState } from 'react';
import { Gift, Sparkles, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CouponCelebrationProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
  discountPercentage: number;
}

const CouponCelebration: React.FC<CouponCelebrationProps> = ({
  isVisible,
  onAnimationComplete,
  discountPercentage
}) => {
  const [sparklePositions, setSparklePositions] = useState<Array<{x: number, y: number, delay: number, size: number}>>([]);

  useEffect(() => {
    if (isVisible) {
      // Generate random sparkle positions
      const newSparkles = Array.from({ length: 15 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 0.1,
        size: Math.random() * 0.5 + 0.5
      }));
      setSparklePositions(newSparkles);
      
      // Hide the animation after 3 seconds (reduced from 4)
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="relative p-12 bg-white rounded-xl shadow-2xl animate-scale-in text-center">
        <div className="relative flex justify-center mb-4">
          <Gift size={70} className="text-purple-500" />
          <div className="absolute -top-4 -right-4 bg-[#92E3A9] rounded-full p-2 animate-bounce">
            <Percent size={24} className="text-white" />
          </div>
        </div>
        
        <h3 className="mt-4 text-2xl font-bold text-center text-purple-600">Woohoo!</h3>
        <p className="text-center text-gray-700 text-lg mt-2">
          You got <span className="font-bold text-purple-600">{discountPercentage}% off</span> on your total order value!
        </p>
        
        {/* Sparkles */}
        {sparklePositions.map((sparkle, index) => (
          <div 
            key={index}
            className="absolute animate-fade-out"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`,
              transform: `scale(${sparkle.size})`,
            }}
          >
            <Sparkles 
              size={24} 
              className={cn(
                index % 3 === 0 ? "text-purple-500" : 
                index % 3 === 1 ? "text-[#92E3A9]" : "text-yellow-400"
              )} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponCelebration;
