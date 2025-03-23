
import React from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryButtonProps {
  onClick: () => void;
  cartItemsCount: number;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ onClick, cartItemsCount }) => {
  return (
    <button 
      onClick={onClick} 
      className={cn(
        "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 text-white flex items-center justify-center transition-all duration-300 animate-scale-in bg-black",
        cartItemsCount > 0 ? "bottom-24" : "bottom-6"
      )}
    >
      <Menu size={24} />
    </button>
  );
};

export default CategoryButton;
