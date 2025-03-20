import React, { useState, useRef, useEffect } from 'react';
import { Clock, Menu } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ServiceOrderPopup from './ServiceOrderPopup';
import { useLocation } from 'react-router-dom';
import CategoryList from './categories/CategoryList';
import ServiceCategory from './services/ServiceCategory';
import { ShoppingBag, Shirt, Footprints, Bookmark } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
}

interface CartItem {
  serviceId: string;
  serviceName: string;
  weight?: number;
  price: number;
  quantity?: number;
  studioId?: string;
  items: {
    name: string;
    quantity: number;
  }[];
}

interface SubCategory {
  title: string;
  icon: React.ReactNode;
  services: Service[];
}

interface ServiceCategory {
  title: string;
  icon: React.ReactNode;
  services: Service[];
  count?: number;
  subCategories?: SubCategory[];
}

interface ServiceListProps {
  services: Service[];
  isScrolled?: boolean;
  onCartUpdate?: (count: number) => void;
  studioId?: string;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  isScrolled = false,
  onCartUpdate,
  studioId = '1'
}) => {
  const [selectedTab, setSelectedTab] = useState<string>("standard");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const isMobile = useIsMobile();
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const tabsContentHeight = useRef<number>(0);

  const coreServices = services.filter(s => s.name.includes('Wash')).map(service => ({
    ...service,
    price: 49,
    unit: 'per kg'
  }));
  
  const washAndIronService: Service = {
    id: 'wash-iron-1',
    name: 'Wash & Iron',
    description: 'Professional washing with meticulous ironing for a crisp, fresh finish.',
    price: 99,
    unit: 'per kg'
  };
  
  const updatedCoreServices = [...coreServices, washAndIronService];

  const expressWashServices: Service[] = [
    {
      id: 'express-wash-fold-1',
      name: 'Wash & Fold',
      description: 'Express washing and folding service for quick turnaround.',
      price: 99,
      unit: 'per kg'
    },
    {
      id: 'express-wash-iron-1',
      name: 'Wash & Iron',
      description: 'Express washing with professional ironing for a crisp finish.',
      price: 149,
      unit: 'per kg'
    }
  ];

  const accessoriesServices: Service[] = [
    {
      id: 'acc-handkerchief',
      name: 'Hand Kerchief',
      description: 'Gentle cleaning for handkerchiefs with perfect finishing.',
      price: 25
    },
    {
      id: 'acc-tie',
      name: 'Tie',
      description: 'Professional cleaning for ties, preserving color and texture.',
      price: 45
    },
    {
      id: 'acc-cap',
      name: 'Cap',
      description: 'Thorough cleaning for caps without affecting their shape.',
      price: 50
    },
    {
      id: 'acc-gloves',
      name: 'Gloves',
      description: 'Specialized cleaning for all types of gloves.',
      price: 35
    },
    {
      id: 'acc-shawl',
      name: 'Shawl',
      description: 'Deep cleaning for shawls with gentle care for delicate fabrics.',
      price: 75
    }
  ];

  const dryCleaningSubCategories: SubCategory[] = [
    {
      title: "Upper Wear",
      icon: <Shirt size={16} className="text-blue-500" />,
      services: [
        {
          id: 'dry-upper-1',
          name: 'Shirt',
          description: 'Professional dry cleaning for shirts',
          price: 155
        },
        {
          id: 'dry-upper-2',
          name: 'T-shirt',
          description: 'Gentle cleaning for t-shirts',
          price: 155
        },
        {
          id: 'dry-upper-3',
          name: 'Ladies Top',
          description: 'Specialized cleaning for tops',
          price: 155
        }
      ]
    },
    {
      title: "Bottom Wear",
      icon: <Shirt size={16} className="text-indigo-500" />,
      services: [
        {
          id: 'dry-bottom-1',
          name: 'Pant',
          description: 'Professional dry cleaning for pants',
          price: 70
        }
      ]
    },
    {
      title: "Ethnic Wear",
      icon: <Shirt size={16} className="text-purple-500" />,
      services: [
        {
          id: 'dry-ethnic-1',
          name: 'Sherwani',
          description: 'Specialized dry cleaning for sherwani',
          price: 699
        }
      ]
    }
  ];

  const shoeServices: Service[] = [
    {
      id: 'shoe-1',
      name: 'Regular Shoes',
      description: 'Deep cleaning for regular everyday shoes',
      price: 299
    },
    {
      id: 'shoe-2',
      name: 'Leather Shoes',
      description: 'Specialized cleaning and conditioning for leather footwear',
      price: 399
    },
    {
      id: 'shoe-3',
      name: 'Sneakers',
      description: 'Thorough cleaning for sports shoes and sneakers',
      price: 349
    },
    {
      id: 'shoe-4',
      name: 'Canvas Shoes',
      description: 'Cleaning and whitening for canvas footwear',
      price: 249
    },
    {
      id: 'shoe-5',
      name: 'Sandals',
      description: 'Cleaning and sanitizing for all types of sandals',
      price: 199
    },
    {
      id: 'shoe-6',
      name: 'Heels',
      description: 'Gentle cleaning and polishing for formal heels',
      price: 349
    }
  ];

  const categories: ServiceCategory[] = [
    {
      title: "Core Laundry Services",
      icon: <ShoppingBag size={16} className="text-white bg-stone-800 rounded-full" />,
      services: updatedCoreServices,
      count: updatedCoreServices.length
    }, 
    {
      title: "Dry Cleaning Services",
      icon: <Shirt size={16} className="text-white bg-black rounded-full" />,
      services: [],
      count: 5,
      subCategories: dryCleaningSubCategories
    }, 
    {
      title: "Shoe Laundry Services",
      icon: <Footprints size={16} className="text-white bg-slate-950 rounded-3xl" />,
      services: shoeServices,
      count: 11
    }
  ];

  const expressCategories: ServiceCategory[] = [
    {
      title: "Core Laundry Services",
      icon: <ShoppingBag size={16} className="text-white bg-stone-800 rounded-full" />,
      services: expressWashServices,
      count: expressWashServices.length
    },
    {
      title: "Accessories",
      icon: <Bookmark size={16} className="text-white bg-purple-700 rounded-full" />,
      services: accessoriesServices,
      count: accessoriesServices.length
    }
  ];

  const deliveryMessages = {
    standard: "Delivery in just 36 sunlight hours after pickup",
    express: "Delivery in just 12 sunlight hours after pickup"
  };

  const backgroundColors = {
    standard: "bg-blue-50",
    express: "bg-orange-50"
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const setCategoryRef = (categoryTitle: string, element: HTMLDivElement | null) => {
    categoryRefs.current[categoryTitle] = element;
  };

  const scrollToCategory = (categoryTitle: string) => {
    const element = categoryRefs.current[categoryTitle];
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setPopoverOpen(false);
  };

  const handleOpenServicePopup = (service: Service) => {
    if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
      setSelectedService(service);
    } else {
      handleAddToCart({
        serviceId: service.id,
        serviceName: service.name,
        quantity: 1,
        price: selectedTab === "express" ? service.price * 1.5 : service.price,
        studioId: studioId,
        items: []
      });
    }
  };
  
  const handleCloseServicePopup = () => {
    setSelectedService(null);
  };
  
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      try {
        const parsedItems = JSON.parse(storedCartItems);
        setCartItems(parsedItems);
      } catch (error) {
        console.error('Error parsing cart items:', error);
        setCartItems([]);
      }
    }
  }, []);
  
  const handleAddToCart = (orderDetails: any) => {
    const roundedWeight = orderDetails.weight ? Math.round(orderDetails.weight * 10) / 10 : 0;
    
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.serviceId === orderDetails.serviceId);
      
      let updatedItems;
      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          serviceId: orderDetails.serviceId,
          serviceName: orderDetails.serviceName,
          weight: roundedWeight,
          price: Math.round(orderDetails.price * 100) / 100,
          quantity: orderDetails.quantity,
          studioId: studioId,
          items: orderDetails.items
        };
        updatedItems = newItems;
      } else {
        updatedItems = [...prev, {
          serviceId: orderDetails.serviceId,
          serviceName: orderDetails.serviceName,
          weight: roundedWeight,
          price: Math.round(orderDetails.price * 100) / 100,
          quantity: orderDetails.quantity,
          studioId: studioId,
          items: orderDetails.items
        }];
      }
      
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  useEffect(() => {
    if (onCartUpdate) {
      onCartUpdate(cartItems.length);
    }
  }, [cartItems, onCartUpdate]);

  const getServiceWeight = (serviceId: string): number | null => {
    const item = cartItems.find(item => item.serviceId === serviceId);
    return item ? item.weight : null;
  };

  const getServiceQuantity = (serviceId: string): number | null => {
    const item = cartItems.find(item => item.serviceId === serviceId);
    return item && item.quantity ? item.quantity : null;
  };

  const handleIncreaseWeight = (service: Service) => {
    if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
      const currentWeight = getServiceWeight(service.id) || 0;
      const newWeight = Math.round((currentWeight + 0.1) * 10) / 10;
      
      handleAddToCart({
        serviceId: service.id,
        serviceName: service.name,
        weight: newWeight,
        price: service.price * newWeight,
        studioId: studioId,
        items: []
      });
    } else {
      const existingItem = cartItems.find(item => item.serviceId === service.id);
      const quantity = existingItem && existingItem.quantity ? existingItem.quantity + 1 : 1;
      
      handleAddToCart({
        serviceId: service.id,
        serviceName: service.name,
        quantity: quantity,
        price: service.price * quantity,
        studioId: studioId,
        items: []
      });
    }
  };

  const handleDecreaseWeight = (service: Service) => {
    if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
      const currentWeight = getServiceWeight(service.id) || 0;
      
      if (currentWeight <= 1) {
        setCartItems(prev => prev.filter(item => item.serviceId !== service.id));
        localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(item => item.serviceId !== service.id)));
        return;
      }
      
      const newWeight = Math.round((currentWeight - 0.1) * 10) / 10;
      handleAddToCart({
        serviceId: service.id,
        serviceName: service.name,
        weight: newWeight,
        price: service.price * newWeight,
        studioId: studioId,
        items: []
      });
    } else {
      const existingItem = cartItems.find(item => item.serviceId === service.id);
      if (!existingItem) return;
      
      const quantity = existingItem.quantity ? existingItem.quantity - 1 : 0;
      
      if (quantity <= 0) {
        setCartItems(prev => prev.filter(item => item.serviceId !== service.id));
        localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(item => item.serviceId !== service.id)));
        return;
      }
      
      handleAddToCart({
        serviceId: service.id,
        serviceName: service.name,
        quantity: quantity,
        price: service.price * quantity,
        studioId: studioId,
        items: []
      });
    }
  };

  const handleCardClick = (service: Service) => {
    const existingItem = cartItems.find(item => item.serviceId === service.id);
    
    if (existingItem) {
      if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
        setSelectedService(service);
      }
    } else {
      handleOpenServicePopup(service);
    }
  };

  useEffect(() => {
    if (tabsListRef.current) {
      tabsContentHeight.current = tabsListRef.current.offsetHeight + 12;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (tabsWrapperRef.current) {
        const headerHeight = 56;
        const tabsPosition = tabsWrapperRef.current.getBoundingClientRect().top;
        const shouldBeSticky = tabsPosition <= headerHeight;
        
        if (shouldBeSticky !== isTabsSticky) {
          setIsTabsSticky(shouldBeSticky);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTabsSticky]);

  return (
    <div 
      className={cn(
        "mt-[-2px] animate-fade-in p-4 rounded-lg transition-colors duration-300 -mx-2 relative", 
        backgroundColors[selectedTab as keyof typeof backgroundColors]
      )} 
      ref={tabsWrapperRef}
    >
      <div ref={tabsRef} className="transition-all duration-300">
        <Tabs defaultValue="standard" onValueChange={handleTabChange}>
          {isTabsSticky && (
            <div 
              className="h-0 overflow-hidden" 
              style={{ 
                height: tabsContentHeight.current ? `${tabsContentHeight.current}px` : '72px'
              }}
            />
          )}
          
          {isTabsSticky && (
            <div className="fixed top-[56px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm animate-fade-in transition-opacity duration-300">
              <div className={cn("transition-colors duration-300 py-2 px-4", backgroundColors[selectedTab as keyof typeof backgroundColors])}>
                <TabsList className="w-full grid grid-cols-2 gap-2 bg-transparent my-0 py-1 mx-0">
                  <TabsTrigger 
                    value="standard" 
                    className={cn(
                      "rounded-full border shadow-sm transition-colors duration-300 flex items-center justify-center h-10", 
                      selectedTab === "standard" 
                        ? "text-white bg-blue-600 border-blue-600 font-medium" 
                        : "text-gray-500 bg-white border-gray-200 hover:bg-blue-50"
                    )}
                  >
                    <Clock size={16} className="mr-2" />
                    Standard Wash
                  </TabsTrigger>
                  <TabsTrigger 
                    value="express" 
                    className={cn(
                      "rounded-full border shadow-sm transition-colors duration-300 flex items-center justify-center h-10", 
                      selectedTab === "express" 
                        ? "text-white bg-orange-500 border-orange-500 font-medium" 
                        : "text-gray-500 bg-white border-gray-200 hover:bg-orange-50"
                    )}
                  >
                    <Clock size={16} className="mr-2" />
                    Express Wash
                  </TabsTrigger>
                </TabsList>
                
                <div className={cn("flex items-center gap-2 mt-2 text-sm transition-colors duration-300", 
                  selectedTab === "standard" ? "text-blue-600" : "text-orange-500"
                )}>
                  <Clock size={16} />
                  <span>{deliveryMessages[selectedTab as keyof typeof deliveryMessages]}</span>
                </div>
              </div>
            </div>
          )}

          <div 
            className={cn(
              isTabsSticky ? "opacity-0 invisible h-0 overflow-hidden" : "opacity-100 visible h-auto", 
              "transition-all duration-500"
            )}
          >
            <TabsList 
              ref={tabsListRef} 
              className="grid w-full grid-cols-2 gap-2 mb-6 bg-transparent my-[3px] py-0"
            >
              <TabsTrigger 
                value="standard" 
                className={cn(
                  "rounded-full border shadow-sm transition-colors duration-300 flex items-center justify-center h-10", 
                  selectedTab === "standard" 
                    ? "text-white bg-blue-600 border-blue-600 font-medium" 
                    : "text-gray-500 bg-white border-gray-200 hover:bg-blue-50"
                )}
              >
                <Clock size={16} className="mr-2" />
                Standard Wash
              </TabsTrigger>
              <TabsTrigger 
                value="express" 
                className={cn(
                  "rounded-full border shadow-sm transition-colors duration-300 flex items-center justify-center h-10", 
                  selectedTab === "express" 
                    ? "text-white bg-orange-500 border-orange-500 font-medium" 
                    : "text-gray-500 bg-white border-gray-200 hover:bg-orange-50"
                )}
              >
                <Clock size={16} className="mr-2" />
                Express Wash
              </TabsTrigger>
            </TabsList>
          </div>

          <div className={cn("flex items-center gap-2 mb-4 text-sm transition-colors duration-300", 
            selectedTab === "standard" ? "text-blue-600" : "text-orange-500"
          )}>
            <Clock size={16} />
            <span>{deliveryMessages[selectedTab as keyof typeof deliveryMessages]}</span>
          </div>
          
          <TabsContent value="standard">
            <div className="space-y-8">
              {categories.map((category, idx) => (
                <ServiceCategory
                  key={idx}
                  title={category.title}
                  icon={category.icon}
                  services={category.services}
                  subCategories={category.subCategories}
                  tabType="standard"
                  getServiceWeight={getServiceWeight}
                  getServiceQuantity={getServiceQuantity}
                  onServiceAdd={handleOpenServicePopup}
                  onServiceIncrease={handleIncreaseWeight}
                  onServiceDecrease={handleDecreaseWeight}
                  onServiceClick={handleCardClick}
                  categoryRef={(el) => setCategoryRef(category.title, el)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="express">
            <div className="space-y-8">
              {expressCategories.map((category, idx) => (
                <ServiceCategory
                  key={idx}
                  title={category.title}
                  icon={category.icon}
                  services={category.services}
                  subCategories={category.subCategories}
                  tabType="express"
                  getServiceWeight={getServiceWeight}
                  getServiceQuantity={getServiceQuantity}
                  onServiceAdd={handleOpenServicePopup}
                  onServiceIncrease={handleIncreaseWeight}
                  onServiceDecrease={handleDecreaseWeight}
                  onServiceClick={handleCardClick}
                  categoryRef={(el) => setCategoryRef(category.title, el)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <button 
        onClick={() => setPopoverOpen(true)} 
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 text-white flex items-center justify-center transition-all duration-300 animate-scale-in bg-black",
          cartItems.length > 0 ? "bottom-24" : "bottom-6"
        )}
      >
        <Menu size={24} />
      </button>
      
      {popoverOpen && (
        <CategoryList
          categories={selectedTab === "standard" ? categories : expressCategories}
          onCategorySelect={scrollToCategory}
          onClose={() => setPopoverOpen(false)}
        />
      )}

      {selectedService && (
        <ServiceOrderPopup
          service={selectedService}
          isOpen={selectedService !== null}
          onClose={handleCloseServicePopup}
          onAddToCart={handleAddToCart}
          isExpress={selectedTab === "express"}
        />
      )}
    </div>
  );
};

export default ServiceList;
