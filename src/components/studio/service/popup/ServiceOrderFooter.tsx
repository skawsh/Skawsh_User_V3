
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceOrderFooterProps {
  isEnabled: boolean;
  onAddToCart: () => void;
}

const ServiceOrderFooter: React.FC<ServiceOrderFooterProps> = ({
  isEnabled,
  onAddToCart
}) => {
  return (
    <div className="sticky bottom-0 p-6 bg-white border-t">
      <Button 
        className={cn(
          "w-full h-12 rounded-lg text-white shadow-md transition-all", 
          isEnabled 
            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:translate-y-[-2px]" 
            : "bg-gray-300 text-gray-600"
        )} 
        onClick={onAddToCart} 
        disabled={!isEnabled}
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        Add to Sack
      </Button>
    </div>
  );
};

export default ServiceOrderFooter;
