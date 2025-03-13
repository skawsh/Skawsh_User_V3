
import React from 'react';
import { Heart, Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StudioCardProps {
  id: string;
  name: string;
  image: string;
  rating?: number;
  deliveryTime?: string;
  distance?: string;
  workingHours?: string;
  index: number;
  promoted?: boolean;
}

const StudioCard: React.FC<StudioCardProps> = ({ 
  id, 
  name, 
  image, 
  rating, 
  deliveryTime,
  distance,
  workingHours,
  index,
  promoted = false
}) => {
  return (
    <Link 
      to={`/studio/${id}`} 
      className="animate-fade-in block" 
      style={{ animationDelay: `${200 + index * 100}ms` }}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex">
          <div 
            className="h-28 w-28 bg-cover bg-center relative flex-shrink-0" 
            style={{ backgroundImage: `url(${image})` }} 
          >
            {promoted && (
              <Badge variant="default" className="absolute top-2 left-2 bg-primary shadow-sm">
                Promoted
              </Badge>
            )}
          </div>
          <div className="p-3 flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-800 mb-1 truncate">{name}</h3>
              <button className="bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors duration-200">
                <Heart size={18} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex items-center gap-1.5">
                <Star size={14} className={cn("text-gray-400", rating && "fill-yellow-400 text-yellow-400")} />
                <span className="text-sm text-gray-700">{rating || "New"}</span>
              </div>
              
              {distance && (
                <div className="flex items-center gap-1.5 text-gray-500">
                  <MapPin size={14} />
                  <span className="text-xs">{distance}</span>
                </div>
              )}
              
              {workingHours && (
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock size={14} />
                  <span className="text-xs">{workingHours}</span>
                </div>
              )}
              
              {deliveryTime && (
                <div className="text-xs text-primary-500 font-medium mt-1">
                  {deliveryTime} delivery
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudioCard;
