
import React from 'react';
import GlassCard from '../ui-elements/GlassCard';
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StudioCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  index: number;
}

const StudioCard: React.FC<StudioCardProps> = ({ 
  id, 
  name, 
  image, 
  rating, 
  deliveryTime,
  index 
}) => {
  return (
    <Link 
      to={`/studio/${id}`} 
      className="animate-fade-in" 
      style={{ animationDelay: `${200 + index * 100}ms` }}
    >
      <GlassCard className="overflow-hidden p-0">
        <div 
          className="h-32 bg-cover bg-center" 
          style={{ backgroundImage: `url(${image})` }} 
        />
        <div className="p-3">
          <h3 className="font-medium text-gray-800 mb-2">{name}</h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-700">{rating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock size={14} />
              <span className="text-xs">{deliveryTime}</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
};

export default StudioCard;
