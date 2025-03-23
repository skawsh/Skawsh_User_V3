
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import RateExperiencePopup from '@/components/RateExperiencePopup';

const Index = () => {
  const [showRatingPopup, setShowRatingPopup] = useState(false);

  useEffect(() => {
    // Check if we should show the rating popup
    const shouldShowPopup = sessionStorage.getItem('showRatingPopup') === 'true';
    
    if (shouldShowPopup) {
      // Set a slight delay to ensure the page has loaded first
      const timer = setTimeout(() => {
        setShowRatingPopup(true);
        // Remove the flag so the popup doesn't show again on refresh
        sessionStorage.removeItem('showRatingPopup');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseRatingPopup = () => {
    setShowRatingPopup(false);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to Skawshway</h1>
          <p className="text-xl text-gray-600 mb-8">Your one-stop solution for laundry and cleaning services</p>
          <a 
            href="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Explore Services
          </a>
        </div>
      </div>

      {/* Rating Experience Popup */}
      <RateExperiencePopup
        isOpen={showRatingPopup}
        onClose={handleCloseRatingPopup}
      />
    </Layout>
  );
};

export default Index;
