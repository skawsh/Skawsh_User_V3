
import React, { useRef } from 'react';
import OrderCard from './OrderCard';
import { Order } from '@/types/order';

interface OrderListProps {
  orders: Order[];
  emptyMessage?: string;
  onDeleteComplete?: () => void;
}

const OrderList: React.FC<OrderListProps> = ({ 
  orders, 
  emptyMessage = "You don't have any orders.",
  onDeleteComplete
}) => {
  // Create a reference to the list container for focus management
  const listContainerRef = useRef<HTMLDivElement>(null);
  
  // This function will be called after an order is successfully cancelled
  const handleCancelComplete = () => {
    // Set focus to the list container itself, which is a non-interactive element
    // This prevents any text input from getting focus
    if (listContainerRef.current) {
      listContainerRef.current.focus();
    }
  };

  if (orders.length === 0) {
    return (
      <div 
        className="text-center text-gray-500 p-8"
        ref={listContainerRef}
        tabIndex={-1} // Make it focusable but not in tab order
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div 
      className="space-y-4" 
      ref={listContainerRef}
      tabIndex={-1} // Make it focusable but not in tab order
    >
      {orders.map((order) => (
        <OrderCard 
          key={order.id} 
          order={order} 
          onCancelComplete={handleCancelComplete}
          onDeleteComplete={onDeleteComplete}
        />
      ))}
    </div>
  );
};

export default OrderList;
