
import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SackFooterProps {
  itemCount: number;
  studioId: string;
}

const SackFooter: React.FC<SackFooterProps> = ({ itemCount, studioId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [uniqueServiceCount, setUniqueServiceCount] = useState(itemCount);
  const isMobile = useIsMobile();
  
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
          setUniqueServiceCount(uniqueServices.size);
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
  }, [studioId, itemCount]);

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
      className="fixed bottom-0 left-0 right-0 z-50 hardware-accelerated"
      style={{ 
        transform: 'translateZ(0)',
        willChange: 'transform',
        // Add safe area inset for iOS devices
        paddingBottom: 'env(safe-area-inset-bottom, 0.5rem)'
      }}
    >
      <div className="max-w-lg mx-auto px-4 pb-4 bg-transparent">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <button
            onClick={handleGoToCart}
            className={cn(
              "w-full flex items-center justify-between py-3 px-5 rounded-xl",
              "bg-[#92E3A9] hover:bg-[#83d699] active:bg-[#79c88e] transition-colors duration-200",
              "transform hover:scale-[1.02] active:scale-[0.98] transition-transform",
              isMobile ? "touch-manipulation" : ""
            )}
          >
            <span className="text-[#403E43] font-semibold">
              {uniqueServiceCount} {uniqueServiceCount === 1 ? 'Service' : 'Services'} added
            </span>
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-white" />
              <span className="text-white font-semibold">View Sack</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SackFooter;
