import React, { useState } from 'react';
import { Star, ChevronLeft, MoreVertical, Share, Info, Flag, Search, ChevronDown, X, Check, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudioHeaderProps {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  backButtonRef?: React.RefObject<HTMLButtonElement>;
  description?: string;
  onBackClick?: () => void;
}

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

const StudioHeader: React.FC<StudioHeaderProps> = ({
  name,
  image,
  rating,
  reviewCount,
  deliveryTime,
  backButtonRef,
  description,
  onBackClick
}) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Mock location data
  const currentLocation: LocationOption = {
    name: "Tolichowki",
    area: "Hyderabad",
    rating: 4.1,
    time: "",
    distance: "4.1 km",
    isCurrent: true,
    isNearest: true
  };
  
  const otherLocations: LocationOption[] = [
    {
      name: "Mehdipatnam",
      area: "Hyderabad",
      rating: 4.2,
      time: "",
      distance: "8.0 km"
    },
    {
      name: "Attapur",
      area: "Hyderabad",
      rating: 4.1,
      time: "",
      distance: "9.7 km"
    },
    {
      name: "Panjagutta",
      area: "Hyderabad",
      rating: 3.8,
      time: "",
      distance: "10.5 km"
    },
    {
      name: "Narsingi",
      area: "Hyderabad",
      rating: 4.0,
      time: "",
      distance: "11.2 km",
      isClosedForDelivery: true
    }
  ];
  
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
  
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };
  
  const handleShareStudio = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out ${name}`,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  const handleAboutStudio = () => {
    alert(`About ${name}: ${description || 'No description available.'}`);
  };
  
  const handleReportStudio = () => {
    alert(`Thank you for your feedback. ${name} has been reported.`);
  };

  const handleLocationSelect = (location: LocationOption) => {
    console.log(`Selected location: ${location.name}, ${location.area}`);
    setDrawerOpen(false);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="relative bg-gray-200 w-full rounded-xl overflow-hidden" style={{ maxHeight: '280px' }}>
        <div className="flex justify-between items-center p-4">
          <button 
            ref={backButtonRef} 
            onClick={handleBackClick} 
            className="text-gray-700"
          >
            <ChevronLeft size={24} />
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-700">
                <MoreVertical size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white z-50">
              <DropdownMenuItem onClick={handleShareStudio} className="flex items-center gap-2">
                <Share size={16} />
                <span>Share Studio</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAboutStudio} className="flex items-center gap-2">
                <Info size={16} />
                <span>About Studio</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleReportStudio} className="flex items-center gap-2 text-red-500">
                <Flag size={16} />
                <span>Report this Studio</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mx-auto px-4 pb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h1 className="text-2xl font-bold text-left mb-2">{name}</h1>
            
            <div className="flex justify-between items-start mt-2">
              <div className="mt-2">
                <p className="font-medium">Operating Hours</p>
                <p className="text-gray-600">{getOpeningHours()}</p>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="bg-green-500 text-white px-2 py-0.5 rounded flex items-center">
                  <Star size={14} className="fill-white text-white mr-1" />
                  <span>{rating}</span>
                </div>
                <a href="#" className="text-xs text-blue-500 mt-1">See all review</a>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger asChild>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span className="text-sm">{currentLocation.distance} - {currentLocation.name}</span>
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
                    
                    <div className="bg-gradient-to-b from-amber-700/90 to-amber-800/90 pt-14 pb-8 px-6 text-center">
                      <p className="text-white/80 text-sm mb-1">All delivery outlets for</p>
                      <h2 className="text-2xl font-bold text-white">{name}</h2>
                    </div>
                    
                    <div className="px-4 py-6 bg-gray-50">
                      <ScrollArea 
                        className="max-h-[60vh] pr-2 space-y-3 overflow-auto"
                        style={{
                          overscrollBehavior: 'contain',
                          touchAction: 'pan-y',
                        }}
                      >
                        <div 
                          className="relative mb-4"
                          onClick={() => handleLocationSelect(currentLocation)}
                        >
                          {currentLocation.isNearest && (
                            <div className="absolute -top-2 left-4 bg-green-100 text-green-800 px-2 py-0.5 rounded-sm text-xs flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
                              Nearest available outlet
                            </div>
                          )}
                          <div className="bg-white border border-green-200 rounded-lg p-4 shadow-sm hover:border-green-300 transition-colors">
                            <div className="flex justify-between items-center">
                              <h3 className="font-semibold text-base">{currentLocation.name}, {currentLocation.area}</h3>
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
                            <div 
                              key={index}
                              className="relative"
                              onClick={() => handleLocationSelect(location)}
                            >
                              <div className={`bg-white rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors ${location.isClosedForDelivery ? 'border-gray-200' : 'border-gray-100'}`}>
                                <div className="flex justify-between items-center">
                                  <h3 className="font-semibold text-base">{location.name}, {location.area}</h3>
                                  <div className={`text-white rounded-sm px-1.5 py-0.5 text-xs font-medium ${location.rating >= 4 ? 'bg-green-600' : 'bg-amber-500'}`}>
                                    {location.rating}
                                  </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-sm text-gray-600">Distance · {location.distance}</span>
                                  {location.isClosedForDelivery && (
                                    <span className="text-xs text-red-500">Currently closed for delivery</span>
                                  )}
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
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2 pb-0 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input placeholder="Search services in this studio..." className="pl-10 bg-gray-50 border-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default StudioHeader;
