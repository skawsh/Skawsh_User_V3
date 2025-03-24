
import { useState, useEffect } from 'react';

interface StudioData {
  id: string;
  name: string;
  image: string;
  rating?: number;
  deliveryTime?: string;
}

export const useFavoriteStudio = (id: string, name: string, image: string, rating?: number, deliveryTime?: string) => {
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
            deliveryTime
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

  return { isFavorite, isAnimating, handleFavoriteClick };
};
