
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@/utils/ordersUtils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, FileText, Star } from 'lucide-react';
import OrderDetailsHeader from '@/components/orders/OrderDetailsHeader';
import OrderSummary from '@/components/orders/OrderSummary';
import OrderMetaData from '@/components/orders/OrderMetaData';
import FeedbackDialog from '@/components/orders/FeedbackDialog';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

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

  // Check if rating was already submitted for this order
  useEffect(() => {
    if (orderId) {
      const ratedOrders = JSON.parse(localStorage.getItem('ratedOrders') || '{}');
      if (ratedOrders[orderId]) {
        setIsRatingSubmitted(true);
      }
    }
  }, [orderId]);

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderId ? getOrderById(orderId) : Promise.reject('No order ID provided'),
    enabled: !!orderId,
  });

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setShowFeedbackDialog(true);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    // Save the rating and feedback
    const ratedOrders = JSON.parse(localStorage.getItem('ratedOrders') || '{}');
    ratedOrders[orderId as string] = { rating: selectedRating, feedback, date: new Date().toISOString() };
    localStorage.setItem('ratedOrders', JSON.stringify(ratedOrders));
    
    setIsRatingSubmitted(true);
    setShowFeedbackDialog(false);
  };

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

  // Ensure services exists and is an array before passing to OrderSummary
  const orderServices = Array.isArray(order.services) ? order.services : [];
  const orderTotal = order?.totalAmount || 0;

  // Dummy phone number and address for demo purposes
  const phoneNumber = "8197733xxxx";
  const deliveryAddress = "Home(306, Prashant Hills, Hyd)";

  const handleBackClick = () => {
    navigate('/orders');
  };

  const isOrderCompleted = order.status === 'completed';

  // Rating stars component
  const RatingStars = () => (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Rate this order</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Star
              key={rating}
              className={`h-5 w-5 cursor-pointer transition-all duration-200 ${
                rating <= selectedRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => handleRatingClick(rating)}
            />
          ))}
        </div>
      </div>
    </div>
  );

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
          
          {/* Download invoice button - disabled */}
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mb-4 bg-gray-100 text-gray-500 flex items-center justify-center gap-1 border-gray-300 cursor-not-allowed opacity-75"
            disabled={true}
          >
            <FileText className="h-4 w-4" />
            <span>Download Invoice</span>
          </Button>
          
          {/* Order items section */}
          <h3 className="font-bold mb-2">Your Order</h3>
          
          <OrderSummary services={orderServices} totalAmount={orderTotal} />
          
          {/* Order meta details */}
          <OrderMetaData 
            order={order}
            phoneNumber={phoneNumber}
            deliveryAddress={deliveryAddress}
          />

          {/* Rating section for completed orders */}
          {isOrderCompleted && !isRatingSubmitted && <RatingStars />}
          
          {/* Display after rating is submitted */}
          {isOrderCompleted && isRatingSubmitted && (
            <div className="mt-4 border-t pt-4">
              <div className="text-center text-green-600 font-medium">
                Thank you for your feedback!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Dialog */}
      <FeedbackDialog 
        open={showFeedbackDialog}
        onOpenChange={setShowFeedbackDialog}
        onSubmit={handleFeedbackSubmit}
        rating={selectedRating}
      />
    </div>
  );
};

export default OrderDetails;
