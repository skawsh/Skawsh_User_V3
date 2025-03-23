
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (feedback: string) => void;
  rating: number;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  rating
}) => {
  const [feedback, setFeedback] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Reset feedback when dialog opens
  useEffect(() => {
    if (open) {
      setFeedback('');
      // Trigger animation
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSubmit = () => {
    if (feedback.trim()) {
      onSubmit(feedback);
      toast.success('Thank you for your feedback!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className={`transition-all duration-500 ${isAnimating ? 'scale-110' : ''}`}>
              Share Your Feedback
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center mb-4">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${
                  star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-center text-sm text-gray-600">
            We value your opinion! Please share your thoughts about your experience with this order.
          </p>
          
          <Textarea
            placeholder="Tell us about your experience..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[120px]"
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit} 
              disabled={!feedback.trim()}
              className="transition-opacity"
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
