
import { useState, useEffect } from 'react';

export interface Order {
  id: string;
  studioName: string;
  studioLogo: string;
  amount: number;
  status: 'ongoing' | 'completed';
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const mockOrders: Order[] = [{
      id: '1',
      studioName: 'Busy Bee',
      studioLogo: '/lovable-uploads/5505940d-082e-454d-a2ed-2c6af892170e.png',
      amount: 296,
      status: 'ongoing'
    }, {
      id: '2',
      studioName: 'U Clean',
      studioLogo: '/lovable-uploads/5505940d-082e-454d-a2ed-2c6af892170e.png',
      amount: 356,
      status: 'ongoing'
    }, {
      id: '3',
      studioName: 'Quick Wash',
      studioLogo: '/lovable-uploads/5505940d-082e-454d-a2ed-2c6af892170e.png',
      amount: 420,
      status: 'completed'
    }, {
      id: '4',
      studioName: 'Fresh Laundry',
      studioLogo: '/lovable-uploads/5505940d-082e-454d-a2ed-2c6af892170e.png',
      amount: 250,
      status: 'completed'
    }];
    setOrders(mockOrders);
  }, []);

  // Simple and safe method to remove an order by ID
  const handleCancelOrder = (orderId: string) => {
    // Create a new array without the canceled order
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
  };

  return {
    orders,
    setOrders,
    handleCancelOrder
  };
};
