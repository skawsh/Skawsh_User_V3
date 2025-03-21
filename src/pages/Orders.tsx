
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';
import Button from '../components/ui-elements/Button';

interface Order {
  id: string;
  studioName: string;
  studioLogo: string;
  amount: number;
  status: 'ongoing' | 'completed';
}

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Mock orders data - in a real app, you would fetch this from an API
  useEffect(() => {
    // Simulate loading orders from localStorage or an API
    const mockOrders: Order[] = [
      {
        id: '1',
        studioName: 'Busy Bee',
        studioLogo: '/lovable-uploads/5505940d-082e-454d-a2ed-2c6af892170e.png',
        amount: 296,
        status: 'ongoing'
      },
      {
        id: '2',
        studioName: 'U Clean',
        studioLogo: '/lovable-uploads/5505940d-082e-454d-a2ed-2c6af892170e.png',
        amount: 356,
        status: 'ongoing'
      },
      {
        id: '3',
        studioName: 'Quick Wash',
        studioLogo: '/lovable-uploads/5505940d-082e-454d-a2ed-2c6af892170e.png',
        amount: 420,
        status: 'completed'
      },
      {
        id: '4',
        studioName: 'Fresh Laundry',
        studioLogo: '/lovable-uploads/5505940d-082e-454d-a2ed-2c6af892170e.png',
        amount: 250,
        status: 'completed'
      }
    ];
    
    setOrders(mockOrders);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleBack = () => {
    navigate('/profile');
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => 
    order.studioName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get ongoing and completed orders
  const ongoingOrders = filteredOrders.filter(order => order.status === 'ongoing');
  const completedOrders = filteredOrders.filter(order => order.status === 'completed');

  return (
    <Layout hideFooter={true}>
      <div className="section-container bg-gradient-to-b from-primary-50 to-white min-h-screen">
        {/* Sticky header that appears when scrolled */}
        {isScrolled && (
          <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm py-2 px-4 flex items-center">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-3"
              aria-label="Go back to profile"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <span className="font-medium text-gray-800">Your Orders</span>
          </div>
        )}
        
        <div className="flex items-center mb-4 pt-2">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-white/80 transition-colors"
            aria-label="Go back to profile"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-center flex-1 text-gray-800">Your Orders</h1>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10 pr-4 py-2 bg-white rounded-full border-gray-200"
            placeholder="Search by Studio or Services"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
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
                  studioName={order.studioName}
                  studioLogo={order.studioLogo}
                  amount={order.amount}
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
                  studioName={order.studioName}
                  studioLogo={order.studioLogo}
                  amount={order.amount}
                  isCompleted
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface OrderCardProps {
  studioName: string;
  studioLogo: string;
  amount: number;
  isCompleted?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ studioName, studioLogo, amount, isCompleted }) => {
  const navigate = useNavigate();
  
  const handleViewMenu = () => {
    // Navigate to studio page (this would need the actual studio ID in a real app)
    navigate('/studio/1');
  };
  
  const handleViewDetails = () => {
    // In a real app, this would navigate to order details page
    console.log('View order details');
  };
  
  const handlePayNow = () => {
    // In a real app, this would navigate to payment page
    console.log('Pay now for order');
  };

  return (
    <Card className="border rounded-lg overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/5505940d-082e-454d-a2ed-2c6af892170e.png" 
              alt={studioName}
              className="w-6 h-6 object-contain"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{studioName}</h3>
            <button 
              onClick={handleViewMenu}
              className="text-primary-500 text-sm font-medium flex items-center"
            >
              View menu
              <span className="inline-block ml-1 text-primary-500">▶</span>
            </button>
          </div>
        </div>
      </div>
      <CardContent className="p-3 flex items-center justify-between">
        <Button 
          variant="outline"
          onClick={handleViewDetails}
          className="bg-blue-500 text-white hover:bg-blue-600 border-none shadow-md px-4"
        >
          View Details
        </Button>
        
        {!isCompleted && (
          <Button 
            onClick={handlePayNow}
            className="bg-green-500 text-white hover:bg-green-600 border-none shadow-md px-4"
          >
            Pay Now ₹{amount}
          </Button>
        )}
        
        {isCompleted && (
          <span className="text-green-500 font-medium">Completed</span>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersPage;
