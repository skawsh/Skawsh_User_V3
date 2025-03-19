
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
  onSubCategoryInView
}) => {
  // Check if categoryRef is a function or a RefObject and use it accordingly
  const refProp = typeof categoryRef === 'function' 
    ? { ref: categoryRef } 
    : { ref: categoryRef };
    
  const subCategoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  useEffect(() => {
    if (!onSubCategoryInView || !subCategories) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const subcategoryTitle = entry.target.getAttribute('data-subcategory');
          if (subcategoryTitle) {
            onSubCategoryInView(subcategoryTitle, entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-80px 0px 0px 0px" }
    );
    
    // Observe all subcategory elements
    Object.values(subCategoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, [onSubCategoryInView, subCategories]);

  return (
    <div {...refProp} className={cn("mb-8", isSticky && "pt-16")}>
      <div className={cn(
        "flex items-center gap-2 mb-5 px-1",
        isSticky && "fixed top-[56px] z-30 bg-white/95 backdrop-blur-sm shadow-sm left-0 w-full py-3 px-4 border-b"
      )}>
        <div className="text-primary-600">
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
              <div className={cn(
                "flex items-center gap-2 mb-4 px-1",
                isSticky && activeStickySubCategory === subCategory.title && 
                "fixed top-[105px] z-20 bg-white/90 backdrop-blur-sm shadow-sm left-0 w-full py-2 px-4 border-b"
              )}>
                <div className="text-blue-600">
                  {subCategory.icon}
                </div>
                <h3 className="text-md font-semibold text-gray-700 truncate">
                  {isSticky && activeStickySubCategory === subCategory.title && (
                    <span className="text-gray-500 mr-1">{title} /</span>
                  )}
                  {subCategory.title}
                </h3>
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

export default ServiceCategory;
