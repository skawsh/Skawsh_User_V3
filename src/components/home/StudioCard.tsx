
import React from 'react';
import { Heart, Star, Clock, MapPin, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface StudioCardProps {
  id: string;
  name: string;
  image: string;
  rating?: number;
  deliveryTime?: string; // Keeping the prop in the interface for backward compatibility
  distance?: string;
  workingHours?: string;
  index: number;
  promoted?: boolean;
}

const StudioCard: React.FC<StudioCardProps> = ({
  id,
  name,
  image,
  rating,
  distance,
  workingHours,
  index,
  promoted = false
}) => {
  // Determine logo content based on studio name
  let logoContent;

  if (name === 'Busy Bee') {
    logoContent = (
      <div className="w-full h-full flex justify-center items-center bg-white py-3">
        <div className="text-center">
          <div className="text-[#004165] font-bold text-2xl flex items-center justify-center">
            BUSY<span className="text-[#87CEEB] mx-1">B</span>EES
          </div>
          <div className="text-[#004165] text-xs mt-1">≡ Fresh Clothes Fresh Life ≡</div>
        </div>
      </div>
    );
  } else if (name === 'U clean') {
    logoContent = (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex items-center">
          <div className="bg-[#50C878] text-white h-10 w-8 flex items-center justify-center rounded-sm text-xl font-bold mr-2">U</div>
          <div className="flex flex-col">
            <span className="text-[#50C878] font-bold text-xl leading-tight">Clean</span>
            <span className="text-gray-600 text-xs">We Love Laundry</span>
          </div>
        </div>
      </div>
    );
  } else if (name === 'Tumble Dry') {
    logoContent = (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-purple-700 font-bold text-2xl">Tumble Dry</span>
          <span className="text-gray-600 text-xs">Perfectly Cleaned, Every Time</span>
        </div>
      </div>
    );
  } else if (name === 'Fabrico') {
    logoContent = (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-blue-600 font-bold text-2xl">Fabrico</span>
          <span className="text-gray-600 text-xs">Fabric Care Specialists</span>
        </div>
      </div>
    );
  } else if (name === 'Eco Clean') {
    logoContent = (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-green-600 font-bold text-2xl">Eco Clean</span>
          <span className="text-gray-600 text-xs">Environmentally Friendly Cleaning</span>
        </div>
      </div>
    );
  } else if (name === 'Mycloth') {
    logoContent = (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-orange-500 font-bold text-2xl">Mycloth</span>
          <span className="text-gray-600 text-xs">Your Garments, Our Passion</span>
        </div>
      </div>
    );
  } else {
    // Default logo for any other studio
    logoContent = (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-gray-800 font-bold text-2xl">{name}</span>
          <span className="text-gray-600 text-xs">Professional Laundry Services</span>
        </div>
      </div>
    );
  }

  return (
    <Link 
      to={`/studio/${id}`} 
      style={{
        animationDelay: `${200 + index * 100}ms`
      }} 
      className="animate-fade-in block px-[14px]"
    >
      <Card className="overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
        {/* Logo/Header Section */}
        <div className="border-b relative">
          {logoContent}
          
          {promoted && (
            <Badge 
              variant="default" 
              className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white border-0 shadow-sm"
            >
              Promoted
            </Badge>
          )}
        </div>
        
        {/* Details Section */}
        <div className="p-3">
          {/* Studio Name */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-800 truncate pr-2 text-lg">{name}</h3>
            <button className="bg-white/80 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0 shadow-sm">
              <Heart size={16} className="text-gray-600" />
            </button>
          </div>
          
          {/* Operating Hours */}
          {workingHours && (
            <div className="mt-1">
              <p className="text-sm font-medium">Operating Hours</p>
              <p className="text-sm text-gray-600">{workingHours}</p>
            </div>
          )}
          
          {/* Rating & Location */}
          <div className="flex justify-between items-center mt-2">
            {distance && (
              <div className="flex items-center text-blue-500 text-sm">
                <span>{distance}</span>
                <ChevronDown size={16} className="ml-1" />
              </div>
            )}
            
            {rating && (
              <div className="flex items-center">
                <div className="bg-green-500 text-white px-2 py-0.5 rounded-full flex items-center">
                  <span className="text-xs mr-1">★</span>
                  <span className="text-xs font-bold">{rating}</span>
                </div>
                <span className="text-xs text-blue-500 underline ml-1">Reviews</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default StudioCard;
