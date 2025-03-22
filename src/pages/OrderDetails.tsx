
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@/utils/ordersUtils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

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
          onClick={() => navigate(-1)}
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

  return (
    <div className="bg-white min-h-screen relative">
      {/* Sticky header that appears on scroll */}
      {isHeaderSticky && (
        <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
          <div className="max-w-md mx-auto flex justify-between items-center p-4">
            <Button 
              variant="ghost" 
              className="p-0 h-8" 
              onClick={() => navigate(-1)}
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
        </div>
      )}

      <div className="max-w-md mx-auto bg-white p-4">
        {/* Header with back button and support link */}
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="ghost" 
            className="p-0 h-8" 
            onClick={() => navigate(-1)}
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
          
          {/* Download invoice button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mb-4 bg-gray-100 text-gray-800 flex items-center justify-center gap-1 border-gray-300"
          >
            <FileText className="h-4 w-4" />
            <span>Download Invoice</span>
          </Button>
          
          {/* Removed the delivery status text as requested */}
          
          {/* Order items section */}
          <h3 className="font-bold mb-2">Your Order</h3>
          
          {/* Group services by category */}
          <div className="mb-4">
            <div className="mb-3">
              <h4 className="font-semibold">Core Laundry Service</h4>
              <div className="ml-2">
                <div className="flex justify-between text-sm mb-1">
                  <div>
                    <span>1) Wash & Fold</span>
                    <div className="text-gray-600 text-xs ml-4">4.3 Kg X ₹49</div>
                  </div>
                  <div>₹210.7</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span>2) Wash & Iron</span>
                    <div className="text-gray-600 text-xs ml-4">2 Kg X ₹79</div>
                  </div>
                  <div>₹158</div>
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="font-semibold">Dry Cleaning</h4>
              <div className="ml-2">
                <div className="flex justify-between text-sm mb-1">
                  <div>
                    <span>Upper Wear</span>
                    <div className="text-gray-600 text-xs ml-4">1 Leather jacket X ₹199</div>
                  </div>
                  <div>₹199</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span>&nbsp;</span>
                    <div className="text-gray-600 text-xs ml-4">2 Designer Saree X ₹499</div>
                  </div>
                  <div>₹499</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Price summary */}
          <div className="border-t border-gray-200 pt-2 mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Service Total</span>
              <span>₹1066</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Delivery Charges</span>
              <span>₹50</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>GST</span>
              <span>₹194.38</span>
            </div>
          </div>
          
          {/* Grand total */}
          <div className="bg-green-50 -mx-4 px-4 py-2 font-bold flex justify-between">
            <span>Grand Total</span>
            <span>₹1310.38</span>
          </div>
          
          {/* Order meta details */}
          <div className="mt-4">
            <h3 className="font-bold mb-1">Order Details</h3>
            <div className="text-sm space-y-1">
              <div className="flex">
                <span className="w-36 text-gray-600">Order Number:</span>
                <span>{orderNumber}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600">Payment mode:</span>
                <span>Using UPI (₹1310)</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600">Date:</span>
                <span>22/03/2025 at 03:40 PM</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600">Phone Number:</span>
                <span>{phoneNumber}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600">Deliver To:</span>
                <span>{deliveryAddress}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
