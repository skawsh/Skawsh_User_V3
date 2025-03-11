
import React from 'react';
import { MapPin, ChevronDown, User } from 'lucide-react';

const LocationBar: React.FC = () => {
  return (
    <div className="animate-fade-in pt-4">
      <div className="flex items-center justify-between mb-0 mt-2">
        <div className="flex items-center">
          <MapPin size={38} className="text-green-500 mr-3" />
          <div>
            <div className="text-2xl font-bold text-white flex items-center">
              <span className="mr-1">Home</span>
              <ChevronDown size={20} className="text-gray-200" />
            </div>
            <div className="text-base font-normal text-white opacity-90">
              <span className="truncate">Room No: 306, Vathsalya Men's PG</span>
            </div>
          </div>
        </div>
        <div className="h-14 w-14 rounded-full bg-primary-500 flex items-center justify-center cursor-pointer hover:bg-primary-400 transition-colors">
          <span className="text-3xl font-bold text-white">C</span>
        </div>
      </div>
    </div>
  );
};

export default LocationBar;
