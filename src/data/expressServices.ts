
import { Service } from '@/types/serviceTypes';

export const getExpressWashServices = (): Service[] => {
  return [
    {
      id: 'express-wash-fold-1',
      name: 'Wash & Fold',
      description: 'Express washing and folding service for quick turnaround.',
      price: 99,
      unit: 'per kg'
    },
    {
      id: 'express-wash-iron-1',
      name: 'Wash & Iron',
      description: 'Express washing with professional ironing for a crisp finish.',
      price: 149,
      unit: 'per kg'
    }
  ];
};
