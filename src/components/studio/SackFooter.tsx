
import React, { useEffect, useState } from 'react';
import { ShoppingBag, ChevronRight, Clock } from 'lucide-react';
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
    // Load cart items and count unique services
    const countUniqueServices = () => {
      try {
        const storedItems = localStorage.getItem('cartItems');
        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          const studioItems = parsedItems.filter((item: any) => item.studioId === studioId);
          
          // Count unique services by serviceId
          const uniqueServices = new Set();
          studioItems.forEach((item: any) => {
            if (item.serviceId) {
              uniqueServices.add(item.serviceId);
            }
          });
          
          const newServiceCount = uniqueServices.size;
          
          // Determine dominant wash type
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
          
          // Check if this is the first item added
          const hasShownFirstItemMessage = localStorage.getItem('hasShownSackWaveAnimation') === 'true';
          
          if (newServiceCount === 1 && uniqueServiceCount === 0 && !hasShownFirstItemMessage) {
            setShowWaterWave(true);
            setShowFirstItemMessage(true);
            setIsFirstItemAdded(true);
            localStorage.setItem('hasShownSackWaveAnimation', 'true');
            
            // Hide the message after 4 seconds
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
        setUniqueServiceCount(itemCount); // Fallback to the prop value
        setWashType(null);
      }
    };
    
    countUniqueServices();
    
    // Listen for cart updates
    document.addEventListener('cartUpdated', countUniqueServices);
    
    return () => {
      document.removeEventListener('cartUpdated', countUniqueServices);
    };
  }, [studioId, itemCount, uniqueServiceCount]);

  // Handle water wave animation end
  const handleWaterWaveAnimationEnd = () => {
    setShowWaterWave(false);
  };

  if (uniqueServiceCount === 0) return null;

  const handleGoToCart = () => {
    // Use navigate with state and replace to properly handle back navigation
    navigate('/cart', {
      state: {
        studioId: studioId,
        previousPath: location.pathname
      }
    });
  };

  // Get background color based on wash type
  const getWashTypeBackground = () => {
    if (washType === "Standard Wash") {
      return "bg-[#D5E7FF]";
    } else if (washType === "Express Wash") {
      return "bg-orange-50";
    }
    return "bg-[#92E3A9]";
  };

  // Get delivery message based on wash type
  const getDeliveryMessage = () => {
    if (washType === "Standard Wash") {
      return "Delivery in just 36 sunlight hours after pickup";
    } else if (washType === "Express Wash") {
      return "Express delivery in just 12 hours after pickup";
    }
    return "";
  };

  // Get text color for wash type
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
              getWashTypeBackground()
            )}
          >
            {/* Wash Type Header */}
            {washType && (
              <div className="w-full">
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-lg">
                    {washType}
                  </h3>
                </div>
                <div className={cn(
                  "px-4 py-2 flex justify-center items-center gap-2",
                  washType === "Standard Wash" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-500"
                )}>
                  <Clock size={18} />
                  <span className="font-medium text-sm">
                    {getDeliveryMessage()}
                  </span>
                </div>
              </div>
            )}
            
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
                <span className="text-[#403E43] font-semibold">
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
