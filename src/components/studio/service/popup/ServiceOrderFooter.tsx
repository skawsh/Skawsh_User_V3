
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ServiceOrderFooterProps {
  isEnabled: boolean;
  onAddToCart: () => void;
}

const ServiceOrderFooter: React.FC<ServiceOrderFooterProps> = ({
  isEnabled,
  onAddToCart
}) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="py-2 sm:py-4 px-4 sm:px-6 bg-white border-t shadow-[0_-1px_3px_rgba(0,0,0,0.05)] relative z-10 sticky bottom-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Button 
        className={cn(
          "w-full rounded-lg text-white shadow-md transition-all",
          isMobile ? "h-10 text-sm" : "h-12",
          isEnabled 
            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:translate-y-[-2px] active:translate-y-[1px]" 
            : "bg-gray-300 text-gray-600"
        )} 
        onClick={onAddToCart} 
        disabled={!isEnabled}
      >
        <ShoppingBag className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} mr-2`} />
        Add to Sack
      </Button>
    </motion.div>
  );
};

export default ServiceOrderFooter;
