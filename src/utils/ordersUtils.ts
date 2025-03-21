
import { toast } from "@/components/ui/use-toast";

// Order status types
export type OrderStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

// Order item interface
export interface OrderItem {
  id: string;
  serviceName: string;
  quantity: number;
  price: number;
}

// Order interface
export interface Order {
  id: string;
  studioId: string;
  studioName: string;
  studioImage: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  orderDate: string;
  scheduledDate?: string;
}

// Mock orders data
const generateMockOrders = (): Order[] => {
  return [
    {
      id: "ord-001",
      studioId: "studio-1",
      studioName: "Lakme Salon",
      studioImage: "/lovable-uploads/95b97c87-0963-424b-ad2b-400d1104bfd2.png",
      items: [
        { id: "item-1", serviceName: "Haircut & Style", quantity: 1, price: 500 },
        { id: "item-2", serviceName: "Hair Spa", quantity: 1, price: 1200 }
      ],
      status: "pending",
      totalAmount: 1700,
      orderDate: "2025-03-15T10:30:00",
      scheduledDate: "2025-03-22T14:00:00"
    },
    {
      id: "ord-002",
      studioId: "studio-2",
      studioName: "Enrich Salon",
      studioImage: "/lovable-uploads/0ef15cb3-a69a-4edc-b3d3-cecffd98ac53.png",
      items: [
        { id: "item-3", serviceName: "Full Body Massage", quantity: 1, price: 2000 }
      ],
      status: "confirmed",
      totalAmount: 2000,
      orderDate: "2025-03-10T15:45:00",
      scheduledDate: "2025-03-18T11:30:00"
    },
    {
      id: "ord-003",
      studioId: "studio-3",
      studioName: "Style & Scissors",
      studioImage: "/lovable-uploads/5505940d-082e-454d-a2ed-2c6af892170e.png",
      items: [
        { id: "item-4", serviceName: "Manicure", quantity: 1, price: 300 },
        { id: "item-5", serviceName: "Pedicure", quantity: 1, price: 400 }
      ],
      status: "completed",
      totalAmount: 700,
      orderDate: "2025-02-28T09:15:00",
      scheduledDate: "2025-03-05T13:45:00"
    },
    {
      id: "ord-004",
      studioId: "studio-1",
      studioName: "Lakme Salon",
      studioImage: "/lovable-uploads/95b97c87-0963-424b-ad2b-400d1104bfd2.png",
      items: [
        { id: "item-6", serviceName: "Facial", quantity: 1, price: 1500 }
      ],
      status: "in-progress",
      totalAmount: 1500,
      orderDate: "2025-03-14T11:00:00",
      scheduledDate: "2025-03-17T16:30:00"
    },
    {
      id: "ord-005",
      studioId: "studio-4",
      studioName: "Glow & Beauty",
      studioImage: "/lovable-uploads/fda4730e-82ff-4406-877e-1f45d0ca2ebd.png",
      items: [
        { id: "item-7", serviceName: "Waxing", quantity: 1, price: 800 }
      ],
      status: "cancelled",
      totalAmount: 800,
      orderDate: "2025-03-08T14:20:00",
      scheduledDate: "2025-03-12T10:00:00"
    }
  ];
};

// Initialize orders in local storage if not already
const initOrders = () => {
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify(generateMockOrders()));
  }
};

// Get all orders
export const getOrders = (): Order[] => {
  initOrders();
  try {
    const ordersData = localStorage.getItem('orders');
    return ordersData ? JSON.parse(ordersData) : [];
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return [];
  }
};

// Get orders by status
export const getOrdersByStatus = (status: OrderStatus | 'all'): Order[] => {
  const orders = getOrders();
  if (status === 'all') return orders;
  return orders.filter(order => order.status === status);
};

// Save orders to local storage
const saveOrders = (orders: Order[]) => {
  localStorage.setItem('orders', JSON.stringify(orders));
  // Dispatch an event that orders have been updated
  document.dispatchEvent(new CustomEvent('ordersUpdated'));
};

// Cancel an order
export const cancelOrder = (orderId: string): boolean => {
  try {
    const orders = getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) return false;
    
    // Only pending and confirmed orders can be cancelled
    if (['pending', 'confirmed'].includes(orders[orderIndex].status)) {
      orders[orderIndex].status = 'cancelled';
      saveOrders(orders);
      
      toast({
        title: "Order Cancelled",
        description: "Your order has been successfully cancelled."
      });
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error cancelling order:', error);
    return false;
  }
};

// Delete an order
export const deleteOrder = (orderId: string): boolean => {
  try {
    let orders = getOrders();
    const initialLength = orders.length;
    
    orders = orders.filter(order => order.id !== orderId);
    
    if (orders.length < initialLength) {
      saveOrders(orders);
      
      toast({
        title: "Order Deleted",
        description: "Your order has been successfully deleted."
      });
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error deleting order:', error);
    return false;
  }
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Get color for order status
export const getStatusColor = (status: OrderStatus): string => {
  const statusColors: Record<OrderStatus, string> = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-purple-100 text-purple-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};
