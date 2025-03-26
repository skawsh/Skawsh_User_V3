
import React, { useRef, useState, useEffect } from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ServiceOrderContent from './service/popup/ServiceOrderContent';
import ServiceOrderFooter from './service/popup/ServiceOrderFooter';
import { useServiceOrder } from './service/popup/useServiceOrder';
import { useIsMobile } from "@/hooks/use-mobile";
import { useMobileKeyboard } from '@/hooks/useMobileKeyboard';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Service } from "@/types/serviceTypes";

interface ServiceOrderPopupProps {
  service: Service;
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

  // Determine adaptive height based on content state
  const getAdaptiveHeight = () => {
    if (!isMobile) return '85vh';
    
    // When clothing items section is expanded
    if (isClothingItemsOpen && isWeightValid() && unit === 'kg') {
      return 'auto';
    }
    
    // When just entering weight
    return isWeightValid() ? '75dvh' : '60dvh';
  };

  // Get appropriate maxHeight
  const getMaxHeight = () => {
    if (!isMobile) return '85vh';
    
    if (isClothingItemsOpen && isWeightValid() && unit === 'kg') {
      return '96dvh'; 
    }
    
    return '85dvh';
  };

  return (
    <Drawer 
      open={isOpen} 
      onOpenChange={open => !open && onClose()} 
      dismissible
    >
      <DrawerContent 
        className={`rounded-t-xl p-0 focus:outline-none overflow-hidden animate-slide-in-up transition-all duration-300 ${isClothingItemsOpen ? 'mobile-expanded' : ''}`}
        style={{ 
          height: getAdaptiveHeight(),
          maxHeight: getMaxHeight(),
          overflowY: 'hidden' // Prevent the container from scrolling
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
