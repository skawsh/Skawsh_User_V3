
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

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  // Only show first 2 reviews in preview
  const previewReviews = reviews.slice(0, 2);
  
  return (
    <div className="mt-8 mb-20 animate-fade-in animate-stagger-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Customer Reviews</h2>
        <button className="text-primary-500 text-sm font-medium flex items-center">
          See all <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="space-y-4">
        {previewReviews.map((review) => (
          <GlassCard key={review.id} className="p-4" interactive={false}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">{review.userName}</h3>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="flex my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
