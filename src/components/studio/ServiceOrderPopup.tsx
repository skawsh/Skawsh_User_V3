
import React, { useState } from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ServiceOrderHeader from './service/popup/ServiceOrderHeader';
import WeightInputSection from './service/popup/WeightInputSection';
import ClothingItemsSection from './service/popup/ClothingItemsSection';
import ServiceOrderFooter from './service/popup/ServiceOrderFooter';
import { useServiceOrder } from './service/popup/useServiceOrder';

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

  return (
    <Drawer open={isOpen} onOpenChange={open => !open && onClose()} dismissible>
      <DrawerContent className="max-h-[85vh] rounded-t-xl p-0 focus:outline-none">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-auto">
            <ServiceOrderHeader 
              serviceName={service.name}
              isExpress={isExpress}
              onClose={onClose}
            />
            
            <div className="px-6 py-5 space-y-5 bg-white">
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
