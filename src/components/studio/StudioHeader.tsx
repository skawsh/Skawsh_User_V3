
import React from 'react';
import { ChevronLeft, MoreVertical, Share, Info, Flag, Edit, MapPin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Star, Search } from 'lucide-react';

interface StudioHeaderProps {
  name: string;
  image?: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  backButtonRef?: React.RefObject<HTMLButtonElement>;
  description?: string;
  onBackClick?: () => void;
  location?: string;
}

const StudioHeader: React.FC<StudioHeaderProps> = ({
  name,
  image,
  rating,
  reviewCount,
  deliveryTime,
  backButtonRef,
  description,
  onBackClick,
  location = "1.2 Km - Gachibowli"
}) => {
  const navigate = useNavigate();
  
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
  
  return (
    <div className="animate-fade-in">
      <div className="relative w-full" style={{ 
        background: "linear-gradient(to right, #FFC107 50%, #0D47A1 50%)",
        height: "250px"
      }}>
        {/* Yellow side with hanger icon */}
        <div className="absolute left-0 top-0 w-1/2 h-full flex flex-col items-center justify-center">
          <div className="w-24 h-24 text-white">
            {/* Hanger icon (custom SVG) */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M12 4C10.8954 4 10 4.89543 10 6C10 6.74028 10.4022 7.38663 11 7.73244V8H6.60799C5.76632 8 4.98966 8.44749 4.56376 9.17931L2.29289 12.7071C1.90237 13.0976 1.90237 13.7308 2.29289 14.1213C2.68342 14.5118 3.31658 14.5118 3.70711 14.1213L6 11.8284V20C6 20.5523 6.44772 21 7 21H17C17.5523 21 18 20.5523 18 20V11.8284L20.2929 14.1213C20.6834 14.5118 21.3166 14.5118 21.7071 14.1213C22.0976 13.7308 22.0976 13.0976 21.7071 12.7071L19.4362 9.17931C19.0103 8.44749 18.2337 8 17.392 8H13V7.73244C13.5978 7.38663 14 6.74028 14 6C14 4.89543 13.1046 4 12 4Z" fill="white"/>
            </svg>
          </div>
        </div>
        
        {/* Blue side with hanger icon */}
        <div className="absolute right-0 top-0 w-1/2 h-full flex flex-col items-center justify-center">
          <div className="w-24 h-24 text-white">
            {/* Hanger icon (custom SVG) */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M12 4C10.8954 4 10 4.89543 10 6C10 6.74028 10.4022 7.38663 11 7.73244V8H6.60799C5.76632 8 4.98966 8.44749 4.56376 9.17931L2.29289 12.7071C1.90237 13.0976 1.90237 13.7308 2.29289 14.1213C2.68342 14.5118 3.31658 14.5118 3.70711 14.1213L6 11.8284V20C6 20.5523 6.44772 21 7 21H17C17.5523 21 18 20.5523 18 20V11.8284L20.2929 14.1213C20.6834 14.5118 21.3166 14.5118 21.7071 14.1213C22.0976 13.7308 22.0976 13.0976 21.7071 12.7071L19.4362 9.17931C19.0103 8.44749 18.2337 8 17.392 8H13V7.73244C13.5978 7.38663 14 6.74028 14 6C14 4.89543 13.1046 4 12 4Z" fill="white"/>
            </svg>
          </div>
        </div>
        
        {/* Back button */}
        <button 
          ref={backButtonRef} 
          onClick={handleBackClick} 
          className="absolute top-4 left-4 p-2 text-gray-900 z-10"
        >
          <ChevronLeft size={30} className="text-black" />
        </button>
        
        {/* More options button */}
        <div className="absolute top-4 right-4 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-gray-300 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                <MoreVertical size={20} className="text-gray-700" />
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
        
        {/* Studio Info Card */}
        <Card className="absolute left-0 right-0 mx-8 -bottom-20 bg-gray-300 rounded-3xl overflow-hidden shadow-lg z-20">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-2">{name}</h1>
            
            <div className="text-center mb-2">
              <p className="font-semibold">Operating Hours</p>
              <p>{deliveryTime}</p>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin size={16} className="text-gray-700" />
              <span className="text-gray-700">{location}</span>
              <ChevronDown size={16} className="text-gray-700" />
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <div className="bg-green-500 text-white px-2 py-1 rounded-md flex items-center">
                <Star size={16} className="fill-white text-white mr-1" />
                <span>{rating}</span>
              </div>
              <a href="#reviews" className="text-gray-700 underline">See all review</a>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Add padding to ensure content appears below the card */}
      <div className="h-24"></div>
      
      {/* Search bar with padding to position below the card */}
      <div className="px-4 py-2 mt-4 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input placeholder="Search services in this studio..." className="pl-10 bg-gray-50 border-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default StudioHeader;
