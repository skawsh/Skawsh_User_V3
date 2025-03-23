
import { useState, useEffect } from 'react';

export const useStudioData = (studioId?: string) => {
  // Mock data for studios
  const studios = {
    '1': {
      id: '1',
      name: 'Busy Bee',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.8,
      reviewCount: 126,
      deliveryTime: '1-2 days',
      description: 'Premium laundry services with eco-friendly cleaning options.',
      services: [
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
      ]
    },
    '2': {
      id: '2',
      name: 'U clean',
      image: 'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.6,
      reviewCount: 98,
      deliveryTime: '2-3 days',
      description: 'Eco-friendly laundry services with a focus on sustainability.',
      services: [
        {
          id: '6',
          name: 'Premium Wash',
          description: 'High-quality washing with premium detergents.',
          price: 3.99,
          unit: 'per kg'
        },
        {
          id: '7',
          name: 'Stain Removal',
          description: 'Special treatment for tough stains and spots.',
          price: 5.99,
          unit: 'per piece'
        },
        {
          id: '8',
          name: 'Curtain Cleaning',
          description: 'Specialized cleaning for all types of curtains.',
          price: 9.99,
          unit: 'per piece'
        },
        {
          id: '9',
          name: 'Bedding Service',
          description: 'Complete cleaning for comforters, quilts and pillows.',
          price: 14.99,
          unit: 'per piece'
        },
        {
          id: '10',
          name: 'Green Clean',
          description: 'Environmentally friendly cleaning process.',
          price: 4.49,
          unit: 'per kg'
        }
      ]
    },
    '3': {
      id: '3',
      name: 'Tumble Dry',
      image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.7,
      reviewCount: 112,
      deliveryTime: '1 day',
      description: 'Fast and reliable laundry service with premium care for all fabric types.',
      services: [
        {
          id: '11',
          name: 'Speed Wash',
          description: 'Quick wash and fold service for everyday items.',
          price: 2.99,
          unit: 'per kg'
        },
        {
          id: '12',
          name: 'Delicate Care',
          description: 'Special handling for delicate garments and fabrics.',
          price: 7.49,
          unit: 'per piece'
        },
        {
          id: '13',
          name: 'Shoe Cleaning',
          description: 'Professional cleaning for all types of shoes.',
          price: 12.99,
          unit: 'per pair'
        },
        {
          id: '14',
          name: 'Home Linens',
          description: 'Comprehensive cleaning for bedsheets, towels, and linens.',
          price: 3.99,
          unit: 'per kg'
        },
        {
          id: '15',
          name: 'Wedding Dress Cleaning',
          description: 'Specialized cleaning and preservation for wedding dresses.',
          price: 49.99,
          unit: 'per piece'
        }
      ]
    },
    '4': {
      id: '4',
      name: 'Fabrico',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.3,
      reviewCount: 85,
      deliveryTime: '3-4 hours',
      description: 'Premium fabric care experts with advanced cleaning technologies.',
      services: [
        {
          id: '16',
          name: 'Premium Dry Cleaning',
          description: 'High-end dry cleaning for designer garments.',
          price: 12.99,
          unit: 'per piece'
        },
        {
          id: '17',
          name: 'Express Laundry',
          description: 'Quick turnaround for everyday laundry needs.',
          price: 3.49,
          unit: 'per kg'
        }
      ]
    },
    '5': {
      id: '5',
      name: 'Eco Clean',
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.7,
      reviewCount: 103,
      deliveryTime: '2 days',
      description: 'Environmentally conscious cleaning services using sustainable products.',
      services: [
        {
          id: '18',
          name: 'Eco Wash',
          description: 'Washing with eco-friendly detergents.',
          price: 3.99,
          unit: 'per kg'
        },
        {
          id: '19',
          name: 'Green Dry Clean',
          description: 'Chemical-free dry cleaning process.',
          price: 9.99,
          unit: 'per piece'
        }
      ]
    },
    '6': {
      id: '6',
      name: 'Mycloth',
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 5.0,
      reviewCount: 145,
      deliveryTime: '1-2 days',
      description: 'Personalized garment care with attention to detail and premium finishes.',
      services: [
        {
          id: '20',
          name: 'Personal Laundry',
          description: 'Customized care for your everyday clothing.',
          price: 4.49,
          unit: 'per kg'
        },
        {
          id: '21',
          name: 'Luxury Garments',
          description: 'Specialized care for high-end and delicate garments.',
          price: 14.99,
          unit: 'per piece'
        }
      ]
    }
  };

  // Checks if the studioId exists, otherwise returns a default fallback 
  const getStudioData = () => {
    // Check if studioId is provided and exists in the studios object
    if (studioId && studios[studioId as keyof typeof studios]) {
      return studios[studioId as keyof typeof studios];
    }
    
    // Fallback to default studio if studioId is invalid
    console.warn(`Studio ID ${studioId} not found, using default studio`);
    return studios['1'];
  };
  
  const studio = getStudioData();
  
  return {
    studio,
    services: studio.services
  };
};
