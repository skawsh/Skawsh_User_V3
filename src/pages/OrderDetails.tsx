
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@/utils/ordersUtils';
import OrderDetailsHeader from '@/components/orders/OrderDetailsHeader';
import OrderDetailsLoading from '@/components/orders/OrderDetailsLoading';
import OrderDetailsError from '@/components/orders/OrderDetailsError';
import OrderDetailsContent from '@/components/orders/OrderDetailsContent';
import FeedbackDialog from '@/components/orders/FeedbackDialog';
import { useRatingSystem } from '@/hooks/useRatingSystem';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  // Extract rating logic to a custom hook
  const { selectedRating, isRatingSubmitted, handleRatingClick, handleFeedbackSubmit, showFeedbackDialog, setShowFeedbackDialog } = 
    useRatingSystem(orderId);

  // Handle scroll event to show/hide sticky header
  useEffect(() => {
    const handleScroll = () => {
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
