
import { useState, useEffect } from 'react';

// Type for studio information
export interface StudioInfo {
  id: string;
  name: string;
}

// Load and process cart items
export const useCartItems = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [uniqueServiceCount, setUniqueServiceCount] = useState(0);
  const [washType, setWashType] = useState<string | null>(null);
  
  const loadCartItems = () => {
    try {
      const storedItems = localStorage.getItem('cartItems');
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        setCartItems(parsedItems);
        
        const uniqueServices = new Set();
        parsedItems.forEach((item: any) => {
          if (item.serviceId) {
            uniqueServices.add(item.serviceId);
          }
        });
        
        const dominantWashType = getDominantWashType(parsedItems);
        setWashType(dominantWashType);
        setUniqueServiceCount(uniqueServices.size);
      } else {
        setCartItems([]);
        setUniqueServiceCount(0);
        setWashType(null);
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
      setCartItems([]);
      setUniqueServiceCount(0);
      setWashType(null);
    }
  };
  
  useEffect(() => {
    loadCartItems();
    
    window.addEventListener('storage', loadCartItems);
    document.addEventListener('cartUpdated', loadCartItems);
    
    return () => {
      window.removeEventListener('storage', loadCartItems);
      document.removeEventListener('cartUpdated', loadCartItems);
    };
  }, []);
  
  return { cartItems, uniqueServiceCount, washType };
};

// Get the dominant wash type from cart items
export const getDominantWashType = (items: any[]): string | null => {
  if (items.length === 0) return null;
  
  const washTypes = new Set();
  
  items.forEach((item: any) => {
    if (item.washType) {
      washTypes.add(item.washType);
    }
  });
  
  if (washTypes.size === 0) return null;
  if (washTypes.size === 1) return Array.from(washTypes)[0] as string;
  if (washTypes.size > 1) return "both";
  
  return null;
};

// Get color for wash type
export const getWashTypeTextColor = (washType: string | null): string => {
  if (washType === "standard") {
    return "text-blue-600";
  } else if (washType === "express") {
    return "text-orange-500";
  } else if (washType === "both") {
    return "text-gray-700";
  }
  return "";
};

// Get background color for wash type
export const getWashTypeBackground = (washType: string | null): string => {
  if (washType === "standard") {
    return "bg-[#D5E7FF]";
  } else if (washType === "express") {
    return "bg-orange-50";
  } else if (washType === "both") {
    return "bg-[#E6E2DE]";
  }
  return "";
};

// Clear the cart
export const clearCart = (): void => {
  localStorage.removeItem('cartItems');
  document.dispatchEvent(new Event('cartUpdated'));
};
