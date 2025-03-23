import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import ServiceTabs from './service/ServiceTabs';
import ServiceCategoryList from './service/ServiceCategoryList';
import CategoryList from './categories/CategoryList';
import ServiceOrderPopup from './ServiceOrderPopup';
import { Menu } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Service, CartItem, ServiceCategory } from '@/types/serviceTypes';
import { useServiceData } from '@/hooks/useServiceData';
import WashingMachineCelebration from '../animations/WashingMachineCelebration';

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
  const [mixedServicesDialogOpen, setMixedServicesDialogOpen] = useState(false);
  const [pendingService, setPendingService] = useState<Service | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const tabsContentHeight = useRef<number>(0);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const { 
    categories, 
    expressCategories, 
    backgroundColors,
    deliveryMessages
  } = useServiceData(services);

  const updatedDeliveryMessages = {
    ...deliveryMessages,
    standard: "Delivery in just 36 sunlight hours after pickup"
  };

  const updatedBackgroundColors = {
    ...backgroundColors,
    standard: "bg-[#D5E7FF]"
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
  
  const getExistingWashType = (): string | null => {
    if (cartItems.length === 0) return null;
    
    const expressItemExists = cartItems.some(item => {
      return item.washType === "express";
    });
    
    return expressItemExists ? "express" : "standard";
  };

  const handleOpenServicePopup = (service: Service) => {
    const existingWashType = getExistingWashType();
    const currentWashType = selectedTab;
    
    if (existingWashType && existingWashType !== currentWashType) {
      setPendingService(service);
      setMixedServicesDialogOpen(true);
      return;
    }
    
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

  const handleAddToCart = (orderDetails: any) => {
    const roundedWeight = orderDetails.weight ? Math.round(orderDetails.weight * 10) / 10 : 0;
    
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.serviceId === orderDetails.serviceId);
      
      const updatedOrderDetails = {
        ...orderDetails,
        washType: selectedTab
      };
      
      let updatedItems;
      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          serviceId: updatedOrderDetails.serviceId,
          serviceName: updatedOrderDetails.serviceName,
          weight: roundedWeight,
          price: Math.round(updatedOrderDetails.price * 100) / 100,
          quantity: updatedOrderDetails.quantity,
          studioId: studioId,
          items: updatedOrderDetails.items,
          washType: updatedOrderDetails.washType
        };
        updatedItems = newItems;
      } else {
        updatedItems = [...prev, {
          serviceId: updatedOrderDetails.serviceId,
          serviceName: updatedOrderDetails.serviceName,
          weight: roundedWeight,
          price: Math.round(updatedOrderDetails.price * 100) / 100,
          quantity: updatedOrderDetails.quantity,
          studioId: studioId,
          items: updatedOrderDetails.items,
          washType: updatedOrderDetails.washType
        }];
        
        const hasShownCelebration = localStorage.getItem('hasShownCelebration');
        if (!hasShownCelebration && prev.length === 0) {
          setShowCelebration(true);
          localStorage.setItem('hasShownCelebration', 'true');
        }
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

  const handleServiceInteractions = {
    increaseWeight: (service: Service) => {
      const existingWashType = getExistingWashType();
      const currentWashType = selectedTab;
      
      if (existingWashType && existingWashType !== currentWashType && !cartItems.some(item => item.serviceId === service.id)) {
        setPendingService(service);
        setMixedServicesDialogOpen(true);
        return;
      }
      
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
    },

    decreaseWeight: (service: Service) => {
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
    },

    cardClick: (service: Service) => {
      const existingItem = cartItems.find(item => item.serviceId === service.id);
      
      if (existingItem) {
        if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
          setSelectedService(service);
        }
      } else {
        const existingWashType = getExistingWashType();
        const currentWashType = selectedTab;
        
        if (existingWashType && existingWashType !== currentWashType) {
          setPendingService(service);
          setMixedServicesDialogOpen(true);
          return;
        }
        
        handleOpenServicePopup(service);
      }
    }
  };

  const handleSwitchToStandard = () => {
    const updatedItems = cartItems.filter(item => item.washType !== "express");
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    document.dispatchEvent(new Event('cartUpdated'));
    setSelectedTab("standard");
    setMixedServicesDialogOpen(false);
    
    if (pendingService) {
      setTimeout(() => {
        if (pendingService.unit && (pendingService.unit.includes('per kg') || pendingService.unit.includes('per sft'))) {
          setSelectedService(pendingService);
        } else {
          handleAddToCart({
            serviceId: pendingService.id,
            serviceName: pendingService.name,
            quantity: 1,
            price: pendingService.price,
            studioId: studioId,
            items: []
          });
        }
        
        setPendingService(null);
      }, 300);
    }
  };
  
  const handleContinueMixedTypes = () => {
    if (pendingService) {
      if (pendingService.unit && (pendingService.unit.includes('per kg') || pendingService.unit.includes('per sft'))) {
        setSelectedService(pendingService);
      } else {
        const price = selectedTab === "express" ? pendingService.price * 1.5 : pendingService.price;
        handleAddToCart({
          serviceId: pendingService.id,
          serviceName: pendingService.name,
          quantity: 1,
          price: price,
          studioId: studioId,
          items: []
        });
      }
      
      setPendingService(null);
      setMixedServicesDialogOpen(false);
      
      toast("Multiple delivery types selected. Your items will be delivered separately");
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
        updatedBackgroundColors[selectedTab as keyof typeof updatedBackgroundColors]
      )} 
      ref={tabsWrapperRef}
    >
      <div ref={tabsRef} className="transition-all duration-300">
        <ServiceTabs 
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
          isTabsSticky={isTabsSticky}
          tabsContentHeight={tabsContentHeight.current}
          tabsListRef={tabsListRef}
          deliveryMessage={updatedDeliveryMessages[selectedTab as keyof typeof updatedDeliveryMessages]}
          backgroundColors={updatedBackgroundColors}
        >
          <ServiceCategoryList 
            categories={selectedTab === "standard" ? categories : expressCategories}
            tabType={selectedTab}
            getServiceWeight={getServiceWeight}
            getServiceQuantity={getServiceQuantity}
            onServiceInteractions={handleServiceInteractions}
            setCategoryRef={setCategoryRef}
          />
        </ServiceTabs>
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
      
      <Dialog open={mixedServicesDialogOpen} onOpenChange={setMixedServicesDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogTitle className="text-center text-lg font-semibold pt-2">
            {getExistingWashType() === "express" ? "Standard & Express Wash" : "Express & Standard Wash"}
          </DialogTitle>
          <DialogDescription className="text-center py-4">
            You selected different wash types that require separate deliveries. Please continue or Switch to Standard wash for Single delivery
          </DialogDescription>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center mt-2">
            <Button 
              variant="outline" 
              onClick={handleSwitchToStandard}
              className="border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              Switch to Standard
            </Button>
            <Button 
              onClick={handleContinueMixedTypes}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <WashingMachineCelebration 
        isVisible={showCelebration} 
        onAnimationComplete={() => setShowCelebration(false)} 
      />
    </div>
  );
};

export default ServiceList;
