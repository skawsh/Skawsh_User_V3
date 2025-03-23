
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CartHeaderProps {
  cartItemsCount: number;
  onClearCart: () => void;
  previousPath: string;
}

const CartHeader: React.FC<CartHeaderProps> = ({ 
  cartItemsCount, 
  onClearCart, 
  previousPath 
}) => {
  const navigate = useNavigate();
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollY = window.scrollY;
        setIsHeaderSticky(scrollY > 10);
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackNavigation = () => {
    if (previousPath) {
      navigate(previousPath);
    } else {
      navigate(-1); // Fallback to the browser's default back behavior
    }
  };

  return (
    <div
      ref={headerRef}
      className={cn(
        "flex items-center justify-between p-4 bg-white transition-all duration-300",
        isHeaderSticky ? "fixed top-0 left-0 right-0 z-10 shadow-md animate-slide-in" : ""
      )}
    >
      <div className="flex items-center">
        <button 
          onClick={handleBackNavigation} 
          className="mr-3 hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Your Sack</h1>
      </div>
      
      {cartItemsCount > 0 && (
        <button 
          onClick={onClearCart} 
          className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
          aria-label="Clear sack"
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>
  );
};

export default CartHeader;
