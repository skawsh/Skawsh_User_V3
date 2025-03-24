
import React from 'react';
import { Star } from 'lucide-react';

interface StudioInfoCardProps {
  name: string;
  rating: number;
  getOpeningHours: () => string;
  onViewAllReviews: () => void;
}

const StudioInfoCard: React.FC<StudioInfoCardProps> = ({
  name,
  rating,
  getOpeningHours,
  onViewAllReviews
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-50">
      <h1 className="text-2xl font-bold text-left mb-2">{name}</h1>
      
      <div className="flex justify-between items-start mt-2">
        <div className="mt-2">
          <p className="font-medium text-gray-800">Operating Hours</p>
          <p className="text-gray-600">{getOpeningHours()}</p>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="bg-green-500 text-white px-2 py-0.5 rounded-md flex items-center shadow-sm">
            <Star size={14} className="fill-white text-white mr-1" />
            <span className="font-medium">{rating}</span>
          </div>
          <a 
            href="#" 
            onClick={e => {
              e.preventDefault();
              onViewAllReviews();
            }} 
            className="text-xs text-blue-600 mt-1 font-medium hover:underline"
          >
            See all reviews
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudioInfoCard;
