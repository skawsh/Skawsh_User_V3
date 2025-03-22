
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@/utils/ordersUtils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, FileText, AlertTriangle } from 'lucide-react';
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

  // Format the order date
  const orderDate = new Date(order.createdAt);
  const formattedDate = `${orderDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  })}, ${orderDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })}`;
  
  // Format order number
  const orderNumber = `ORD-1002`;

  // Dummy phone number and address for demo purposes
  const phoneNumber = "8197733XXX2";
  const deliveryAddress = "Home(306, Prashant Hills, Hyd)";

  const handleBackClick = () => {
    navigate('/orders');
  };

  return (
    <div className="bg-white min-h-screen relative">
      <OrderDetailsHeader 
        isHeaderSticky={isHeaderSticky}
        onBackClick={handleBackClick}
      />

      <div className="max-w-md mx-auto bg-white p-0">
        {/* Header with back button and support link */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <Button 
            variant="ghost" 
            className="p-0 h-8" 
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-5 w-5 mr-1" /> 
            <span className="font-semibold">Order Details</span>
          </Button>
          <Button 
            variant="link" 
            className="text-red-500 p-0 h-8" 
            onClick={() => navigate('/support')}
          >
            Support
          </Button>
        </div>

        {/* Order details content */}
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-xl font-bold">{order.studioName}</h2>
          <p className="text-sm text-gray-600">Khajaguda, Rai Durgam, HYD</p>
        </div>

        <div className="border-b border-gray-200 p-4">
          <p className="text-sm">Ordered on {formattedDate}</p>
        </div>

        {/* Order items section */}
        <div className="p-4">
          <h3 className="font-bold mb-3">Your Order</h3>
          
          <OrderSummary />
          
          {/* Warning message */}
          <div className="bg-yellow-50 p-3 my-4 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700">
              Price may vary depending on the weight and clothing items during pickup of your order.
            </p>
          </div>
          
          {/* Order meta details */}
          <div className="mt-4">
            <h3 className="font-bold mb-3">Order Details</h3>
            <OrderMetaData 
              orderNumber={orderNumber}
              phoneNumber={phoneNumber}
              deliveryAddress={deliveryAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
