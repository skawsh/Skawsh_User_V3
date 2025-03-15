
import React from 'react';
import { Star, Clock, ChevronLeft, MoreVertical, Share, Info, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StudioHeaderProps {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  backButtonRef?: React.RefObject<HTMLButtonElement>;
  description?: string;
}

const StudioHeader: React.FC<StudioHeaderProps> = ({ 
  name, 
  image, 
  rating, 
  reviewCount, 
  deliveryTime,
  backButtonRef,
  description
}) => {
  const navigate = useNavigate();
  
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
          onClick={() => navigate(-1)} 
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
    </div>
  );
};

export default StudioHeader;
