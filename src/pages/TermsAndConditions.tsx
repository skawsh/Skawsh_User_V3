
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const TermsAndConditions: React.FC = () => {
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
    navigate('/settings');
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
              aria-label="Go back to settings"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <span className="font-medium text-gray-800">TERMS & CONDITIONS</span>
          </div>
        )}
        
        <div className="flex items-center mb-4 pt-2">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-white/80 transition-colors flex items-center"
            aria-label="Go back to settings"
          >
            <ArrowLeft size={20} className="text-gray-700 mr-2" />
            <span className="font-medium text-gray-800">TERMS & CONDITIONS</span>
          </button>
        </div>
        
        <div className="animate-fade-in max-w-2xl mx-auto pb-20">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Terms and Conditions</h1>
            <p className="text-gray-700 mb-4">Last Updated: June 10, 2023</p>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using the Skawsh service, you agree to be bound by these Terms and Conditions. 
                  If you disagree with any part of the terms, you may not access the service.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">2. Use of the Service</h2>
                <p className="text-gray-600 leading-relaxed">
                  Skawsh provides a platform for users to book laundry and dry cleaning services. 
                  Users are responsible for maintaining the confidentiality of their account and password.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">3. Service Usage Rules</h2>
                <p className="text-gray-600 leading-relaxed">
                  You agree not to use the service for any illegal purposes or to conduct activities that violate the rights of others.
                  Skawsh reserves the right to terminate or suspend accounts for violations of these terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">4. Payment and Refunds</h2>
                <p className="text-gray-600 leading-relaxed">
                  Users agree to pay all fees and applicable taxes incurred by them or anyone using their account.
                  Refund policies are subject to the specific terms of each laundry service provider on our platform.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">5. Modifications to the Service</h2>
                <p className="text-gray-600 leading-relaxed">
                  Skawsh reserves the right to modify or discontinue the service at any time without notice.
                  We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
