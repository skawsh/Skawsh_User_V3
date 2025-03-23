
import React from 'react';
import { Star } from 'lucide-react';

interface OrderRatingSectionProps {
  isCompleted: boolean;
  isRatingSubmitted: boolean;
  selectedRating: number;
  onRatingClick: (rating: number) => void;
}

const OrderRatingSection: React.FC<OrderRatingSectionProps> = ({
  isCompleted,
  isRatingSubmitted,
  selectedRating,
  onRatingClick
}) => {
  if (!isCompleted) {
    return null;
  }

  return (
    <div className="mt-4 pt-3 border-t border-gray-200">
      {!isRatingSubmitted ? (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Rate this order</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star
                key={rating}
                className={`h-5 w-5 cursor-pointer transition-all duration-200 ${
                  rating <= selectedRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => onRatingClick(rating)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-green-600 font-medium">
          Thank you for your feedback!
        </div>
      )}
    </div>
  );
};

export default OrderRatingSection;
