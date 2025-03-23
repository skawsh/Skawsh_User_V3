
import { useState, useEffect } from 'react';

export const useRatingSystem = (orderId?: string) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  // Check if rating was already submitted for this order
  useEffect(() => {
    if (orderId) {
      const ratedOrders = JSON.parse(localStorage.getItem('ratedOrders') || '{}');
      if (ratedOrders[orderId]) {
        setIsRatingSubmitted(true);
      }
    }
  }, [orderId]);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setShowFeedbackDialog(true);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    if (!orderId) return;
    
    // Save the rating and feedback
    const ratedOrders = JSON.parse(localStorage.getItem('ratedOrders') || '{}');
    ratedOrders[orderId] = { 
      rating: selectedRating, 
      feedback, 
      date: new Date().toISOString() 
    };
    localStorage.setItem('ratedOrders', JSON.stringify(ratedOrders));
    
    setIsRatingSubmitted(true);
    setShowFeedbackDialog(false);
  };

  return {
    selectedRating,
    setSelectedRating,
    showFeedbackDialog,
    setShowFeedbackDialog,
    isRatingSubmitted,
    handleRatingClick,
    handleFeedbackSubmit
  };
};
