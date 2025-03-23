import { Order } from '@/types/order';

// Mock data for orders - keeping only one in history
const mockOrders: Order[] = [
  {
    id: 'fghij-67890-abcde',
    studioId: '4',
    studioName: 'Sparkle Clean',
    userId: 'user1',
    services: [
      { id: 's6', name: 'Wash & Iron', price: 249, quantity: 3 },
    ],
    totalAmount: 747,
    status: 'completed',
    createdAt: new Date(2023, 9, 15).toISOString(),
    updatedAt: new Date(2023, 9, 18).toISOString(),
    paymentMethod: 'UPI',
    paymentStatus: 'paid'
  }
];

// Initialize orders in sessionStorage
const initializeOrders = () => {
  const existingOrders = sessionStorage.getItem('orders');
  if (!existingOrders) {
    sessionStorage.setItem('orders', JSON.stringify(mockOrders));
  }
};

// Fetch all orders
export const fetchOrders = async (): Promise<Order[]> => {
  initializeOrders();
  
  return new Promise((resolve) => {
    try {
      const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
      resolve(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      resolve([]);
    }
  });
};

// Get a single order by ID
export const getOrderById = async (id: string): Promise<Order> => {
  return new Promise((resolve, reject) => {
    try {
      const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
      const order = orders.find((o: Order) => o.id === id);
      if (order) {
        resolve(order);
      } else {
        reject(new Error('Order not found'));
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Cancel an order - optimized with immediate response and no delay
export const cancelOrder = async (id: string): Promise<void> => {
  try {
    const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex((order: Order) => order.id === id);
    
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    // Update the order status immediately
    orders[orderIndex] = { 
      ...orders[orderIndex], 
      status: 'cancelled', 
      updatedAt: new Date().toISOString() 
    };
    
    // Save updated orders to sessionStorage
    sessionStorage.setItem('orders', JSON.stringify(orders));
    
    // Resolve immediately - no artificial delay to ensure UI updates instantly
    return Promise.resolve();
  } catch (error) {
    console.error("Error in cancelOrder:", error);
    return Promise.reject(error);
  }
};
