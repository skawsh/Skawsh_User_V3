
import React, { useEffect, useState } from 'react';
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
  const [completionDate, setCompletionDate] = useState<string | null>(null);
  
  useEffect(() => {
    // Get the stored completion date if this is a completed order
    if (order.status === 'completed') {
      // Check if we have a stored completion date from the secret code
      const storedDate = localStorage.getItem('orderCompletionDate');
      if (storedDate) {
        setCompletionDate(storedDate);
      } else {
        // Fallback to the order's updated date
        setCompletionDate(order.updatedAt);
      }
    }
  }, [order.status, order.updatedAt]);
  
  const isCompleted = order.status === 'completed';
  const orderNumber = `ORD-${order.id.substring(0, 4)}`;
  
  // Format the date and time for display
  const orderDate = isCompleted && completionDate
    ? new Date(completionDate).toLocaleString('en-US', {
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
