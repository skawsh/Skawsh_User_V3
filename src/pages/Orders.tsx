
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import OrdersHeader from '../components/orders/OrdersHeader';
import OrderTabs from '../components/orders/OrderTabs';
import { useOrders } from '../utils/ordersUtils';

const OrdersPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSpecialCode, setIsSpecialCode] = useState(false);
  const { orders, handleCancelOrder } = useOrders();

  // Check for special code in localStorage
  useEffect(() => {
    const specialCode = localStorage.getItem('specialCode');
    if (specialCode === 'true') {
      setIsSpecialCode(true);
    }
  }, []);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clean up localStorage when component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem('specialCode');
    };
  }, []);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery === '27102002') {
      setIsSpecialCode(true);
      localStorage.setItem('specialCode', 'true');
    }
  };

  // Handle order cancellation - just pass through to the utility function
  const onCancelOrder = (orderId: string) => {
    handleCancelOrder(orderId);
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => 
    order.studioName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate ongoing and completed orders
  const ongoingOrders = filteredOrders.filter(order => order.status === 'ongoing');
  const completedOrders = filteredOrders.filter(order => order.status === 'completed');

  return (
    <Layout>
      <div className="section-container bg-gradient-to-b from-primary-50 to-white min-h-screen">
        <OrdersHeader
          isScrolled={isScrolled}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
        
        <OrderTabs
          ongoingOrders={ongoingOrders}
          completedOrders={completedOrders}
          isSpecialCode={isSpecialCode}
          onCancelOrder={onCancelOrder}
        />
      </div>
    </Layout>
  );
};

export default OrdersPage;
