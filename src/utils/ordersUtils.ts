
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

// We're using sessionStorage to persist orders between page reloads
// Initial setup of mock data in session storage
const initializeOrders = () => {
  const existingOrders = sessionStorage.getItem('orders');
  if (!existingOrders) {
    sessionStorage.setItem('orders', JSON.stringify(mockOrders));
  }
};

// Fetch all orders
export const fetchOrders = (): Promise<Order[]> => {
  initializeOrders();
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
      resolve(orders);
    }, 500); // Simulate network delay
  });
};

// Get a single order by ID
export const getOrderById = (id: string): Promise<Order> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
      const order = orders.find((o: Order) => o.id === id);
      if (order) {
        resolve(order);
      } else {
        reject(new Error('Order not found'));
      }
    }, 300);
  });
};

// Cancel an order
export const cancelOrder = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
        const updatedOrders = orders.map((order: Order) => {
          if (order.id === id) {
            return { ...order, status: 'cancelled', updatedAt: new Date().toISOString() };
          }
          return order;
        });
        
        sessionStorage.setItem('orders', JSON.stringify(updatedOrders));
        
        // Dispatch a custom event to notify components that orders have been updated
        window.dispatchEvent(new CustomEvent('ordersUpdated'));
        
        // Add a small delay before resolving to prevent UI jank
        setTimeout(() => {
          resolve();
        }, 300);
      } catch (error) {
        reject(error);
      }
    }, 500); // Simulate network delay
  });
};

// Update the App.tsx to include the Orders route
