
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
    <div className="text-sm space-y-2">
      <div className="flex">
        <span className="w-36 text-gray-600">Order Number:</span>
        <span>{orderNumber}</span>
      </div>
      <div className="flex">
        <span className="w-36 text-gray-600">Payment mode:</span>
        <span>N/A</span>
      </div>
      <div className="flex">
        <span className="w-36 text-gray-600">Date:</span>
        <span>N/A</span>
      </div>
      <div className="flex">
        <span className="w-36 text-gray-600">Phone Number:</span>
        <span>{phoneNumber}</span>
      </div>
      <div className="flex items-start">
        <span className="w-36 text-gray-600">Deliver To:</span>
        <span>{deliveryAddress}</span>
      </div>
    </div>
  );
};

export default OrderMetaData;
