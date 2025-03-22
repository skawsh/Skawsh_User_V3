
import React from 'react';
import { Service, SubCategory } from '@/types/serviceTypes';
import ServiceItem from '../services/ServiceItem';

interface ServiceCategoryItemProps {
  title: string;
  icon: React.ReactNode;
  services: Service[];
  subCategories?: SubCategory[];
  tabType: string;
  getServiceWeight: (serviceId: string) => number | null;
  getServiceQuantity: (serviceId: string) => number | null;
  onServiceAdd: (service: Service) => void;
  onServiceIncrease: (service: Service) => void;
  onServiceDecrease: (service: Service) => void;
  onServiceClick: (service: Service) => void;
  categoryRef: (el: HTMLDivElement | null) => void;
}

const ServiceCategoryItem: React.FC<ServiceCategoryItemProps> = ({
  title,
  icon,
  services,
  subCategories,
  tabType,
  getServiceWeight,
  getServiceQuantity,
  onServiceAdd,
  onServiceIncrease,
  onServiceDecrease,
  onServiceClick,
  categoryRef
}) => {
  return (
    <div ref={categoryRef} className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      {services.length > 0 && (
        <div className="space-y-3">
          {services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              tabType={tabType}
              weight={getServiceWeight(service.id)}
              quantity={getServiceQuantity(service.id)}
              onAdd={() => onServiceAdd(service)}
              onIncrease={() => onServiceIncrease(service)}
              onDecrease={() => onServiceDecrease(service)}
              onClick={() => onServiceClick(service)}
            />
          ))}
        </div>
      )}

      {subCategories && subCategories.map((subCategory, idx) => (
        <div key={idx} className="mb-4">
          <div className="flex items-center gap-2 mb-2 mt-4">
            <div className="p-1">{subCategory.icon}</div>
            <h4 className="font-medium">{subCategory.title}</h4>
          </div>
          
          <div className="space-y-3 ml-3">
            {subCategory.services.map((service) => (
              <ServiceItem
                key={service.id}
                service={service}
                tabType={tabType}
                weight={getServiceWeight(service.id)}
                quantity={getServiceQuantity(service.id)}
                onAdd={() => onServiceAdd(service)}
                onIncrease={() => onServiceIncrease(service)}
                onDecrease={() => onServiceDecrease(service)}
                onClick={() => onServiceClick(service)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCategoryItem;
