
import React, { useEffect, useState } from 'react';
import { WashingMachine, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WashingMachineCelebrationProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
}

const WashingMachineCelebration: React.FC<WashingMachineCelebrationProps> = ({
  isVisible,
  onAnimationComplete
}) => {
  const [sparklePositions, setSparklePositions] = useState<Array<{x: number, y: number, delay: number, size: number}>>([]);

  useEffect(() => {
    if (isVisible) {
      // Generate random sparkle positions
      const newSparkles = Array.from({ length: 12 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 0.1,
        size: Math.random() * 0.5 + 0.5
      }));
      setSparklePositions(newSparkles);
      
      // Hide the animation after 3 seconds
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="relative p-12 bg-white rounded-xl shadow-2xl animate-scale-in">
        <div className="relative">
          <WashingMachine size={80} className="text-blue-500 animate-pulse" />
          <div className="absolute -top-4 -right-4 bg-[#92E3A9] rounded-full p-2 animate-bounce">
            <Sparkles size={24} className="text-white" />
          </div>
        </div>
        
        <h3 className="mt-4 text-xl font-bold text-center">Woohoo!</h3>
        <p className="text-center text-gray-700">First item added to your sack!</p>
        
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
                "text-yellow-400",
                index % 2 === 0 ? "text-blue-500" : "text-[#92E3A9]"
              )} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WashingMachineCelebration;
