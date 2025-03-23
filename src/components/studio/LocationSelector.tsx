
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { DrawerTrigger } from "@/components/ui/drawer";

interface LocationSelectorProps {
  locationName: string;
  distance: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  locationName,
  distance
}) => {
  return (
    <DrawerTrigger asChild>
      <div className="flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
        <span className="text-sm text-blue-700 font-medium">{distance} - {locationName}</span>
        <ChevronDown size={16} className="text-blue-500" />
      </div>
    </DrawerTrigger>
  );
};

export default LocationSelector;
