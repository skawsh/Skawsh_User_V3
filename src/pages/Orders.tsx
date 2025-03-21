
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { Order, getOrdersByStatus } from '@/utils/ordersUtils';
import OrderCard from '../components/orders/OrderCard';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'history'>('ongoing');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    // Get orders based on active tab
    const status = activeTab === 'ongoing' 
      ? ['pending', 'confirmed', 'in-progress'] 
      : ['completed', 'cancelled'];
    
    let filteredOrders: Order[] = [];
    status.forEach(stat => {
      filteredOrders = [...filteredOrders, ...getOrdersByStatus(stat as any)];
    });
    
    // Apply search filter if provided
    if (searchTerm.trim()) {
      filteredOrders = filteredOrders.filter(order => 
        order.studioName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setOrders(filteredOrders);
    
    // Listen for order updates
    const handleOrdersUpdated = () => {
      // Re-fetch orders when update event is triggered
      let updatedOrders: Order[] = [];
      status.forEach(stat => {
        updatedOrders = [...updatedOrders, ...getOrdersByStatus(stat as any)];
      });
      
      if (searchTerm.trim()) {
        updatedOrders = updatedOrders.filter(order => 
          order.studioName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some(item => item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      setOrders(updatedOrders);
    };
    
    document.addEventListener('ordersUpdated', handleOrdersUpdated);
    return () => {
      document.removeEventListener('ordersUpdated', handleOrdersUpdated);
    };
  }, [activeTab, searchTerm]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="flex items-center p-4">
            <button 
              onClick={handleBack}
              className="mr-2"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-center flex-1">Your Orders</h1>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="p-4">
          <div className="relative rounded-lg border border-gray-300">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search by Studio or Services"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`flex-1 py-3 px-4 text-center font-medium relative ${
                activeTab === 'ongoing' ? 'text-primary-500' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('ongoing')}
            >
              Ongoing Orders
              {activeTab === 'ongoing' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500"></div>
              )}
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-medium relative ${
                activeTab === 'history' ? 'text-primary-500' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('history')}
            >
              History
              {activeTab === 'history' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500"></div>
              )}
            </button>
          </div>
        </div>
        
        {/* Orders list */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-10 px-4 text-center">
              <p className="text-gray-500">
                {activeTab === 'ongoing' 
                  ? 'You have no ongoing orders' 
                  : 'Your order history is empty'}
              </p>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Orders;
