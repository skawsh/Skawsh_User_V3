
import React from 'react';
import { Clock, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
  return (
    <div className="bg-white border-b sticky top-0 z-10">
      <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-lg font-semibold flex items-center gap-2">
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
          className="rounded-full h-8 w-8 bg-white/80 hover:bg-white" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ServiceOrderHeader;
