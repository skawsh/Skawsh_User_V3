
import React from 'react';
import { Heart, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StudioCardProps {
  id: string;
  name: string;
  image: string;
  rating?: number;
  deliveryTime?: string;
  index: number;
  promoted?: boolean;
}

const StudioCard: React.FC<StudioCardProps> = ({ 
  id, 
  name, 
  image, 
  rating, 
  deliveryTime,
  index,
  promoted = false
}) => {
  return (
    <Link 
      to={`/studio/${id}`} 
      className="animate-fade-in mb-3" 
      style={{ animationDelay: `${200 + index * 100}ms` }}
    >
      <div className="relative rounded-xl overflow-hidden">
        <div 
          className="h-48 bg-cover bg-center relative" 
          style={{ backgroundImage: `url(${image})` }} 
        >
          {promoted && (
            <div className="absolute top-2 left-2 bg-gray-800/80 text-white text-xs px-2 py-0.5 rounded">
              Promoted
            </div>
          )}
          <button className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full">
            <Heart size={18} className="text-gray-600" />
          </button>
        </div>
        {rating && (
          <div className="p-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-700">{rating}</span>
              </div>
              {deliveryTime && (
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={14} />
                  <span className="text-xs">{deliveryTime}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default StudioCard;
