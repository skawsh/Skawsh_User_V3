
import React from 'react';
import { Star, Clock, ChevronLeft, MoreVertical, Share, Info, Flag, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
        url: window.location.href,
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
      <div className="relative h-56 bg-cover bg-center w-full" style={{ backgroundImage: `url(${image})` }}>
        <button 
          ref={backButtonRef}
          onClick={handleBackClick} 
          className="absolute top-4 left-4 bg-white/70 backdrop-blur-md p-2 rounded-full text-gray-700"
        >
          <ChevronLeft size={24} />
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="absolute top-4 right-4 bg-white/70 backdrop-blur-md p-2 rounded-full text-gray-700">
              <MoreVertical size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h1 className="text-2xl font-semibold mb-2">{name}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{rating} ({reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span className="text-sm">{deliveryTime}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search bar with reduced padding */}
      <div className="px-4 py-2 bg-white shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search services in this studio..." 
            className="pl-10 bg-gray-50 border-gray-200 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default StudioHeader;
