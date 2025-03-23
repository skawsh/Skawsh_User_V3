
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Star, ChevronLeft, ThumbsUp } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const StudioReviews: React.FC = () => {
  const navigate = useNavigate();
  const { studioId } = useParams<{ studioId: string }>();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Convert studioId (dash-case) to display name (Title Case)
  const studioName = studioId
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Studio';
  
  // Track scroll position to apply sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Sample reviews data
  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Rahul Singh',
      userAvatar: '',
      rating: 5,
      comment: 'Great service! My clothes came back spotless and perfectly pressed. The delivery was also on time. Will definitely use again.',
      date: '2 days ago',
      helpful: 12
    },
    {
      id: '2',
      userName: 'Priya Patel',
      userAvatar: '',
      rating: 4,
      comment: 'Very satisfied with the quality of service. Quick turnaround and good customer service. Lost one star because the delivery was a bit delayed.',
      date: '1 week ago',
      helpful: 8
    },
    {
      id: '3',
      userName: 'Amit Kumar',
      userAvatar: '',
      rating: 5,
      comment: 'Excellent experience! The staff was very professional and my laundry was handled with care. Highly recommend!',
      date: '2 weeks ago',
      helpful: 15
    },
    {
      id: '4',
      userName: 'Neha Sharma',
      userAvatar: '',
      rating: 3,
      comment: 'Decent service. The quality of cleaning was good but the pickup was delayed. Hope they improve their timing.',
      date: '3 weeks ago',
      helpful: 5
    },
    {
      id: '5',
      userName: 'Vijay Reddy',
      userAvatar: '',
      rating: 5,
      comment: 'Best laundry service in the area! They handle delicate fabrics very well and maintain the color integrity. Worth every rupee.',
      date: '1 month ago',
      helpful: 20
    }
  ];
  
  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  // Count rating distribution
  const ratingCounts = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {} as Record<number, number>);
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <div className={`sticky top-0 z-10 bg-white shadow-sm transition-all duration-200 ${isScrolled ? 'shadow-md' : ''}`}>
          <div className="flex items-center p-4">
            <button onClick={handleBackClick} className="mr-3">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">{studioName} Reviews</h1>
          </div>
        </div>
        
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
              <div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      size={18} 
                      className={star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <div className="text-gray-500 text-sm">{reviews.length} reviews</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center gap-2">
                <div className="w-10 text-sm text-right">{rating} ★</div>
                <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-yellow-400 h-full rounded-full" 
                    style={{ width: `${((ratingCounts[rating] || 0) / reviews.length) * 100}%` }}
                  ></div>
                </div>
                <div className="w-8 text-sm text-gray-500">{ratingCounts[rating] || 0}</div>
              </div>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-6">
            {reviews.map(review => (
              <Card key={review.id} className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                        {review.userAvatar && <AvatarImage src={review.userAvatar} alt={review.userName} />}
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{review.userName}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star} 
                                size={14} 
                                className={star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-gray-700">{review.comment}</p>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-blue-500">
                      <ThumbsUp size={16} />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudioReviews;
