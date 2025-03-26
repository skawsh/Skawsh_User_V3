
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Shirt, Wind, Droplets, TimerReset, Zap, Search, ChevronDown, Footprints, WashingMachine, Heart } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import FooterSignature from '../components/FooterSignature';

const Services: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState<ServiceCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<FavoriteService[]>([]);
  const navigate = useNavigate();
  
  // Load favorites from localStorage
  useEffect(() => {
    try {
      const storedServices = localStorage.getItem('favoriteServices');
      if (storedServices) {
        const services = JSON.parse(storedServices);
        setFavorites(services);
      }
    } catch (error) {
      console.error('Error loading favorite services:', error);
    }
  }, []);
  
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
  
  const toggleFavorite = (e: React.MouseEvent, subService: SubService, categoryName: string) => {
    e.stopPropagation();
    
    try {
      // Check if this service is already favorite
      const serviceId = `${categoryName.toLowerCase().replace(/\s+/g, '-')}-${subService.id}`;
      const isFavorite = favorites.some(fav => fav.id === serviceId);
      
      // Get current favorites from localStorage
      const storedServices = localStorage.getItem('favoriteServices') || '[]';
      const services = JSON.parse(storedServices);
      
      if (isFavorite) {
        // Remove from favorites
        const updatedServices = services.filter((s: FavoriteService) => s.id !== serviceId);
        localStorage.setItem('favoriteServices', JSON.stringify(updatedServices));
        setFavorites(updatedServices);
      } else {
        // Add to favorites
        const newFavorite: FavoriteService = {
          id: serviceId,
          studioId: "",
          studioName: "",
          name: subService.name,
          price: `₹${getServiceBasePrice(subService)}`
        };
        
        services.push(newFavorite);
        localStorage.setItem('favoriteServices', JSON.stringify(services));
        setFavorites(services);
      }
    } catch (error) {
      console.error('Error updating favorite services:', error);
    }
  };
  
  // Helper function to get a price for a service (for demonstration)
  const getServiceBasePrice = (service: SubService): string => {
    // This would be replaced with real pricing logic in a production app
    const priceMap: Record<string, string> = {
      'wash-fold': '199',
      'wash-iron': '249',
      'daily-wear': '299',
      'ethnic-wear': '399',
      'winter-wear': '499',
      'miscellaneous': '349',
      'stain-removal': '249',
      'odor-removal': '199',
      'calf-boots': '349',
      'heels': '299',
      'high-boots': '399',
      'sandals': '249',
      'shoe-boots': '349',
      'canvas-sports': '329',
      'leather-formal': '399',
      'regular-wash-fold': '199',
      'premium-wash-fold': '299',
      'basic-ironing': '149',
      'full-outfit-pressing': '249',
      'same-day-service': '399',
      'rush-hour-service': '499',
    };
    
    return priceMap[service.id] || '199';
  };
  
  const isServiceFavorite = (categoryName: string, subServiceId: string): boolean => {
    const serviceId = `${categoryName.toLowerCase().replace(/\s+/g, '-')}-${subServiceId}`;
    return favorites.some(fav => fav.id === serviceId);
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
      <div className="section-container pb-10 min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <h1 className="text-2xl font-bold mb-4 pt-4 animate-fade-in text-gray-800">Our Services</h1>
        
        <div className="mb-6 relative animate-fade-in">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <Input 
            type="text"
            placeholder="Search services..." 
            className="pl-10 bg-white border-gray-200 rounded-full shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="space-y-5 animate-fade-in">
          {filteredServices.length === 0 ? (
            <Card className="text-center py-8 text-gray-500 border-none shadow-sm">
              <CardContent>
                No services found matching "{searchQuery}"
              </CardContent>
            </Card>
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
                <Card className="mb-3 overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                  <div 
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg flex items-center justify-between cursor-pointer"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-gradient-to-br from-indigo-400 to-purple-500 text-white border-none flex items-center justify-center shadow-sm">
                        <AvatarFallback className="flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500">
                          {category.icon}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-gray-800 text-base">{category.name}</h3>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={cn(
                        "text-indigo-500 transition-transform duration-300",
                        expandedCategories.includes(category.id) ? "transform rotate-180" : ""
                      )}
                    />
                  </div>
                </Card>
                
                {expandedCategories.includes(category.id) && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                    {category.subServices.map((subService) => {
                      const isFavorite = isServiceFavorite(category.id, subService.id);
                      
                      return (
                        <Card 
                          key={subService.id} 
                          className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:translate-y-[-2px]"
                          onClick={() => handleSubserviceClick(category.name, subService)}
                        >
                          <CardContent className="p-0">
                            <div className="flex flex-col items-center">
                              <div className="w-full h-24 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                                <img 
                                  src={getSubserviceImage(category.id, subService.id)} 
                                  alt={subService.name} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <button
                                  onClick={(e) => toggleFavorite(e, subService, category.id)}
                                  className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/80 shadow-sm hover:bg-white transition-all duration-200 z-20 ${isFavorite ? 'animate-bounce-once' : ''}`}
                                  aria-label={isFavorite ? "Remove from Washlist" : "Add to Washlist"}
                                >
                                  <Heart 
                                    size={14} 
                                    className={`transition-all duration-300 transform ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
                                  />
                                </button>
                              </div>
                              <div className="w-full p-3">
                                <h4 className="font-medium text-gray-800 text-sm mb-1">{subService.name}</h4>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{subService.description}</p>
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="text-xs font-medium text-indigo-600 bg-indigo-50 border-indigo-100">
                                    ₹{getServiceBasePrice(subService)}
                                  </Badge>
                                  <span className="text-xs text-gray-400">2.5k+ orders</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="mt-10">
          <FooterSignature />
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

interface FavoriteService {
  id: string;
  studioId: string;
  studioName: string;
  name: string;
  price: string;
}

export default Services;
