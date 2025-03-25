
import React, { useRef, useState, useEffect } from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ServiceOrderHeader from './service/popup/ServiceOrderHeader';
import WeightInputSection from './service/popup/WeightInputSection';
import ClothingItemsSection from './service/popup/ClothingItemsSection';
import ServiceOrderFooter from './service/popup/ServiceOrderFooter';
import { useServiceOrder } from './service/popup/useServiceOrder';
import { useIsMobile } from "@/hooks/use-mobile";
import BubbleAnimation from './service/popup/BubbleAnimation';
import { useMobileKeyboard } from '@/hooks/useMobileKeyboard';

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
  const popupContentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>("auto");
  
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

  // Handle mobile keyboard
  useMobileKeyboard({ isOpen, contentRef: popupContentRef });

  // Adjust content height when clothing items section is toggled
  useEffect(() => {
    if (isMobile && isWeightValid() && unit === 'kg') {
      // When clothing items are shown, expand the content area
      if (isClothingItemsOpen) {
        setContentHeight("auto");
      } else {
        // When hidden, use a more compact height
        setContentHeight("auto");
      }
    } else {
      setContentHeight("auto");
    }
  }, [isClothingItemsOpen, isMobile, isWeightValid, unit]);

  // Calculate adaptive height based on device and content state
  const maxHeight = isMobile 
    ? isClothingItemsOpen && isWeightValid() && unit === 'kg' 
      ? '94dvh' 
      : '90dvh' 
    : '85vh';

  return (
    <Drawer 
      open={isOpen} 
      onOpenChange={open => !open && onClose()} 
      dismissible
    >
      <DrawerContent 
        className={`max-h-[${maxHeight}] rounded-t-xl p-0 focus:outline-none overflow-hidden animate-slide-in-up transition-all duration-300 mobile-adaptive-height ${isClothingItemsOpen ? 'mobile-expanded' : ''}`}
        style={{ 
          height: isMobile && isClothingItemsOpen ? 'auto' : undefined,
          maxHeight: maxHeight
        }}
      >
        <div 
          className={`relative flex flex-col service-order-popup-content ${isClothingItemsOpen ? 'items-expanded' : ''}`}
          ref={popupContentRef}
          style={{ height: contentHeight }}
        >
          {/* Bubble animation */}
          <BubbleAnimation isOpen={isOpen} />

          <div className={`flex-1 overflow-auto relative z-10 ${isClothingItemsOpen ? 'expanded-content' : ''}`}>
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
