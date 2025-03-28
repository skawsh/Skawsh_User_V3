
/**
 * Utility functions for cart actions
 */

import { CartItem } from '@/types/serviceTypes';
import { toast } from "sonner";
import { Order } from '@/types/order';

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
  
  // Get the correct studio name from cart items
  const studioName = cartItems[0]?.studioName || "Busy Bee";
  
  // Map cart items to order services with more detailed information
  const services = cartItems.map(item => ({
    id: item.serviceId,
    name: item.serviceName,
    price: item.price,
    quantity: item.quantity || 1,
    description: item.serviceCategory ? `${item.serviceCategory}${item.serviceSubCategory ? ' - ' + item.serviceSubCategory : ''}` : '',
    washType: item.washType || 'Regular',
    details: item.items && item.items.length > 0 ? item.items.map(subItem => `${subItem.name} x${subItem.quantity}`).join(', ') : ''
  }));
  
  const totalAmount = subtotal + deliveryFee + tax;
  
  // Create a properly formatted order object
  const newOrder: Order = {
    id: orderId,
    studioId: studioId || cartItems[0]?.studioId || "default-studio",
    studioName: studioName,
    userId: "user1", // Default user ID
    services: services,
    totalAmount: totalAmount,
    status: "pending_payment",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    paymentStatus: "pending"
  };
  
  // Get existing orders and add the new one
  const existingOrders = JSON.parse(sessionStorage.getItem('orders') || '[]');
  existingOrders.push(newOrder);
  sessionStorage.setItem('orders', JSON.stringify(existingOrders));
  
  // Clear the cart
  localStorage.setItem('cartItems', JSON.stringify([]));
  document.dispatchEvent(new Event('cartUpdated'));
  
  // Show success toast
  toast(`Order placed successfully! Your order #${orderId.substring(0, 8)} has been placed.`);
  
  return orderId;
};
