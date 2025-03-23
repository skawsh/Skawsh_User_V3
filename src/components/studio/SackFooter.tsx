
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getWashTypeBackground } from '@/utils/sackBarUtils';
import SackFooterAnimation from '../sack/SackFooterAnimation';
import SackFooterContent from '../sack/SackFooterContent';

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
            // Track all wash types in the cart
            const washTypes = new Set();
            
            studioItems.forEach((item: any) => {
              if (item.washType) {
                washTypes.add(item.washType);
              }
            });
            
            // Set wash type based on the types found
            if (washTypes.size === 0) {
              setWashType(null);
            } else if (washTypes.size === 1) {
              setWashType(Array.from(washTypes)[0] as string);
            } else if (washTypes.size > 1) {
              setWashType("both");
            }
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

  // Get display wash type text
  const getDisplayWashType = () => {
    if (washType === "standard") return "Standard Wash";
    if (washType === "express") return "Express Wash";
    if (washType === "both") return "Both";
    return null;
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="max-w-lg mx-auto px-4 pb-4">
        <div className="relative">
          <div
            className={cn(
              "w-full rounded-xl shadow-md overflow-hidden relative",
              getWashTypeBackground(washType)
            )}
          >            
            <button
              onClick={handleGoToCart}
              className={cn(
                "w-full flex items-center justify-between py-3 px-5 overflow-hidden relative",
                "bg-green-400 hover:bg-green-500",
                "transform hover:scale-[1.02] active:scale-[0.98] transition-transform"
              )}
            >
              <SackFooterAnimation 
                showWaterWave={showWaterWave}
                showFirstItemMessage={showFirstItemMessage}
                onAnimationEnd={handleWaterWaveAnimationEnd}
                isFirstItemAdded={isFirstItemAdded}
              />
              
              <SackFooterContent 
                uniqueServiceCount={uniqueServiceCount}
                washType={getDisplayWashType()}
                isFirstItemAdded={isFirstItemAdded}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SackFooter;
