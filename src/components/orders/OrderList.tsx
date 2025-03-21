
import React from 'react';
import OrderCard from './OrderCard';
import { Order } from '@/types/order';

interface OrderListProps {
  orders: Order[];
  emptyMessage?: string;
}

const OrderList: React.FC<OrderListProps> = ({ 
  orders, 
  emptyMessage = "You don't have any orders." 
}) => {
  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
