
import { Service, CartItem } from '@/types/serviceTypes';
import { formatDecimal } from './formatUtils';

/**
 * Add an item to the cart
 */
export const addToCart = (
  orderDetails: any,
  cartItems: CartItem[],
  studioId: string = '1',
  selectedTab: string
): CartItem[] => {
  const roundedWeight = orderDetails.weight ? formatDecimal(orderDetails.weight) : 0;
  
  const existingItemIndex = cartItems.findIndex(item => item.serviceId === orderDetails.serviceId);
  
  const updatedOrderDetails = {
    ...orderDetails,
    washType: selectedTab
  };
  
  let updatedItems;
  if (existingItemIndex >= 0) {
    const newItems = [...cartItems];
    newItems[existingItemIndex] = {
      serviceId: updatedOrderDetails.serviceId,
      serviceName: updatedOrderDetails.serviceName,
      weight: roundedWeight,
      price: Math.round(updatedOrderDetails.price * 100) / 100,
      quantity: updatedOrderDetails.quantity,
      studioId: studioId,
      items: updatedOrderDetails.items,
      washType: updatedOrderDetails.washType
    };
    updatedItems = newItems;
  } else {
    updatedItems = [...cartItems, {
      serviceId: updatedOrderDetails.serviceId,
      serviceName: updatedOrderDetails.serviceName,
      weight: roundedWeight,
      price: Math.round(updatedOrderDetails.price * 100) / 100,
      quantity: updatedOrderDetails.quantity,
      studioId: studioId,
      items: updatedOrderDetails.items,
      washType: updatedOrderDetails.washType
    }];
  }
  
  localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  // Dispatch event for components listening to cart updates
  document.dispatchEvent(new Event('cartUpdated'));
  return updatedItems;
};

/**
 * Get the wash type of existing cart items
 */
export const getExistingWashType = (cartItems: CartItem[]): string | null => {
  if (cartItems.length === 0) return null;
  
  const expressItemExists = cartItems.some(item => {
    return item.washType === "express";
  });
  
  return expressItemExists ? "express" : "standard";
};

/**
 * Get the weight of a specific service in the cart
 */
export const getServiceWeight = (serviceId: string, cartItems: CartItem[]): number | null => {
  const item = cartItems.find(item => item.serviceId === serviceId);
  return item ? item.weight : null;
};

/**
 * Get the quantity of a specific service in the cart
 */
export const getServiceQuantity = (serviceId: string, cartItems: CartItem[]): number | null => {
  const item = cartItems.find(item => item.serviceId === serviceId);
  return item && item.quantity ? item.quantity : null;
};

/**
 * Remove a service from the cart
 */
export const removeServiceFromCart = (serviceId: string, cartItems: CartItem[]): CartItem[] => {
  const updatedItems = cartItems.filter(item => item.serviceId !== serviceId);
  localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  // Dispatch event for components listening to cart updates
  document.dispatchEvent(new Event('cartUpdated'));
  return updatedItems;
};

/**
 * Check if a service exists in the cart
 */
export const serviceExistsInCart = (serviceId: string, cartItems: CartItem[]): boolean => {
  return cartItems.some(item => item.serviceId === serviceId);
};

/**
 * Create service order details for cart
 */
export const createServiceOrderDetails = (
  service: Service, 
  quantity: number, 
  weight: number | null = null,
  isExpress: boolean = false,
  studioId: string = '1'
): any => {
  const basePrice = service.price;
  const price = isExpress ? basePrice * 1.5 : basePrice;
  
  if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
    return {
      serviceId: service.id,
      serviceName: service.name,
      weight: weight || 1,
      price: price * (weight || 1),
      studioId: studioId,
      items: []
    };
  } else {
    return {
      serviceId: service.id,
      serviceName: service.name,
      quantity: quantity,
      price: price * quantity,
      studioId: studioId,
      items: []
    };
  }
};
