
import React, { memo } from 'react';
import ServiceItem from './ServiceItem';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
}

interface SubCategory {
  title: string;
  icon: React.ReactNode;
  services: Service[];
}

interface ServiceCategoryProps {
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
  categoryRef: ((element: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement>;
}

const ServiceCategory: React.FC<ServiceCategoryProps> = ({
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
  // Check if categoryRef is a function or a RefObject and use it accordingly
  const refProp = typeof categoryRef === 'function' 
    ? { ref: categoryRef } 
    : { ref: categoryRef };

  return (
    <div {...refProp}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      {subCategories ? (
        <div className="space-y-8">
          {subCategories.map((subCategory, subIdx) => (
            <div key={subIdx} className="ml-2">
              <div className="flex items-center gap-2 mb-3">
                {subCategory.icon}
                <h3 className="text-md font-semibold">{subCategory.title}</h3>
              </div>
              
              <div className="space-y-4">
                {subCategory.services.map(service => (
                  <ServiceItem
                    key={service.id}
                    service={service}
                    tabType={tabType}
                    weight={getServiceWeight(service.id)}
                    quantity={getServiceQuantity(service.id)}
                    onAdd={onServiceAdd}
                    onIncrease={onServiceIncrease}
                    onDecrease={onServiceDecrease}
                    onClick={onServiceClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {services.map(service => (
            <ServiceItem
              key={service.id}
              service={service}
              tabType={tabType}
              weight={getServiceWeight(service.id)}
              quantity={getServiceQuantity(service.id)}
              onAdd={onServiceAdd}
              onIncrease={onServiceIncrease}
              onDecrease={onServiceDecrease}
              onClick={onServiceClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ServiceCategory);
