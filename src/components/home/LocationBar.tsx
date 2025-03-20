
import React from 'react';
import { MapPin, ChevronDown, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LocationBar: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="animate-fade-in pt-4">
      <div className="flex items-center justify-between mb-0 mt-2">
        <div className="flex items-center">
          <MapPin size={34} className="text-white mr-2" />
          <div>
            <div className="text-xl font-bold text-white flex items-center">
              <span className="mr-1">Home</span>
              <ChevronDown size={18} className="text-gray-200" />
            </div>
            <div className="text-sm font-normal text-white opacity-90">
              <span className="truncate">Room No: 306, Vathsalya Men's PG</span>
            </div>
          </div>
        </div>
        <Avatar 
          className="h-10 w-10 bg-white cursor-pointer hover:bg-primary-100 transition-colors"
          onClick={handleProfileClick}
        >
          <AvatarFallback className="text-primary-500">
            <User size={20} />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default LocationBar;
