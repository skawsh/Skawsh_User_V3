
import React from 'react';
import { MapPin, ChevronDown, User } from 'lucide-react';

const LocationBar: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-sm font-semibold text-gray-700 mb-1 pl-1">Home</div>
      <div className="flex items-center justify-between py-3 px-1">
        <div className="flex items-center gap-1.5 text-sm font-medium cursor-pointer group">
          <MapPin size={16} className="text-primary-500" />
          <span className="text-gray-800">Room No: 306, Vathsalya Men's PG</span>
          <ChevronDown size={16} className="text-gray-500 group-hover:text-primary-500 transition-colors" />
        </div>
        <User size={20} className="text-gray-700 cursor-pointer" />
      </div>
    </div>
  );
};

export default LocationBar;
