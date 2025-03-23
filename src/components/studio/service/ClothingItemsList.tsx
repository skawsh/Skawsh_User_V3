
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";

export interface ClothingItem {
  name: string;
  quantity: number;
}

interface ClothingItemsListProps {
  clothingItems: ClothingItem[];
  onQuantityChange: (index: number, change: number) => void;
  isDisabled?: boolean;
}

const ClothingItemsList: React.FC<ClothingItemsListProps> = ({
  clothingItems,
  onQuantityChange,
  isDisabled = false
}) => {
  return (
    <div className="space-y-4 max-h-[240px] overflow-y-auto no-scrollbar">
      {clothingItems.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-gray-700">{item.name}</span>
          <div className="flex items-center gap-3">
            <Button 
              size="icon" 
              variant="outline" 
              className="h-7 w-7 rounded-full border-gray-300" 
              onClick={() => onQuantityChange(index, -1)} 
              disabled={item.quantity === 0 || isDisabled}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-6 text-center">{item.quantity}</span>
            
            <Button 
              size="icon" 
              variant="outline" 
              className="h-7 w-7 rounded-full border-gray-300" 
              onClick={() => onQuantityChange(index, 1)}
              disabled={isDisabled}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClothingItemsList;
