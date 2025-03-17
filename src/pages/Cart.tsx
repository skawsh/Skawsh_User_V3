import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { 
  Trash2, ShoppingBag, ChevronRight, AlertCircle, ChevronLeft, 
  MapPin, Clock, Minus, Plus, Edit, Tag, Package, CheckCircle2,
  Shirt, Footprints, PlusCircle, Info, File, ChevronDown
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import Button from '../components/ui-elements/Button';
import { useToast } from '@/hooks/use-toast';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { ScrollArea } from '@/components/ui/scroll-area';
import ServiceCard from '../components/home/ServiceCard';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showInstructionsInput, setShowInstructionsInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [showGlowingText, setShowGlowingText] = useState(false);
  const [currentGlowingWordIndex, setCurrentGlowingWordIndex] = useState(-1);
  const [warningWords, setWarningWords] = useState<string[]>([]);

  const studioId = location.state?.studioId || null;
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      try {
        const parsedItems = JSON.parse(storedCartItems);
        const filteredItems = studioId ? 
          parsedItems.filter((item: CartItem) => !studioId || item.studioId === studioId) : 
          parsedItems;
        
        const categorizedItems = filteredItems.map((item: CartItem) => {
          let serviceCategory = '';
          let serviceSubCategory = '';

          if (item.serviceId.includes('wash') || 
              item.serviceId.includes('iron') || 
              item.serviceId === '1' || 
              item.serviceId === '2' || 
              item.serviceId === '3' || 
              item.serviceId === '4' || 
              item.serviceId === 'wash-iron-1') {
            serviceCategory = 'Core Laundry Services';
          }
          else if (item.serviceId.includes('dry-upper')) {
            serviceCategory = 'Dry Cleaning Services';
            serviceSubCategory = 'Upper Wear';
          }
          else if (item.serviceId.includes('dry-bottom')) {
            serviceCategory = 'Dry Cleaning Services';
            serviceSubCategory = 'Bottom Wear';
          }
          else if (item.serviceId.includes('dry-ethnic')) {
            serviceCategory = 'Dry Cleaning Services';
            serviceSubCategory = 'Ethnic Wear';
          }
          else if (item.serviceId.includes('shoe')) {
            serviceCategory = 'Shoe Laundry Services';
          }
          else if (item.serviceId === 'stain-protection' || item.serviceId === 'premium-detergent') {
            serviceCategory = 'Additional Services';
          }
          
          return { ...item, serviceCategory, serviceSubCategory };
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
    let timer: NodeJS.Timeout;
    if (isOrderSummaryOpen) {
      const warning = "The price of your order may vary based on the weight and clothing items at the time of pickup";
      const words = warning.split(' ');
      setWarningWords(words);
      
      let wordIndex = 0;
      setCurrentGlowingWordIndex(wordIndex);
      
      const animateNextWord = () => {
        wordIndex++;
        if (wordIndex < words.length) {
          setCurrentGlowingWordIndex(wordIndex);
          timer = setTimeout(animateNextWord, 500);
        } else {
          setCurrentGlowingWordIndex(-1);
        }
      };
      
      timer = setTimeout(animateNextWord, 500);
    } else {
      setCurrentGlowingWordIndex(-1);
      setWarningWords([]);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOrderSummaryOpen]);

  const services = [
    {
      id: 'wash-fold-1',
      title: 'Wash & Fold',
      image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      price: 99,
      studioId: studioId || '',
      serviceCategory: 'Core Laundry Services'
    }, 
    {
      id: 'wash-iron-1',
      title: 'Wash & Iron',
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      price: 129,
      studioId: studioId || '',
      serviceCategory: 'Core Laundry Services'
    },
    {
      id: 'iron-only-1',
      title: 'Iron Only',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      price: 79,
      studioId: studioId || '',
      serviceCategory: 'Core Laundry Services'
    }, 
    {
      id: 'dry-upper-1',
      title: 'Shirts',
      image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      price: 149,
      studioId: studioId || '',
      serviceCategory: 'Dry Cleaning Services',
      serviceSubCategory: 'Upper Wear'
    },
    {
      id: 'dry-upper-2',
      title: 'T-Shirts',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      price: 129,
      studioId: studioId || '',
      serviceCategory: 'Dry Cleaning Services',
      serviceSubCategory: 'Upper Wear'
    },
    {
      id: 'dry-bottom-1',
      title: 'Jeans',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      price: 159,
      studioId: studioId || '',
      serviceCategory: 'Dry Cleaning Services',
      serviceSubCategory: 'Bottom Wear'
    },
    {
      id: 'dry-bottom-2',
      title: 'Trousers',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      price: 139,
      studioId: studioId || '',
      serviceCategory: 'Dry Cleaning Services',
      serviceSubCategory: 'Bottom Wear'
    },
    {
      id: 'dry-ethnic-1',
      title: 'Saree',
      image: 'https://images.unsplash.com/photo-1610189185762-6eb7e639603f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      price: 249,
      studioId: studioId || '',
      serviceCategory: 'Dry Cleaning Services',
      serviceSubCategory: 'Ethnic Wear'
    },
    {
      id: 'shoe-laundry-1',
      title: 'Sneakers',
      icon: <Footprints size={24} />,
      price: 129,
      studioId: studioId || '',
      serviceCategory: 'Shoe Laundry Services'
    },
    {
      id: 'shoe-laundry-2',
      title: 'Formal Shoes',
      icon: <Footprints size={24} />,
      price: 149,
      studioId: studioId || '',
      serviceCategory: 'Shoe Laundry Services'
    },
    {
      id: 'stain-protection',
      title: 'Stain Protection',
      description: 'Add extra protection against stains',
      price: 99,
      studioId: studioId || '',
      serviceCategory: 'Additional Services'
    },
    {
      id: 'premium-detergent',
      title: 'Premium Detergent',
      description: 'Use premium quality detergent',
      price: 49,
      studioId: studioId || '',
      serviceCategory: 'Additional Services'
    }
  ];

  const serviceCategories = Array.from(new Set(cartItems.map(item => item.serviceCategory)));

  const groupedCartItems = cartItems.reduce((acc: {[key: string]: {[key: string]: CartItem[]}}, item) => {
    if (!item.serviceCategory) return acc;
    
    if (!acc[item.serviceCategory]) {
      acc[item.serviceCategory] = {};
    }
    
    const subCategoryKey = item.serviceSubCategory || 'default';
    if (!acc[item.serviceCategory][subCategoryKey]) {
      acc[item.serviceCategory][subCategoryKey] = [];
    }
    
    acc[item.serviceCategory][subCategoryKey].push(item);
    
    return acc;
  }, {});

  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || item.weight || 1;
    return total + (itemPrice * itemQuantity);
  }, 0);
  
  const deliveryFee = 49;
  
  const subtotalGST = subtotal * 0.18; // 18% GST on subtotal
  const deliveryGST = deliveryFee * 0.05; // 5% GST on delivery fee
  const totalGST = subtotalGST + deliveryGST;
  
  const total = subtotal + deliveryFee + totalGST;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const formattedQuantity = formatDecimal(newQuantity);
    
    if (formattedQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    const updatedItems = cartItems.map(item => {
      if (item.serviceId === itemId) {
        return { ...item, quantity: formattedQuantity, weight: item.weight ? formattedQuantity : undefined };
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

  const handleAddService = (service: any) => {
    const existingItemIndex = cartItems.findIndex(item => item.serviceId === service.id);
    
    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems];
      const currentItem = updatedItems[existingItemIndex];
      const currentQuantity = currentItem.quantity || currentItem.weight || 1;
      const isKgBased = !!currentItem.weight;
      
      const increment = isKgBased ? 0.1 : 1;
      const newQuantity = formatDecimal(currentQuantity + increment);
      
      if (isKgBased) {
        updatedItems[existingItemIndex] = { ...currentItem, weight: newQuantity };
      } else {
        updatedItems[existingItemIndex] = { ...currentItem, quantity: newQuantity };
      }
      
      setCartItems(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } else {
      let newItem: CartItem = {
        serviceId: service.id,
        serviceName: service.title,
        price: service.price,
        studioId: service.studioId || studioId || '',
        serviceCategory: service.serviceCategory,
        serviceSubCategory: service.serviceSubCategory,
        items: []
      };
      
      if (service.id === 'wash-fold-1' || service.id === 'dry-clean-1') {
        newItem.weight = 1.0;
      } else {
        newItem.quantity = 1;
      }
      
      const updatedItems = [...cartItems, newItem];
      setCartItems(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
    
    toast({
      title: "Service added",
      description: `${service.title} has been added to your cart`,
    });
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

  const renderCartItemWithDetails = (item: CartItem) => {
    const quantity = item.weight ? formatDecimal(item.weight) : (item.quantity || 1);
    const unitLabel = item.weight ? 'KG' : 
                      item.serviceCategory === 'Shoe Laundry Services' ? 'Pair' : 'Item';
    const totalPrice = item.price * quantity;
    const isKgBased = !!item.weight;
    
    return (
      <div key={item.serviceId} className="mb-4 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
        <div className="flex justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{item.serviceName}</span>
            {item.isExpress && (
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                Express
              </span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <div>
            {unitLabel ? 
              `${quantity} ${unitLabel} × ${formatIndianRupee(item.price)}` : 
              `1 Item × ${formatIndianRupee(item.price)}`}
          </div>
          <div className="font-medium text-blue-600">
            {formatIndianRupee(totalPrice)}
          </div>
        </div>
        
        {item.items && item.items.length > 0 && (
          <div className="bg-gray-50 p-2 rounded-md mb-3">
            <div className="text-xs font-medium text-gray-700 mb-1">Selected Items:</div>
            <div className="space-y-1">
              {item.items.map((subItem, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={12} className="text-green-500" />
                  <span>{subItem.name}</span>
                  <span className="text-gray-400">×</span>
                  <span>{subItem.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2 mb-3">
          <Clock size={14} className="text-gray-500" />
          <span className="text-xs text-gray-600">
            {item.isExpress ? '4-6h Express Delivery' : '36h Standard Delivery'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                const decrement = isKgBased ? 0.1 : 1;
                const newValue = formatDecimal(quantity - decrement);
                
                if (newValue <= 0) {
                  handleRemoveItem(item.serviceId);
                } else {
                  handleQuantityChange(item.serviceId, newValue);
                }
              }}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-6 text-center">
              {isKgBased ? quantity.toFixed(1) : quantity}
            </span>
            <button 
              onClick={() => {
                const increment = isKgBased ? 0.1 : 1;
                const newValue = formatDecimal(quantity + increment);
                handleQuantityChange(item.serviceId, newValue);
              }}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => handleRemoveItem(item.serviceId)}
            className="text-red-500"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Core Laundry Services':
        return <ShoppingBag size={16} className="text-white bg-stone-800 rounded-full p-0.5" />;
      case 'Dry Cleaning Services':
        return <Shirt size={16} className="text-white bg-black rounded-full p-0.5" />;
      case 'Shoe Laundry Services':
        return <Footprints size={16} className="text-white bg-slate-950 rounded-full p-0.5" />;
      default:
        return <Tag size={16} className="text-white bg-blue-600 rounded-full p-0.5" />;
    }
  };

  const createAnimatedText = (text: string) => {
    if (warningWords.length === 0) return text;
    
    return warningWords.map((word, index) => (
      <span 
        key={index}
        className={index === currentGlowingWordIndex ? "animate-price-warning" : ""}
        style={{ 
          display: 'inline-block',
          marginRight: '4px'
        }}
      >
        {word}
      </span>
    ));
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto pb-24 bg-gray-50 min-h-screen">
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
              aria-label="Clear cart"
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

            <div className="bg-white p-4 mb-2">
              <h2 className="font-medium text-lg mb-2">Review your order</h2>
              <p className="text-xs text-gray-500 mb-4">
                Price may vary depending on the weight and clothing category during pickup of your order
              </p>

              {Object.entries(groupedCartItems).map(([category, subCategories]) => (
                <div key={category} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    {getCategoryIcon(category)}
                    <span className="font-medium">{category}</span>
                  </div>
                  
                  {Object.entries(subCategories).map(([subCategory, items]) => (
                    <div key={`${category}-${subCategory}`} className="pl-6 mb-4">
                      {subCategory !== 'default' && (
                        <p className="text-sm font-medium text-gray-700 mb-2">{subCategory}</p>
                      )}
                      {items.map(item => renderCartItemWithDetails(item))}
                    </div>
                  ))}
                </div>
              ))}
              
              <div className="mt-6 pt-4 border-t">
                <Collapsible
                  className="w-full border border-gray-200 rounded-lg overflow-hidden"
                  open={isOrderSummaryOpen}
                  onOpenChange={(open) => {
                    setIsOrderSummaryOpen(open);
                    if (!open) {
                      setCurrentGlowingWordIndex(-1);
                    }
                  }}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white">
                    <div className="flex items-center gap-3">
                      <File size={20} className="text-gray-700" />
                      <div>
                        <h3 className="text-lg font-medium">Estimated Bill ₹{total.toFixed(0)}</h3>
                        <p className="text-xs text-gray-500">Incl. taxes and charges</p>
                      </div>
                    </div>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "transition-transform duration-200",
                        isOrderSummaryOpen ? "transform rotate-180" : ""
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 bg-gray-50">
                    <div className="bg-amber-50 rounded-md p-3 mb-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={14} className="mt-0.5 flex-shrink-0 text-amber-700" />
                        <p className="text-xs text-amber-700">
                          {createAnimatedText("The price of your order may vary based on the weight and clothing items at the time of pickup")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">{formatIndianRupee(subtotal)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-medium">{formatIndianRupee(deliveryFee)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">Taxes</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="cursor-help">
                                  <Info size={14} className="text-gray-500" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="w-60 p-3">
                                <div className="space-y-2">
                                  <h4 className="font-medium">Tax Breakdown</h4>
                                  <div className="text-xs space-y-1">
                                    <div className="flex justify-between">
                                      <span>Subtotal GST (18%)</span>
                                      <span>{formatIndianRupee(subtotalGST)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Delivery GST (5%)</span>
                                      <span>{formatIndianRupee(deliveryGST)}</span>
                                    </div>
                                    <Separator className="my-1" />
                                    <div className="flex justify-between font-medium">
                                      <span>Total GST</span>
                                      <span>{formatIndianRupee(totalGST)}</span>
                                    </div>
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span className="font-medium">{formatIndianRupee(totalGST)}</span>
                      </div>
                      <div className="flex justify-between mt-3 pt-3 border-t">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-blue-600">{formatIndianRupee(total)}</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
            
            <div className="bg-white p-4 mb-2">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Special Instructions</h3>
                <button 
                  onClick={() => setShowInstructionsInput(!showInstructionsInput)}
                  className="text-blue-500 text-sm"
                >
                  {showInstructionsInput ? 'Hide' : 'Add'}
                </button>
              </div>
              
              {showInstructionsInput && (
                <Textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Add any special instructions for your order..."
                  className="w-full h-24 text-sm"
                />
              )}
            </div>
            
            <div className="bg-white p-4 mb-2">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={16} className="text-blue-500" />
                <h3 className="font-medium">Apply Coupon</h3>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
                <button 
                  onClick={handleApplyCoupon}
                  className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
                >
                  Apply
                </button>
              </div>
            </div>
            
            <div className="px-4 mt-4">
              <Button
                onClick={() => navigate('/checkout')}
                className="w-full text-md flex items-center justify-center gap-2 py-3"
              >
                Proceed to Checkout <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;

