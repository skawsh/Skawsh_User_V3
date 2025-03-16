import React, { useState, useRef } from 'react';
import { Clock, Plus, ShoppingBag, Shirt, Menu, Footprints } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
}

interface ServiceListProps {
  services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  const [selectedTab, setSelectedTab] = useState<string>("standard");
  const [popoverOpen, setPopoverOpen] = useState(false);
  
  // Refs for each category section
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  // Group services into categories
  const coreServices = services.filter(s => s.name.includes('Wash'));
  const dryCleaningServices = services.filter(s => !s.name.includes('Wash') && !s.name.includes('shoe') && !s.name.includes('Shoe'));
  
  // Define shoe laundry services
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
      icon: <ShoppingBag size={16} className="text-primary" />,
      services: coreServices 
    },
    { 
      title: "Dry Cleaning Services", 
      icon: <Shirt size={16} className="text-primary" />,
      services: dryCleaningServices 
    },
    {
      title: "Shoe Laundry Services",
      icon: <Footprints size={16} className="text-primary" />,
      services: shoeServices
    }
  ];

  // Delivery time messages based on selected tab
  const deliveryMessages = {
    standard: "Delivery in just 36 sunlight hours after pickup",
    express: "Delivery in just 12 sunlight hours after pickup"
  };

  // Background colors based on selected tab
  const backgroundColors = {
    standard: "bg-blue-50",
    express: "bg-orange-50"
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  // Scroll to a specific category section
  const scrollToCategory = (categoryTitle: string) => {
    const element = categoryRefs.current[categoryTitle];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close the popover after selecting a category
    setPopoverOpen(false);
  };

  return (
    <div className={cn("mt-[-2px] animate-fade-in p-4 rounded-lg transition-colors duration-300 -mx-2", backgroundColors[selectedTab as keyof typeof backgroundColors])}>
      {/* Service type selector tabs */}
      <Tabs defaultValue="standard" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger 
            value="standard" 
            className={cn(
              "rounded-full transition-colors duration-300", 
              selectedTab === "standard" ? "bg-blue-600 text-white shadow-lg" : ""
            )}
          >
            <Clock size={16} className="mr-2" />
            Standard Wash
          </TabsTrigger>
          <TabsTrigger 
            value="express" 
            className={cn(
              "rounded-full transition-colors duration-300", 
              selectedTab === "express" ? "bg-orange-500 text-white shadow-lg" : ""
            )}
          >
            <Clock size={16} className="mr-2" />
            Express Wash
          </TabsTrigger>
        </TabsList>

        {/* Service delivery time indicator - changes based on selected tab */}
        <div className={cn(
          "flex items-center gap-2 mb-4 text-sm transition-colors duration-300",
          selectedTab === "standard" ? "text-blue-600" : "text-orange-500"
        )}>
          <Clock size={16} />
          <span>{deliveryMessages[selectedTab as keyof typeof deliveryMessages]}</span>
        </div>
        
        <TabsContent value="standard">
          {/* Service Categories for Standard */}
          <div className="space-y-8">
            {categories.map((category, idx) => (
              <div 
                key={idx} 
                ref={el => categoryRefs.current[category.title] = el}
              >
                <div className="flex items-center gap-2 mb-4">
                  {category.icon}
                  <h2 className="text-lg font-bold">{category.title}</h2>
                </div>

                <div className="space-y-4">
                  {category.services.map((service) => (
                    <Card key={service.id} className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                            {service.name.includes('Fold') ? (
                              <img 
                                src="/lovable-uploads/0ef15cb3-a69a-4edc-b3d3-cecffd98ac53.png" 
                                alt="Laundry" 
                                className="w-full h-full object-cover"
                              />
                            ) : service.name.includes('Shoe') || service.name.includes('shoe') || 
                               service.name.includes('Sneaker') || service.name.includes('Sandal') || 
                               service.name.includes('Canvas') || service.name.includes('Leather') || 
                               service.name.includes('Heel') ? (
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
                              <span className="text-primary font-semibold">₹{service.price.toFixed(0)}</span>
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
                          className="rounded-full bg-blue-600 hover:bg-blue-700"
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
        </TabsContent>

        <TabsContent value="express">
          {/* Service Categories for Express */}
          <div className="space-y-8">
            {categories.map((category, idx) => (
              <div 
                key={idx} 
                ref={el => categoryRefs.current[category.title] = el}
              >
                <div className="flex items-center gap-2 mb-4">
                  {category.icon}
                  <h2 className="text-lg font-bold">{category.title}</h2>
                </div>

                <div className="space-y-4">
                  {category.services.map((service) => (
                    <Card key={service.id} className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                            {service.name.includes('Fold') ? (
                              <img 
                                src="/lovable-uploads/0ef15cb3-a69a-4edc-b3d3-cecffd98ac53.png" 
                                alt="Laundry" 
                                className="w-full h-full object-cover"
                              />
                            ) : service.name.includes('Shoe') || service.name.includes('shoe') || 
                               service.name.includes('Sneaker') || service.name.includes('Sandal') || 
                               service.name.includes('Canvas') || service.name.includes('Leather') || 
                               service.name.includes('Heel') ? (
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
                              <span className="text-primary font-semibold">₹{(service.price * 1.5).toFixed(0)}</span>
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
                          className="rounded-full bg-orange-500 hover:bg-orange-600"
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
        </TabsContent>
      </Tabs>

      {/* Floating action button for services menu - now using Popover instead of Dialog */}
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button 
            size="icon" 
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40"
            style={{ 
              background: selectedTab === "standard" ? "#2563eb" : "#f97316", 
              color: "white"
            }}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="p-4 rounded-xl w-72 shadow-lg border-none"
          align="end"
          sideOffset={16}
        >
          <h3 className="text-lg font-semibold mb-4">Service Categories</h3>
          <div className="space-y-2">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCategory(category.title)}
                className="flex items-center w-full gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: selectedTab === "standard" ? "#dbeafe" : "#ffedd5" }}
                >
                  {category.icon}
                </div>
                <span className="font-medium">{category.title}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ServiceList;
