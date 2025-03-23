
import React from 'react';
import { Service, ServiceCategory } from '@/types/serviceTypes';
import { ShoppingBag, Shirt, Footprints, Bookmark } from 'lucide-react';
import { getCoreServices } from '@/data/coreServices';
import { getExpressWashServices } from '@/data/expressServices';
import { getAccessoriesServices } from '@/data/accessoriesServices';
import { getDryCleaningSubCategories } from '@/data/dryCleaningServices';
import { getShoeServices } from '@/data/shoeServices';
import { getServiceUIConfig } from '@/data/serviceUIConfig';

export const useServiceData = (services: Service[]) => {
  // Get all services data from respective modules
  const updatedCoreServices = getCoreServices(services);
  const expressWashServices = getExpressWashServices();
  const accessoriesServices = getAccessoriesServices();
  const dryCleaningSubCategories = getDryCleaningSubCategories();
  const shoeServices = getShoeServices();
  const { deliveryMessages, backgroundColors } = getServiceUIConfig();

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

  return {
    categories,
    expressCategories,
    backgroundColors,
    deliveryMessages
  };
};
