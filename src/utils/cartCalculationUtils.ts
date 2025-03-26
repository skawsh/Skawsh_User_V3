
/**
 * Utility functions for cart calculations
 */

import { CartItem } from '@/types/serviceTypes';

/**
 * Calculate the subtotal of all items in the cart
 */
export const calculateSubtotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((sum, item) => {
    const itemPrice = item.price * (item.quantity || 1);
    return sum + itemPrice;
  }, 0);
};

/**
 * Calculate the delivery fee based on the subtotal
 */
export const calculateDeliveryFee = (subtotal: number): number => {
  return subtotal > 0 ? 49 : 0;
};

/**
 * Calculate the GST (18% of subtotal)
 */
export const calculateGST = (subtotal: number): number => {
  return Math.round(subtotal * 0.18); // 18% GST
};

/**
 * Calculate the delivery tax (5% of delivery fee)
 */
export const calculateDeliveryTax = (deliveryFee: number): number => {
  return Math.round(deliveryFee * 0.05); // 5% delivery tax
};

/**
 * Calculate the tax amount (combination of GST and delivery tax)
 */
export const calculateTax = (subtotal: number, deliveryFee: number): number => {
  const gst = calculateGST(subtotal);
  const deliveryTax = calculateDeliveryTax(deliveryFee);
  return gst + deliveryTax;
};

/**
 * Get tax breakdown details
 */
export const getTaxBreakdown = (subtotal: number, deliveryFee: number) => {
  const gst = calculateGST(subtotal);
  const deliveryTax = calculateDeliveryTax(deliveryFee);
  
  return {
    gst,
    deliveryTax,
    total: gst + deliveryTax
  };
};

/**
 * Calculate the discount amount
 */
export const calculateDiscount = (subtotal: number, discountApplied: boolean, discountPercentage: number): number => {
  return discountApplied ? Math.round(subtotal * (discountPercentage / 100)) : 0;
};

/**
 * Calculate the total amount to be paid
 */
export const calculateTotal = (subtotal: number, deliveryFee: number, tax: number, discount: number): number => {
  return subtotal + deliveryFee + tax - discount;
};
