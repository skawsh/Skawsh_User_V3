
import React from 'react';
import { ChevronDown, X, Check, ChevronRight } from 'lucide-react';
import { Drawer, DrawerContent, DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LocationOption {
  name: string;
  area: string;
  rating: number;
  time: string;
  distance: string;
  isCurrent?: boolean;
  isNearest?: boolean;
  isClosedForDelivery?: boolean;
}

interface LocationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLocation: LocationOption;
  otherLocations: LocationOption[];
  studioName: string;
  onLocationSelect: (location: LocationOption) => void;
}

const LocationDrawer: React.FC<LocationDrawerProps> = ({
  open,
  onOpenChange,
  currentLocation,
  otherLocations,
  studioName,
  onLocationSelect,
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
          <span className="text-sm text-blue-700 font-medium">{currentLocation.distance} - {currentLocation.name}</span>
          <ChevronDown size={16} className="text-blue-500" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="px-0 max-h-[90vh] rounded-t-[20px]">
        <div className="relative">
          <div className="absolute right-4 top-4 z-10">
            <DrawerClose className="rounded-full p-2 bg-black/70 text-white hover:bg-black/80">
              <X size={16} />
            </DrawerClose>
          </div>
          
          <div className="bg-gradient-to-b from-amber-600 to-amber-700 pt-14 pb-8 px-6 text-center">
            <p className="text-white/80 text-sm mb-1">All delivery outlets for</p>
            <h2 className="text-2xl font-bold text-white">{studioName}</h2>
          </div>
          
          <div className="px-4 py-6 bg-gray-50">
            <ScrollArea className="max-h-[60vh] pr-2 space-y-3 overflow-auto custom-scrollbar" style={{
              overscrollBehavior: 'contain',
              touchAction: 'pan-y'
            }}>
              <div className="relative mb-4" onClick={() => onLocationSelect(currentLocation)}>
                {currentLocation.isNearest && <div className="absolute -top-2 left-4 bg-green-100 text-green-800 px-2 rounded-sm text-xs font-medium flex items-center z-10 shadow-md nearest-outlet-tag py-[8px]">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
                  Nearest available outlet
                </div>}
                <div className="bg-white border border-green-200 rounded-lg p-4 shadow-sm hover:border-green-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-base py-[9px]">{currentLocation.name}, {currentLocation.area}</h3>
                    <div className="bg-green-600 text-white rounded-sm px-1.5 py-0.5 text-xs font-medium">
                      {currentLocation.rating}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-600">Distance · {currentLocation.distance}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {otherLocations.map((location, index) => (
                  <div key={index} className="relative" onClick={() => onLocationSelect(location)}>
                    <div className={`bg-white rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors ${location.isClosedForDelivery ? 'border-gray-200' : 'border-gray-100'}`}>
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-base">{location.name}, {location.area}</h3>
                        <div className={`text-white rounded-sm px-1.5 py-0.5 text-xs font-medium ${location.rating >= 4 ? 'bg-green-600' : 'bg-amber-500'}`}>
                          {location.rating}
                        </div>
                      </div>
                      <div className="flex flex-col mt-2">
                        <span className="text-sm text-gray-600">Distance · {location.distance}</span>
                        {location.isClosedForDelivery && <span className="text-xs text-red-500 mt-1 my-0">Currently not accepting the orders</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <button className="w-full py-3 text-red-500 font-medium text-center mt-4 text-sm flex items-center justify-center">
              See all 25 outlets <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LocationDrawer;
