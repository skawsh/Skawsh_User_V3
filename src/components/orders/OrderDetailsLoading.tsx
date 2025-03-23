
import React from 'react';

const OrderDetailsLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-primary-500 rounded-full border-t-transparent"></div>
    </div>
  );
};

export default OrderDetailsLoading;
