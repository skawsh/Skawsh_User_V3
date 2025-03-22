
import React from 'react';
import { ServiceCategory, Service } from '@/types/serviceTypes';
import ServiceCategoryItem from './ServiceCategoryItem';

interface ServiceCategoryListProps {
  categories: ServiceCategory[];
  tabType: string;
  getServiceWeight: (serviceId: string) => number | null;
  getServiceQuantity: (serviceId: string) => number | null;
  onServiceInteractions: {
    increaseWeight: (service: Service) => void;
    decreaseWeight: (service: Service) => void;
    cardClick: (service: Service) => void;
  };
  setCategoryRef: (categoryTitle: string, element: HTMLDivElement | null) => void;
}

const ServiceCategoryList: React.FC<ServiceCategoryListProps> = ({
  categories,
  tabType,
  getServiceWeight,
  getServiceQuantity,
  onServiceInteractions,
  setCategoryRef
}) => {
  return (
    <div className="space-y-8">
      {categories.map((category, idx) => (
        <ServiceCategoryItem
          key={idx}
          title={category.title}
          icon={category.icon}
          services={category.services}
          subCategories={category.subCategories}
          tabType={tabType}
          getServiceWeight={getServiceWeight}
          getServiceQuantity={getServiceQuantity}
          onServiceAdd={(service) => onServiceInteractions.cardClick(service)}
          onServiceIncrease={onServiceInteractions.increaseWeight}
          onServiceDecrease={onServiceInteractions.decreaseWeight}
          onServiceClick={onServiceInteractions.cardClick}
          categoryRef={(el) => setCategoryRef(category.title, el)}
        />
      ))}
    </div>
  );
};

export default ServiceCategoryList;
