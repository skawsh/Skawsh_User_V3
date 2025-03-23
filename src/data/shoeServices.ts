
import { Service } from '@/types/serviceTypes';

export const getShoeServices = (): Service[] => {
  return [
    {
      id: 'shoe-1',
      name: 'Regular Shoes',
      description: 'Deep cleaning for regular everyday shoes',
      price: 299
    },
    {
      id: 'shoe-2',
      name: 'Leather Shoes',
      description: 'Specialized cleaning and conditioning for leather footwear',
      price: 399
    },
    {
      id: 'shoe-3',
      name: 'Sneakers',
      description: 'Thorough cleaning for sports shoes and sneakers',
      price: 349
    },
    {
      id: 'shoe-4',
      name: 'Canvas Shoes',
      description: 'Cleaning and whitening for canvas footwear',
      price: 249
    },
    {
      id: 'shoe-5',
      name: 'Sandals',
      description: 'Cleaning and sanitizing for all types of sandals',
      price: 199
    },
    {
      id: 'shoe-6',
      name: 'Heels',
      description: 'Gentle cleaning and polishing for formal heels',
      price: 349
    }
  ];
};
