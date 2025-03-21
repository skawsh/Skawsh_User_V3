
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Search, ArrowLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getOrders, Order } from '@/utils/ordersUtils';
import { Toaster } from "@/components/ui/toaster";

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'history'>('ongoing');
  const [searchTerm, setSearchTerm] = useState('');
  
  const allOrders = getOrders();
  
  // Filter orders based on search term
  const filteredOrders = allOrders.filter(order => {
    if (!searchTerm) return true;
    return (
      order.studioName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => 
        item.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });
  
  // Filter orders based on tab
  const ongoingOrders = filteredOrders.filter(
    order => ['pending', 'confirmed', 'in-progress'].includes(order.status)
  );
  
  const historyOrders = filteredOrders.filter(
    order => ['completed', 'cancelled'].includes(order.status)
  );
  
  const displayedOrders = activeTab === 'ongoing' ? ongoingOrders : historyOrders;

  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <div className="max-w-md mx-auto border-x border-gray-200 min-h-screen">
          {/* Header */}
          <div className="border-b border-gray-200 p-3 flex items-center">
            <button 
              onClick={handleBack}
              className="mr-2"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold flex-1 text-center">Your Orders</h1>
            <div className="w-6"></div> {/* For balance */}
          </div>
          
          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-full"
                placeholder="Search by Studio or Services"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === 'ongoing' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('ongoing')}
            >
              Ongoing Orders
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === 'history' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>
          
          {/* Orders List */}
          <div className="p-4 space-y-4">
            {displayedOrders.length > 0 ? (
              displayedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No {activeTab} orders found.
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

// Order Card Component
const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    // Navigate to order details (could be implemented in the future)
    // For now just navigate to studio
    navigate(`/studio/${order.studioId}`);
  };
  
  const handleViewStudio = () => {
    navigate(`/studio/${order.studioId}`);
  };
  
  const calculateTotal = () => {
    return order.totalAmount;
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Studio info */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center">
          <div className="bg-gray-200 w-10 h-10 rounded-full overflow-hidden mr-3">
            {order.studioImage ? (
              <img 
                src={order.studioImage} 
                alt={order.studioName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-600">
                {order.studioName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">{order.studioName}</h3>
            <button 
              className="flex items-center text-primary-500 text-sm font-medium"
              onClick={handleViewStudio}
            >
              View menu <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex p-3 gap-3">
        <button 
          className="flex-1 text-white font-medium py-2 px-3 rounded-md bg-primary-500 shadow-sm"
          onClick={handleViewDetails}
        >
          View Details
        </button>
        {['pending', 'confirmed'].includes(order.status) && (
          <button 
            className="flex-1 text-white font-medium py-2 px-3 rounded-md bg-green-500 shadow-sm"
            onClick={() => console.log('Payment triggered for order', order.id)}
          >
            Pay Now ₹{calculateTotal()}
          </button>
        )}
      </div>
    </div>
  );
};

export default Orders;
