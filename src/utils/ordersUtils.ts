
import { useState, useEffect, useCallback } from 'react';
import { toast } from "sonner";

export interface Order {
  id: string;
  studioName: string;
  studioLogo: string;
  amount: number;
  status: 'ongoing' | 'completed';
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load mock orders only once on initial mount
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

  // Handle order cancellation using functional update pattern
  const handleCancelOrder = useCallback((orderId: string) => {
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.filter(order => order.id !== orderId);
      return updatedOrders;
    });
    
    // Show success message for the operation
    toast.success("Order removed successfully");
  }, []);

  return {
    orders,
    setOrders,
    handleCancelOrder
  };
};
