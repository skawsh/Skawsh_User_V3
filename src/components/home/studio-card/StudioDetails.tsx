
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { getLocationName } from './locationUtils';

interface StudioDetailsProps {
  name: string;
  workingHours?: string;
  distance?: string;
  rating?: number;
}

const StudioDetails: React.FC<StudioDetailsProps> = ({
  name,
  workingHours,
  distance,
  rating
}) => {
  return (
    <div className="p-3">
      {/* Studio Name */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-800 truncate pr-2 text-lg">{name}</h3>
      </div>
      
      {/* Operating Hours */}
      {workingHours && (
        <div className="mt-1">
          <p className="text-sm font-medium">Operating Hours</p>
          <p className="text-sm text-gray-600">{workingHours}</p>
        </div>
      )}
      
      {/* Rating & Location */}
      <div className="flex justify-between items-center mt-2">
        {distance && (
          <div className="flex items-center text-blue-500 text-sm">
            <MapPin size={14} className="mr-1" />
            <span>{getLocationName(name)}, {distance}</span>
          </div>
        )}
        
        {rating && (
          <div className="flex flex-col items-end">
            <div className="bg-green-500 text-white px-2.5 py-0.5 rounded-md flex items-center">
              <Star size={14} className="mr-1 fill-white" />
              <span className="text-xs font-bold">{rating}</span>
            </div>
            <span className="text-xs text-blue-500 mt-1">See all reviews</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudioDetails;
