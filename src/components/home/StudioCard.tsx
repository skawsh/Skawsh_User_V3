
import React from 'react';
import { Heart, Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';

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
  // Check if the studio is Busy Bee to use the custom logo
  const isBusyBee = name.toLowerCase().includes('busy bee');
  const busyBeeLogo = '/lovable-uploads/a8759ba1-6d44-45aa-94db-16cabd041845.png';
  
  // Check if the image is a logo
  const isLogo = image.includes('lovable-uploads') || isBusyBee;
  
  // Use the custom Busy Bee logo if it's Busy Bee studio
  const displayImage = isBusyBee ? busyBeeLogo : image;
  
  return (
    <Link 
      to={`/studio/${id}`} 
      style={{
        animationDelay: `${200 + index * 100}ms`
      }} 
      className="animate-fade-in block px-[14px]"
    >
      <Card className="overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
        {/* Image section - top */}
        <div className="relative">
          <AspectRatio ratio={16 / 9} className="w-full">
            <div 
              className={cn(
                "h-full w-full bg-cover bg-center",
                isLogo && "flex items-center justify-center bg-white p-4"
              )}
              style={{
                backgroundImage: isLogo ? 'none' : `url(${displayImage})`
              }}
            >
              {isLogo && (
                <img 
                  src={displayImage} 
                  alt={name} 
                  className="max-h-full max-w-full object-contain" 
                />
              )}
            </div>
          </AspectRatio>
          
          {promoted && (
            <Badge 
              variant="default" 
              className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white border-0 shadow-sm"
            >
              Promoted
            </Badge>
          )}
        </div>
        
        {/* Content section - bottom */}
        <div className="p-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800 truncate pr-2 text-lg">{name}</h3>
              <button className="bg-white/80 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0 shadow-sm">
                <Heart size={16} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star size={14} className={cn("text-gray-400", rating && "fill-yellow-400 text-yellow-400")} />
              <span className="text-sm text-gray-700 font-medium">{rating || "New"}</span>
            </div>
          </div>
          
          <div className="space-y-1.5 mt-1">
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
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
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default StudioCard;
