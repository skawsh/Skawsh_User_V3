
import React, { useState, useCallback } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import OrderList from '@/components/orders/OrderList';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '@/utils/ordersUtils';
import { Loader2 } from 'lucide-react';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  
  const { 
    data: orders = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    refetchOnWindowFocus: false,
    staleTime: 10000, // 10 seconds
  });

  const ongoingOrders = orders.filter(order => 
    order.status !== 'completed' && order.status !== 'cancelled'
  );
  
  const historyOrders = orders.filter(order => 
    order.status === 'completed' || order.status === 'cancelled'
  );

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  return (
    <Layout>
      <div className="px-4 py-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        
        <Tabs defaultValue="ongoing" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="ongoing" className="rounded-full">
              Ongoing Orders {ongoingOrders.length > 0 && `(${ongoingOrders.length})`}
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-full">
              History {historyOrders.length > 0 && `(${historyOrders.length})`}
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4 rounded-lg border border-red-200 bg-red-50">
              Failed to load orders. Please try again.
            </div>
          ) : (
            <>
              <TabsContent value="ongoing" className="mt-0">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <OrderList 
                    orders={ongoingOrders}
                    emptyMessage="You don't have any ongoing orders."
                  />
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <OrderList 
                    orders={historyOrders}
                    emptyMessage="You don't have any order history yet."
                  />
                </ScrollArea>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Orders;
