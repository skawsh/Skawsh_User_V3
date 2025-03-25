
import React, { useEffect } from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ServiceOrderHeader from './service/popup/ServiceOrderHeader';
import WeightInputSection from './service/popup/WeightInputSection';
import ClothingItemsSection from './service/popup/ClothingItemsSection';
import ServiceOrderFooter from './service/popup/ServiceOrderFooter';
import { useServiceOrder } from './service/popup/useServiceOrder';
import { useIsMobile } from "@/hooks/use-mobile";
import { startBubblesAnimation, stopBubblesAnimation } from '@/utils/animationUtils';

interface ServiceOrderPopupProps {
  service: {
    id: string;
    name: string;
    price: number;
    unit?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (order: any) => void;
  initialWeight?: number;
  isExpress?: boolean;
  studioId?: string;
}

const ServiceOrderPopup: React.FC<ServiceOrderPopupProps> = ({
  service,
  isOpen,
  onClose,
  onAddToCart,
  isExpress = false,
  studioId = ''
}) => {
  const isMobile = useIsMobile();
  const {
    weight,
    unit,
    clothingItems,
    newItemName,
    isAddingItem,
    isClothingItemsOpen,
    handleWeightChange,
    handleQuantityChange,
    handleAddItem,
    handleNewItemNameChange,
    totalPrice,
    handleAddToCart,
    isAddToCartEnabled,
    isWeightValid,
    setIsAddingItem,
    setIsClothingItemsOpen
  } = useServiceOrder({
    isOpen,
    service,
    isExpress,
    studioId,
    onAddToCart,
    onClose
  });

  // Setup bubble animations when popup opens
  useEffect(() => {
    let bubbleContainer: HTMLDivElement | null = null;
    
    if (isOpen) {
      // Create and setup bubble container
      setTimeout(() => {
        const popupContent = document.querySelector('.service-order-popup-content');
        if (popupContent) {
          bubbleContainer = document.createElement('div');
          bubbleContainer.className = 'bubble-container';
          bubbleContainer.style.position = 'absolute';
          bubbleContainer.style.bottom = '0';
          bubbleContainer.style.left = '0';
          bubbleContainer.style.width = '100%';
          bubbleContainer.style.height = '100%';
          bubbleContainer.style.overflow = 'hidden';
          bubbleContainer.style.pointerEvents = 'none';
          bubbleContainer.style.zIndex = '0';
          
          popupContent.appendChild(bubbleContainer);
          startBubblesAnimation(bubbleContainer);
        }
      }, 300);
    }
    
    // Cleanup bubbles when popup closes
    return () => {
      if (bubbleContainer) {
        stopBubblesAnimation();
      }
    };
  }, [isOpen]);

  const maxHeight = isMobile ? '90vh' : '85vh';

  return (
    <Drawer 
      open={isOpen} 
      onOpenChange={open => !open && onClose()} 
      dismissible
    >
      <DrawerContent 
        className={`max-h-[${maxHeight}] rounded-t-xl p-0 focus:outline-none overflow-hidden animate-slide-in-up transition-all duration-300`}
      >
        <div className="h-full flex flex-col service-order-popup-content relative">
          <div className="flex-1 overflow-auto relative z-10">
            <ServiceOrderHeader 
              serviceName={service.name}
              isExpress={isExpress}
              onClose={onClose}
            />
            
            <div className="px-4 sm:px-6 py-5 space-y-5 bg-white/90 backdrop-blur-sm">
              <WeightInputSection
                weight={weight}
                unit={unit}
                price={totalPrice()}
                onChange={handleWeightChange}
              />
              
              {unit === 'kg' && isWeightValid() && (
                <ClothingItemsSection
                  weight={weight}
                  unit={unit}
                  clothingItems={clothingItems}
                  newItemName={newItemName}
                  isAddingItem={isAddingItem}
                  isClothingItemsOpen={isClothingItemsOpen}
                  onNewItemNameChange={handleNewItemNameChange}
                  onAddItem={handleAddItem}
                  onToggleAddingItem={setIsAddingItem}
                  onQuantityChange={handleQuantityChange}
                  setIsClothingItemsOpen={setIsClothingItemsOpen}
                  isWeightValid={isWeightValid}
                />
              )}
            </div>
          </div>
          
          <ServiceOrderFooter
            isEnabled={isAddToCartEnabled()}
            onAddToCart={handleAddToCart}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ServiceOrderPopup;
