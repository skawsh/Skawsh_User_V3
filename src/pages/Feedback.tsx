
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { toast } from '../components/ui/use-toast';

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBack = () => {
    navigate('/profile');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast("Error: Feedback required. Please enter your feedback before submitting.");
      return;
    }
    
    if (rating === 0) {
      toast("Error: Please select a rating before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast("Thank you for your feedback! We appreciate your input and will use it to improve our services.");
      setIsSubmitting(false);
      setMessage('');
      navigate('/profile');
    }, 1500);
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleStarHover = (starIndex: number) => {
    setHoveredRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  return (
    <Layout hideFooter={true}>
      <div className="section-container bg-white min-h-screen">
        {/* Sticky header that appears when scrolled */}
        {isScrolled && (
          <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm py-2 px-4 flex items-center">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-3"
              aria-label="Go back to profile"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <span className="font-medium text-gray-800">Send Feedback</span>
          </div>
        )}
        
        <div className={`sticky top-0 z-10 bg-white ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-200`}>
          <div className="flex items-center mb-6 px-4 py-3">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-2"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold">Send Feedback</h1>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 px-4">
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700">How satisfied are you with Skawsh?</h2>
            
            <div className="flex justify-center py-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <div
                    key={starIndex}
                    className="cursor-pointer transition-transform hover:scale-110"
                    onClick={() => handleStarClick(starIndex)}
                    onMouseEnter={() => handleStarHover(starIndex)}
                    onMouseLeave={handleStarLeave}
                  >
                    <Star
                      size={32}
                      className={`${
                        (hoveredRating || rating) >= starIndex 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      } stroke-[1.5px]`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              {rating === 0 ? 'Select a rating' : 
               rating === 1 ? 'Very Dissatisfied' :
               rating === 2 ? 'Dissatisfied' :
               rating === 3 ? 'Neutral' :
               rating === 4 ? 'Satisfied' : 'Very Satisfied'}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="feedback" className="text-lg font-medium text-gray-700">
              Tell us more about your experience
            </label>
            <Textarea
              id="feedback"
              placeholder="Write your feedback here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-40 resize-none"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary-500 hover:bg-primary-600 text-white"
            disabled={isSubmitting || rating === 0}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Feedback;
