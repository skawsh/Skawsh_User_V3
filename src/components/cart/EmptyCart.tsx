
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui-elements/Button';

const EmptyCart: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center p-8 mt-16 animate-fade-in">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        <ShoppingBag size={64} className="text-gray-300 mb-4 mx-auto" />
        <h2 className="text-xl font-semibold mb-2 text-center">Your sack is empty</h2>
        <p className="text-gray-500 text-center mb-6">
          Add some services to your sack to proceed with checkout
        </p>
        <Button 
          onClick={() => navigate('/services')} 
          className="bg-[#92E3A9] hover:bg-[#83d699] text-gray-800 w-full"
          fullWidth
        >
          Browse Services
        </Button>
      </div>
    </div>
  );
};

export default EmptyCart;
