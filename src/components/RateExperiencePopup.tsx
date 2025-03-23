
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface RateExperiencePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const RateExperiencePopup: React.FC<RateExperiencePopupProps> = ({
  isOpen,
  onClose
}) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleMouseEnter = (starIndex: number) => {
    setHoveredRating(starIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = () => {
    // Here you would typically send the rating and feedback to your backend
    console.log("Submitting rating:", rating, "and feedback:", feedback);
    
    toast.success("Thank you for your feedback!");
    onClose();
  };

  const renderStar = (starIndex: number) => {
    const isFilled = (hoveredRating || rating) >= starIndex;
    
    return (
      <div
        key={starIndex}
        className="cursor-pointer transition-transform hover:scale-110"
        onClick={() => handleRatingClick(starIndex)}
        onMouseEnter={() => handleMouseEnter(starIndex)}
        onMouseLeave={handleMouseLeave}
      >
        <Star
          size={32}
          className={`${isFilled ? 'fill-blue-500 text-blue-500' : 'text-blue-500'}`}
        />
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-6 w-[90%] max-w-[400px] mx-auto shadow-lg animate-slide-in">
        <div className="absolute top-3 right-3">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-medium text-sm underline"
          >
            Skip
          </button>
        </div>
        
        <div className="flex flex-col items-center mt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Rate Your Experience</h2>
          
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map(starIndex => renderStar(starIndex))}
          </div>
          
          <div className="w-full mb-4">
            <p className="text-gray-800 font-medium mb-2">Give us your valuable Feedback</p>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter the text..."
              className="border-2 border-blue-900/20 rounded-md focus:border-blue-500"
            />
          </div>
          
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-8 rounded-md shadow-md hover:shadow-lg transform transition-all duration-200 w-[120px]"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RateExperiencePopup;
