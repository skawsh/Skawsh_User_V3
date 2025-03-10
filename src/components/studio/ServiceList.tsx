
import React from 'react';
import GlassCard from '../ui-elements/GlassCard';
import Button from '../ui-elements/Button';
import { Plus } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ServiceListProps {
  services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  return (
    <div className="mt-6 animate-fade-in animate-stagger-1">
      <h2 className="text-lg font-semibold mb-4">Available Services</h2>
      <div className="space-y-4">
        {services.map((service, index) => (
          <GlassCard 
            key={service.id}
            className="p-4"
            interactive={false}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800 mb-1">{service.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                <div className="text-primary-500 font-semibold">${service.price.toFixed(2)}</div>
              </div>
              <Button 
                variant="primary" 
                size="sm" 
                icon={<Plus size={16} />}
                className="flex-shrink-0"
              >
                Add
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
