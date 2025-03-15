
import React from 'react';
import { Clock, Plus, ShoppingBag, Shirt } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from 'lucide-react';

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

  return (
    <div className="mt-8 animate-fade-in">
      {/* Service delivery time indicator */}
      <div className="flex items-center gap-2 mb-4 text-sm text-orange-500">
        <Clock size={16} />
        <span>Delivery in just 12 sunlight hours after pickup</span>
      </div>

      {/* Service type selector tabs */}
      <Tabs defaultValue="standard">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="standard" className="rounded-full">
            <Clock size={16} className="mr-2" />
            Standard Wash
          </TabsTrigger>
          <TabsTrigger value="express" className="rounded-full text-orange-500">
            <Clock size={16} className="mr-2" />
            Express Wash
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Service Categories */}
      <div className="space-y-8">
        {categories.map((category, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 mb-4">
              {category.icon}
              <h2 className="text-lg font-bold">{category.title}</h2>
            </div>

            <div className="space-y-4">
              {category.services.map((service) => (
                <Card key={service.id} className="p-4 shadow-sm">
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
                      className="rounded-full bg-blue-600"
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
  );
};

export default ServiceList;
