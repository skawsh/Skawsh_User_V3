
import React from 'react';
import { Star, ChevronLeft, MoreVertical, Share, Info, Flag, Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

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
  
  // Format the delivery time to show as opening and closing time
  // This interprets the "1-2 days" as "09:00 AM - 08:00 PM" for display purposes
  // In a real app, you would use actual opening and closing times from the data
  const getOpeningHours = () => {
    // For now, use a simple mapping based on deliveryTime
    // In a real scenario, this would come from the API
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
  
  return (
    <div className="animate-fade-in">
      <div className="relative bg-gray-200 w-full rounded-xl overflow-hidden" style={{ maxHeight: '280px' }}>
        {/* Header with back button and more options */}
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
        
        {/* Studio Info Card */}
        <div className="mx-auto px-4 pb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            {/* Studio Name */}
            <h1 className="text-2xl font-bold text-center mb-2">{name}</h1>
            
            {/* Rating Badge moved to middle */}
            <div className="flex justify-center mb-3">
              <div className="bg-green-500 text-white px-2 py-0.5 rounded flex items-center">
                <Star size={14} className="fill-white text-white mr-1" />
                <span>{rating}</span>
              </div>
            </div>
            
            {/* Operating Hours with stacked layout */}
            <div className="mb-3">
              <p className="font-medium">Operating Hours</p>
              <p className="text-gray-600">{getOpeningHours()}</p>
            </div>
            
            {/* Location and Reviews Link */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-sm">1.2 Km - Gachibowli</span>
                <ChevronDown size={16} className="text-blue-500" />
              </div>
              
              <div>
                <a href="#" className="text-xs text-blue-500">See all review</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search bar with no bottom padding */}
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
