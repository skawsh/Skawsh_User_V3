
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  serviceId: string;
  studioId: string;
  studioName: string;
  serviceName: string;
  servicePrice: number;
  serviceUnit?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  serviceId,
  studioId,
  studioName,
  serviceName,
  servicePrice,
  serviceUnit
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    try {
      const storedServices = localStorage.getItem('favoriteServices');
      if (storedServices) {
        const services = JSON.parse(storedServices);
        const isAlreadyFavorite = services.some((s: { id: string }) => s.id === serviceId);
        setIsFavorite(isAlreadyFavorite);
      }
    } catch (error) {
      console.error('Error checking favorite services:', error);
    }
  }, [serviceId]);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    
    try {
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);
      
      const storedServices = localStorage.getItem('favoriteServices') || '[]';
      const services = JSON.parse(storedServices);
      
      if (newFavoriteStatus) {
        if (!services.some((s: { id: string }) => s.id === serviceId)) {
          services.push({
            id: serviceId,
            studioId,
            studioName,
            name: serviceName,
            price: `₹${servicePrice.toFixed(0)}${serviceUnit ? ` ${serviceUnit}` : ''}`
          });
        }
      } else {
        const updatedServices = services.filter((s: { id: string }) => s.id !== serviceId);
        localStorage.setItem('favoriteServices', JSON.stringify(updatedServices));
      }
      
      if (newFavoriteStatus) {
        localStorage.setItem('favoriteServices', JSON.stringify(services));
      }
    } catch (error) {
      console.error('Error updating favorite services:', error);
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <button
      className={`p-1.5 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors duration-200 ${isAnimating ? 'animate-bounce-once' : ''}`}
      onClick={toggleFavorite}
      aria-label={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <Heart 
        size={16} 
        className={`transition-all duration-300 transform ${isAnimating ? 'scale-125' : ''} ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
      />
    </button>
  );
};

export default FavoriteButton;
