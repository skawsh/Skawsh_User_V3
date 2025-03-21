
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState('satisfied');
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
      toast({
        variant: "destructive",
        title: "Feedback required",
        description: "Please enter your feedback before submitting."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for your feedback!",
        description: "We appreciate your input and will use it to improve our services."
      });
      setIsSubmitting(false);
      setMessage('');
      navigate('/profile');
    }, 1500);
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
            <RadioGroup 
              value={rating}
              onValueChange={setRating}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very_satisfied" id="r1" />
                <Label htmlFor="r1">Very Satisfied</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="satisfied" id="r2" />
                <Label htmlFor="r2">Satisfied</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="r3" />
                <Label htmlFor="r3">Neutral</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dissatisfied" id="r4" />
                <Label htmlFor="r4">Dissatisfied</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very_dissatisfied" id="r5" />
                <Label htmlFor="r5">Very Dissatisfied</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-lg font-medium text-gray-700">
              Tell us more about your experience
            </Label>
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Feedback;
