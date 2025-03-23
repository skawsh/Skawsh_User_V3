
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trash2, Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SackBarProps {
  className?: string;
  isVisible?: boolean;
}

const SackBar: React.FC<SackBarProps> = ({ className, isVisible = true }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [uniqueServiceCount, setUniqueServiceCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showWaterWave, setShowWaterWave] = useState(false);
  const [showFirstItemMessage, setShowFirstItemMessage] = useState(false);
  const [washType, setWashType] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const storedItems = localStorage.getItem('cartItems');
        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          setCartItems(parsedItems);
          
          const uniqueServices = new Set();
          parsedItems.forEach((item: any) => {
            if (item.serviceId) {
              uniqueServices.add(item.serviceId);
            }
          });
          
          const newServiceCount = uniqueServices.size;
          
          // Determine dominant wash type
          if (parsedItems.length > 0) {
            const washTypeCounts: Record<string, number> = {};
            
            parsedItems.forEach((item: any) => {
              if (item.washType) {
                washTypeCounts[item.washType] = (washTypeCounts[item.washType] || 0) + 1;
              }
            });
            
            let maxCount = 0;
            let dominantWashType = null;
            
            Object.entries(washTypeCounts).forEach(([type, count]) => {
              if (count > maxCount) {
                maxCount = count;
                dominantWashType = type;
              }
            });
            
            setWashType(dominantWashType);
          }
          
          // Check if this is the first item added
          const hasShownFirstItemMessage = localStorage.getItem('hasShownSackWaveAnimation') === 'true';
          
          if (newServiceCount === 1 && uniqueServiceCount === 0 && !hasShownFirstItemMessage) {
            setShowWaterWave(true);
            setShowFirstItemMessage(true);
            localStorage.setItem('hasShownSackWaveAnimation', 'true');
            
            // Hide the message after 4 seconds
            setTimeout(() => {
              setShowFirstItemMessage(false);
            }, 4000);
          }
          
          setUniqueServiceCount(newServiceCount);
        } else {
          setCartItems([]);
          setUniqueServiceCount(0);
          setWashType(null);
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
        setCartItems([]);
        setUniqueServiceCount(0);
        setWashType(null);
      }
    };
    
    loadCartItems();
    
    window.addEventListener('storage', loadCartItems);
    document.addEventListener('cartUpdated', loadCartItems);
    
    return () => {
      window.removeEventListener('storage', loadCartItems);
      document.removeEventListener('cartUpdated', loadCartItems);
    };
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
    localStorage.removeItem('cartItems');
    setCartItems([]);
    setIsDialogOpen(false);
    document.dispatchEvent(new Event('cartUpdated'));
  };
  
  const studioInfo = cartItems[0]?.studioId ? {
    id: cartItems[0].studioId,
    name: 'Busy Bee'
  } : null;

  // Get delivery message based on wash type
  const getDeliveryMessage = () => {
    if (washType === "Standard Wash") {
      return "Delivery in just 36 sunlight hours after pickup";
    } else if (washType === "Express Wash") {
      return "Express delivery in just 12 hours after pickup";
    }
    return "";
  };

  // Get background color based on wash type
  const getWashTypeBackground = () => {
    if (washType === "Standard Wash") {
      return "bg-[#D5E7FF]";
    } else if (washType === "Express Wash") {
      return "bg-orange-50";
    }
    return "";
  };

  // Get text color based on wash type
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
      className={cn(
        "fixed bottom-16 left-0 right-0 z-40 px-4 pb-2 transition-all duration-500 ease-in-out",
        isVisible ? 'translate-y-0 animate-fade-in' : 'translate-y-full',
        className
      )}
    >
      <div className="max-w-lg mx-auto">
        <div className="relative">
          {showFirstItemMessage && (
            <div className="first-sack-message">
              You added your 1st service to the sack! 🎉
            </div>
          )}
          
          <div className={cn(
            "bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden relative",
            washType && getWashTypeBackground()
          )}>
            {showWaterWave && (
              <div 
                className="water-wave"
                onAnimationEnd={handleWaterWaveAnimationEnd}
              />
            )}

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
            
            <div className="flex items-center justify-between p-3 relative z-10">
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
                  <span className="text-xs text-gray-600">
                    {uniqueServiceCount} {uniqueServiceCount === 1 ? 'Service' : 'Services'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 relative z-10">
                <button
                  onClick={handleViewSack}
                  className="bg-[#92E3A9] text-black font-semibold px-4 py-1.5 rounded-full flex items-center hover:bg-[#83d699] transition-colors"
                >
                  View Sack
                </button>
                
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <button className="p-2 hover:bg-red-50 rounded-full transition-colors">
                      <Trash2 size={24} className="text-red-500" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-xl animate-scale-in">
                    <div className="flex justify-end">
                      <AlertDialogCancel className="p-2 m-0 h-auto absolute top-2 right-2 rounded-full">
                        <X size={18} />
                      </AlertDialogCancel>
                    </div>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear Sack</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to clear your sack? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4 flex gap-2 justify-end">
                      <AlertDialogCancel className="rounded-full border-gray-300 text-gray-700 font-medium">
                        <X className="mr-1 h-4 w-4" /> No
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleClearSack}
                        className="rounded-full bg-red-500 hover:bg-red-600 text-white font-medium"
                      >
                        <Check className="mr-1 h-4 w-4" /> Yes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SackBar;
