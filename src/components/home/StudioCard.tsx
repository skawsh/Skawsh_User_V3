
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import StudioLogo from './studio-card/StudioLogo';
import FavoriteButton from './studio-card/FavoriteButton';
import StudioDetails from './studio-card/StudioDetails';
import { useFavoriteStudio } from './studio-card/useFavoriteStudio';

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
  deliveryTime,
}) => {
  const { isFavorite, isAnimating, handleFavoriteClick } = useFavoriteStudio(
    id, 
    name, 
    image, 
    rating,
    workingHours // Using workingHours as deliveryTime for compatibility
  );

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
          <StudioLogo name={name} />
          <FavoriteButton 
            isFavorite={isFavorite} 
            onClick={handleFavoriteClick} 
            isAnimating={isAnimating}
          />
        </div>
        
        {/* Details Section */}
        <StudioDetails 
          name={name}
          workingHours={workingHours}
          distance={distance}
          rating={rating}
        />
      </Card>
    </Link>
  );
};

export default StudioCard;
