
import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

const LocationBar: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-3 animate-fade-in">
      <div className="flex items-center gap-1.5 text-sm font-medium cursor-pointer group">
        <MapPin size={16} className="text-primary-500" />
        <span className="text-gray-800">Current Location</span>
        <ChevronDown size={16} className="text-gray-500 group-hover:text-primary-500 transition-colors" />
      </div>
    </div>
  );
};

export default LocationBar;
