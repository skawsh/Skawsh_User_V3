
import React, { useRef, useState, useEffect } from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ServiceOrderContent from './service/popup/ServiceOrderContent';
import ServiceOrderFooter from './service/popup/ServiceOrderFooter';
import { useServiceOrder } from './service/popup/useServiceOrder';
import { useIsMobile } from "@/hooks/use-mobile";
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
        <ServiceOrderContent 
          serviceName={service.name}
          isExpress={isExpress}
          onClose={onClose}
          weight={weight}
          unit={unit}
          clothingItems={clothingItems}
          newItemName={newItemName}
          isAddingItem={isAddingItem}
          isClothingItemsOpen={isClothingItemsOpen}
          totalPrice={totalPrice}
          handleWeightChange={handleWeightChange}
          handleQuantityChange={handleQuantityChange}
          handleAddItem={handleAddItem}
          handleNewItemNameChange={handleNewItemNameChange}
          setIsAddingItem={setIsAddingItem}
          setIsClothingItemsOpen={setIsClothingItemsOpen}
          isWeightValid={isWeightValid}
          isOpen={isOpen}
          contentRef={popupContentRef}
        />
        
        <ServiceOrderFooter
          isEnabled={isAddToCartEnabled()}
          onAddToCart={handleAddToCart}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default ServiceOrderPopup;
