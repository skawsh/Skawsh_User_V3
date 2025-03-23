
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const PrivacyPolicy: React.FC = () => {
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
            <span className="font-medium text-gray-800">PRIVACY POLICY</span>
          </div>
        )}
        
        <div className="flex items-center mb-4 pt-2">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-white/80 transition-colors flex items-center"
            aria-label="Go back to settings"
          >
            <ArrowLeft size={20} className="text-gray-700 mr-2" />
            <span className="font-medium text-gray-800">PRIVACY POLICY</span>
          </button>
        </div>
        
        <div className="animate-fade-in max-w-2xl mx-auto pb-20">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Privacy Policy</h1>
            <p className="text-gray-700 mb-4">Last Updated: June 10, 2023</p>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">1. Information We Collect</h2>
                <p className="text-gray-600 leading-relaxed">
                  Skawsh collects information that you provide directly to us, such as when you create an account, 
                  place an order, or contact customer support. This information includes your name, email address, 
                  phone number, delivery address, and payment information.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">2. How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our services, 
                  process transactions, send you related information, communicate with you, and personalize content.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">3. Information Sharing</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may share information with vendors, service providers, and partners who need access to such 
                  information to carry out work on our behalf. We may also share information when we believe 
                  it is necessary to comply with applicable law or protect our rights.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">4. Data Retention</h2>
                <p className="text-gray-600 leading-relaxed">
                  We retain personal information for as long as necessary to provide the services you have requested, 
                  or for other essential purposes such as complying with our legal obligations, resolving disputes, 
                  and enforcing our agreements.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">5. Your Rights</h2>
                <p className="text-gray-600 leading-relaxed">
                  You have the right to access, correct, or delete your personal data. You can update your account 
                  information or request data deletion by contacting our customer support team.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
