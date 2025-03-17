
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { 
  Trash2, ShoppingBag, ChevronRight, AlertCircle, ChevronLeft, 
  MapPin, Clock, Minus, Plus, Edit, Tag, Package 
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import Button from '../components/ui-elements/Button';
import { useToast } from '@/hooks/use-toast';

// Mock function to format price in Indian Rupee format
const formatIndianRupee = (amount: number): string => {
  return `₹${amount}`;
};

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showInstructionsInput, setShowInstructionsInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  // Get the studioId from the previous location if it exists
  const studioId = location.state?.studioId || null;
  
  // Get cart items from localStorage (this would come from a context in a real app)
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Fetch cart items when component mounts
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedItems = JSON.parse(storedCartItems);
      // Filter by studioId if needed
      const filteredItems = studioId ? 
        parsedItems.filter((item: any) => !studioId || item.studioId === studioId) : 
        parsedItems;
      setCartItems(filteredItems);
    }
  }, [studioId]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Additional services that might be needed
  const additionalServices = [
    {
      id: 'stain-protection',
      name: 'Stain Protection',
      description: 'Add extra protection against stains',
      price: 99
    },
    {
      id: 'premium-detergent',
      name: 'Premium Detergent',
      description: 'Use premium quality detergent',
      price: 49
    }
  ];

  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || item.weight || 1;
    return total + (itemPrice * itemQuantity);
  }, 0);
  
  const deliveryFee = 49;
  const total = subtotal + deliveryFee;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const updatedItems = cartItems.map(item => {
      if (item.serviceId === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (itemId: string) => {
    if (itemId === 'all') {
      setCartItems([]);
      localStorage.removeItem('cartItems');
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
      return;
    }
    
    const updatedItems = cartItems.filter(item => item.serviceId !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };

  const handleAddService = (serviceId: string) => {
    const serviceToAdd = additionalServices.find(service => service.id === serviceId);
    
    if (serviceToAdd) {
      const newItem = {
        serviceId: serviceToAdd.id,
        serviceName: serviceToAdd.name,
        quantity: 1,
        price: serviceToAdd.price,
        items: []
      };
      
      const updatedItems = [...cartItems, newItem];
      setCartItems(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      
      toast({
        title: "Service added",
        description: `${serviceToAdd.name} has been added to your cart`,
      });
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      toast({
        title: "Trying to apply coupon",
        description: `Processing coupon: ${couponCode}`,
      });
      // Logic to apply coupon would go here
    }
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto pb-24 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white p-4 sticky top-0 z-10 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="rounded-full"
              aria-label="Go back"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-medium">Your Sack</h1>
          </div>
          {cartItems.length > 0 && (
            <button 
              onClick={() => handleRemoveItem('all')} 
              className="text-red-500"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-4">
            <ShoppingBag size={48} className="text-gray-300 mb-4" />
            <h2 className="text-lg font-medium text-gray-700 mb-2">Your Sack is Empty</h2>
            <p className="text-gray-500 mb-4">Add laundry services to your sack to get started.</p>
            <Link 
              to="/" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              Browse Studios <ChevronRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Delivery Address */}
            <div className="bg-white p-4 mb-2">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-blue-500 mt-1" />
                  <div>
                    <div className="flex items-center justify-between w-full">
                      <p className="font-medium text-gray-700">Delivery Address</p>
                      <button className="text-blue-500 text-sm">Change</button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      123 Main Street, Apartment 4B, New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Order */}
            <div className="bg-white p-4 mb-2">
              <h2 className="font-medium text-lg mb-2">Review your order</h2>
              <p className="text-xs text-gray-500 mb-4">
                Price may vary depending on the weight and clothing category during pickup of your order
              </p>

              {cartItems.map((item) => (
                <div key={item.serviceId} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <div className="font-medium">{item.serviceName}</div>
                    <div className="font-medium text-blue-600">
                      {formatIndianRupee(item.price)}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    {item.weight ? 
                      `KG × ${item.weight}` : 
                      `Quantity: ${item.quantity || 1}`}
                  </div>
                  
                  {item.items && item.items.length > 0 && (
                    <div className="text-sm text-gray-600 mb-2">
                      {item.items.map((detail: any, index: number) => (
                        <p key={index}>• {detail.name} ({detail.quantity})</p>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={14} className="text-gray-500" />
                    <span className="text-xs text-gray-600">36h Standard Delivery</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          if (item.weight) {
                            const newWeight = Math.max(0.1, (item.weight || 1) - 0.1);
                            handleQuantityChange(item.serviceId, newWeight);
                          } else {
                            handleQuantityChange(item.serviceId, Math.max(1, (item.quantity || 1) - 1));
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-6 text-center">
                        {item.weight ? item.weight : (item.quantity || 1)}
                      </span>
                      <button 
                        onClick={() => {
                          if (item.weight) {
                            const newWeight = (item.weight || 1) + 0.1;
                            handleQuantityChange(item.serviceId, newWeight);
                          } else {
                            handleQuantityChange(item.serviceId, (item.quantity || 1) + 1);
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.serviceId)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Special Instructions */}
              <div className="mt-4">
                <div 
                  onClick={() => setShowInstructionsInput(!showInstructionsInput)}
                  className="flex items-center gap-2 text-blue-600 cursor-pointer"
                >
                  <Checkbox
                    id="special-instructions"
                    checked={showInstructionsInput}
                    onCheckedChange={() => setShowInstructionsInput(!showInstructionsInput)}
                  />
                  <label htmlFor="special-instructions" className="text-sm cursor-pointer">
                    Add Special Instructions
                  </label>
                </div>
                
                {showInstructionsInput && (
                  <Textarea
                    placeholder="Any specific cleaning requirements?"
                    className="mt-2 w-full border rounded-md"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* You might need this */}
            <div className="bg-white p-4 mb-2">
              <h2 className="font-medium text-blue-600 flex items-center gap-2 mb-4">
                <span className="text-blue-500">✦</span> You might need this
              </h2>
              
              {additionalServices.map((service) => (
                <div key={service.id} className="flex justify-between items-center mb-3">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      service.id === 'stain-protection' ? "bg-purple-100 text-purple-600" : 
                      "bg-blue-100 text-blue-600"
                    )}>
                      {service.id === 'stain-protection' ? '⛨' : '✦'}
                    </div>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-xs text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-2">
                      {formatIndianRupee(service.price)}
                    </span>
                    <button 
                      onClick={() => handleAddService(service.id)}
                      className="text-blue-600 text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="text-blue-600 text-sm font-medium mt-2">
                See all services
              </button>
            </div>

            {/* Delivery Info & Payment Details */}
            <div className="bg-white p-4 mb-2">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-blue-600" />
                  <span className="text-sm font-medium">Delivery Info</span>
                </div>
                <span className="text-sm text-gray-600">Standard Wash - 36h Delivery</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Tag size={16} className="text-blue-600" />
                <span className="text-sm font-medium">Apply Coupon</span>
              </div>
              
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-grow border rounded-l-md p-2 text-sm"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button 
                  onClick={handleApplyCoupon}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm"
                >
                  Apply
                </button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatIndianRupee(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>{formatIndianRupee(deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-medium mt-4">
                  <span>Total</span>
                  <span className="text-blue-600">{formatIndianRupee(total)}</span>
                </div>
              </div>
            </div>
            
            {/* Place Order Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
              <Button 
                fullWidth
                className="bg-blue-600 text-white"
                icon={<ChevronRight size={18} />}
                iconPosition="right"
                onClick={() => {
                  toast({
                    title: "Order Placed",
                    description: "Your order has been placed successfully!",
                  });
                }}
              >
                Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
