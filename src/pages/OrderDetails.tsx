
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@/utils/ordersUtils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import OrderDetailsHeader from '@/components/orders/OrderDetailsHeader';
import OrderSummary from '@/components/orders/OrderSummary';
import OrderMetaData from '@/components/orders/OrderMetaData';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  // Handle scroll event to show/hide sticky header
  useEffect(() => {
    const handleScroll = () => {
      // Check if the page has been scrolled past the header threshold
      const scrollPosition = window.scrollY;
      setIsHeaderSticky(scrollPosition > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderId ? getOrderById(orderId) : Promise.reject('No order ID provided'),
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-4 max-w-md mx-auto mt-8">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate('/orders')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card className="p-6 text-center">
          <h1 className="text-xl font-bold mb-2">Order not found</h1>
          <p className="text-gray-500">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            className="mt-4" 
            onClick={() => navigate('/orders')}
          >
            Go to Orders
          </Button>
        </Card>
      </div>
    );
  }

  // Calculate delivery date for display
  const orderDeliveryDate = new Date(order.updatedAt);
  // Dummy phone number and address for demo purposes
  const phoneNumber = "8197733xxxx";
  const deliveryAddress = "Home(306, Prashant Hills, Hyd)";
  
  // Format order number
  const orderNumber = `ORD-${order.id.substring(0, 4)}`;

  const handleBackClick = () => {
    navigate('/orders');
  };

  return (
    <div className="bg-white min-h-screen relative">
      <OrderDetailsHeader 
        isHeaderSticky={isHeaderSticky}
        onBackClick={handleBackClick}
      />

      <div className="max-w-md mx-auto bg-white p-4">
        {/* Header with back button and support link */}
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="ghost" 
            className="p-0 h-8" 
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-5 w-5 mr-1" /> 
            <span>Order Details</span>
          </Button>
          <Button 
            variant="link" 
            className="text-red-500 p-0 h-8" 
            onClick={() => navigate('/support')}
          >
            Support
          </Button>
        </div>

        {/* Order details card */}
        <div className="border border-gray-200 rounded-md p-4 mb-4">
          {/* Studio name and location */}
          <h2 className="text-lg font-bold">{order.studioName}</h2>
          <p className="text-sm text-gray-600 mb-3">Khajaguda, Rai Durgam, HYD</p>
          
          {/* Order items section */}
          <h3 className="font-bold mb-2">Your Order</h3>
          
          <OrderSummary />
          
          {/* Order meta details */}
          <OrderMetaData 
            orderNumber={orderNumber}
            phoneNumber={phoneNumber}
            deliveryAddress={deliveryAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
