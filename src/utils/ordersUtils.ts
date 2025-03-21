
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
  },
  // New ongoing orders
  {
    id: 'newest-order-12345',
    studioId: '6',
    studioName: 'Royal Laundry',
    userId: 'user1',
    services: [
      { id: 's8', name: 'Delicate Wash', price: 299, quantity: 2 },
      { id: 's9', name: 'Express Service', price: 150, quantity: 1 },
    ],
    totalAmount: 748,
    status: 'pending',
    createdAt: new Date().toISOString(), // Today
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pickup-ready-54321',
    studioId: '7',
    studioName: 'QuickWash Pro',
    userId: 'user1',
    services: [
      { id: 's10', name: 'Bedsheet Cleaning', price: 399, quantity: 1 },
      { id: 's11', name: 'Curtain Wash', price: 499, quantity: 1 },
    ],
    totalAmount: 898,
    status: 'ready',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    updatedAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  },
  {
    id: 'premium-service-789',
    studioId: '8',
    studioName: 'Elite Cleaners',
    userId: 'user1',
    services: [
      { id: 's12', name: 'Suit Cleaning', price: 599, quantity: 1 },
      { id: 's13', name: 'Shoe Cleaning', price: 349, quantity: 1 },
    ],
    totalAmount: 948,
    status: 'processing',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
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
