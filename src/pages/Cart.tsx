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
import CouponCelebration from '@/components/animations/CouponCelebration';

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
  studioName?: string;
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
  const [showCouponCelebration, setShowCouponCelebration] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  
  const [address, setAddress] = useState({
    street: location.state?.selectedAddress?.address || '123 Main Street, Apartment 4B',
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
    if (location.state?.selectedAddress) {
      setAddress({
        ...address,
        street: location.state.selectedAddress.address
      });
    }
    
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
  }, [studioId, location.state]);

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
    
    // Dispatch custom event for components listening to cart updates
    document.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your sack.",
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
    
    if (couponCode.trim().toLowerCase() === "skawsh") {
      setDiscountPercentage(15);
      setDiscountApplied(true);
      setShowCouponCelebration(true);
      
      toast({
        title: "Coupon applied",
        description: "You got 15% off on your total order value!",
        duration: 3000,
      });
    } else {
      toast({
        title: "Coupon applied",
        description: "Your coupon has been applied successfully.",
        duration: 2000,
      });
    }
  };

  const handleCouponCelebrationComplete = () => {
    setShowCouponCelebration(false);
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
    navigate('/checkout', { state: { cartItems } });
    toast({
      title: "Proceeding to checkout",
      description: "Taking you to the payment page.",
      duration: 2000,
    });
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your sack?")) {
      setCartItems([]);
      localStorage.setItem('cartItems', JSON.stringify([]));
      
      // Dispatch custom event for components listening to cart updates
      document.dispatchEvent(new Event('cartUpdated'));
      
      toast({
        title: "Sack cleared",
        description: "All items have been removed from your sack.",
        duration: 2000,
      });
    }
  };

  const handleChangeAddress = () => {
    navigate('/addresses', { 
      state: { 
        from: '/cart',
        returnToCart: true
      } 
    });
  };

  const groupedItems = cartItems.reduce((acc: Record<string, CartItem[]>, item) => {
    const category = item.serviceCategory || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.price * (item.quantity || 1);
    return sum + itemPrice;
  }, 0);
  
  const deliveryFee = subtotal > 0 ? 49 : 0;
  const tax = Math.round(subtotal * 0.05); // Assuming 5% tax
  
  const discount = discountApplied ? Math.round(subtotal * (discountPercentage / 100)) : 0;
  
  const total = subtotal + deliveryFee + tax - discount;

  const handlePlaceOrder = () => {
    const orderId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const newOrder = {
      id: orderId,
      studioId: studioId || cartItems[0]?.studioId || "default-studio",
      studioName: cartItems[0]?.studioName || "Laundry Service",
      items: cartItems.map(item => ({
        serviceId: item.serviceId,
        serviceName: item.serviceName,
        price: item.price,
        quantity: item.quantity || 1
      })),
      status: "pending_payment",
      paymentStatus: "unpaid",
      totalAmount: subtotal + deliveryFee + tax,
      createdAt: new Date().toISOString(),
      specialInstructions: specialInstructions,
      address: address.street
    };
    
    const existingOrders = JSON.parse(sessionStorage.getItem('orders') || '[]');
    existingOrders.push(newOrder);
    sessionStorage.setItem('orders', JSON.stringify(existingOrders));
    
    localStorage.setItem('cartItems', JSON.stringify([]));
    
    document.dispatchEvent(new Event('cartUpdated'));
    
    navigate('/order-confirmation', {
      state: { orderId: orderId }
    });
  };

  const handleAddMoreServices = () => {
    if (studioId) {
      navigate(`/studio/${studioId}`);
    } else if (cartItems.length > 0 && cartItems[0].studioId) {
      navigate(`/studio/${cartItems[0].studioId}`);
    } else {
      navigate('/services');
    }
  };

  return (
    <Layout>
      <div className="cart-container bg-gray-50 min-h-screen pb-20">
        <div
          ref={headerRef}
          className={cn(
            "flex items-center justify-between p-4 bg-white transition-all duration-300",
            isHeaderSticky ? "fixed top-0 left-0 right-0 z-10 shadow-md animate-slide-in" : ""
          )}
        >
          <div className="flex items-center">
            <button onClick={handleBackNavigation} className="mr-3 hover:bg-gray-100 p-2 rounded-full transition-colors">
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Your Sack</h1>
          </div>
          
          {cartItems.length > 0 && (
            <button 
              onClick={handleClearCart} 
              className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
              aria-label="Clear sack"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 mt-16 animate-fade-in">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
              <ShoppingBag size={64} className="text-gray-300 mb-4 mx-auto" />
              <h2 className="text-xl font-semibold mb-2 text-center">Your sack is empty</h2>
              <p className="text-gray-500 text-center mb-6">
                Add some services to your sack to proceed with checkout
              </p>
              <Button 
                onClick={() => navigate('/services')} 
                className="bg-[#92E3A9] hover:bg-[#83d699] text-gray-800 w-full"
                fullWidth
              >
                Browse Services
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-4 pt-3 pb-24 max-w-3xl mx-auto">
            <div className="bg-blue-50 p-4 rounded-xl mb-4 animate-fade-in shadow-sm border border-blue-100">
              <div className="flex justify-between items-center">
                <div className="flex items-start">
                  <MapPin size={20} className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Delivery Address</p>
                    <p className="text-sm text-gray-600">{address.street}</p>
                  </div>
                </div>
                <button 
                  onClick={handleChangeAddress}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="mb-4 animate-fade-in" style={{animationDelay: "100ms"}}>
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Review your order</h2>
              
              <div className="bg-yellow-50 p-3 rounded-xl mb-4 flex items-start shadow-sm border border-yellow-100">
                <AlertTriangle size={18} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Price may vary depending on the weight and clothing items during pickup of your order.
                </p>
              </div>

              {Object.entries(groupedItems).map((categoryEntry, categoryIndex) => (
                <div key={categoryEntry[0]} className="mb-5 animate-fade-in" style={{animationDelay: `${150 + categoryIndex * 50}ms`}}>
                  <div className="flex items-center mb-2">
                    {categoryEntry[0] === 'Dry Cleaning Services' && (
                      <Shirt size={18} className="text-gray-700 mr-2" />
                    )}
                    {categoryEntry[0] === 'Core Laundry Services' && (
                      <Package size={18} className="text-gray-700 mr-2" />
                    )}
                    {categoryEntry[0] === 'Shoe Laundry Services' && (
                      <Footprints size={18} className="text-gray-700 mr-2" />
                    )}
                    <h3 className="font-semibold text-gray-800">{categoryEntry[0]}</h3>
                  </div>
                  
                  {categoryEntry[1].some(item => item.serviceSubCategory) && (
                    <div className="pl-6 mb-2">
                      {Array.from(new Set(categoryEntry[1].map(item => item.serviceSubCategory))).map(
                        subCategory => subCategory && (
                          <div key={subCategory} className="text-sm text-gray-600 font-medium">
                            {subCategory}
                          </div>
                        )
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    {categoryEntry[1].map((item, itemIndex) => (
                      <div key={item.serviceId} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-fade-in" style={{animationDelay: `${200 + itemIndex * 50}ms`}}>
                        <div className="mb-1">
                          <h4 className="font-medium text-gray-800">{item.serviceName}</h4>
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>{item.quantity} Item × {formatIndianRupee(item.price)}</span>
                            <span className="font-medium text-gray-800">{formatIndianRupee(item.price * (item.quantity || 1))}</span>
                          </div>
                          <div className="text-xs text-gray-500 mb-2 flex items-center">
                            <Clock size={12} className="inline mr-1" /> <span>36h Standard Delivery</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden shadow-sm">
                            <button 
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                              onClick={() => handleQuantityChange(item.serviceId, (item.quantity || 1) - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 border-x border-gray-200 bg-white">{item.quantity || 1}</span>
                            <button 
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                              onClick={() => handleQuantityChange(item.serviceId, (item.quantity || 1) + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <button 
                            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                            onClick={() => handleRemoveItem(item.serviceId)}
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="bg-green-50 p-4 rounded-xl mb-4 shadow-sm border border-green-100 animate-fade-in" style={{animationDelay: "300ms"}}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <PlusCircle size={18} className="text-green-600 mr-2" />
                    <span className="font-medium text-gray-700">Add More Services</span>
                  </div>
                  <Button 
                    onClick={handleAddMoreServices}
                    className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1 h-auto"
                    size="sm"
                  >
                    <span>Browse Services</span>
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl mb-4 shadow-sm border border-blue-100 animate-fade-in" style={{animationDelay: "350ms"}}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <File size={18} className="text-blue-600 mr-2" />
                    <span className="font-medium text-gray-700">Special Instructions</span>
                  </div>
                  {!showInstructionsInput && (
                    <button 
                      onClick={handleAddSpecialInstructions}
                      className="text-blue-600 text-sm font-medium hover:underline"
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
                      className="w-full mb-2 border-blue-200 focus:border-blue-300 rounded-lg"
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
                  <div className="mt-2 text-sm text-gray-600 bg-white p-3 rounded-lg border border-blue-100">
                    {specialInstructions}
                  </div>
                )}
              </div>
              
              <div className="bg-purple-50 p-4 rounded-xl mb-4 shadow-sm border border-purple-100 animate-fade-in" style={{animationDelay: "400ms"}}>
                <div className="flex items-center mb-2">
                  <Tag size={18} className="text-purple-600 mr-2" />
                  <span className="font-medium text-gray-700">Apply Coupon</span>
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 border-purple-200 focus:border-purple-300 rounded-lg"
                  />
                  <Button 
                    onClick={handleApplyCoupon}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Apply
                  </Button>
                </div>
                {discountApplied && (
                  <div className="mt-2 text-sm text-purple-600 font-medium">
                    {discountPercentage}% discount applied! You saved {formatIndianRupee(discount)}
                  </div>
                )}
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4 shadow-sm animate-fade-in" style={{animationDelay: "450ms"}}>
                <Collapsible open={showEstimatedDetails} onOpenChange={setShowEstimatedDetails}>
                  <CollapsibleTrigger className="flex justify-between items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                    <div>
                      <h3 className="font-semibold text-gray-800">Estimated Bill {formatIndianRupee(total)}</h3>
                      <p className="text-xs text-gray-500">Incl. taxes and charges</p>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-300 ${showEstimatedDetails ? 'rotate-180' : ''} text-gray-500`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="animate-slide-in">
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
                      {discountApplied && (
                        <div className="flex justify-between text-purple-600">
                          <span>Discount ({discountPercentage}%)</span>
                          <span>-{formatIndianRupee(discount)}</span>
                        </div>
                      )}
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
        
        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg animate-slide-in" style={{animationDelay: "500ms"}}>
            <div className="max-w-3xl mx-auto">
              <Button 
                onClick={handlePlaceOrder}
                className="w-full bg-[#92E3A9] text-gray-800 hover:bg-[#83d699] font-semibold text-base py-3"
                icon={<Package size={18} />}
                fullWidth
              >
                Place Order {formatIndianRupee(total)}
              </Button>
            </div>
          </div>
        )}
        
        <CouponCelebration 
          isVisible={showCouponCelebration} 
          onAnimationComplete={handleCouponCelebrationComplete}
          discountPercentage={discountPercentage}
        />
      </div>
    </Layout>
  );
};

export default Cart;
