
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Layout from '../components/Layout';
import CartHeader from '@/components/cart/CartHeader';
import EmptyCart from '@/components/cart/EmptyCart';
import DeliveryAddress from '@/components/cart/DeliveryAddress';
import CartItemsList from '@/components/cart/CartItemsList';
import AddMoreServices from '@/components/cart/AddMoreServices';
import SpecialInstructions from '@/components/cart/SpecialInstructions';
import CouponSection from '@/components/cart/CouponSection';
import OrderSummaryCollapsible from '@/components/cart/OrderSummaryCollapsible';
import CartFooter from '@/components/cart/CartFooter';
import CouponCelebration from '@/components/animations/CouponCelebration';

interface CartItem {
  serviceId: string;
  serviceName: string;
  studioId: string;
  studioName?: string;
  price: number;
  quantity?: number;
  weight?: number;
  items?: {
    name: string;
    quantity: number;
  }[];
  isExpress?: boolean;
  serviceCategory?: string;
  serviceSubCategory?: string;
  washType?: string;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const studioId = location.state?.studioId || null;
  const previousPath = location.state?.previousPath || "/";
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCouponCelebration, setShowCouponCelebration] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [dominantWashType, setDominantWashType] = useState<string | null>(null);
  
  const [address, setAddress] = useState({
    street: location.state?.selectedAddress?.address || '123 Main Street, Apartment 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001'
  });

  useEffect(() => {
    if (location.state?.selectedAddress) {
      setAddress({
        ...address,
        street: location.state.selectedAddress.address
      });
    }
    
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
  }, [studioId, location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.price * (item.quantity || 1);
    return sum + itemPrice;
  }, 0);
  
  const deliveryFee = subtotal > 0 ? 49 : 0;
  const tax = Math.round(subtotal * 0.05); // Assuming 5% tax
  const discount = discountApplied ? Math.round(subtotal * (discountPercentage / 100)) : 0;
  const total = subtotal + deliveryFee + tax - discount;

  const handlePlaceOrder = () => {
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
      address: address.street
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

  return (
    <Layout>
      <div className="cart-container bg-gray-50 min-h-screen pb-20">
        <CartHeader 
          cartItemsCount={cartItems.length} 
          onClearCart={handleClearCart} 
          previousPath={previousPath}
        />
        
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="px-4 pt-3 pb-24 max-w-3xl mx-auto">
            <DeliveryAddress address={address.street} />

            <CartItemsList 
              items={cartItems}
              dominantWashType={dominantWashType}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />
            
            <AddMoreServices 
              studioId={studioId} 
              defaultStudioId={cartItems[0]?.studioId}
            />
            
            <SpecialInstructions 
              instructions={specialInstructions}
              onInstructionsChange={setSpecialInstructions}
            />
            
            <CouponSection 
              onCouponApplied={handleCouponApplied}
              discountApplied={discountApplied}
              discountPercentage={discountPercentage}
              discountAmount={discount}
            />
            
            <OrderSummaryCollapsible 
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              discount={discount}
              discountPercentage={discountPercentage}
              total={total}
              discountApplied={discountApplied}
            />
          </div>
        )}
        
        {cartItems.length > 0 && (
          <CartFooter 
            total={total}
            onPlaceOrder={handlePlaceOrder}
          />
        )}
        
        <CouponCelebration 
          isVisible={showCouponCelebration} 
          onAnimationComplete={handleCouponCelebrationComplete}
          discountPercentage={discountPercentage}
        />
      </div>
    </Layout>
  );
};

export default Cart;
