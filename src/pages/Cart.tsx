
import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Trash2, ShoppingBag, ChevronRight, AlertTriangle, ChevronLeft, MapPin, Clock, Minus, Plus, Edit, Tag, Package, CheckCircle2, Shirt, Footprints, PlusCircle, Info, File, ChevronDown, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import Button from '../components/ui-elements/Button';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const formatIndianRupee = (amount: number): string => {
  return `₹${amount.toFixed(0)}`;
};

const formatDecimal = (value: number): number => {
  return Math.round(value * 10) / 10;
};

interface CartItem {
  serviceId: string;
  serviceName: string;
  studioId: string;
  price: number;
  quantity?: number;
  weight?: number;
  items?: {
    name: string;
    quantity: number;
  }[];
  isExpress?: boolean;
  serviceCategory?: string;
  serviceSubCategory?: string;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [showInstructionsInput, setShowInstructionsInput] = useState(false);
  const studioId = location.state?.studioId || null;
  const previousPath = location.state?.previousPath || "/";
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [showEstimatedDetails, setShowEstimatedDetails] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState({
    street: '123 Main Street, Apartment 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001'
  });

  const handleBackNavigation = () => {
    if (previousPath) {
      navigate(previousPath);
    } else {
      navigate(-1); // Fallback to the browser's default back behavior
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollY = window.scrollY;
        setIsHeaderSticky(scrollY > 10);
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      try {
        const parsedItems = JSON.parse(storedCartItems);
        const filteredItems = studioId ? parsedItems.filter((item: CartItem) => !studioId || item.studioId === studioId) : parsedItems;
        const categorizedItems = filteredItems.map((item: CartItem) => {
          let serviceCategory = '';
          let serviceSubCategory = '';
          if (item.serviceId.includes('wash') || item.serviceId.includes('iron') || item.serviceId === '1' || item.serviceId === '2' || item.serviceId === '3' || item.serviceId === '4' || item.serviceId === 'wash-iron-1') {
            serviceCategory = 'Core Laundry Services';
          } else if (item.serviceId.includes('dry-upper')) {
            serviceCategory = 'Dry Cleaning Services';
            serviceSubCategory = 'Upper Wear';
          } else if (item.serviceId.includes('dry-bottom')) {
            serviceCategory = 'Dry Cleaning Services';
            serviceSubCategory = 'Bottom Wear';
          } else if (item.serviceId.includes('dry-ethnic')) {
            serviceCategory = 'Dry Cleaning Services';
            serviceSubCategory = 'Ethnic Wear';
          } else if (item.serviceId.includes('shoe')) {
            serviceCategory = 'Shoe Laundry Services';
          } else if (item.serviceId === 'stain-protection' || item.serviceId === 'premium-detergent') {
            serviceCategory = 'Additional Services';
          }
          return {
            ...item,
            serviceCategory,
            serviceSubCategory,
            quantity: item.quantity || 1
          };
        });
        setCartItems(categorizedItems);
        console.log('Cart items loaded:', categorizedItems);
      } catch (error) {
        console.error('Error parsing cart items:', error);
        setCartItems([]);
      }
    }
  }, [studioId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => 
      item.serviceId === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    toast({
      title: "Quantity updated",
      description: "Your cart has been updated.",
      duration: 2000,
    });
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.serviceId !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
      duration: 2000,
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Empty coupon",
        description: "Please enter a coupon code.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    
    // For demo purposes, just show a success message
    toast({
      title: "Coupon applied",
      description: "Your coupon has been applied successfully.",
      duration: 2000,
    });
  };

  const handleAddSpecialInstructions = () => {
    setShowInstructionsInput(true);
  };

  const handleSaveInstructions = () => {
    setShowInstructionsInput(false);
    if (specialInstructions.trim()) {
      toast({
        title: "Instructions saved",
        description: "Your special instructions have been saved.",
        duration: 2000,
      });
    }
  };

