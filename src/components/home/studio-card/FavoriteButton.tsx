
import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isAnimating: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onClick, isAnimating }) => {
  return (
    <button 
      onClick={onClick}
      className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 shadow-sm hover:bg-gray-100 transition-colors duration-200 z-10 ${isAnimating ? 'animate-bounce-once' : ''}`}
      aria-label={isFavorite ? "Remove from Washlist" : "Add to Washlist"}
    >
      <Heart 
        size={18} 
        className={`transition-all duration-300 transform ${isAnimating ? 'scale-125' : ''} ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
      />
    </button>
  );
};

export default FavoriteButton;
