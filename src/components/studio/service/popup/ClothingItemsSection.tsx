
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { ClothingItem } from '../ClothingItemsList';
import ClothingItemsList from '../ClothingItemsList';
import AddClothingItemForm from '../AddClothingItemForm';

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
  if (unit !== 'kg' || !isWeightValid()) {
    return null;
  }

  return (
    <div className="border rounded-lg p-5 bg-gray-50/80 shadow-sm backdrop-blur-sm transition-all duration-300 border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-gray-700">
          Add clothing items within {weight}{unit} (Optional)
        </label>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
          onClick={() => setIsClothingItemsOpen(!isClothingItemsOpen)}
        >
          {isClothingItemsOpen ? (
            <span className="flex items-center gap-1">
              Hide <ChevronUp className="h-4 w-4" />
            </span>
          ) : (
            <span className="flex items-center gap-1">
              Show <ChevronDown className="h-4 w-4" />
            </span>
          )}
        </Button>
      </div>
      
      <Collapsible open={isClothingItemsOpen} onOpenChange={setIsClothingItemsOpen}>
        <CollapsibleContent className="space-y-4 pt-2 animate-in slide-in-from-top duration-200">
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
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ClothingItemsSection;
