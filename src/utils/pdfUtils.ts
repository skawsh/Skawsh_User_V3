
import { Order } from '@/types/order';

// Simplified placeholder function that doesn't do anything with PDFs
export const generateInvoicePDF = (order: Order): void => {
  // Just a placeholder function, we're now handling this with toast in the component
  console.log('Invoice display requested for order:', order.id);
};
