
import { useState, useEffect } from 'react';
import { FavoriteService, SubService } from '@/types/serviceTypes';

export const useFavoriteServices = () => {
  const [favorites, setFavorites] = useState<FavoriteService[]>([]);
  
  // Load favorites from localStorage on initial render
  useEffect(() => {
    try {
      const storedServices = localStorage.getItem('favoriteServices');
      if (storedServices) {
        const services = JSON.parse(storedServices);
        setFavorites(services);
      }
    } catch (error) {
      console.error('Error loading favorite services:', error);
    }
  }, []);

  const isServiceFavorite = (categoryName: string, subServiceId: string): boolean => {
    const serviceId = `${categoryName.toLowerCase().replace(/\s+/g, '-')}-${subServiceId}`;
    return favorites.some(fav => fav.id === serviceId);
  };

  const toggleFavorite = (e: React.MouseEvent, subService: SubService, categoryName: string, basePrice: string) => {
    e.stopPropagation();
    
    try {
      // Check if this service is already favorite
      const serviceId = `${categoryName.toLowerCase().replace(/\s+/g, '-')}-${subService.id}`;
      const isFavorite = favorites.some(fav => fav.id === serviceId);
      
      // Get current favorites from localStorage
      const storedServices = localStorage.getItem('favoriteServices') || '[]';
      const services = JSON.parse(storedServices);
      
      if (isFavorite) {
        // Remove from favorites
        const updatedServices = services.filter((s: FavoriteService) => s.id !== serviceId);
        localStorage.setItem('favoriteServices', JSON.stringify(updatedServices));
        setFavorites(updatedServices);
      } else {
        // Add to favorites
        const newFavorite: FavoriteService = {
          id: serviceId,
          studioId: "",
          studioName: "",
          name: subService.name,
          price: `₹${basePrice}`
        };
        
        services.push(newFavorite);
        localStorage.setItem('favoriteServices', JSON.stringify(services));
        setFavorites(services);
      }
    } catch (error) {
      console.error('Error updating favorite services:', error);
    }
  };

  return {
    favorites,
    isServiceFavorite,
    toggleFavorite
  };
};
