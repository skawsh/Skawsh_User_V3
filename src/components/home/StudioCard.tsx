
import React, { useState, useEffect } from 'react';
import { Heart, Star, Clock, MapPin } from 'lucide-react';
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
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check localStorage on component mount to see if this studio is already a favorite
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favoriteStudios');
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites);
        const isAlreadyFavorite = favorites.some((studio: { id: string }) => studio.id === id);
        setIsFavorite(isAlreadyFavorite);
      }
    } catch (error) {
      console.error('Error checking favorites:', error);
    }
  }, [id]);

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

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigation to studio page
    setIsAnimating(true);
    
    try {
      // Toggle favorite status
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);
      
      // Get current favorites from localStorage
      const storedFavorites = localStorage.getItem('favoriteStudios') || '[]';
      const favorites = JSON.parse(storedFavorites);
      
      if (newFavoriteStatus) {
        // Add to favorites if not already there
        if (!favorites.some((studio: { id: string }) => studio.id === id)) {
          favorites.push({
            id,
            name,
            image,
            rating,
            deliveryTime: workingHours // Using workingHours as deliveryTime for compatibility
          });
        }
      } else {
        // Remove from favorites
        const updatedFavorites = favorites.filter((studio: { id: string }) => studio.id !== id);
        localStorage.setItem('favoriteStudios', JSON.stringify(updatedFavorites));
      }
      
      // Save updated favorites to localStorage
      if (newFavoriteStatus) {
        localStorage.setItem('favoriteStudios', JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
    
    // Remove animation class after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 600); // Animation duration
  };

  // Generate location names based on studio name for demonstration
  const getLocationName = () => {
    const locationMap: Record<string, string> = {
      'Busy Bee': 'Manikonda',
      'U clean': 'Madhapur',
      'Tumble Dry': 'Gachibowli',
      'Fabrico': 'Hitech City',
      'Eco Clean': 'Kondapur',
      'Mycloth': 'Jubilee Hills'
    };
    
    return locationMap[name] || 'Hyderabad';
  };

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
          
          <button 
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 shadow-sm hover:bg-gray-100 transition-colors duration-200 z-10 ${isAnimating ? 'animate-bounce-once' : ''}`}
            aria-label={isFavorite ? "Remove from Washlist" : "Add to Washlist"}
          >
            <Heart 
              size={18} 
              className={`transition-all duration-300 transform ${isAnimating ? 'scale-125' : ''} ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
            />
          </button>
        </div>
        
        {/* Details Section */}
        <div className="p-3">
          {/* Studio Name */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-800 truncate pr-2 text-lg">{name}</h3>
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
                <MapPin size={14} className="mr-1" />
                <span>{getLocationName()}, {distance}</span>
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
