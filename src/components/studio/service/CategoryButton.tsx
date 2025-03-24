
import React from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryButtonProps {
  onClick: () => void;
  cartItemsCount: number;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ onClick, cartItemsCount }) => {
  return (
    <div className="fixed right-6 z-40 flex flex-col items-center transition-all duration-300 animate-scale-in"
      style={{ bottom: cartItemsCount > 0 ? '96px' : '24px' }}
    >
      <button 
        onClick={onClick} 
        className={cn(
          "h-14 w-14 rounded-full shadow-lg text-white flex items-center justify-center transition-all duration-300 bg-black",
        )}
      >
        <Menu size={24} />
      </button>
      <span className="mt-1 text-xs font-medium text-black bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
        Services
      </span>
    </div>
  );
};

export default CategoryButton;
