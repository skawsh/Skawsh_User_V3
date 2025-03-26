import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import RateExperiencePopup from '@/components/RateExperiencePopup';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const Index = () => {
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  useEffect(() => {
    // Check if we should show the rating popup from localStorage instead of sessionStorage
    const shouldShowPopup = localStorage.getItem('showRatingPopup') === 'true';
    if (shouldShowPopup) {
      // Set a slight delay to ensure the page has loaded first
      const timer = setTimeout(() => {
        setShowRatingPopup(true);
        // Remove the flag so the popup doesn't show again on refresh
        localStorage.removeItem('showRatingPopup');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);
  const handleCloseRatingPopup = () => {
    setShowRatingPopup(false);
  };
  return <Layout hideFooter={true}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="mb-12 text-center">
          <img src="/lovable-uploads/f9c8201e-220e-43f1-b1c4-b0fbbdd0fc7a.png" alt="Skawsh Logo" className="w-52 h-auto mx-auto" />
          <h1 className="text-4xl font-bold mt-8 mb-4 text-primary-500">Welcome to Skawsh</h1>
          <p className="text-xl text-gray-600 mb-8">Your one-stop solution for laundry and cleaning services</p>
        </div>
        
        <div className="flex flex-col space-y-4 w-full max-w-xs">
          <Link to="/login">
            <Button variant="default" className="w-full bg-primary-500 hover:bg-primary-600 text-lg py-6">
              Login
            </Button>
          </Link>
          
          <Link to="/signup">
            <Button variant="outline" className="w-full border-primary-500 text-primary-500 hover:bg-primary-50 text-lg py-6">
              Sign Up
            </Button>
          </Link>
          
          <Link to="/" className="text-center mt-4">
            <Button variant="ghost" className="text-gray-500 hover:text-primary-500">
              Explore as Guest
            </Button>
          </Link>
        </div>

      </div>

      {/* Rating Experience Popup */}
      <RateExperiencePopup isOpen={showRatingPopup} onClose={handleCloseRatingPopup} />
    </Layout>;
};
export default Index;