
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import OrdersHeader from '../components/orders/OrdersHeader';
import OrderTabs from '../components/orders/OrderTabs';
import { Toaster } from "@/components/ui/toaster";

const Orders: React.FC = () => {
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

  return (
    <Layout>
      <div className="section-container bg-white min-h-screen">
        {/* Sticky header that appears when scrolled */}
        {isScrolled && (
          <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm py-3 px-4 flex items-center justify-between">
            <span className="font-medium text-gray-800">Your Orders</span>
          </div>
        )}
        
        <div className="max-w-lg mx-auto pt-4 px-4 pb-20">
          <OrdersHeader />
          <OrderTabs />
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Orders;
