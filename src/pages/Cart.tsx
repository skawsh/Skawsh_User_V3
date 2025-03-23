
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { useCart } from '@/hooks/useCart';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const studioId = location.state?.studioId || null;
  const previousPath = location.state?.previousPath || "/";
  
  const [address, setAddress] = useState({
    street: location.state?.selectedAddress?.address || '123 Main Street, Apartment 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001'
  });

  const {
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
  } = useCart(studioId, navigate);

  useEffect(() => {
    if (location.state?.selectedAddress) {
      setAddress({
        ...address,
        street: location.state.selectedAddress.address
      });
    }
  }, [location.state?.selectedAddress]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            onPlaceOrder={() => handlePlaceOrder(studioId, address.street)}
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
