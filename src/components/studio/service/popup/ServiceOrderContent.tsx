
import React from 'react';
import ServiceOrderHeader from './ServiceOrderHeader';
import WeightInputSection from './WeightInputSection';
import ClothingItemsSection from './ClothingItemsSection';
import { ClothingItem } from '../ClothingItemsList';
import BubbleAnimation from './BubbleAnimation';
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ServiceOrderContentProps {
  serviceName: string;
  isExpress: boolean;
  onClose: () => void;
  weight: number | string;
  unit: string;
  clothingItems: ClothingItem[];
  newItemName: string;
  isAddingItem: boolean;
  isClothingItemsOpen: boolean;
  totalPrice: () => number;
  handleWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleQuantityChange: (index: number, change: number) => void;
  handleAddItem: () => void;
  handleNewItemNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsAddingItem: (isAdding: boolean) => void;
  setIsClothingItemsOpen: (isOpen: boolean) => void;
  isWeightValid: () => boolean;
  isOpen: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
}

const ServiceOrderContent: React.FC<ServiceOrderContentProps> = ({
  serviceName,
  isExpress,
  onClose,
  weight,
  unit,
  clothingItems,
  newItemName,
  isAddingItem,
  isClothingItemsOpen,
  totalPrice,
  handleWeightChange,
  handleQuantityChange,
  handleAddItem,
  handleNewItemNameChange,
  setIsAddingItem,
  setIsClothingItemsOpen,
  isWeightValid,
  isOpen,
  contentRef
}) => {
  const isMobile = useIsMobile();
  
  const contentStyle = isMobile ? {
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    transition: 'all 0.3s ease-in-out'
  } : {};
  
  return (
    <div 
      className="relative flex flex-col service-order-popup-content h-full"
      ref={contentRef}
      style={contentStyle}
    >
      {/* Bubble animation */}
      <BubbleAnimation isOpen={isOpen} />

      {/* Service Order Header - Always visible and not scrollable */}
      <ServiceOrderHeader 
        serviceName={serviceName}
        isExpress={isExpress}
        onClose={onClose}
      />
      
      {/* Scrollable content area */}
      <ScrollArea className="flex-1 relative z-10">
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
      </ScrollArea>
    </div>
  );
};

export default ServiceOrderContent;
