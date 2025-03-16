
import React, { useState, useRef, useEffect } from 'react';
import { Clock, Plus, ShoppingBag, Shirt, Menu, Footprints, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ServiceCategory {
  title: string;
  icon: React.ReactNode;
  services: Service[];
  count?: number;
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
  const isMobile = useIsMobile();
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);

  const coreServices = services.filter(s => s.name.includes('Wash'));
  const dryCleaningServices = services.filter(s => !s.name.includes('Wash') && !s.name.includes('shoe') && !s.name.includes('Shoe'));
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
    services: coreServices,
    count: 6
  }, {
    title: "Dry Cleaning Services",
    icon: <Shirt size={16} className="text-white bg-black rounded-full" />,
    services: dryCleaningServices,
    count: 30
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
  
  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        const headerHeight = 112; 
        
        setIsTabsSticky(rect.top <= headerHeight);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={cn("mt-[-2px] animate-fade-in p-4 rounded-lg transition-colors duration-300 -mx-2 relative", backgroundColors[selectedTab as keyof typeof backgroundColors])}>
      {popoverOpen && <div onClick={() => setPopoverOpen(false)} className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30 px-0 py-0" />}
      
      <div 
        ref={tabsRef} 
        className={cn(
          "transition-all duration-300",
          isTabsSticky ? 
            "fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm" : 
            ""
        )}
      >
        {isTabsSticky && (
          <div className="flex items-center p-3 pb-2 border-b border-gray-100">
            <button onClick={() => window.history.back()} className="mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="text-xl font-semibold">Pristine Laundry</h2>
          </div>
        )}
        
        <div className={cn(
          "px-4 py-2",
          isTabsSticky ? "bg-white" : ""
        )}>
          <div className="flex space-x-2">
            <button 
              onClick={() => setSelectedTab("standard")}
              className={cn(
                "flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                selectedTab === "standard" 
                  ? "bg-blue-600 text-white border-blue-600" 
                  : "bg-white text-gray-700 border-gray-200"
              )}
            >
              <Clock size={16} className="mr-2" />
              Standard Wash
            </button>
            <button 
              onClick={() => setSelectedTab("express")}
              className={cn(
                "flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                selectedTab === "express" 
                  ? "bg-orange-500 text-white border-orange-500" 
                  : "bg-white text-gray-500 border-gray-200"
              )}
            >
              <Clock size={16} className="mr-2" />
              Express Wash
            </button>
          </div>
        </div>
      </div>
      
      <div className={cn("", isTabsSticky ? "mt-28" : "mt-4")}>
        <div className={cn("flex items-center gap-2 mb-4 text-sm transition-colors duration-300", selectedTab === "standard" ? "text-blue-600" : "text-orange-500")}>
          <Clock size={16} />
          <span>{deliveryMessages[selectedTab as keyof typeof deliveryMessages]}</span>
        </div>
        
        <div className="space-y-8">
          {categories.map((category, idx) => (
            <div key={idx} ref={el => categoryRefs.current[category.title] = el}>
              <div className="flex items-center gap-2 mb-4">
                {category.icon}
                <h2 className="text-lg font-bold">{category.title}</h2>
              </div>

              <div className="space-y-4">
                {category.services.map(service => (
                  <Card key={service.id} className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                          {service.name.includes('Fold') ? (
                            <img src="/lovable-uploads/0ef15cb3-a69a-4edc-b3d3-cecffd98ac53.png" alt="Laundry" className="w-full h-full object-cover" />
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
                            <span className="text-primary font-semibold">₹{selectedTab === "standard" ? service.price.toFixed(0) : (service.price * 1.5).toFixed(0)}</span>
                            <div className="flex items-center gap-0.5 ml-1">
                              <Star size={12} className="fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-gray-500">4.8</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                        </div>
                      </div>
                      
                      <Button
                        variant="default"
                        size="sm"
                        className={cn(
                          "rounded-full",
                          selectedTab === "standard" ? "bg-blue-600 hover:bg-blue-700" : "bg-orange-500 hover:bg-orange-600"
                        )}
                      >
                        <Plus size={16} className="mr-1" /> Add
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!popoverOpen ? (
        <button onClick={() => setPopoverOpen(true)} className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 text-white flex items-center justify-center transition-all duration-300 animate-scale-in bg-black`}>
          <Menu className="h-6 w-6" />
        </button>
      ) : (
        <div className="fixed bottom-0 transform transition-all duration-300 z-50 animate-slide-in-right" style={{
          height: isMobile ? '40vh' : '45.05vh',
          bottom: '1.5rem',
          right: '1rem',
          maxHeight: '400px',
          width: '70%',
          maxWidth: '260px'
        }}>
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
                      {category.services.map((service, serviceIdx) => (
                        <button key={serviceIdx} onClick={() => scrollToCategory(category.title)} className="w-full py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/30 transition-colors rounded-lg px-3 font-normal text-left">
                          {service.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
