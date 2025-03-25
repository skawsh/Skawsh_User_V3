
import React, { useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ClothingItem } from '../ClothingItemsList';
import ClothingItemsList from '../ClothingItemsList';
import AddClothingItemForm from '../AddClothingItemForm';
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ClothingItemsSectionProps {
  weight: number | string;
  unit: string;
  clothingItems: ClothingItem[];
  newItemName: string;
  isAddingItem: boolean;
  isClothingItemsOpen: boolean;
  onNewItemNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddItem: () => void;
  onToggleAddingItem: (isAdding: boolean) => void;
  onQuantityChange: (index: number, change: number) => void;
  setIsClothingItemsOpen: (isOpen: boolean) => void;
  isWeightValid: () => boolean;
}

const ClothingItemsSection: React.FC<ClothingItemsSectionProps> = ({
  weight,
  unit,
  clothingItems,
  newItemName,
  isAddingItem,
  isClothingItemsOpen,
  onNewItemNameChange,
  onAddItem,
  onToggleAddingItem,
  onQuantityChange,
  setIsClothingItemsOpen,
  isWeightValid
}) => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  if (unit !== 'kg' || !isWeightValid()) {
    return null;
  }

  return (
    <motion.div 
      className="border rounded-lg p-3 sm:p-5 bg-gray-50/80 shadow-sm backdrop-blur-sm transition-all duration-300 border-gray-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      ref={sectionRef}
    >
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <label className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
          Add clothing items within {weight}{unit} (Optional)
        </label>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`${isMobile ? 'h-7 text-xs' : 'h-8 text-sm'} text-blue-600 hover:bg-blue-50 transition-colors`}
          onClick={() => setIsClothingItemsOpen(!isClothingItemsOpen)}
        >
          {isClothingItemsOpen ? (
            <motion.span 
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              Hide <ChevronUp className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
            </motion.span>
          ) : (
            <motion.span 
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              Show <ChevronDown className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
            </motion.span>
          )}
        </Button>
      </div>
      
      <Collapsible open={isClothingItemsOpen} onOpenChange={setIsClothingItemsOpen}>
        <CollapsibleContent className="space-y-3 sm:space-y-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isClothingItemsOpen ? 1 : 0,
              height: isClothingItemsOpen ? "auto" : 0
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.04, 0.62, 0.23, 0.98] 
            }}
            className="pt-2"
          >
            <AddClothingItemForm 
              isAddingItem={isAddingItem}
              newItemName={newItemName}
              onNewItemNameChange={onNewItemNameChange}
              onAddItem={onAddItem}
              onToggleAddingItem={onToggleAddingItem}
              isDisabled={!isWeightValid()}
            />
            
            <ClothingItemsList 
              clothingItems={clothingItems} 
              onQuantityChange={onQuantityChange}
              isDisabled={!isWeightValid()}
            />
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};

export default ClothingItemsSection;
