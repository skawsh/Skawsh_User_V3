
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
  
  const washTypeCounts: Record<string, number> = {};
  
  items.forEach((item: any) => {
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
  
  return dominantType;
};

// Get color for wash type
export const getWashTypeTextColor = (washType: string | null): string => {
  if (washType === "Standard Wash") {
    return "text-blue-600";
  } else if (washType === "Express Wash") {
    return "text-orange-500";
  }
  return "";
};

// Get background color for wash type
export const getWashTypeBackground = (washType: string | null): string => {
  if (washType === "Standard Wash") {
    return "bg-[#D5E7FF]";
  } else if (washType === "Express Wash") {
    return "bg-orange-50";
  }
  return "";
};

// Clear the cart
export const clearCart = (): void => {
  localStorage.removeItem('cartItems');
  document.dispatchEvent(new Event('cartUpdated'));
};
