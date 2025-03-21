
import React, { useState, useEffect } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import OrderCard from './OrderCard';
import { getOrdersByStatus, OrderStatus, Order } from '@/utils/ordersUtils';
import { Package } from 'lucide-react';

const OrderTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadOrders = () => {
    setLoading(true);
    const status = activeTab as OrderStatus | 'all';
    const fetchedOrders = getOrdersByStatus(status);
    setOrders(fetchedOrders);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
    
    // Listen for order updates
    const handleOrdersUpdated = () => {
      loadOrders();
    };
    
    document.addEventListener('ordersUpdated', handleOrdersUpdated);
    
    return () => {
      document.removeEventListener('ordersUpdated', handleOrdersUpdated);
    };
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const getTabCount = (status: OrderStatus | 'all'): number => {
    return getOrdersByStatus(status).length;
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="w-full bg-gray-50 p-1 rounded-lg mb-4 overflow-x-auto flex space-x-1">
        <TabsTrigger value="all" className="flex-1 py-2">
          All ({getTabCount('all')})
        </TabsTrigger>
        <TabsTrigger value="pending" className="flex-1 py-2">
          Pending ({getTabCount('pending')})
        </TabsTrigger>
        <TabsTrigger value="confirmed" className="flex-1 py-2">
          Confirmed ({getTabCount('confirmed')})
        </TabsTrigger>
        <TabsTrigger value="in-progress" className="flex-1 py-2">
          In Progress ({getTabCount('in-progress')})
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex-1 py-2">
          Completed ({getTabCount('completed')})
        </TabsTrigger>
        <TabsTrigger value="cancelled" className="flex-1 py-2">
          Cancelled ({getTabCount('cancelled')})
        </TabsTrigger>
      </TabsList>

      {['all', 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled'].map((status) => (
        <TabsContent key={status} value={status} className="mt-0">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <span className="text-gray-500">Loading orders...</span>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onUpdate={loadOrders}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Package size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No orders found</h3>
              <p className="text-gray-500 max-w-md">
                {activeTab === 'all' 
                  ? 'You have not placed any orders yet. Browse services and book your first experience!' 
                  : `You don't have any ${activeTab} orders at the moment.`}
              </p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default OrderTabs;
