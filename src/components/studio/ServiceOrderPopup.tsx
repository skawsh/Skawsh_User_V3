import React, { useEffect, useRef } from 'react';
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

  // Handle mobile keyboard appearance
  useEffect(() => {
    if (!isMobile || !isOpen) return;
    
    // Function to handle visual viewport changes (keyboard appearance)
    const handleVisualViewportResize = () => {
      const viewport = window.visualViewport;
      if (!viewport) return;
      
      const drawerContent = document.querySelector('.service-order-popup-content') as HTMLElement;
      if (!drawerContent) return;
      
      // Get the current viewport height
      const viewportHeight = viewport.height;
      const windowHeight = window.innerHeight;
      
      // If the viewport is significantly smaller than the window height, 
      // the keyboard is likely open
      const isKeyboardOpen = viewportHeight < windowHeight * 0.8;
      
      if (isKeyboardOpen) {
        // Keyboard is open - adjust content to be visible above keyboard
        drawerContent.style.height = `${viewportHeight}px`;
        drawerContent.style.maxHeight = `${viewportHeight}px`;
        
        // Make the content scrollable
        drawerContent.style.overflow = 'auto';
        
        // Keep the input in view when keyboard appears
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          // Scroll the active element into view with some spacing
          setTimeout(() => {
            activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      } else {
        // Keyboard is closed - restore original layout
        drawerContent.style.height = '';
        drawerContent.style.maxHeight = '';
        drawerContent.style.overflow = '';
      }
    };
    
    // Add event listeners for viewport changes
    window.visualViewport?.addEventListener('resize', handleVisualViewportResize);
    window.visualViewport?.addEventListener('scroll', handleVisualViewportResize);
    
    // Focus event listener to handle scrolling when an input gets focus
    const handleFocusInput = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        // Small delay to let the keyboard appear
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    };
    
    // Add focus event listener to document
    document.addEventListener('focus', handleFocusInput, true);
    
    // Initial adjustment
    handleVisualViewportResize();
    
    // Cleanup
    return () => {
      window.visualViewport?.removeEventListener('resize', handleVisualViewportResize);
      window.visualViewport?.removeEventListener('scroll', handleVisualViewportResize);
      document.removeEventListener('focus', handleFocusInput, true);
      
      const drawerContent = document.querySelector('.service-order-popup-content') as HTMLElement;
      if (drawerContent) {
        drawerContent.style.height = '';
        drawerContent.style.maxHeight = '';
        drawerContent.style.overflow = '';
      }
    };
  }, [isMobile, isOpen]);

  // Calculate adaptive height based on device
  const maxHeight = isMobile ? '90dvh' : '85vh';

  return (
    <Drawer 
      open={isOpen} 
      onOpenChange={open => !open && onClose()} 
      dismissible
    >
      <DrawerContent 
        className={`max-h-[${maxHeight}] rounded-t-xl p-0 focus:outline-none overflow-hidden animate-slide-in-up transition-all duration-300 mobile-adaptive-height`}
      >
        <div 
          className="relative flex flex-col service-order-popup-content"
          ref={popupContentRef}
        >
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
