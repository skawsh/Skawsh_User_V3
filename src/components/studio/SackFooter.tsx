
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SackFooterProps {
  itemCount: number;
  studioId: string;
}

const SackFooter: React.FC<SackFooterProps> = ({ itemCount, studioId }) => {
  const navigate = useNavigate();

  if (itemCount === 0) return null;

  const handleGoToCart = () => {
    navigate('/cart', {
      state: {
        studioId: studioId
      }
    });
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="max-w-lg mx-auto px-4 pb-4">
        <button
          onClick={handleGoToCart}
          className={cn(
            "w-full flex items-center justify-between py-3 px-5 rounded-xl shadow-md",
            "bg-[#92E3A9] hover:bg-[#83d699] transition-colors duration-200"
          )}
        >
          <span className="text-[#403E43] font-semibold">
            {itemCount} {itemCount === 1 ? 'Service' : 'Services'} added
          </span>
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-white" />
            <span className="text-white font-semibold">View Sack</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SackFooter;
