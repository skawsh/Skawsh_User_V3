
import React from 'react';
import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui-elements/Button';

interface CartFooterProps {
  total: number;
  onPlaceOrder: () => void;
}

const CartFooter: React.FC<CartFooterProps> = ({ total, onPlaceOrder }) => {
  const formatIndianRupee = (amount: number): string => {
    return `₹${amount.toFixed(0)}`;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg animate-slide-in" style={{animationDelay: "500ms"}}>
      <div className="max-w-3xl mx-auto">
        <Button 
          onClick={onPlaceOrder}
          className="w-full bg-[#92E3A9] text-gray-800 hover:bg-[#83d699] font-semibold text-base py-3"
          icon={<Package size={18} />}
          fullWidth
        >
          Place Order {formatIndianRupee(total)}
        </Button>
      </div>
    </div>
  );
};

export default CartFooter;
