
import { useState, useEffect } from 'react';

export const useStudioData = (studioId?: string) => {
  // This would normally fetch from an API using the ID from the URL
  // For now, we'll use hardcoded data but acknowledge that the ID exists
  const studio = {
    id: studioId || '1',
    name: 'Busy Bee',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 126,
    deliveryTime: '1-2 days',
    description: 'Premium laundry services with eco-friendly cleaning options.'
  };

  const services = [
    {
      id: '1',
      name: 'Dry Cleaning',
      description: 'Professional cleaning for delicate fabrics and special care items.',
      price: 8.99,
      unit: 'per piece'
    },
    {
      id: '2',
      name: 'Wash & Fold',
      description: 'Complete laundry service charged by weight.',
      price: 2.49,
      unit: 'per kg'
    },
    {
      id: '3',
      name: 'Ironing',
      description: 'Professional pressing and wrinkle removal.',
      price: 4.99,
      unit: 'per piece'
    },
    {
      id: '4',
      name: 'Express Service',
      description: 'Same-day service when ordered before 10 AM.',
      price: 12.99,
      unit: 'per kg'
    },
    {
      id: '5',
      name: 'Carpet Cleaning',
      description: 'Deep cleaning for carpets and rugs.',
      price: 3.49,
      unit: 'per sft'
    }
  ];

  return {
    studio,
    services
  };
};
