
import React from 'react';
import { Service, ServiceCategory, SubCategory } from '@/types/serviceTypes';
import { ShoppingBag, Shirt, Footprints, Bookmark } from 'lucide-react';

export const useServiceData = (services: Service[]) => {
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
  
  const updatedCoreServices = [...coreServices, washAndIronService];

  // Express wash services
  const expressWashServices: Service[] = [
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

  // Accessories services
  const accessoriesServices: Service[] = [
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

  // Dry cleaning subcategories
  const dryCleaningSubCategories: SubCategory[] = [
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

  // Shoe services
  const shoeServices: Service[] = [
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

  // Main categories
  const categories: ServiceCategory[] = [
    {
      title: "Core Laundry Services",
      icon: <ShoppingBag size={16} className="text-white bg-stone-800 rounded-full" />,
      services: updatedCoreServices,
      count: updatedCoreServices.length
    }, 
    {
      title: "Dry Cleaning Services",
      icon: <Shirt size={16} className="text-white bg-black rounded-full" />,
      services: [],
      count: 5,
      subCategories: dryCleaningSubCategories
    }, 
    {
      title: "Shoe Laundry Services",
      icon: <Footprints size={16} className="text-white bg-slate-950 rounded-3xl" />,
      services: shoeServices,
      count: 11
    }
  ];

  // Express categories
  const expressCategories: ServiceCategory[] = [
    {
      title: "Core Laundry Services",
      icon: <ShoppingBag size={16} className="text-white bg-stone-800 rounded-full" />,
      services: expressWashServices,
      count: expressWashServices.length
    },
    {
      title: "Accessories",
      icon: <Bookmark size={16} className="text-white bg-purple-700 rounded-full" />,
      services: accessoriesServices,
      count: accessoriesServices.length
    }
  ];

  // UI configuration
  const deliveryMessages = {
    standard: "Delivery in just 36 sunlight hours after pickup",
    express: "Delivery in just 12 sunlight hours after pickup"
  };

  const backgroundColors = {
    standard: "bg-blue-50",
    express: "bg-orange-50"
  };

  return {
    categories,
    expressCategories,
    backgroundColors,
    deliveryMessages
  };
};
