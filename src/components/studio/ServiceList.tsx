import React, { useState, useRef, useEffect } from 'react';
import { Clock, Plus, ShoppingBag, Shirt, Menu, Footprints, X, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import ServiceOrderPopup from './ServiceOrderPopup';
import { toast } from 'sonner';

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
  weight: number;
  price: number;
  items: {
    name: string;
    quantity: number;
  }[];
}

interface ServiceCategory {
  title: string;
  icon: React.ReactNode;
  services: Service[];
  count?: number;
  subCategories?: SubCategory[];
}

interface SubCategory {
  title: string;
  icon: React.ReactNode;
  services: Service[];
}

interface ServiceListProps {
  services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({
  services
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
8 name: 'Ladies Top',
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

  const shoeServices: Service[] = [{
    id: 'shoe-1',
    name: 'Regular Shoes',
    description: 'Deep cleaning for regular everyday shoes',
    price: 299
  }, {
    id: 'shoe-2',
    name: 'Leather Shoes',
    description: 'Specialized cleaning and conditioning for leather footwear',
    price: 399
  }, {
    id: 'shoe-3',
    name: 'Sneakers',
    description: 'Thorough cleaning for sports shoes and sneakers',
    price: 349
  }, {
    id: 'shoe-4',
    name: 'Canvas Shoes',
    description: 'Cleaning and whitening for canvas footwear',
    price: 249
  }, {
    id: 'shoe-5',
    name: 'Sandals',
    description: 'Cleaning and sanitizing for all types of sandals',
    price: 199
  }, {
    id: 'shoe-6',
    name: 'Heels',
    description: 'Gentle cleaning and polishing for formal heels',
    price: 349
  }];

  const categories: ServiceCategory[] = [{
    title: "Core Laundry Services",
    icon: <ShoppingBag size={16} className="text-white bg-stone-800 rounded-full" />,
    services: updatedCoreServices,
    count: updatedCoreServices.length
  }, {
    title: "Dry Cleaning Services",
    icon: <Shirt size={16} className="text-white bg-black rounded-full" />,
    services: [],
    count: 5,
    subCategories: dryCleaningSubCategories
  }, {
    title: "Shoe Laundry Services",
    icon: <Footprints size={16} className="text-white bg-slate-950 rounded-3xl" />,
    services: shoeServices,
    count: 11
  }];

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
        items: []
      });
    }
  };
  
  const handleCloseServicePopup = () => {
    setSelectedService(null);
  };
  
  const handleAddToCart = (orderDetails: any) => {
    console.log('Added to cart:', orderDetails);
    
    const roundedWeight = Math.round(orderDetails.weight * 10) / 10;
    
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.serviceId === orderDetails.serviceId);
      
      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          serviceId: orderDetails.serviceId,
          serviceName: orderDetails.serviceName,
          weight: roundedWeight,
          price: Math.round(orderDetails.price * 100) / 100,
          items: orderDetails.items
        };
        return newItems;
      } else {
        return [...prev, {
          serviceId: orderDetails.serviceId,
          serviceName: orderDetails.serviceName,
          weight: roundedWeight,
          price: Math.round(orderDetails.price * 100) / 100,
          items: orderDetails.items
        }];
      }
    });
    
    toast.success(`Added ${orderDetails.serviceName} to your cart!`);
  };

  const getServiceWeight = (serviceId: string): number | null => {
    const item = cartItems.find(item => item.serviceId === serviceId);
    return item ? item.weight : null;
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
        items: []
      });
    } else {
      const existingItem = cartItems.find(item => item.serviceId === service.id);
      const quantity = existingItem ? (existingItem.quantity || 1) + 1 : 1;
      
      handleAddToCart({
        serviceId: service.id,
        serviceName: service.name,
        quantity: quantity,
        price: service.price * quantity,
        items: []
      });
    }
  };

  const handleDecreaseWeight = (service: Service) => {
    if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
      const currentWeight = getServiceWeight(service.id) || 0;
      
      if (currentWeight <= 1) {
        setCartItems(prev => prev.filter(item => item.serviceId !== service.id));
        return;
      }
      
      const newWeight = Math.round((currentWeight - 0.1) * 10) / 10;
      handleAddToCart({
        serviceId: service.id,
        serviceName: service.name,
        weight: newWeight,
        price: service.price * newWeight,
        items: []
      });
    } else {
      const existingItem = cartItems.find(item => item.serviceId === service.id);
      if (!existingItem) return;
      
      const quantity = (existingItem.quantity || 1) - 1;
      
      if (quantity <= 0) {
        setCartItems(prev => prev.filter(item => item.serviceId !== service.id));
        return;
      }
      
      handleAddToCart({
        serviceId: service.id,
        serviceName: service.name,
        quantity: quantity,
        price: service.price * quantity,
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
      {popoverOpen && (
        <div 
          onClick={() => setPopoverOpen(false)} 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30 px-0 py-0" 
        />
      )}
      
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
                  <TabsTrigger value="standard" className={cn("rounded-full border shadow-sm transition-colors duration-300 flex items-center justify-center h-10", selectedTab === "standard" ? "text-white bg-blue-600 border-blue-600" : "text-gray-500 bg-white border-gray-200")}>
                    <Clock size={16} className="mr-2" />
                    Standard Wash
                  </TabsTrigger>
                  <TabsTrigger value="express" className={cn("rounded-full border shadow-sm transition-colors duration-300 flex items-center justify-center h-10", selectedTab === "express" ? "text-white bg-orange-500 border-orange-500" : "text-gray-500 bg-white border-gray-200")}>
                    <Clock size={16} className="mr-2" />
                    Express Wash
                  </TabsTrigger>
                </TabsList>
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
              <TabsTrigger value="standard" className={cn("rounded-full border shadow-sm transition-colors duration-300 flex items-center justify-center h-10", selectedTab === "standard" ? "text-white bg-blue-600 border-blue-600" : "text-gray-500 bg-white border-gray-200")}>
                <Clock size={16} className="mr-2" />
                Standard Wash
              </TabsTrigger>
              <TabsTrigger value="express" className={cn("rounded-full border shadow-sm transition-colors duration-300 flex items-center justify-center h-10", selectedTab === "express" ? "text-white bg-orange-500 border-orange-500" : "text-gray-500 bg-white border-gray-200")}>
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
                <div key={idx} ref={el => categoryRefs.current[category.title] = el}>
                  <div className="flex items-center gap-2 mb-4">
                    {category.icon}
                    <h2 className="text-lg font-bold">{category.title}</h2>
                  </div>

                  {category.subCategories ? (
                    <div className="space-y-8">
                      {category.subCategories.map((subCategory, subIdx) => (
                        <div key={subIdx} className="ml-2">
                          <div className="flex items-center gap-2 mb-3">
                            {subCategory.icon}
                            <h3 className="text-md font-semibold">{subCategory.title}</h3>
                          </div>
                          
                          <div className="space-y-4">
                            {subCategory.services.map(service => (
                              <Card 
                                key={service.id} 
                                className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                                onClick={() => handleCardClick(service)}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex gap-3">
                                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                                      {service.name.includes('Shirt') || service.name.includes('T-shirt') || service.name.includes('Top') ? (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                          <Shirt size={20} className="text-gray-500" />
                                        </div>
                                      ) : service.name.includes('Pant') ? (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                          <Shirt size={20} className="text-gray-500" />
                                        </div>
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                          <Shirt size={20} className="text-gray-500" />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <h3 className="font-medium">{service.name}</h3>
                                      <div className="flex items-center gap-1">
                                        <span className="text-primary font-semibold">₹{service.price.toFixed(0)}{service.unit ? ` ${service.unit}` : ''}</span>
                                        <div className="flex items-center gap-0.5 ml-1">
                                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                          <span className="text-xs text-gray-500">4.8</span>
                                        </div>
                                      </div>
                                      <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                                    </div>
                                  </div>
                                  
                                  {getServiceWeight(service.id) ? (
                                    <div className="flex items-center">
                                      <Button 
                                        variant="default" 
                                        size="sm"
                                        className={cn(
                                          "rounded-l-full rounded-r-none",
                                          selectedTab === "standard" 
                                            ? "bg-blue-600 hover:bg-blue-700" 
                                            : "bg-orange-500 hover:bg-orange-600"
                                        )}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDecreaseWeight(service);
                                        }}
                                      >
                                        <Minus size={16} />
                                      </Button>
                                      <span className={cn(
                                        "px-2 py-1 text-sm font-medium", 
                                        selectedTab === "standard" ? "bg-blue-600" : "bg-orange-500",
                                        "text-white"
                                      )}>
                                        {(getServiceWeight(service.id) || 0).toFixed(1)}
                                      </span>
                                      <Button 
                                        variant="default" 
                                        size="sm"
                                        className={cn(
                                          "rounded-l-none rounded-r-full",
                                          selectedTab === "standard" 
                                            ? "bg-blue-600 hover:bg-blue-700" 
                                            : "bg-orange-500 hover:bg-orange-600"
                                        )}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleIncreaseWeight(service);
                                        }}
                                      >
                                        <Plus size={16} />
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button 
                                      variant="default" 
                                      size="sm"
                                      className={cn(
                                        "rounded-full",
                                        selectedTab === "standard" 
                                          ? "bg-blue-600 hover:bg-blue-700" 
                                          : "bg-orange-500 hover:bg-orange-600"
                                      )}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenServicePopup(service);
                                      }}
                                    >
                                      <Plus size={16} className="mr-1" /> Add
                                    </Button>
                                  )}
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {category.services.map(service => (
                        <Card 
                          key={service.id} 
                          className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                          onClick={() => handleCardClick(service)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex gap-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                                {service.name.includes('Fold') ? (
                                  <img src="/lovable-uploads/0ef15cb3-a69a-4edc-b3d3-cecffd98ac53.png" alt="Laundry" className="w-full h-full object-cover" />
                                ) : service.name.includes('Iron') ? (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <Clock size={20} className="text-gray-500" />
                                  </div>
                                ) : service.name.includes('Shoe') || service.name.includes('shoe') || service.name.includes('Sneaker') || service.name.includes('Sandal') || service.name.includes('Canvas') || service.name.includes('Leather') || service.name.includes('Heel') ? (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <Footprints size={20} className="text-gray-500" />
                                  </div>
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <ShoppingBag size={20} className="text-gray-500" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{service.name}</h3>
                                <div className="flex items-center gap-1">
                                  <span className="text-primary font-semibold">₹{service.price.toFixed(0)}{service.unit ? ` ${service.unit}` : ''}</span>
                                  <div className="flex items-center gap-0.5 ml-1">
                                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-gray-500">4.8</span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                              </div>
                            </div>
                            
                            {getServiceWeight(service.id) ? (
                              <div className="flex items-center">
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  className={cn(
                                    "rounded-l-full rounded-r-none",
                                    selectedTab === "standard" 
                                      ? "bg-blue-600 hover:bg-blue-700" 
                                      : "bg-orange-500 hover:bg-orange-600"
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDecreaseWeight(service);
                                  }}
                                >
                                  <Minus size={16} />
                                </Button>
                                <span className={cn(
                                  "px-2 py-1 text-sm font-medium", 
                                  selectedTab === "standard" ? "bg-blue-600" : "bg-orange-500",
                                  "text-white"
                                )}>
                                  {(getServiceWeight(service.id) || 0).toFixed(1)}
                                </span>
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  className={cn(
                                    "rounded-l-none rounded-r-full",
                                    selectedTab === "standard" 
                                      ? "bg-blue-600 hover:bg-blue-700" 
                                      : "bg-orange-500 hover:bg-orange-600"
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleIncreaseWeight(service);
                                  }}
                                >
                                  <Plus size={16} />
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                variant="default" 
                                size="sm"
                                className={cn(
                                  "rounded-full",
                                  selectedTab === "standard" 
                                    ? "bg-blue-600 hover:bg-blue-700" 
                                    : "bg-orange-500 hover:bg-orange-600"
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenServicePopup(service);
                                }}
                              >
                                <Plus size={16} className="mr-1" /> Add
                              </Button>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="express">
            <div className="space-y-8">
              {categories.map((category, idx) => (
                <div key={idx} ref={el => categoryRefs.current[category.title] = el}>
                  <div className="flex items-center gap-2 mb-4">
                    {category.icon}
                    <h2 className="text-lg font-bold">{category.title}</h2>
                  </div>

                  {category.subCategories ? (
                    <div className="space-y-8">
                      {category.subCategories.map((subCategory, subIdx) => (
                        <div key={subIdx} className="ml-2">
                          <div className="flex items-center gap-2 mb-3">
                            {subCategory.icon}
                            <h3 className="text-md font-semibold">{subCategory.title}</h3>
                          </div>
                          
                          <div className="space-y-4">
                            {subCategory.services.map(service => (
                              <Card 
                                key={service.id} 
                                className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                                onClick={() => handleCardClick(service)}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex gap-3">
                                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                                      {service.name.includes('Shirt') || service.name.includes('T-shirt') || service.name.includes('Top') ? (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                          <Shirt size={20} className="text-gray-500" />
                                        </div>
                                      ) : service.name.includes('Pant') ? (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                          <Shirt size={20} className="text-gray-500" />
                                        </div>
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                          <Shirt size={20} className="text-gray-500" />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <h3 className="font-medium">{service.name}</h3>
                                      <div className="flex items-center gap-1">
                                        <span className="text-primary font-semibold">₹{(service.price * 1.5).toFixed(0)}{service.unit ? ` ${service.unit}` : ''}</span>
                                        <div className="flex items-center gap-0.5 ml-1">
                                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                          <span className="text-xs text-gray-500">4.8</span>
                                        </div>
                                      </div>
                                      <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                                    </div>
                                  </div>
                                  
                                  {getServiceWeight(service.id) ? (
                                    <div className="flex items-center">
                                      <Button 
                                        variant="default" 
                                        size="sm"
                                        className={cn(
                                          "rounded-l-full rounded-r-none",
                                          "bg-orange-500 hover:bg-orange-600"
                                        )}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDecreaseWeight(service);
                                        }}
                                      >
                                        <Minus size={16} />
                                      </Button>
                                      <span className={cn(
                                        "px-2 py-1 text-sm font-medium",
                                        "bg-orange-500 text-white"
                                      )}>
                                        {(getServiceWeight(service.id) || 0).toFixed(1)}
                                      </span>
                                      <Button 
                                        variant="default" 
                                        size="sm"
                                        className={cn(
                                          "rounded-l-none rounded-r-full",
                                          "bg-orange-500 hover:bg-orange-600"
                                        )}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleIncreaseWeight(service);
                                        }}
                                      >
                                        <Plus size={16} />
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button 
                                      variant="default" 
                                      size="sm"
                                      className={cn(
                                        "rounded-full",
                                        "bg-orange-500 hover:bg-orange-600"
                                      )}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenServicePopup(service);
                                      }}
                                    >
                                      <Plus size={16} className="mr-1" /> Add
                                    </Button>
                                  )}
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {category.services.map(service => (
                        <Card 
                          key={service.id} 
                          className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                          onClick={() => handleCardClick(service)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex gap-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                                {service.name.includes('Fold') ? (
                                  <img src="/lovable-uploads/0ef15cb3-a69a-4edc-b3d3-cecffd98ac53.png" alt="Laundry" className="w-full h-full object-cover" />
                                ) : service.name.includes('Iron') ? (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <Clock size={20} className="text-gray-500" />
                                  </div>
                                ) : service.name.includes('Shoe') || service.name.includes('shoe') || service.name.includes('Sneaker') || service.name.includes('Sandal') || service.name.includes('Canvas') || service.name.includes('Leather') || service.name.includes('Heel') ? (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <Footprints size={20} className="text-gray-500" />
                                  </div>
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <ShoppingBag size={20} className="text-gray-500" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{service.name}</h3>
                                <div className="flex items-center gap-1">
                                  <span className="text-primary font-semibold">₹{(service.price * 1.5).toFixed(0)}{service.unit ? ` ${service.unit}` : ''}</span>
                                  <div className="flex items-center gap-0.5 ml-1">
                                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-gray-500">4.8</span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                              </div>
                            </div>
                            
                            {getServiceWeight(service.id) ? (
                              <div className="flex items-center">
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  className={cn(
                                    "rounded-l-full rounded-r-none",
                                    "bg-orange-500 hover:bg-orange-600"
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDecreaseWeight(service);
                                  }}
                                >
                                  <Minus size={16} />
                                </Button>
                                <span className={cn(
                                  "px-2 py-1 text-sm font-medium",
                                  "bg-orange-500 text-white"
                                )}>
                                  {(getServiceWeight(service.id) || 0).toFixed(1)}
                                </span>
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  className={cn(
                                    "rounded-l-none rounded-r-full",
                                    "bg-orange-500 hover:bg-orange-600"
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleIncreaseWeight(service);
                                  }}
                                >
                                  <Plus size={16} />
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                variant="default" 
                                size="sm"
                                className={cn(
                                  "rounded-full",
                                  "bg-orange-500 hover:bg-orange-600"
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenServicePopup(service);
                                }}
                              >
                                <Plus size={16} className="mr-1" /> Add
                              </Button>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {!popoverOpen ? (
        <button 
          onClick={() => setPopoverOpen(true)} 
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 text-white flex items-center justify-center transition-all duration-300 animate-scale-in bg-black"
        >
          <Menu className="h-6 w-6" />
        </button>
      ) : (
        <div 
          className="fixed bottom-0 transform transition-all duration-300 z-50 animate-slide-in-right" 
          style={{
            height: isMobile ? '40vh' : '45.05vh',
            bottom: '1.5rem',
            right: '1rem',
            maxHeight: '400px',
            width: '70%',
            maxWidth: '260px'
          }}
        >
          <div className="bg-black text-white rounded-2xl overflow-hidden shadow-xl mr-0 mb-0 h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-800 sticky top-0 bg-black z-10 px-5">
              <h3 className="text-lg font-semibold truncate">Services</h3>
            </div>
            
            <ScrollArea className="flex-grow">
              <div className="p-2">
                {categories.map((category, idx) => (
                  <div key={idx} className="mb-3">
                    <button onClick={() => scrollToCategory(category.title)} className="flex items-center justify-between w-full py-3 hover:bg-gray-800/50 transition-colors rounded-lg px-5">
                      <span className="font-medium text-white text-base">{category.title}</span>
                      <span className="text-xs bg-gray-700 text-gray-300 rounded-full px-2 py-0.5">{category.count}</span>
                    </button>
                    
                    <div className="ml-7 mt-1 space-y-1">
                      {category.subCategories ? (
                        category.subCategories.map((subCategory, subIdx) => (
                          <button 
                            key={subIdx} 
                            onClick={() => scrollToCategory(category.title)} 
                            className="w-full py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/30 transition-colors rounded-lg px-3 font-normal text-left"
                          >
                            {subCategory.title}
                          </button>
                        ))
                      ) : (
                        category.services.map((service, serviceIdx) => (
                          <button 
                            key={serviceIdx} 
                            onClick={() => scrollToCategory(category.title)} 
                            className="w-full py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/30 transition-colors rounded-lg px-3 font-normal text-left"
                          >
                            {service.name}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}

      {selectedService && (
        <ServiceOrderPopup
          service={{
            ...selectedService,
            price: selectedTab === "express" ? selectedService.price * 1.5 : selectedService.price
          }}
          isOpen={!!selectedService}
          onClose={handleCloseServicePopup}
          onAddToCart={handleAddToCart}
          initialWeight={getServiceWeight(selectedService.id) || undefined}
        />
      )}
    </div>
  );
};

export default ServiceList;
