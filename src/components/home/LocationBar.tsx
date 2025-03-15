
import React from 'react';
import { MapPin, ChevronDown, User } from 'lucide-react';

const LocationBar: React.FC = () => {
  return (
    <div className="animate-fade-in pt-4">
      <div className="flex items-center justify-between mb-0 mt-2">
        <div className="flex items-center">
          <MapPin size={34} className="text-white mr-2" />
          <div>
            <div className="text-xl font-bold text-white flex items-center">
              <span className="mr-1">Home</span>
              <ChevronDown size={18} className="text-gray-200" />
            </div>
            <div className="text-sm font-normal text-white opacity-90">
              <span className="truncate">Room No: 306, Vathsalya Men's PG</span>
            </div>
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-primary-100 transition-colors">
          <User size={20} className="text-primary-500" />
        </div>
      </div>
    </div>
  );
};

export default LocationBar;
