
import React, { useState } from 'react';
import { Star, ChevronLeft, MoreVertical, Share, Info, Flag, Search, ChevronDown, X, Check, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

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
    name: "Gachibowli",
    area: "Toli Chowki",
    rating: 4.3,
    time: "25-30 MINS",
    distance: "1.2 km",
    isCurrent: true
  };
  
  const otherLocations: LocationOption[] = [
    {
      name: "R5 Chambers",
      area: "Mehdipatnam",
      rating: 4.2,
      time: "35-40 mins",
      distance: "8.1 km"
    },
    {
      name: "M Cube Mall",
      area: "Attapur",
      rating: 4.1,
      time: "40-45 mins",
      distance: "9.3 km"
    },
    {
      name: "Khairatabad",
      area: "Khairatabad",
      rating: 4.1,
      time: "45-50 mins",
      distance: "10.4 km"
    },
    {
      name: "Chandanagar Circle No 21",
      area: "Miyapur",
      rating: 4.1,
      time: "35-40 mins",
      distance: "10.7 km"
    },
    {
      name: "Rangareddi",
      area: "Pebel City",
      rating: 4.1,
      time: "40-45 mins",
      distance: "13.7 km"
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
    // This would typically update the current location in a real app
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
                <DrawerContent className="px-0 max-h-[90vh] overflow-y-auto rounded-t-[20px]">
                  <div className="px-4 pt-6 pb-2">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Current Outlet</h2>
                      <DrawerClose className="rounded-full p-1 hover:bg-gray-100">
                        <X size={20} />
                      </DrawerClose>
                    </div>
                    
                    <div 
                      className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6"
                      onClick={() => handleLocationSelect(currentLocation)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-base">{currentLocation.name}, {currentLocation.area}</h3>
                        <Check size={20} className="text-orange-500" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="bg-green-600 text-white rounded-full p-0.5">
                          <Star size={14} className="fill-white text-white" />
                        </div>
                        <span className="text-sm">{currentLocation.rating} • {currentLocation.time} • {currentLocation.distance}</span>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <h2 className="text-lg font-semibold">Other Outlets Around You</h2>
                      <Separator className="my-4" />
                    </div>
                    
                    {otherLocations.map((location, index) => (
                      <div 
                        key={index}
                        className="bg-white rounded-lg p-4 mb-3 border border-gray-100 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleLocationSelect(location)}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-base">{location.name}, {location.area}</h3>
                          <ChevronRight size={20} className="text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="bg-green-600 text-white rounded-full p-0.5">
                            <Star size={14} className="fill-white text-white" />
                          </div>
                          <span className="text-sm">{location.rating} • {location.time} • {location.distance}</span>
                        </div>
                      </div>
                    ))}
                    
                    <button className="w-full py-3 text-orange-500 font-medium text-center border-t border-t-gray-200 mt-4">
                      SEE MORE OUTLETS
                    </button>
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
