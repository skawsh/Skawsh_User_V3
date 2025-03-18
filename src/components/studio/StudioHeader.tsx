
import React from 'react';
import { ChevronLeft, MoreVertical, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Star } from 'lucide-react';

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
  rating,
  reviewCount,
  backButtonRef,
  description,
  onBackClick,
  location = "1.2 Km - Gachibowli",
  deliveryTime = "08:00 am – 10:30 pm."
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
  
  const handleViewAllReviews = () => {
    alert('View all reviews functionality coming soon!');
  };
  
  return (
    <div className="animate-fade-in">
      <div className="relative h-56 w-full flex flex-col">
        {/* Colorful background with quarters */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="bg-yellow-400 relative">
            {/* Left hanger icon */}
            <div className="absolute left-1/4 top-1/4 w-12 h-12 opacity-50">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12 7M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM18 19L12 17L6 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="bg-blue-600 relative">
            {/* Right hanger icon */}
            <div className="absolute right-1/4 top-1/4 w-12 h-12 opacity-50">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12 7M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM18 19L12 17L6 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="bg-green-500"></div>
          <div className="bg-pink-500"></div>
        </div>

        {/* Back button */}
        <button 
          ref={backButtonRef} 
          onClick={handleBackClick} 
          className="absolute top-4 left-4 p-2 text-black z-10"
        >
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        
        {/* Options menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="absolute top-4 right-4 bg-gray-300/90 p-2 rounded-full z-10">
              <MoreVertical size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white z-50">
            <DropdownMenuItem onClick={handleShareStudio} className="cursor-pointer">
              Share Studio
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAboutStudio} className="cursor-pointer">
              About Studio
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleReportStudio} className="cursor-pointer text-red-500">
              Report this Studio
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Studio info card */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-4/5 bg-gray-200 rounded-xl p-4 shadow-md">
          <h1 className="text-2xl font-bold text-center mb-2">{name}</h1>
          
          <div className="text-center text-sm font-medium mb-2">
            Operating Hours<br />
            {deliveryTime}
          </div>
          
          <div className="flex items-center justify-center gap-1 mb-2 text-sm">
            {location} <ChevronDown size={16} />
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <div className="bg-green-500 text-white px-2 py-1 rounded flex items-center">
              <Star size={16} className="fill-white text-white mr-1" />
              <span>{rating}</span>
            </div>
            <button 
              onClick={handleViewAllReviews}
              className="text-sm underline"
            >
              See all review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioHeader;
