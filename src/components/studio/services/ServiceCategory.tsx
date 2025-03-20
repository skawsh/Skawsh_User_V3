
import React, { useState, useEffect, useRef } from 'react';
import ServiceItem from './ServiceItem';
import { cn } from "@/lib/utils";

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
  isSticky?: boolean;
  activeStickySubCategory?: string | null;
  onSubCategoryInView?: (subcategory: string, inView: boolean) => void;
  studioId?: string;
  studioName?: string;
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
  categoryRef,
  isSticky = false,
  activeStickySubCategory = null,
  onSubCategoryInView,
  studioId = '',
  studioName = ''
}) => {
  // Check if categoryRef is a function or a RefObject and use it accordingly
  const refProp = typeof categoryRef === 'function' 
    ? { ref: categoryRef } 
    : { ref: categoryRef };
    
  const subCategoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  return (
    <div {...refProp} className="mb-8">
      <div className="flex items-center gap-2 mb-5 px-1">
        <div className="text-indigo-600 bg-indigo-50 p-2 rounded-full">
          {icon}
        </div>
        <h2 className="text-lg font-bold text-gray-800 truncate">{title}</h2>
      </div>

      {subCategories ? (
        <div className="space-y-8">
          {subCategories.map((subCategory, subIdx) => (
            <div 
              key={subIdx} 
              className="ml-2" 
              ref={(el) => subCategoryRefs.current[subCategory.title] = el}
              data-subcategory={subCategory.title}
            >
              <div className="flex items-center gap-2 mb-4 px-1">
                <div className="text-purple-600 bg-purple-50 p-1.5 rounded-full">
                  {subCategory.icon}
                </div>
                <h3 className="text-md font-semibold text-gray-700 truncate">
                  {subCategory.title}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    studioId={studioId}
                    studioName={studioName}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              studioId={studioId}
              studioName={studioName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceCategory;
