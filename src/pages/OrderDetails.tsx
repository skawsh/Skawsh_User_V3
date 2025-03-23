
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@/utils/ordersUtils';
import OrderDetailsHeader from '@/components/orders/OrderDetailsHeader';
import OrderDetailsLoading from '@/components/orders/OrderDetailsLoading';
import OrderDetailsError from '@/components/orders/OrderDetailsError';
import OrderDetailsContent from '@/components/orders/OrderDetailsContent';
import FeedbackDialog from '@/components/orders/FeedbackDialog';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  // Handle scroll event to show/hide sticky header
  useEffect(() => {
    const handleScroll = () => {
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
    ratedOrders[orderId as string] = { 
      rating: selectedRating, 
      feedback, 
      date: new Date().toISOString() 
    };
    localStorage.setItem('ratedOrders', JSON.stringify(ratedOrders));
    
    setIsRatingSubmitted(true);
    setShowFeedbackDialog(false);
  };

  if (isLoading) {
    return <OrderDetailsLoading />;
  }

  if (error || !order) {
    return <OrderDetailsError />;
  }

  return (
    <div className="bg-white min-h-screen relative">
      <OrderDetailsHeader 
        isHeaderSticky={isHeaderSticky}
        onBackClick={() => window.history.back()}
      />

      <OrderDetailsContent 
        order={order}
        isRatingSubmitted={isRatingSubmitted}
        selectedRating={selectedRating}
        onRatingClick={handleRatingClick}
      />

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
