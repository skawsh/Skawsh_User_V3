
import React, { useState } from 'react';
import { Clock, Plus, ShoppingBag, Shirt } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";

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
  
  // Group services into categories
  const coreServices = services.filter(s => s.name.includes('Wash'));
  const dryCleaningServices = services.filter(s => !s.name.includes('Wash'));

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

  return (
    <div className={cn("mt-8 animate-fade-in p-4 rounded-lg transition-colors duration-300", backgroundColors[selectedTab as keyof typeof backgroundColors])}>
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
              <div key={idx}>
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
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <ShoppingBag size={20} className="text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{service.name}</h3>
                            <div className="flex items-center gap-1">
                              <span className="text-primary font-semibold">₹{service.price.toFixed(0)}/KG</span>
                              <div className="flex items-center gap-0.5 ml-1">
                                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-500">4.8</span>
                              </div>
                            </div>
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
              <div key={idx}>
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
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <ShoppingBag size={20} className="text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{service.name}</h3>
                            <div className="flex items-center gap-1">
                              <span className="text-primary font-semibold">₹{(service.price * 1.5).toFixed(0)}/KG</span>
                              <div className="flex items-center gap-0.5 ml-1">
                                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-500">4.8</span>
                              </div>
                            </div>
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
    </div>
  );
};

export default ServiceList;
