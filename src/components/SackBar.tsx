
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCartItems, clearCart, getWashTypeBackground } from '@/utils/sackBarUtils';
import SackAnimation from './sack/SackAnimation';
import SackContent from './sack/SackContent';
import ClearSackDialog from './sack/ClearSackDialog';
import { InfoIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SackBarProps {
  className?: string;
  isVisible?: boolean;
}

const SackBar: React.FC<SackBarProps> = ({ className, isVisible = true }) => {
  const { cartItems, uniqueServiceCount, washType } = useCartItems();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showWaterWave, setShowWaterWave] = useState(false);
  const [showFirstItemMessage, setShowFirstItemMessage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Show water wave animation for first item added
    const hasShownFirstItemMessage = localStorage.getItem('hasShownSackWaveAnimation') === 'true';
    
    if (uniqueServiceCount === 1 && !hasShownFirstItemMessage) {
      setShowWaterWave(true);
      setShowFirstItemMessage(true);
      localStorage.setItem('hasShownSackWaveAnimation', 'true');
      
      setTimeout(() => {
        setShowFirstItemMessage(false);
      }, 4000);
    }
  }, [uniqueServiceCount]);
  
  const handleWaterWaveAnimationEnd = () => {
    setShowWaterWave(false);
  };
  
  if (cartItems.length === 0) return null;
  
  const handleViewSack = () => {
    const urlParams = new URLSearchParams(location.search);
    const orderId = urlParams.get('orderId');
    
    navigate('/cart', {
      state: {
        previousPath: location.pathname,
        studioId: cartItems[0]?.studioId || null,
        orderId: orderId
      }
    });
  };
  
  const handleClearSack = () => {
    clearCart();
    setIsDialogOpen(false);
  };
  
  const studioInfo = cartItems[0]?.studioId ? {
    id: cartItems[0].studioId,
    name: 'Busy Bee'
  } : null;

  // Get the display name for wash type
  const getDisplayWashType = () => {
    if (washType === "standard") return "Standard Wash";
    if (washType === "express") return "Express Wash";
    if (washType === "both") return "Both";
    return null;
  };

  return (
    <div 
      className={cn(
        "fixed bottom-16 left-0 right-0 z-40 px-4 pb-2 transition-all duration-500 ease-in-out",
        isVisible ? 'translate-y-0 animate-fade-in' : 'translate-y-full',
        className
      )}
    >
      <div className="max-w-lg mx-auto">
        <div className="relative">
          <div className={cn(
            "bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden relative",
            washType && getWashTypeBackground(washType)
          )}>
            <SackAnimation 
              showWaterWave={showWaterWave}
              showFirstItemMessage={showFirstItemMessage}
              onAnimationEnd={handleWaterWaveAnimationEnd}
            />
            
            <div className="flex items-center justify-between p-3 relative z-10">
              <SackContent 
                studioInfo={studioInfo}
                washType={getDisplayWashType()}
                uniqueServiceCount={uniqueServiceCount}
              />
              
              <div className="flex items-center gap-2 relative z-10">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-gray-500 hover:text-gray-700">
                        <InfoIcon size={16} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="p-2">
                        <p className="text-sm font-medium">Tax Breakdown:</p>
                        <p className="text-xs">GST: 18% of subtotal</p>
                        <p className="text-xs">Delivery Tax: 5% of delivery fee</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <button
                  onClick={handleViewSack}
                  className="bg-[#92E3A9] text-black font-semibold px-4 py-1.5 rounded-full flex items-center hover:bg-[#83d699] transition-colors"
                >
                  View Sack
                </button>
                
                <ClearSackDialog 
                  isOpen={isDialogOpen}
                  onOpenChange={setIsDialogOpen}
                  onClearSack={handleClearSack}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SackBar;
