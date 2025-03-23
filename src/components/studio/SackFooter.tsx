import React, { useEffect, useState } from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SackFooterProps {
  itemCount: number;
  studioId: string;
}

const SackFooter: React.FC<SackFooterProps> = ({ itemCount, studioId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [uniqueServiceCount, setUniqueServiceCount] = useState(itemCount);
  const [showWaterWave, setShowWaterWave] = useState(false);
  const [showFirstItemMessage, setShowFirstItemMessage] = useState(false);
  const [isFirstItemAdded, setIsFirstItemAdded] = useState(false);
  const [washType, setWashType] = useState<string | null>(null);
  
  useEffect(() => {
    const countUniqueServices = () => {
      try {
        const storedItems = localStorage.getItem('cartItems');
        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          const studioItems = parsedItems.filter((item: any) => item.studioId === studioId);
          
          const uniqueServices = new Set();
          studioItems.forEach((item: any) => {
            if (item.serviceId) {
              uniqueServices.add(item.serviceId);
            }
          });
          
          const newServiceCount = uniqueServices.size;
          
          if (studioItems.length > 0) {
            const washTypeCounts: Record<string, number> = {};
            
            studioItems.forEach((item: any) => {
              if (item.washType) {
                washTypeCounts[item.washType] = (washTypeCounts[item.washType] || 0) + 1;
              }
            });
            
            let maxCount = 0;
            let dominantType = null;
            
            Object.entries(washTypeCounts).forEach(([type, count]) => {
              if (count > maxCount) {
                maxCount = count;
                dominantType = type;
              }
            });
            
            setWashType(dominantType);
          }
          
          const hasShownFirstItemMessage = localStorage.getItem('hasShownSackWaveAnimation') === 'true';
          
          if (newServiceCount === 1 && uniqueServiceCount === 0 && !hasShownFirstItemMessage) {
            setShowWaterWave(true);
            setShowFirstItemMessage(true);
            setIsFirstItemAdded(true);
            localStorage.setItem('hasShownSackWaveAnimation', 'true');
            
            setTimeout(() => {
              setShowFirstItemMessage(false);
            }, 4000);
          }
          
          setUniqueServiceCount(newServiceCount);
        } else {
          setUniqueServiceCount(0);
          setWashType(null);
        }
      } catch (error) {
        console.error('Error counting unique services:', error);
        setUniqueServiceCount(itemCount);
        setWashType(null);
      }
    };
    
    countUniqueServices();
    
    document.addEventListener('cartUpdated', countUniqueServices);
    
    return () => {
      document.removeEventListener('cartUpdated', countUniqueServices);
    };
  }, [studioId, itemCount, uniqueServiceCount]);

  const handleWaterWaveAnimationEnd = () => {
    setShowWaterWave(false);
  };

  if (uniqueServiceCount === 0) return null;

  const handleGoToCart = () => {
    navigate('/cart', {
      state: {
        studioId: studioId,
        previousPath: location.pathname
      }
    });
  };

  const getWashTypeTextColor = () => {
    if (washType === "Standard Wash") {
      return "text-blue-600";
    } else if (washType === "Express Wash") {
      return "text-orange-500";
    }
    return "";
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="max-w-lg mx-auto px-4 pb-4">
        <div className="relative">
          {showFirstItemMessage && (
            <div className="first-sack-message">
              You added your 1st service to the sack! 🎉
            </div>
          )}
          
          <div
            className={cn(
              "w-full rounded-xl shadow-md overflow-hidden relative",
              washType === "Standard Wash" ? "bg-[#D5E7FF]" : washType === "Express Wash" ? "bg-orange-50" : "bg-green-400"
            )}
          >            
            <button
              onClick={handleGoToCart}
              className={cn(
                "w-full flex items-center justify-between py-3 px-5 overflow-hidden relative",
                "bg-green-400 hover:bg-green-500 transition-colors duration-200",
                "transform hover:scale-[1.02] active:scale-[0.98] transition-transform"
              )}
            >
              {showWaterWave && (
                <div 
                  className="water-wave"
                  onAnimationEnd={handleWaterWaveAnimationEnd}
                />
              )}
              
              <div className="flex flex-col items-start relative z-10">
                <span className={cn(
                  "text-[#403E43] font-semibold"
                )}>
                  <span className={cn(
                    "mr-1 font-medium",
                    getWashTypeTextColor()
                  )}>
                    {washType &&
                      `${washType} •`
                    }
                  </span>
                  {uniqueServiceCount} {uniqueServiceCount === 1 ? 'Service' : 'Services'} added
                </span>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <ShoppingBag size={20} className={cn("text-white", isFirstItemAdded && "animate-pulse")} />
                <span className="text-white font-semibold">View Sack</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SackFooter;
