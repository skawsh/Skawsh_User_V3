
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProfileInfo from '../components/profile/ProfileInfo';
import { ArrowLeft, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FooterSignature from '../components/FooterSignature';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleBack = () => {
    // Navigate to homepage instead of going back
    navigate('/');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleLogout = () => {
    // Clear any user session data from storage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userProfile');
    localStorage.removeItem('authToken');
    
    // Redirect to the index page which has signup/login options
    navigate('/index');
  };

  return (
    <Layout hideFooter={true}>
      <div className="section-container bg-gradient-to-b from-primary-50 to-white min-h-screen">
        {/* Sticky header that appears when scrolled */}
        {isScrolled && (
          <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm py-2 px-4 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={handleBack}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-3"
                aria-label="Go back to homepage"
              >
                <ArrowLeft size={20} className="text-gray-700" />
              </button>
              <span className="font-medium text-gray-800">Your Profile</span>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={handleSettings}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Settings"
              >
                <Settings size={20} className="text-gray-700" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center"
                aria-label="Logout"
              >
                <LogOut size={20} className="text-gray-700" />
              </button>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4 pt-2">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-white/80 transition-colors"
            aria-label="Go back to homepage"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleSettings}
              className="p-2 rounded-full hover:bg-white/80 transition-colors"
              aria-label="Settings"
            >
              <Settings size={20} className="text-primary-500" />
            </button>
            <button 
              onClick={handleLogout}
              className="text-primary-500 hover:text-primary-600 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="pb-12">
          <ProfileInfo />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
