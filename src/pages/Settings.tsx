
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SettingsContent from '../components/profile/SettingsContent';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  // Track scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <Layout hideFooter={true}>
      <div className="section-container bg-gradient-to-b from-primary-50 to-white min-h-screen">
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
            <span className="font-medium text-gray-800">SETTINGS</span>
          </div>
        )}
        
        <div className="flex items-center mb-4 pt-2">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-white/80 transition-colors flex items-center"
            aria-label="Go back to profile"
          >
            <ArrowLeft size={20} className="text-gray-700 mr-2" />
            <span className="font-medium text-gray-800">SETTINGS</span>
          </button>
        </div>
        
        <SettingsContent />
      </div>
    </Layout>
  );
};

export default Settings;
