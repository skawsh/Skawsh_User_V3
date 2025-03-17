import React from 'react';
import { Heart, Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
interface StudioCardProps {
  id: string;
  name: string;
  image: string;
  rating?: number;
  deliveryTime?: string; // Keeping the prop in the interface for backward compatibility
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
  distance,
  workingHours,
  index,
  promoted = false
}) => {
  return <Link to={`/studio/${id}`} className="animate-fade-in block" style={{
    animationDelay: `${200 + index * 100}ms`
  }}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        {/* Image section - top */}
        <div className="relative">
          <AspectRatio ratio={16 / 9} className="w-full">
            <div className="h-full w-full bg-cover bg-center" style={{
            backgroundImage: `url(${image})`
          }} />
          </AspectRatio>
          
          {promoted && <Badge variant="default" className="absolute top-2 left-2 bg-primary shadow-sm">
              Promoted
            </Badge>}
        </div>
        
        {/* Content section - bottom */}
        <div className="p-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800 truncate pr-2 text-lg">{name}</h3>
              <button className="bg-white/80 p-1 rounded-full hover:bg-white transition-colors duration-200 flex-shrink-0">
                <Heart size={16} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star size={14} className={cn("text-gray-400", rating && "fill-yellow-400 text-yellow-400")} />
              <span className="text-sm text-gray-700">{rating || "New"}</span>
            </div>
          </div>
          
          <div className="space-y-1.5 mt-1">
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {distance && <div className="flex items-center gap-1.5 text-gray-500">
                  <MapPin size={14} />
                  <span className="text-xs">{distance}</span>
                </div>}
              
              {workingHours && <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock size={14} />
                  <span className="text-xs">{workingHours}</span>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </Link>;
};
export default StudioCard;