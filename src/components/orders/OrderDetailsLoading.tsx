
import React from 'react';

const OrderDetailsLoading: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="animate-spin h-10 w-10 border-4 border-primary-500 rounded-full border-t-transparent"></div>
      <p className="mt-4 text-gray-500 animate-pulse">Loading order details...</p>
    </div>
  );
};

export default OrderDetailsLoading;
