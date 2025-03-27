
import React from 'react';
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import ServiceIcon from './item/ServiceIcon';
import ServiceDetails from './item/ServiceDetails';
import ServiceControls from './item/ServiceControls';
import FavoriteButton from './item/FavoriteButton';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
}

interface ServiceItemProps {
  service: Service;
  tabType: string;
  weight?: number | null;
  quantity?: number | null;
  onAdd: (service: Service) => void;
  onIncrease: (service: Service) => void;
  onDecrease: (service: Service) => void;
  onClick: (service: Service) => void;
  studioId?: string;
  studioName?: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  service,
  tabType,
  weight,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
  onClick,
  studioId = '',
  studioName = ''
}) => {
  const isMobile = useIsMobile();
  const price = tabType === "express" ? service.price * 1.5 : service.price;
  const hasWeight = service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'));
  const isInCart = weight !== null || quantity !== null;
  
  return (
    <div 
      data-service-name={service.name}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-200 relative"
      onClick={() => onClick(service)}
    >
      {/* Repositioned favorite button to the top-right corner with proper spacing */}
      <div className="absolute top-2 right-2 z-20">
        <FavoriteButton 
          serviceId={service.id}
          studioId={studioId}
          studioName={studioName}
          serviceName={service.name}
          servicePrice={price}
          serviceUnit={service.unit}
        />
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden shadow-sm">
            <ServiceIcon serviceName={service.name} />
          </div>
          <ServiceDetails 
            name={service.name}
            price={price}
            unit={service.unit}
            description={service.description}
          />
        </div>
        
        <ServiceControls 
          isInCart={isInCart}
          tabType={tabType}
          hasWeight={hasWeight}
          weight={weight}
          quantity={quantity}
          onAddClick={(e) => {
            e.stopPropagation();
            onAdd(service);
          }}
          onIncreaseClick={(e) => {
            e.stopPropagation();
            onIncrease(service);
          }}
          onDecreaseClick={(e) => {
            e.stopPropagation();
            onDecrease(service);
          }}
        />
      </div>
    </div>
  );
};

export default ServiceItem;
