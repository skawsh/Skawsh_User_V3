
import React from 'react';
import { ServiceCategory, Service } from '@/types/serviceTypes';
import ServiceCategoryHeader from './ServiceCategoryHeader';
import ServiceItemCard from './ServiceItemCard';
import { cn } from "@/lib/utils";

interface ServiceCategorySectionProps {
  category: ServiceCategory;
  index: number;
  isExpanded: boolean;
  toggleCategory: (categoryId: string) => void;
  handleSubserviceClick: (categoryName: string, subService: Service) => void;
  toggleFavorite: (e: React.MouseEvent, subService: Service, categoryName: string) => void;
  isServiceFavorite: (categoryName: string, subServiceId: string) => boolean;
  getServiceBasePrice: (service: Service) => string;
  getSubserviceImage: (serviceId: string, subserviceId: string) => string;
}

const ServiceCategorySection: React.FC<ServiceCategorySectionProps> = ({
  category,
  index,
  isExpanded,
  toggleCategory,
  handleSubserviceClick,
  toggleFavorite,
  isServiceFavorite,
  getServiceBasePrice,
  getSubserviceImage
}) => {
  return (
    <div 
      key={category.id}
      className={cn(
        "transition-all duration-300",
        {"animate-slide-in-bottom": true}
      )}
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <ServiceCategoryHeader 
        categoryId={category.id}
        categoryName={category.name}
        categoryIcon={category.icon}
        isExpanded={isExpanded}
        onToggle={() => toggleCategory(category.id)}
      />
      
      {isExpanded && category.services && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
          {category.services.map((subService) => {
            const isFavorite = isServiceFavorite(category.id, subService.id);
            
            return (
              <ServiceItemCard
                key={subService.id}
                subService={subService}
                categoryId={category.id}
                imageSrc={getSubserviceImage(category.id, subService.id)}
                isFavorite={isFavorite}
                basePrice={getServiceBasePrice(subService)}
                onClick={() => handleSubserviceClick(category.name, subService)}
                onFavoriteToggle={(e) => toggleFavorite(e, subService, category.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ServiceCategorySection;