  const handleProceedToCheckout = () => {
    // Implementation would depend on your checkout flow
    navigate('/checkout', { state: { cartItems } });
    toast({
      title: "Proceeding to checkout",
      description: "Taking you to the payment page.",
      duration: 2000,
    });
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCartItems([]);
      localStorage.setItem('cartItems', JSON.stringify([]));
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
        duration: 2000,
      });
    }
  };

  const handleChangeAddress = () => {
    // This would typically navigate to an address selection/edit page
    toast({
      title: "Change address",
      description: "This would open the address selection page.",
      duration: 2000,
    });
  };

  // Group items by category
  const groupedItems = cartItems.reduce((acc: Record<string, CartItem[]>, item) => {
    const category = item.serviceCategory || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Calculate prices
  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.price * (item.quantity || 1);
    return sum + itemPrice;
  }, 0);
  
  const deliveryFee = subtotal > 0 ? 49 : 0;
  const tax = Math.round(subtotal * 0.05); // Assuming 5% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <Layout>
      <div className="cart-container bg-gray-50 min-h-screen pb-20">
        <div
          ref={headerRef}
          className={cn(
            "flex items-center justify-between p-4 bg-white transition-all",
            isHeaderSticky ? "fixed top-0 left-0 right-0 z-10 shadow-md" : ""
          )}
        >
          <div className="flex items-center">
            <button onClick={handleBackNavigation} className="mr-3">
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <h1 className="text-lg font-medium">Your Sack</h1>
          </div>
          
          {cartItems.length > 0 && (
            <button onClick={handleClearCart} className="text-red-500">
              <Trash2 size={20} />
            </button>
          )}
        </div>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 mt-10">
            <ShoppingBag size={64} className="text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your sack is empty</h2>
            <p className="text-gray-500 text-center mb-6">
              Add some services to your sack to proceed with checkout
            </p>
            <Button onClick={() => navigate('/services')} className="bg-blue-600">
              Browse Services
            </Button>
          </div>
        ) : (
          <div className="px-4 pt-3 pb-24">
            {/* Delivery Address Section */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-start">
                  <MapPin size={20} className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Delivery Address</p>
                    <p className="text-sm text-gray-600">{address.street}, {address.city}, {address.state} {address.zipCode}</p>
                  </div>
                </div>
                <button 
                  onClick={handleChangeAddress}
                  className="text-blue-600 text-sm font-medium"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Order Review Section */}
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Review your order</h2>
              
              {/* Warning message */}
              <div className="bg-yellow-50 p-3 rounded-lg mb-4 flex items-start">
                <AlertTriangle size={18} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Price may vary depending on the weight and clothing items during pickup of your order.
                </p>
              </div>

              {/* Items List */}
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="mb-4">
                  <div className="flex items-center mb-2">
                    {category === 'Dry Cleaning Services' && (
                      <Shirt size={18} className="text-gray-700 mr-2" />
                    )}
                    {category === 'Core Laundry Services' && (
                      <Package size={18} className="text-gray-700 mr-2" />
                    )}
                    {category === 'Shoe Laundry Services' && (
                      <Footprints size={18} className="text-gray-700 mr-2" />
                    )}
                    <h3 className="font-medium text-gray-800">{category}</h3>
                  </div>
                  
                  {/* Sub-categories if they exist */}
                  {items.some(item => item.serviceSubCategory) && (
                    <div className="pl-6 mb-2">
                      {Array.from(new Set(items.map(item => item.serviceSubCategory))).map(
                        subCategory => subCategory && (
                          <div key={subCategory} className="text-sm text-gray-600 font-medium">
                            {subCategory}
                          </div>
                        )
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-3 pl-0">
                    {items.map((item) => (
                      <div key={item.serviceId} className="ml-6">
                        <div className="mb-1">
                          <h4 className="font-medium">{item.serviceName}</h4>
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>{item.quantity} Item × {formatIndianRupee(item.price)}</span>
                            <span className="font-medium text-gray-800">{formatIndianRupee(item.price * (item.quantity || 1))}</span>
                          </div>
                          <div className="text-xs text-gray-500 mb-2">
                            <Clock size={12} className="inline mr-1" /> 36h Standard Delivery
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              className="px-2 py-1 text-gray-600"
                              onClick={() => handleQuantityChange(item.serviceId, (item.quantity || 1) - 1)}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 border-x border-gray-300">{item.quantity || 1}</span>
                            <button 
                              className="px-2 py-1 text-gray-600"
                              onClick={() => handleQuantityChange(item.serviceId, (item.quantity || 1) + 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <button 
                            className="text-red-500"
                            onClick={() => handleRemoveItem(item.serviceId)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Special Instructions */}
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <File size={18} className="text-blue-600 mr-2" />
                    <span className="font-medium text-gray-700">Special Instructions</span>
                  </div>
                  {!showInstructionsInput && (
                    <button 
                      onClick={handleAddSpecialInstructions}
                      className="text-blue-600 text-sm font-medium"
                    >
                      Add
                    </button>
                  )}
                </div>
                
                {showInstructionsInput && (
                  <div className="mt-3">
                    <Textarea 
                      placeholder="Add any special instructions for your order..."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      className="w-full mb-2"
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSaveInstructions}
                        className="bg-blue-600 text-sm"
                        size="sm"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}
                
                {!showInstructionsInput && specialInstructions && (
                  <div className="mt-2 text-sm text-gray-600">
                    {specialInstructions}
                  </div>
                )}
              </div>
              
              {/* Apply Coupon */}
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <Tag size={18} className="text-purple-600 mr-2" />
                  <span className="font-medium text-gray-700">Apply Coupon</span>
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleApplyCoupon}
                    className="bg-blue-600"
                  >
                    Apply
                  </Button>
                </div>
              </div>
              
              {/* Estimated Bill */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden mb-4">
                <Collapsible open={showEstimatedDetails} onOpenChange={setShowEstimatedDetails}>
                  <CollapsibleTrigger className="flex justify-between items-center w-full px-4 py-3 text-left">
                    <div>
                      <h3 className="font-medium text-gray-800">Estimated Bill {formatIndianRupee(total)}</h3>
                      <p className="text-xs text-gray-500">Incl. taxes and charges</p>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-200 ${showEstimatedDetails ? 'rotate-180' : ''}`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-3 pt-1 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatIndianRupee(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span>{formatIndianRupee(deliveryFee)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>{formatIndianRupee(tax)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatIndianRupee(total)}</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        )}
        
        {/* Fixed checkout button at bottom */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <Button 
              onClick={handleProceedToCheckout}
              className="w-full bg-blue-600"
              icon={<Package size={18} />}
            >
              Proceed to Checkout {formatIndianRupee(total)}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
