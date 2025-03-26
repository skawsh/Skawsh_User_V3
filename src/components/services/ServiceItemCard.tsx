
import React from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Service } from '@/types/serviceTypes';
import { cn } from "@/lib/utils";

interface ServiceItemCardProps {
  subService: Service;
  categoryId: string;
  imageSrc: string;
  isFavorite: boolean;
  basePrice: string;
  onClick: () => void;
  onFavoriteToggle: (e: React.MouseEvent) => void;
}

const ServiceItemCard: React.FC<ServiceItemCardProps> = ({
  subService,
  categoryId,
  imageSrc,
  isFavorite,
  basePrice,
  onClick,
  onFavoriteToggle
}) => {
  return (
    <Card 
      key={subService.id} 
      className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:translate-y-[-2px]"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex flex-col items-center">
          <div className="w-full h-24 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
            <img 
              src={imageSrc} 
              alt={subService.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <button
              onClick={onFavoriteToggle}
              className={cn(
                "absolute top-2 right-2 p-1.5 rounded-full bg-white/80 shadow-sm hover:bg-white transition-all duration-200 z-20",
                isFavorite ? 'animate-bounce-once' : ''
              )}
              aria-label={isFavorite ? "Remove from Washlist" : "Add to Washlist"}
            >
              <Heart 
                size={14} 
                className={`transition-all duration-300 transform ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
              />
            </button>
          </div>
          <div className="w-full p-3">
            <h4 className="font-medium text-gray-800 text-sm mb-1">{subService.name}</h4>
            <p className="text-xs text-gray-500 line-clamp-2 mb-2">{subService.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs font-medium text-indigo-600 bg-indigo-50 border-indigo-100">
                ₹{basePrice}
              </Badge>
              <span className="text-xs text-gray-400">2.5k+ orders</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItemCard;
