
import React from 'react';
import { Star, Clock, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudioHeaderProps {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
}

const StudioHeader: React.FC<StudioHeaderProps> = ({ 
  name, 
  image, 
  rating, 
  reviewCount, 
  deliveryTime 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="animate-fade-in">
      <div className="relative h-56 bg-cover bg-center w-full" style={{ backgroundImage: `url(${image})` }}>
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 bg-white/80 backdrop-blur-md p-2 rounded-full text-gray-700"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h1 className="text-2xl font-semibold mb-2">{name}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{rating} ({reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span className="text-sm">{deliveryTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioHeader;
