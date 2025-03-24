
import React from 'react';
import { Star } from 'lucide-react';

interface StudioRatingProps {
  rating: number;
  onViewReviews: () => void;
}

const StudioRating: React.FC<StudioRatingProps> = ({
  rating,
  onViewReviews
}) => {
  return (
    <div className="flex flex-col items-end">
      <div className="bg-green-500 text-white px-2 py-0.5 rounded-md flex items-center shadow-sm">
        <Star size={14} className="fill-white text-white mr-1" />
        <span className="font-medium">{rating}</span>
      </div>
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          onViewReviews();
        }} 
        className="text-xs text-blue-600 mt-1 font-medium hover:underline"
      >
        See all reviews
      </a>
    </div>
  );
};

export default StudioRating;
