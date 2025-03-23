
/**
 * Utility functions for cart actions
 */

import { CartItem } from '@/types/serviceTypes';
import { toast } from "@/components/ui/use-toast";

/**
 * Update quantity of an item in the cart
 */
export const updateItemQuantity = (id: string, newQuantity: number, cartItems: CartItem[]): CartItem[] => {
  // For weight-based items, allow quantities as low as 0.1, for others, minimum is 1
  const isWeightBased = cartItems.some(item => item.serviceId === id && item.weight !== undefined);
  
  if ((isWeightBased && newQuantity < 0.1) || (!isWeightBased && newQuantity < 1)) {
    // Instead of returning unmodified items, remove the item if quantity is too low
    return removeItem(id, cartItems);
  }
  
  const updatedItems = cartItems.map(item => {
    if (item.serviceId === id) {
      if (isWeightBased) {
        return { ...item, weight: newQuantity };
      } else {
        return { ...item, quantity: newQuantity };
      }
    }
    return item;
  });
  
  localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  
  // Dispatch custom event for components listening to cart updates
  document.dispatchEvent(new Event('cartUpdated'));
  
  return updatedItems;
};

/**
 * Remove an item from the cart
 */
export const removeItem = (id: string, cartItems: CartItem[]): CartItem[] => {
  const updatedItems = cartItems.filter(item => item.serviceId !== id);
  localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  
  // Dispatch custom event for components listening to cart updates
  document.dispatchEvent(new Event('cartUpdated'));
  
  return updatedItems;
};

/**
 * Clear all items from the cart
 */
export const clearCart = (): CartItem[] => {
  localStorage.setItem('cartItems', JSON.stringify([]));
  
  // Dispatch custom event for components listening to cart updates
  document.dispatchEvent(new Event('cartUpdated'));
  
  return [];
};

/**
 * Create an order from cart items
 */
export const createOrder = (
  cartItems: CartItem[], 
  studioId: string | null, 
  address: string, 
  specialInstructions: string,
  subtotal: number,
  deliveryFee: number, 
  tax: number
): string => {
  const orderId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  const newOrder = {
    id: orderId,
    studioId: studioId || cartItems[0]?.studioId || "default-studio",
    studioName: cartItems[0]?.studioName || "Laundry Service",
    items: cartItems.map(item => ({
      serviceId: item.serviceId,
      serviceName: item.serviceName,
      price: item.price,
      quantity: item.quantity || 1
    })),
    status: "pending_payment",
    paymentStatus: "unpaid",
    totalAmount: subtotal + deliveryFee + tax,
    createdAt: new Date().toISOString(),
    specialInstructions: specialInstructions,
    address: address
  };
  
  const existingOrders = JSON.parse(sessionStorage.getItem('orders') || '[]');
  existingOrders.push(newOrder);
  sessionStorage.setItem('orders', JSON.stringify(existingOrders));
  
  localStorage.setItem('cartItems', JSON.stringify([]));
  
  document.dispatchEvent(new Event('cartUpdated'));
  
  // Show success toast notification using the correct format
  toast({
    title: "Order Placed Successfully!",
    description: `Your order #${orderId.substring(0, 8)} has been placed.`,
    duration: 5000,
  });
  
  return orderId;
};
