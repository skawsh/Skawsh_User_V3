
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/ui-elements/GlassCard';
import { Shirt, Wind, Droplets, TimerReset, Zap, Search, ChevronRight, Footprints, Trash, WashingMachine } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Services: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState<ServiceCategory[]>([]);
  
  const services: ServiceCategory[] = [
    {
      id: 'core-laundry',
      name: 'Core Laundry Services',
      icon: <WashingMachine size={24} className="text-blue-500" />,
      description: 'Essential laundry services for everyday needs',
      subServices: [
        {
          id: 'wash-fold',
          name: 'Wash & Fold',
          description: 'Complete washing and folding of your clothes'
        },
        {
          id: 'wash-iron',
          name: 'Wash & Iron',
          description: 'Full service washing and professional ironing'
        }
      ]
    },
    {
      id: 'dry-cleaning',
      name: 'Dry Cleaning Services',
      icon: <Shirt size={24} className="text-primary" />,
      description: 'Professional cleaning for all types of garments',
      subServices: [
        {
          id: 'daily-wear',
          name: 'Daily Wear',
          description: 'Dry cleaning for your everyday clothing items'
        },
        {
          id: 'ethnic-wear',
          name: 'Ethnic Wear',
          description: 'Specialized care for traditional and cultural garments'
        },
        {
          id: 'winter-wear',
          name: 'Winter Wear',
          description: 'Deep cleaning for jackets, coats, and sweaters'
        },
        {
          id: 'miscellaneous',
          name: 'Miscellaneous',
          description: 'Dry cleaning for other specialized clothing items'
        }
      ]
    },
    {
      id: 'shoe-laundry',
      name: 'Shoe Laundry',
      icon: <Footprints size={24} className="text-amber-500" />,
      description: 'Professional cleaning for all types of footwear',
      subServices: [
        {
          id: 'calf-boots',
          name: 'Calf Boots',
          description: 'Cleaning service for calf-length boots'
        },
        {
          id: 'heels',
          name: 'Heels',
          description: 'Specialized cleaning for all types of heel shoes'
        },
        {
          id: 'high-boots',
          name: 'High Boots',
          description: 'Thorough cleaning for knee-high and taller boots'
        },
        {
          id: 'sandals',
          name: 'Sandals',
          description: 'Professional cleaning for open footwear'
        },
        {
          id: 'shoe-boots',
          name: 'Shoe-Boots',
          description: 'Cleaning for ankle and short boots'
        },
        {
          id: 'canvas-sports',
          name: 'Canvas/Sports Shoes',
          description: 'Deep cleaning for athletic and casual canvas shoes'
        },
        {
          id: 'leather-formal',
          name: 'Leather/Formal Shoes',
          description: 'Professional care for leather and business footwear'
        }
      ]
    },
    {
      id: 'wash-fold',
      name: 'Wash & Fold',
      icon: <Wind size={24} className="text-blue-500" />,
      description: 'Complete laundry washing and folding services',
      subServices: [
        {
          id: 'regular-wash-fold',
          name: 'Regular Wash & Fold',
          description: 'Standard washing and folding for everyday laundry'
        },
        {
          id: 'premium-wash-fold',
          name: 'Premium Wash & Fold',
          description: 'Premium detergents and extra care for your clothes'
        }
      ]
    },
    {
      id: 'ironing',
      name: 'Ironing',
      icon: <Droplets size={24} className="text-amber-500" />,
      description: 'Professional pressing and wrinkle removal',
      subServices: [
        {
          id: 'basic-ironing',
          name: 'Basic Ironing',
          description: 'Standard ironing for shirts, pants, and dresses'
        },
        {
          id: 'full-outfit-pressing',
          name: 'Full Outfit Pressing',
          description: 'Complete pressing for suits, dresses, and formal outfits'
        }
      ]
    },
    {
      id: 'express',
      name: 'Express Services',
      icon: <TimerReset size={24} className="text-red-500" />,
      description: 'Quick turnaround for urgent requirements',
      subServices: [
        {
          id: 'same-day-service',
          name: 'Same-Day Service',
          description: 'Get your items back on the same day when ordered before 10 AM'
        },
        {
          id: 'rush-hour-service',
          name: 'Rush Hour Service',
          description: '3-hour service for urgent cleaning needs'
        }
      ]
    },
    {
      id: 'special',
      name: 'Special Treatments',
      icon: <Zap size={24} className="text-purple-500" />,
      description: 'Specialized cleaning for specific items and stains',
      subServices: [
        {
          id: 'stain-removal',
          name: 'Stain Removal',
          description: 'Professional treatment for tough stains'
        },
        {
          id: 'odor-removal',
          name: 'Odor Removal',
          description: 'Special treatment to eliminate unpleasant odors'
        }
      ]
    }
  ];

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredServices(services);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = services.filter(category => {
        // Check if category name matches
        if (category.name.toLowerCase().includes(query)) {
          return true;
        }
        
        // Check if any subservice matches
        const hasMatchingSubservice = category.subServices.some(
          subservice => 
            subservice.name.toLowerCase().includes(query) || 
            subservice.description.toLowerCase().includes(query)
        );
        
        return hasMatchingSubservice;
      });
      
      setFilteredServices(filtered);
    }
  }, [searchQuery]);

  // Initialize filtered services with all services
  useEffect(() => {
    setFilteredServices(services);
  }, []);

  return (
    <Layout>
      <div className="section-container pb-10">
        <h1 className="text-2xl font-semibold mb-4 pt-2 animate-fade-in">Our Services</h1>
        
        <div className="mb-6 relative animate-fade-in">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <Input 
            type="text"
            placeholder="Search services..." 
            className="pl-10 bg-gray-50 border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="space-y-6 animate-fade-in">
          {filteredServices.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No services found matching "{searchQuery}"
            </div>
          ) : (
            filteredServices.map((category, index) => (
              <div 
                key={category.id}
                className={cn(
                  "transition-all duration-300",
                  {"animate-slide-in-bottom": true}
                )}
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <GlassCard className="overflow-hidden transition-all duration-300 hover:shadow-md">
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-full bg-gray-100 p-3 flex items-center justify-center">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 text-lg text-left">{category.name}</h3>
                        <p className="text-sm text-gray-500 mt-0.5 text-left">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pl-14 mt-4">
                      {category.subServices.map((subService) => (
                        <div 
                          key={subService.id}
                          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <h4 className="font-medium text-gray-700">{subService.name}</h4>
                            <p className="text-sm text-gray-500 mt-0.5">{subService.description}</p>
                          </div>
                          <ChevronRight size={18} className="text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

interface SubService {
  id: string;
  name: string;
  description: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  subServices: SubService[];
}

export default Services;
