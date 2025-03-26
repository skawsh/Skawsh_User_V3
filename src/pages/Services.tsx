
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent } from "@/components/ui/card";
import ServiceSearch from '../components/services/ServiceSearch';
import ServiceCategorySection from '../components/services/ServiceCategorySection';
import { serviceCategories } from '../data/serviceCategories';
import { ServiceCategory, Service, SubService } from '@/types/serviceTypes';
import { useFavoriteServices } from '../hooks/useFavoriteServices';
import { getServiceBasePrice, getSubserviceImage } from '../utils/serviceUtils';
import FooterSignature from '../components/FooterSignature';

const Services: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState<ServiceCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const { isServiceFavorite, toggleFavorite } = useFavoriteServices();
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const handleSubserviceClick = (categoryName: string, subService: Service) => {
    navigate(`/services/${subService.id}`, {
      state: {
        serviceName: `${subService.name}`,
        from: '/services'
      }
    });
  };
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredServices(serviceCategories);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = serviceCategories.filter(category => {
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
    setFilteredServices(serviceCategories);
    if (serviceCategories.length > 0) {
      // Expand all categories by default
      setExpandedCategories(serviceCategories.map(category => category.id));
    }
  }, []);

  // Transform subServices to match the Service interface
  const prepareCategoryForDisplay = (category: ServiceCategory): ServiceCategory => {
    return {
      ...category,
      services: category.subServices.map((subService: SubService): Service => ({
        ...subService,
        price: parseInt(getServiceBasePrice(subService as unknown as Service)) || 199,
      }))
    };
  };

  return (
    <Layout>
      <div className="section-container pb-10 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-2xl font-bold mb-4 pt-4 animate-fade-in text-gray-800">Our Services</h1>
        
        <ServiceSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="space-y-5 animate-fade-in">
          {filteredServices.length === 0 ? (
            <Card className="text-center py-8 text-gray-500 border-none shadow-sm">
              <CardContent>
                No services found matching "{searchQuery}"
              </CardContent>
            </Card>
          ) : (
            filteredServices.map((category, index) => (
              <ServiceCategorySection
                key={category.id}
                category={prepareCategoryForDisplay(category)}
                index={index}
                isExpanded={expandedCategories.includes(category.id)}
                toggleCategory={toggleCategory}
                handleSubserviceClick={handleSubserviceClick}
                toggleFavorite={(e, subService, categoryId) => 
                  toggleFavorite(e, subService, categoryId, getServiceBasePrice(subService))
                }
                isServiceFavorite={isServiceFavorite}
                getServiceBasePrice={getServiceBasePrice}
                getSubserviceImage={getSubserviceImage}
              />
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

export default Services;
