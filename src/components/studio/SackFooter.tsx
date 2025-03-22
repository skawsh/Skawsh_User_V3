
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
        }
      } catch (error) {
        console.error('Error counting unique services:', error);
        setUniqueServiceCount(itemCount); // Fallback to the prop value
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
          
          <button
            onClick={handleGoToCart}
            className={cn(
              "w-full flex items-center justify-between py-3 px-5 rounded-xl shadow-md overflow-hidden relative",
              "bg-[#92E3A9] hover:bg-[#83d699] transition-colors duration-200",
              "transform hover:scale-[1.02] active:scale-[0.98] transition-transform"
            )}
          >
            {showWaterWave && (
              <div 
                className="water-wave"
                onAnimationEnd={handleWaterWaveAnimationEnd}
              />
            )}
            
            <span className="text-[#403E43] font-semibold relative z-10">
              {uniqueServiceCount} {uniqueServiceCount === 1 ? 'Service' : 'Services'} added
            </span>
            <div className="flex items-center gap-2 relative z-10">
              <ShoppingBag size={20} className={cn("text-white", isFirstItemAdded && "animate-pulse")} />
              <span className="text-white font-semibold">View Sack</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SackFooter;
