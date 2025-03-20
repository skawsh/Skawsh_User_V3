import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Trash2, ShoppingBag, ChevronRight, AlertTriangle, ChevronLeft, MapPin, Clock, Minus, Plus, Edit, Tag, Package, CheckCircle2, Shirt, Footprints, PlusCircle, Info, File, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import Button from '../components/ui-elements/Button';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from '@/components/ui/scroll-area';
import ServiceCard from '../components/home/ServiceCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  const {
    toast
  } = useToast();
  const [specialInstructions, setSpecialInstructions] = useState<string[]>([]);
  const [newInstruction, setNewInstruction] = useState('');
  const [showInstructionsInput, setShowInstructionsInput] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const studioId = location.state?.studioId || null;
  const previousPath = location.state?.previousPath || "/";
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [flickerActive, setFlickerActive] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

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
            serviceSubCategory
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

  useEffect(() => {
    let flickerTimer: NodeJS.Timeout;
    if (isOrderSummaryOpen) {
      setFlickerActive(true);
      setTimeout(() => setFlickerActive(false), 500);
      flickerTimer = setInterval(() => {
        setFlickerActive(true);
        setTimeout(() => setFlickerActive(false), 500);
      }, 5000);
    }
    return () => {
      if (flickerTimer) clearInterval(flickerTimer);
    };
  }, [isOrderSummaryOpen]);

  const services = [{
    id: 'wash-fold-1',
    title: 'Wash & Fold',
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 99,
    studioId: studioId || '',
    serviceCategory: 'Core Laundry Services'
  }, {
    id: 'wash-iron-1',
    title: 'Wash & Iron',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 129,
    studioId: studioId || '',
    serviceCategory: 'Core Laundry Services'
  }, {
    id: 'iron-only-1',
    title: 'Iron Only',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 79,
    studioId: studioId || '',
    serviceCategory: 'Core Laundry Services'
  }, {
    id: 'dry-upper-1',
    title: 'Shirts',
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 149,
    studioId: studioId || '',
    serviceCategory: 'Dry Cleaning Services',
    serviceSubCategory: 'Upper Wear'
  }, {
    id: 'dry-upper-2',
    title: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 129,
    studioId: studioId || '',
    serviceCategory: 'Dry Cleaning Services',
    serviceSubCategory: 'Upper Wear'
  }, {
    id: 'dry-bottom-1',
    title: 'Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 159,
    studioId: studioId || '',
    serviceCategory: 'Dry Cleaning Services',
    serviceSubCategory: 'Bottom Wear'
  }, {
    id: 'dry-bottom-2',
    title: 'Trousers',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 139,
    studioId: studioId || '',
    serviceCategory: 'Dry Cleaning Services',
    serviceSubCategory: 'Bottom Wear'
  }, {
    id: 'dry-ethnic-1',
    title: 'Saree',
    image: 'https://images.unsplash.com/photo-1610189185762-6eb7e639603f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 249,
    studioId: studioId || '',
    serviceCategory: 'Dry Cleaning Services',
    serviceSubCategory: 'Ethnic Wear'
  }, {
    id: 'shoe-laundry-1',
    title: 'Sneakers',
    icon: <Footprints size={24} />,
    price: 129,
    studioId: studioId || '',
    serviceCategory: 'Shoe Laundry Services'
  }, {
    id: 'shoe-laundry-2',
    title: 'Formal Shoes',
    icon: <Footprints size={24} />,
    price: 149,
    studioId: studioId || '',
    serviceCategory: 'Shoe Laundry Services'
  }, {
    id: 'stain-protection',
    title: 'Stain Protection',
    description: 'Add extra protection against stains',
    price: 99,
    studioId: studioId || '',
    serviceCategory: 'Additional Services'
  }, {
    id: 'premium-detergent',
    title: 'Premium Detergent',
    description: 'Use premium quality detergent',
    price: 49,
    studioId: studioId || '',
    serviceCategory: 'Additional Services'
  }];

  const groupedItems = cartItems.reduce((acc: Record<string, CartItem[]>, item) => {
    const category = item.serviceCategory || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = item.price * (item.quantity || 1);
    return sum + itemPrice;
  }, 0);

  return (
    <Layout>
      <div className="cart-container">
        <div
          ref={headerRef}
          className={cn(
            "flex items-center justify-between p-4 bg-white transition-all",
            isHeaderSticky ? "fixed top-0 left-0 right-0 z-10 shadow-md" : ""
          )}
        >
          <button onClick={handleBackNavigation} className="flex items-center text-gray-800">
            <ChevronLeft className="mr-1" size={24} />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-bold">Your Sack</h1>
          <div className="w-6"></div>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 mt-10">
            <ShoppingBag size={64} className="text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your sack is empty</h2>
            <p className="text-gray-500 text-center mb-6">
              Add some services to your sack to proceed with checkout
            </p>
            <Button onClick={() => navigate('/services')} className="bg-primary-500">
              Browse Services
            </Button>
          </div>
        ) : (
          <div className="p-4 pb-20">
            {Object.keys(groupedItems).map((category) => (
              <div key={category} className="mb-6">
                <h2 className="text-lg font-semibold mb-3">{category}</h2>
                <div className="space-y-3">
                  {groupedItems[category].map((item) => (
                    <Card key={item.serviceId} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{item.serviceName}</h3>
                            {item.serviceSubCategory && (
                              <p className="text-sm text-gray-500">{item.serviceSubCategory}</p>
                            )}
                            <div className="flex items-center mt-1">
                              <span className="font-semibold">{formatIndianRupee(item.price)}</span>
                              {item.quantity && (
                                <span className="text-sm text-gray-500 ml-2">
                                  × {item.quantity} = {formatIndianRupee(item.price * item.quantity)}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border rounded-full overflow-hidden">
                              <button 
                                className="px-2 py-1 bg-gray-100"
                                onClick={() => {
                                  console.log('Decrease quantity', item.serviceId);
                                }}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3">{item.quantity || 1}</span>
                              <button 
                                className="px-2 py-1 bg-gray-100"
                                onClick={() => {
                                  console.log('Increase quantity', item.serviceId);
                                }}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <button 
                              className="text-red-500"
                              onClick={() => {
                                console.log('Remove item', item.serviceId);
                              }}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatIndianRupee(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹49</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatIndianRupee(totalPrice + 49)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button onClick={() => console.log('Proceeding to checkout')} className="w-full bg-primary-500">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
