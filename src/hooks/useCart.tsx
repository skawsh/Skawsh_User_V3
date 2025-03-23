
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { CartItem } from '@/types/serviceTypes';

interface UseCartReturn {
  cartItems: CartItem[];
  dominantWashType: string | null;
  specialInstructions: string;
  discountApplied: boolean;
  discountPercentage: number;
  showCouponCelebration: boolean;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  handleQuantityChange: (id: string, newQuantity: number) => void;
  handleRemoveItem: (id: string) => void;
  handleCouponApplied: (percentage: number) => void;
  handleCouponCelebrationComplete: () => void;
  setSpecialInstructions: (instructions: string) => void;
  handleClearCart: () => void;
  handlePlaceOrder: (studioId: string | null, address: string) => void;
}

export const useCart = (studioId: string | null, navigate: any): UseCartReturn => {
  const { toast } = useToast();
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCouponCelebration, setShowCouponCelebration] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [dominantWashType, setDominantWashType] = useState<string | null>(null);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
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
        
        setDominantWashType(dominantType);
        setCartItems(categorizedItems);
        console.log('Cart items loaded:', categorizedItems);
      } catch (error) {
        console.error('Error parsing cart items:', error);
        setCartItems([]);
      }
    }
  }, [studioId]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => 
      item.serviceId === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    toast({
      title: "Quantity updated",
      description: "Your cart has been updated.",
      duration: 2000,
    });
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.serviceId !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    
    // Dispatch custom event for components listening to cart updates
    document.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your sack.",
      duration: 2000,
    });
  };

  const handleCouponApplied = (percentage: number) => {
    setDiscountPercentage(percentage);
    setDiscountApplied(true);
    setShowCouponCelebration(true);
  };

  const handleCouponCelebrationComplete = () => {
    setShowCouponCelebration(false);
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your sack?")) {
      setCartItems([]);
      localStorage.setItem('cartItems', JSON.stringify([]));
      
      // Dispatch custom event for components listening to cart updates
      document.dispatchEvent(new Event('cartUpdated'));
      
      toast({
        title: "Sack cleared",
        description: "All items have been removed from your sack.",
        duration: 2000,
      });
    }
  };

  const handlePlaceOrder = (studioId: string | null, address: string) => {
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
    
    navigate('/order-confirmation', {
      state: { orderId: orderId }
    });
  };

  // Calculate order totals
  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.price * (item.quantity || 1);
    return sum + itemPrice;
  }, 0);
  
  const deliveryFee = subtotal > 0 ? 49 : 0;
  const tax = Math.round(subtotal * 0.05); // Assuming 5% tax
  const discount = discountApplied ? Math.round(subtotal * (discountPercentage / 100)) : 0;
  const total = subtotal + deliveryFee + tax - discount;

  return {
    cartItems,
    dominantWashType,
    specialInstructions,
    discountApplied,
    discountPercentage,
    showCouponCelebration,
    subtotal,
    deliveryFee,
    tax,
    discount,
    total,
    handleQuantityChange,
    handleRemoveItem,
    handleCouponApplied,
    handleCouponCelebrationComplete,
    setSpecialInstructions,
    handleClearCart,
    handlePlaceOrder
  };
};
