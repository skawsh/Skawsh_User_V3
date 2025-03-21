
import { Order } from '@/types/order';

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: '12345-abcde-67890',
    studioId: '1',
    studioName: 'Busy Bee Laundry',
    userId: 'user1',
    services: [
      { id: 's1', name: 'Wash & Fold', price: 199, quantity: 2 },
      { id: 's2', name: 'Dry Cleaning', price: 299, quantity: 1 },
    ],
    totalAmount: 697,
    status: 'pending_payment',
    createdAt: new Date(2023, 10, 1).toISOString(),
    updatedAt: new Date(2023, 10, 1).toISOString(),
  },
  {
    id: '67890-fghij-12345',
    studioId: '2',
    studioName: 'Clean Express',
    userId: 'user1',
    services: [
      { id: 's3', name: 'Ironing', price: 99, quantity: 5 },
    ],
    totalAmount: 495,
    status: 'processing',
    createdAt: new Date(2023, 10, 5).toISOString(),
    updatedAt: new Date(2023, 10, 6).toISOString(),
  },
  {
    id: 'abcde-12345-fghij',
    studioId: '3',
    studioName: 'Laundry King',
    userId: 'user1',
    services: [
      { id: 's4', name: 'Premium Wash', price: 399, quantity: 1 },
      { id: 's5', name: 'Stain Removal', price: 149, quantity: 2 },
    ],
    totalAmount: 697,
    status: 'ready',
    createdAt: new Date(2023, 10, 8).toISOString(),
    updatedAt: new Date(2023, 10, 10).toISOString(),
  },
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
  },
  {
    id: 'lmnop-qrstu-vwxyz',
    studioId: '5',
    studioName: 'Fresh & Clean',
    userId: 'user1',
    services: [
      { id: 's7', name: 'Basic Wash', price: 149, quantity: 4 },
    ],
    totalAmount: 596,
    status: 'cancelled',
    createdAt: new Date(2023, 9, 10).toISOString(),
    updatedAt: new Date(2023, 9, 11).toISOString(),
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
    // Simulate network delay
    setTimeout(() => {
      try {
        const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
        resolve(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        resolve([]);
      }
    }, 300); // Reduced delay for better responsiveness
  });
};

// Get a single order by ID
export const getOrderById = async (id: string): Promise<Order> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
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
    }, 100); // Reduced delay for better UX
  });
};

// Cancel an order - optimized for immediate response
export const cancelOrder = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Short timeout to simulate network but stay responsive
    setTimeout(() => {
      try {
        const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
        const orderIndex = orders.findIndex((order: Order) => order.id === id);
        
        if (orderIndex === -1) {
          reject(new Error('Order not found'));
          return;
        }
        
        // Update the order status
        orders[orderIndex] = { 
          ...orders[orderIndex], 
          status: 'cancelled', 
          updatedAt: new Date().toISOString() 
        };
        
        // Save updated orders to sessionStorage
        sessionStorage.setItem('orders', JSON.stringify(orders));
        
        // Resolve immediately to avoid UI freeze
        resolve();
      } catch (error) {
        console.error("Error in cancelOrder:", error);
        reject(error);
      }
    }, 50); // Very short delay for immediate response
  });
};
