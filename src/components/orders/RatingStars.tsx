
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  selectedRating: number;
  onRatingClick: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ selectedRating, onRatingClick }) => {
  return (
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
              onClick={() => onRatingClick(rating)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingStars;
