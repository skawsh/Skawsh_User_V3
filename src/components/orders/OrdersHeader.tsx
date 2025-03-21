
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Receipt } from 'lucide-react';

const OrdersHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <div className="flex flex-col mb-6">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back to profile"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
      </div>
      <div className="flex items-center gap-3 mb-1">
        <div className="bg-primary-100 p-2 rounded-full">
          <Receipt size={24} className="text-primary-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Your Orders</h1>
      </div>
      <p className="text-gray-500 ml-10">View and manage all your bookings</p>
    </div>
  );
};

export default OrdersHeader;
