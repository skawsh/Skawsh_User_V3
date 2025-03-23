
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceControlsProps {
  isInCart: boolean;
  tabType: string;
  hasWeight: boolean;
  weight?: number | null;
  quantity?: number | null;
  onAddClick: (e: React.MouseEvent) => void;
  onIncreaseClick: (e: React.MouseEvent) => void;
  onDecreaseClick: (e: React.MouseEvent) => void;
}

const ServiceControls: React.FC<ServiceControlsProps> = ({
  isInCart,
  tabType,
  hasWeight,
  weight,
  quantity,
  onAddClick,
  onIncreaseClick,
  onDecreaseClick
}) => {
  if (isInCart) {
    return (
      <div className="flex items-center">
        <div className="bg-blue-500 rounded-full flex items-center overflow-hidden h-6">
          <button 
            className="h-6 w-7 flex items-center justify-center text-white hover:bg-blue-600 focus:outline-none"
            onClick={onDecreaseClick}
          >
            <Minus size={12} />
          </button>
          
          <div className="px-1 flex items-center justify-center text-white font-medium min-w-6 text-center text-xs">
            {hasWeight 
              ? (weight || 0).toFixed(1) 
              : quantity || 0}
          </div>
          
          <button 
            className="h-6 w-7 flex items-center justify-center text-white hover:bg-blue-600 focus:outline-none"
            onClick={onIncreaseClick}
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <Button 
        variant="default" 
        size="sm"
        className={cn(
          "rounded-full shadow-sm text-xs py-1 px-2.5 h-6",
          tabType === "standard" 
            ? "bg-blue-600 hover:bg-blue-700" 
            : "bg-orange-500 hover:bg-orange-600"
        )}
        onClick={onAddClick}
      >
        <Plus size={12} className="mr-0.5" /> Add
      </Button>
    );
  }
};

export default ServiceControls;
