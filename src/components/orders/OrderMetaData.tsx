
import React from 'react';
import { Order } from '@/types/order';

interface OrderMetaDataProps {
  order: Order;
  phoneNumber: string;
  deliveryAddress: string;
}

const OrderMetaData: React.FC<OrderMetaDataProps> = ({
  order,
  phoneNumber,
  deliveryAddress
}) => {
  const isCompleted = order.status === 'completed';
  const orderNumber = `ORD-${order.id.substring(0, 4)}`;
  const orderDate = isCompleted 
    ? new Date(order.updatedAt).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    : 'NA';
  
  const paymentMode = isCompleted
    ? `Using ${order.paymentMethod || 'UPI'} (₹${order.totalAmount})`
    : 'NA';

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
          <span>{paymentMode}</span>
        </div>
        <div className="flex">
          <span className="w-36 text-gray-600">Date:</span>
          <span>{orderDate}</span>
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
