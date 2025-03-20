
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SackBarProps {
  className?: string;
}

const SackBar: React.FC<SackBarProps> = ({ className }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      try {
        const storedItems = localStorage.getItem('cartItems');
        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          setCartItems(parsedItems);
          console.log('Cart items loaded:', parsedItems);
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
    };
    
    loadCartItems();
    
    // Add event listener for storage changes
    window.addEventListener('storage', loadCartItems);
    document.addEventListener('cartUpdated', loadCartItems);
    
    return () => {
      window.removeEventListener('storage', loadCartItems);
      document.removeEventListener('cartUpdated', loadCartItems);
    };
  }, []);
  
  if (cartItems.length === 0) return null;
  
  const handleViewSack = () => {
    navigate('/cart');
  };
  
  const handleClearSack = () => {
    localStorage.removeItem('cartItems');
    setCartItems([]);
    // Dispatch event to notify other components
    document.dispatchEvent(new Event('cartUpdated'));
  };
  
  const studioInfo = cartItems[0]?.studioId ? {
    id: cartItems[0].studioId,
    name: 'Busy Bee' // This would ideally come from a context or be fetched based on studioId
  } : null;
  
  return (
    <div 
      className={cn(
        "fixed bottom-16 left-0 right-0 z-40 px-4 pb-2",
        className
      )}
    >
      <div className="max-w-lg mx-auto">
        <div className="bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-between py-1 px-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden bg-white">
              <img 
                src="/lovable-uploads/fda4730e-82ff-4406-877e-1f45d0ca2ebd.png" 
                alt="Studio logo"
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900">{studioInfo?.name || 'Studio'}</span>
              <button 
                className="text-xs text-left flex items-center text-primary-500"
                onClick={() => studioInfo && navigate(`/studio/${studioInfo.id}`)}
              >
                View menu <span className="ml-1">▶</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleViewSack}
              className="bg-[#92E3A9] text-black font-semibold px-4 py-1.5 rounded-full flex flex-col items-center"
            >
              <span>View Sack</span>
              <span>{cartItems.length} {cartItems.length === 1 ? 'Service' : 'Services'}</span>
            </button>
            
            <button
              onClick={handleClearSack}
              className="p-2"
            >
              <Trash2 size={24} className="text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SackBar;
