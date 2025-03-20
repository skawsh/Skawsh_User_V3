import React, { useState, useEffect } from 'react';
import { Star, ShoppingBag, Clock, Footprints, Shirt, Plus, Minus, Heart } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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
  studioId?: string;
  studioName?: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  service,
  tabType,
  weight,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
  onClick,
  studioId = '',
  studioName = ''
}) => {
  const isMobile = useIsMobile();
  const price = tabType === "express" ? service.price * 1.5 : service.price;
  const hasWeight = service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'));
  const isInCart = weight !== null || quantity !== null;
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    try {
      const storedServices = localStorage.getItem('favoriteServices');
      if (storedServices) {
        const services = JSON.parse(storedServices);
        const isAlreadyFavorite = services.some((s: { id: string }) => s.id === service.id);
        setIsFavorite(isAlreadyFavorite);
      }
    } catch (error) {
      console.error('Error checking favorite services:', error);
    }
  }, [service.id]);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    
    try {
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);
      
      const storedServices = localStorage.getItem('favoriteServices') || '[]';
      const services = JSON.parse(storedServices);
      
      if (newFavoriteStatus) {
        if (!services.some((s: { id: string }) => s.id === service.id)) {
          services.push({
            id: service.id,
            studioId,
            studioName,
            name: service.name,
            price: `₹${price.toFixed(0)}${service.unit ? ` ${service.unit}` : ''}`
          });
        }
      } else {
        const updatedServices = services.filter((s: { id: string }) => s.id !== service.id);
        localStorage.setItem('favoriteServices', JSON.stringify(updatedServices));
      }
      
      if (newFavoriteStatus) {
        localStorage.setItem('favoriteServices', JSON.stringify(services));
      }
    } catch (error) {
      console.error('Error updating favorite services:', error);
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };
  
  const getServiceIcon = () => {
    if (service.name.includes('Fold')) {
      return <img src="/lovable-uploads/0ef15cb3-a69a-4edc-b3d3-cecffd98ac53.png" alt="Laundry" className="w-full h-full object-cover" />;
    } else if (service.name.includes('Iron')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <Clock size={20} className="text-gray-500" />
        </div>
      );
    } else if (service.name.includes('Shoe') || service.name.includes('shoe') || service.name.includes('Sneaker') || service.name.includes('Sandal') || service.name.includes('Canvas') || service.name.includes('Leather') || service.name.includes('Heel')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <Footprints size={20} className="text-gray-500" />
        </div>
      );
    } else if (service.name.includes('Shirt') || service.name.includes('T-shirt') || service.name.includes('Top')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <Shirt size={20} className="text-gray-500" />
        </div>
      );
    } else if (service.name.includes('Pant')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <Shirt size={20} className="text-gray-500" />
        </div>
      );
    } else {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <ShoppingBag size={20} className="text-gray-500" />
        </div>
      );
    }
  };

  const renderControls = () => {
    if (isInCart) {
      return (
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-full flex items-center overflow-hidden h-6">
            <button 
              className="h-6 w-7 flex items-center justify-center text-white hover:bg-blue-600 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                onDecrease(service);
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                onIncrease(service);
              }}
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
          onClick={(e) => {
            e.stopPropagation();
            onAdd(service);
          }}
        >
          <Plus size={12} className="mr-0.5" /> Add
        </Button>
      );
    }
  };

  return (
    <div 
      data-service-name={service.name}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-200 relative"
      onClick={() => onClick(service)}
    >
      <button
        className={`absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors duration-200 z-10 ${isAnimating ? 'animate-bounce-once' : ''}`}
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Remove from Washlist" : "Add to Washlist"}
      >
        <Heart 
          size={16} 
          className={`transition-all duration-300 transform ${isAnimating ? 'scale-125' : ''} ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
        />
      </button>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden shadow-sm">
            {getServiceIcon()}
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{service.name}</h3>
            <div className="flex items-center gap-1">
              <span className="text-primary font-semibold">
                ₹{price.toFixed(0)}
                {service.unit ? ` ${service.unit}` : ''}
              </span>
              <div className="flex items-center gap-0.5 ml-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-500">4.8</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{service.description}</p>
          </div>
        </div>
        
        {renderControls()}
      </div>
    </div>
  );
};

export default ServiceItem;
