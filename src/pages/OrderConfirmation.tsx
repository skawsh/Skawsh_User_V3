
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { CheckCircle2, Truck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Get order ID from location state
    const id = location.state?.orderId || null;
    setOrderId(id);
    
    // If order ID is missing, redirect to home
    if (!id) {
      navigate('/');
    }
    
    // Set animation complete after 2 seconds
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [location.state, navigate]);
  
  const handleReturnHome = () => {
    navigate('/');
  };
  
  return (
    <Layout hideFooter>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-20">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Success Animation */}
          <div className="flex justify-center mb-6 relative">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="text-green-500 w-14 h-14" />
            </div>
            
            {/* Animated rings */}
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-green-500 opacity-20 animate-ping" />
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
            
            {orderId && (
              <p className="text-sm text-gray-500 mb-6">
                Order #{orderId.substring(0, 8)}
              </p>
            )}
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start text-left">
              <Truck className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-700">
                Soon a driver will be at your doorstep to collect the items. We'll keep you updated on your order status.
              </p>
            </div>
            
            <Button 
              onClick={handleReturnHome}
              className="w-full bg-[#92E3A9] text-gray-800 hover:bg-[#83d699] font-semibold py-3"
              size="lg"
            >
              <Home className="mr-2" />
              Return to Home Page
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
