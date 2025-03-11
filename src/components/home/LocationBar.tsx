
import React from 'react';
import { MapPin, ChevronDown, User } from 'lucide-react';

const LocationBar: React.FC = () => {
  return (
    <div className="animate-fade-in pt-4">
      <div className="flex items-center justify-between mb-1 pl-1 mt-2">
        <div className="text-xl font-semibold text-white flex items-center">
          <span className="mr-1">Home</span>
          <ChevronDown size={18} className="text-gray-200" />
        </div>
        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-primary-100 transition-colors mt-3">
          <User size={20} className="text-primary-500" />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-sm font-medium text-white pl-1">
          <span className="truncate">Room No: 306, Vathsalya Men's PG</span>
        </div>
      </div>
    </div>
  );
};

export default LocationBar;
