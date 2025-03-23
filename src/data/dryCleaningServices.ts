
import React from 'react';
import { SubCategory } from '@/types/serviceTypes';
import { Shirt, Footprints } from 'lucide-react';

export const getDryCleaningSubCategories = (): SubCategory[] => {
  return [
    {
      title: "Upper Wear",
      icon: <Shirt size={16} className="text-blue-500" />,
      services: [
        {
          id: 'dry-upper-1',
          name: 'Shirt',
          description: 'Professional dry cleaning for shirts',
          price: 155
        },
        {
          id: 'dry-upper-2',
          name: 'T-shirt',
          description: 'Gentle cleaning for t-shirts',
          price: 155
        },
        {
          id: 'dry-upper-3',
          name: 'Ladies Top',
          description: 'Specialized cleaning for tops',
          price: 155
        }
      ]
    },
    {
      title: "Bottom Wear",
      icon: <Shirt size={16} className="text-indigo-500" />,
      services: [
        {
          id: 'dry-bottom-1',
          name: 'Pant',
          description: 'Professional dry cleaning for pants',
          price: 70
        }
      ]
    },
    {
      title: "Ethnic Wear",
      icon: <Shirt size={16} className="text-purple-500" />,
      services: [
        {
          id: 'dry-ethnic-1',
          name: 'Sherwani',
          description: 'Specialized dry cleaning for sherwani',
          price: 699
        }
      ]
    }
  ];
};
