
import { Service } from '@/types/serviceTypes';

export const getAccessoriesServices = (): Service[] => {
  return [
    {
      id: 'acc-handkerchief',
      name: 'Hand Kerchief',
      description: 'Gentle cleaning for handkerchiefs with perfect finishing.',
      price: 25
    },
    {
      id: 'acc-tie',
      name: 'Tie',
      description: 'Professional cleaning for ties, preserving color and texture.',
      price: 45
    },
    {
      id: 'acc-cap',
      name: 'Cap',
      description: 'Thorough cleaning for caps without affecting their shape.',
      price: 50
    },
    {
      id: 'acc-gloves',
      name: 'Gloves',
      description: 'Specialized cleaning for all types of gloves.',
      price: 35
    },
    {
      id: 'acc-shawl',
      name: 'Shawl',
      description: 'Deep cleaning for shawls with gentle care for delicate fabrics.',
      price: 75
    }
  ];
};
