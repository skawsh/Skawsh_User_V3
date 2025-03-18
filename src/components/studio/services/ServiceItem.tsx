
import React from 'react';
import { Star, ShoppingBag, Clock, Footprints, Shirt, Plus, Minus } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
}

interface ServiceItemProps {
  service: Service;
  tabType: string;
  weight?: number | null;
  quantity?: number | null;
  onAdd: (service: Service) => void;
  onIncrease: (service: Service) => void;
  onDecrease: (service: Service) => void;
  onClick: (service: Service) => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  service,
  tabType,
  weight,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
  onClick
}) => {
  const hasWeightUnit = service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'));
  const isInCart = hasWeightUnit ? weight !== null : quantity !== null;
  
  const getServiceIcon = () => {
    if (service.name.includes('Fold')) {
      return <img src="/lovable-uploads/0ef15cb3-a69a-4edc-b3d3-cecffd98ac53.png" alt="Laundry" className="w-full h-full object-cover" />;
    } else if (service.name.includes('Iron')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <Clock size={20} className="text-gray-500" />
        </div>
      );
    } else if (service.name.includes('Shoe') || service.name.includes('shoe') || service.name.includes('Sneaker') || service.name.includes('Sandal') || service.name.includes('Canvas') || service.name.includes('Leather') || service.name.includes('Heel')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <Footprints size={20} className="text-gray-500" />
        </div>
      );
    } else if (service.name.includes('Shirt') || service.name.includes('T-shirt') || service.name.includes('Top')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <Shirt size={20} className="text-gray-500" />
        </div>
      );
    } else if (service.name.includes('Pant')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <Shirt size={20} className="text-gray-500" />
        </div>
      );
    } else {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <ShoppingBag size={20} className="text-gray-500" />
        </div>
      );
    }
  };

  const renderControls = () => {
    if (isInCart) {
      return (
        <div className="flex items-center">
          <Button 
            variant="default" 
            size="sm"
            className={cn(
              "rounded-l-full rounded-r-none",
              tabType === "standard" 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-orange-500 hover:bg-orange-600"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onDecrease(service);
            }}
          >
            <Minus size={16} />
          </Button>
          <span className={cn(
            "px-2 py-1 text-sm font-medium", 
            tabType === "standard" ? "bg-blue-600" : "bg-orange-500",
            "text-white"
          )}>
            {hasWeightUnit 
              ? (weight || 0).toFixed(1) 
              : quantity || 0}
          </span>
          <Button 
            variant="default" 
            size="sm"
            className={cn(
              "rounded-l-none rounded-r-full",
              tabType === "standard" 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-orange-500 hover:bg-orange-600"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onIncrease(service);
            }}
          >
            <Plus size={16} />
          </Button>
        </div>
      );
    } else {
      return (
        <Button 
          variant="default" 
          size="sm"
          className={cn(
            "rounded-full",
            tabType === "standard" 
              ? "bg-blue-600 hover:bg-blue-700" 
              : "bg-orange-500 hover:bg-orange-600"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onAdd(service);
          }}
        >
          <Plus size={16} className="mr-1" /> Add
        </Button>
      );
    }
  };

  return (
    <Card 
      className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(service)}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
            {getServiceIcon()}
          </div>
          <div>
            <h3 className="font-medium">{service.name}</h3>
            <div className="flex items-center gap-1">
              <span className="text-primary font-semibold">
                ₹{tabType === "express" ? (service.price * 1.5).toFixed(0) : service.price.toFixed(0)}
                {service.unit ? ` ${service.unit}` : ''}
              </span>
              <div className="flex items-center gap-0.5 ml-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-500">4.8</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{service.description}</p>
          </div>
        </div>
        
        {renderControls()}
      </div>
    </Card>
  );
};

export default ServiceItem;
