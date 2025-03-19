
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/ui-elements/GlassCard';
import { Shirt, Wind, Droplets, TimerReset, Zap, Search, ChevronDown, Footprints, WashingMachine } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const Services: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState<ServiceCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const handleSubserviceClick = (categoryName: string, subService: SubService) => {
    navigate(`/services/${subService.id}`, {
      state: {
        serviceName: `${subService.name}`,
        from: '/services'
      }
    });
  };
  
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

  const getSubserviceImage = (serviceId: string, subserviceId: string): string => {
    if (serviceId === 'core-laundry') {
      if (subserviceId === 'wash-fold') {
        return '/lovable-uploads/03679588-3192-460b-ae06-1c4541039aa2.png';
      } else {
        return 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
      }
    } else if (serviceId === 'dry-cleaning') {
      return 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
    } else if (serviceId === 'shoe-laundry') {
      return 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
    } else {
      return 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredServices(services);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = services.filter(category => {
        if (category.name.toLowerCase().includes(query)) {
          return true;
        }
        
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

  useEffect(() => {
    setFilteredServices(services);
    if (services.length > 0) {
      setExpandedCategories([services[0].id]);
    }
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
        
        <div className="space-y-8 animate-fade-in">
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
                <div className="mb-3">
                  <div 
                    className="bg-gray-100 p-4 rounded-lg flex items-center justify-between cursor-pointer"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-white p-3 flex items-center justify-center shadow-sm">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-gray-800 text-xl">{category.name}</h3>
                    </div>
                    <ChevronDown 
                      size={24} 
                      className={cn(
                        "text-gray-400 transition-transform duration-300",
                        expandedCategories.includes(category.id) ? "transform rotate-180" : ""
                      )}
                    />
                  </div>
                </div>
                
                {expandedCategories.includes(category.id) && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4 pl-4 pr-4">
                    {category.subServices.map((subService) => (
                      <div 
                        key={subService.id} 
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => handleSubserviceClick(category.name, subService)}
                      >
                        <div className="relative w-32 h-32 mb-3 shadow-md rounded-full overflow-hidden">
                          <img 
                            src={getSubserviceImage(category.id, subService.id)} 
                            alt={subService.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-medium text-gray-800 text-center">{subService.name}</h4>
                      </div>
                    ))}
                  </div>
                )}
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
