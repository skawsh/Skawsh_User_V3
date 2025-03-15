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
  return;
};
export default ReviewSection;