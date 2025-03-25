
import React from 'react';
import { Clock, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ServiceOrderHeaderProps {
  serviceName: string;
  isExpress: boolean;
  onClose: () => void;
}

const ServiceOrderHeader: React.FC<ServiceOrderHeaderProps> = ({
  serviceName,
  isExpress,
  onClose
}) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="bg-white border-b sticky top-0 z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-2 sm:p-5 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold flex items-center gap-2`}>
          {serviceName}
          {isExpress && (
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="h-3 w-3" /> Express
            </span>
          )}
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-7 w-7 sm:h-8 sm:w-8 bg-white/80 hover:bg-white shrink-0" 
          onClick={onClose}
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceOrderHeader;
