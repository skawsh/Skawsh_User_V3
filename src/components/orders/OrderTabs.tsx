
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import OrderCard from './OrderCard';

interface Order {
  id: string;
  studioName: string;
  studioLogo: string;
  amount: number;
  status: 'ongoing' | 'completed';
}

interface OrderTabsProps {
  ongoingOrders: Order[];
  completedOrders: Order[];
  isSpecialCode: boolean;
  onCancelOrder: (orderId: string) => void;
}

const OrderTabs: React.FC<OrderTabsProps> = ({ 
  ongoingOrders, 
  completedOrders, 
  isSpecialCode, 
  onCancelOrder 
}) => {
  return (
    <Tabs defaultValue="ongoing" className="w-full">
      <TabsList className="w-full grid grid-cols-2 mb-4">
        <TabsTrigger 
          value="ongoing" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-500 rounded-none bg-transparent hover:bg-transparent"
        >
          Ongoing Orders
        </TabsTrigger>
        <TabsTrigger 
          value="history" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-500 rounded-none bg-transparent hover:bg-transparent"
        >
          History
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="ongoing" className="space-y-3 mt-0">
        {ongoingOrders.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No ongoing orders</p>
          </div>
        ) : (
          ongoingOrders.map(order => (
            <OrderCard 
              key={order.id} 
              id={order.id} 
              studioName={order.studioName} 
              studioLogo={order.studioLogo} 
              isSpecialCode={isSpecialCode} 
              onCancelOrder={onCancelOrder}
            />
          ))
        )}
      </TabsContent>
      
      <TabsContent value="history" className="space-y-3 mt-0">
        {completedOrders.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No order history</p>
          </div>
        ) : (
          completedOrders.map(order => (
            <OrderCard 
              key={order.id} 
              id={order.id}
              studioName={order.studioName} 
              studioLogo={order.studioLogo} 
              isCompleted 
              isSpecialCode={isSpecialCode}
              onCancelOrder={onCancelOrder} 
            />
          ))
        )}
      </TabsContent>
    </Tabs>
  );
};

export default OrderTabs;
