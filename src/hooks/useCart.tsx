
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { CartItem } from '@/types/serviceTypes';
import { loadCartItems } from '@/utils/cartStateUtils';
import { updateItemQuantity, removeItem, clearCart, createOrder } from '@/utils/cartActionUtils';
import { 
  calculateSubtotal, 
  calculateDeliveryFee, 
  calculateTax, 
  calculateDiscount, 
  calculateTotal 
} from '@/utils/cartCalculationUtils';

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
    const { cartItems: loadedItems, dominantWashType: loadedWashType } = loadCartItems(studioId);
    setCartItems(loadedItems);
    setDominantWashType(loadedWashType);
  }, [studioId]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    const updatedItems = updateItemQuantity(id, newQuantity, cartItems);
    setCartItems(updatedItems);
    
    toast({
      title: "Quantity updated",
      description: "Your cart has been updated.",
      duration: 2000,
    });
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = removeItem(id, cartItems);
    setCartItems(updatedItems);
    
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
      setCartItems(clearCart());
      
      toast({
        title: "Sack cleared",
        description: "All items have been removed from your sack.",
        duration: 2000,
      });
    }
  };

  const handlePlaceOrder = (studioId: string | null, address: string) => {
    const orderId = createOrder(
      cartItems, 
      studioId, 
      address, 
      specialInstructions,
      subtotal,
      deliveryFee,
      tax
    );
    
    navigate('/order-confirmation', {
      state: { orderId: orderId }
    });
  };

  // Calculate order totals using utility functions
  const subtotal = calculateSubtotal(cartItems);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal, discountApplied, discountPercentage);
  const total = calculateTotal(subtotal, deliveryFee, tax, discount);

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
