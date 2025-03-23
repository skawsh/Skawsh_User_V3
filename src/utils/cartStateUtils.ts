
/**
 * Utility functions for cart state management
 */

import { CartItem } from '@/types/serviceTypes';

/**
 * Load cart items from localStorage with category classification
 */
export const loadCartItems = (studioId: string | null): {
  cartItems: CartItem[],
  dominantWashType: string | null
} => {
  const storedCartItems = localStorage.getItem('cartItems');
  let cartItems: CartItem[] = [];
  let dominantWashType: string | null = null;
  
  if (storedCartItems) {
    try {
      const parsedItems = JSON.parse(storedCartItems);
      const filteredItems = studioId 
        ? parsedItems.filter((item: CartItem) => !studioId || item.studioId === studioId) 
        : parsedItems;

      const categorizedItems = filteredItems.map((item: CartItem) => {
        let serviceCategory = '';
        let serviceSubCategory = '';
        
        if (item.serviceId.includes('wash') || item.serviceId.includes('iron') || 
            ['1', '2', '3', '4', 'wash-iron-1'].includes(item.serviceId)) {
          serviceCategory = 'Core Laundry Services';
        } else if (item.serviceId.includes('dry-upper')) {
          serviceCategory = 'Dry Cleaning Services';
          serviceSubCategory = 'Upper Wear';
        } else if (item.serviceId.includes('dry-bottom')) {
          serviceCategory = 'Dry Cleaning Services';
          serviceSubCategory = 'Bottom Wear';
        } else if (item.serviceId.includes('dry-ethnic')) {
          serviceCategory = 'Dry Cleaning Services';
          serviceSubCategory = 'Ethnic Wear';
        } else if (item.serviceId.includes('shoe')) {
          serviceCategory = 'Shoe Laundry Services';
        } else if (['stain-protection', 'premium-detergent'].includes(item.serviceId)) {
          serviceCategory = 'Additional Services';
        }
        
        return {
          ...item,
          serviceCategory,
          serviceSubCategory,
          quantity: item.quantity || 1
        };
      });
      
      // Determine dominant wash type
      const washTypeCounts: Record<string, number> = {};
      categorizedItems.forEach(item => {
        if (item.washType) {
          washTypeCounts[item.washType] = (washTypeCounts[item.washType] || 0) + 1;
        }
      });
      
      let maxCount = 0;
      let dominantType = null;
      
      Object.entries(washTypeCounts).forEach(([type, count]) => {
        if (count > maxCount) {
          maxCount = count;
          dominantType = type;
        }
      });
      
      dominantWashType = dominantType;
      cartItems = categorizedItems;
      console.log('Cart items loaded:', categorizedItems);
    } catch (error) {
      console.error('Error parsing cart items:', error);
      cartItems = [];
    }
  }
  
  return { cartItems, dominantWashType };
};
