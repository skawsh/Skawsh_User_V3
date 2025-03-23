
import React from 'react';
import { Star } from 'lucide-react';

interface StudioHeaderInfoProps {
  name: string;
  rating: number;
  deliveryTime: string;
  onViewReviews: () => void;
}

const StudioHeaderInfo: React.FC<StudioHeaderInfoProps> = ({
  name,
  rating,
  deliveryTime,
  onViewReviews
}) => {
  const getOpeningHours = () => {
    const timeMappings: Record<string, string> = {
      "1-2 days": "09:00 AM - 08:00 PM",
      "Same Day": "08:00 AM - 09:00 PM",
      "1 day": "10:00 AM - 07:00 PM",
      "3-4 hours": "24 hours",
      "2 days": "08:00 AM - 06:00 PM"
    };
    return timeMappings[deliveryTime] || deliveryTime;
  };

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
              onViewReviews();
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

export default StudioHeaderInfo;
