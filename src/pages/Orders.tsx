
import React, { useState, useCallback, useRef } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import OrderList from '@/components/orders/OrderList';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '@/utils/ordersUtils';
import { Loader2 } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const mainContainerRef = useRef<HTMLDivElement>(null);
  
  const { 
    data: orders = [], 
    isLoading, 
    error,
    isRefetching
  } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    refetchOnWindowFocus: false, // Prevent automatic refetch on window focus which can disrupt user
    staleTime: 5000, // 5 seconds
    refetchInterval: false, // Disable automatic refetching at intervals
  });

  const ongoingOrders = orders.filter(order => 
    order.status !== 'completed' && order.status !== 'cancelled'
  );
  
  const historyOrders = orders.filter(order => 
    order.status === 'completed' || order.status === 'cancelled'
  );

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    
    // Remove any potential focus from elements when changing tabs
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    // Move focus to the container instead
    if (mainContainerRef.current) {
      mainContainerRef.current.focus();
    }
  }, []);

  // This ensures we have a non-interactive element to focus on
  // when we need to reset focus state without getting a text cursor
  const resetFocus = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    if (mainContainerRef.current) {
      mainContainerRef.current.focus();
    }
  }, []);

  return (
    <Layout>
      {/* Main container is focusable but not in tab order */}
      <div 
        className="px-4 py-6 max-w-lg mx-auto" 
        ref={mainContainerRef}
        tabIndex={-1}
        data-testid="orders-container"
      >
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        
        <Tabs 
          defaultValue="ongoing" 
          className="w-full" 
          onValueChange={handleTabChange}
          value={activeTab}
        >
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
            <div 
              className="text-center text-red-500 p-4 rounded-lg border border-red-200 bg-red-50"
              onClick={resetFocus}
            >
              Failed to load orders. Please try again.
            </div>
          ) : (
            <>
              <TabsContent value="ongoing" className="mt-0">
                <ScrollArea 
                  className="h-[calc(100vh-200px)]" 
                  tabIndex={-1} 
                  data-avoid-focus="true"
                  onClick={resetFocus}
                >
                  {isRefetching && (
                    <div className="absolute top-2 right-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary-500" />
                    </div>
                  )}
                  <OrderList 
                    orders={ongoingOrders}
                    emptyMessage="You don't have any ongoing orders."
                  />
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                <ScrollArea 
                  className="h-[calc(100vh-200px)]" 
                  tabIndex={-1} 
                  data-avoid-focus="true"
                  onClick={resetFocus}
                >
                  {isRefetching && (
                    <div className="absolute top-2 right-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary-500" />
                    </div>
                  )}
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
      <Toaster />
    </Layout>
  );
};

export default Orders;
