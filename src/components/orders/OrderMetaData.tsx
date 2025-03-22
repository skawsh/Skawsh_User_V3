
import React from 'react';

interface OrderMetaDataProps {
  orderNumber: string;
  phoneNumber: string;
  deliveryAddress: string;
}

const OrderMetaData: React.FC<OrderMetaDataProps> = ({
  orderNumber,
  phoneNumber,
  deliveryAddress
}) => {
  return (
    <div className="mt-4">
      <h3 className="font-bold mb-1">Order Details</h3>
      <div className="text-sm space-y-1">
        <div className="flex">
          <span className="w-36 text-gray-600">Order Number:</span>
          <span>{orderNumber}</span>
        </div>
        <div className="flex">
          <span className="w-36 text-gray-600">Payment mode:</span>
          <span>Using UPI (₹1310)</span>
        </div>
        <div className="flex">
          <span className="w-36 text-gray-600">Date:</span>
          <span>22/03/2025 at 03:40 PM</span>
        </div>
        <div className="flex">
          <span className="w-36 text-gray-600">Phone Number:</span>
          <span>{phoneNumber}</span>
        </div>
        <div className="flex">
          <span className="w-36 text-gray-600">Deliver To:</span>
          <span>{deliveryAddress}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderMetaData;
