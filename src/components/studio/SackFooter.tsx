
import React, { useEffect, useState } from 'react';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SackFooterProps {
  itemCount: number;
  studioId: string;
}

const SackFooter: React.FC<SackFooterProps> = ({ itemCount, studioId }) => {
  const navigate = useNavigate();
  const [uniqueServiceCount, setUniqueServiceCount] = useState(itemCount);
  
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
    navigate('/cart', {
      state: {
        studioId: studioId
      }
    });
  };
  
  const handleClearCart = () => {
    localStorage.removeItem('cartItems');
    // Dispatch event to notify other components
    document.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="max-w-lg mx-auto px-4 pb-4">
        <button
          onClick={handleGoToCart}
          className={cn(
            "w-full flex items-center justify-between py-3 px-5 rounded-xl shadow-md",
            "bg-[#92E3A9] hover:bg-[#83d699] transition-colors duration-200"
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
  );
};

export default SackFooter;
