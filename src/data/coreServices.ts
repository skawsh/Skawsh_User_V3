
import { Service } from '@/types/serviceTypes';

export const getCoreServices = (services: Service[]): Service[] => {
  // Core services processing
  const coreServices = services.filter(s => s.name.includes('Wash')).map(service => ({
    ...service,
    price: 49,
    unit: 'per kg'
  }));
  
  const washAndIronService: Service = {
    id: 'wash-iron-1',
    name: 'Wash & Iron',
    description: 'Professional washing with meticulous ironing for a crisp, fresh finish.',
    price: 99,
    unit: 'per kg'
  };
  
  return [...coreServices, washAndIronService];
};
