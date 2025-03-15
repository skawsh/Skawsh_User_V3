
import React from 'react';
import GlassCard from '../ui-elements/GlassCard';
import { Star, ChevronRight } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews
}) => {
  // Only show first 2 reviews in preview
  const previewReviews = reviews.slice(0, 2);
  
  return (
    <div className="my-8">
      <h2 className="text-lg font-bold mb-4">Customer Reviews</h2>
      <div className="space-y-4">
        {previewReviews.map(review => (
          <GlassCard key={review.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{review.userName}</h3>
                <div className="flex items-center gap-1 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      <button className="flex items-center text-blue-600 text-sm mt-4">
        See all reviews <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default ReviewSection;
