
import React from 'react';
import { ServiceCategory } from '@/types/serviceTypes';
import { Shirt, Wind, Droplets, TimerReset, Zap, Footprints, WashingMachine } from 'lucide-react';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'core-laundry',
    name: 'Core Laundry Services',
    icon: <WashingMachine size={24} className="text-blue-500" />,
    description: 'Essential laundry services for everyday needs',
    subServices: [
      {
        id: 'wash-fold',
        name: 'Wash & Fold',
        description: 'Complete washing and folding of your clothes'
      },
      {
        id: 'wash-iron',
        name: 'Wash & Iron',
        description: 'Full service washing and professional ironing'
      }
    ]
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning Services',
    icon: <Shirt size={24} className="text-primary" />,
    description: 'Professional cleaning for all types of garments',
    subServices: [
      {
        id: 'daily-wear',
        name: 'Daily Wear',
        description: 'Dry cleaning for your everyday clothing items'
      },
      {
        id: 'ethnic-wear',
        name: 'Ethnic Wear',
        description: 'Specialized care for traditional and cultural garments'
      },
      {
        id: 'winter-wear',
        name: 'Winter Wear',
        description: 'Deep cleaning for jackets, coats, and sweaters'
      },
      {
        id: 'miscellaneous',
        name: 'Miscellaneous',
        description: 'Dry cleaning for other specialized clothing items'
      }
    ]
  },
  {
    id: 'shoe-laundry',
    name: 'Shoe Laundry',
    icon: <Footprints size={24} className="text-amber-500" />,
    description: 'Professional cleaning for all types of footwear',
    subServices: [
      {
        id: 'calf-boots',
        name: 'Calf Boots',
        description: 'Cleaning service for calf-length boots'
      },
      {
        id: 'heels',
        name: 'Heels',
        description: 'Specialized cleaning for all types of heel shoes'
      },
      {
        id: 'high-boots',
        name: 'High Boots',
        description: 'Thorough cleaning for knee-high and taller boots'
      },
      {
        id: 'sandals',
        name: 'Sandals',
        description: 'Professional cleaning for open footwear'
      },
      {
        id: 'shoe-boots',
        name: 'Shoe-Boots',
        description: 'Cleaning for ankle and short boots'
      },
      {
        id: 'canvas-sports',
        name: 'Canvas/Sports Shoes',
        description: 'Deep cleaning for athletic and casual canvas shoes'
      },
      {
        id: 'leather-formal',
        name: 'Leather/Formal Shoes',
        description: 'Professional care for leather and business footwear'
      }
    ]
  },
  {
    id: 'wash-fold',
    name: 'Wash & Fold',
    icon: <Wind size={24} className="text-blue-500" />,
    description: 'Complete laundry washing and folding services',
    subServices: [
      {
        id: 'regular-wash-fold',
        name: 'Regular Wash & Fold',
        description: 'Standard washing and folding for everyday laundry'
      },
      {
        id: 'premium-wash-fold',
        name: 'Premium Wash & Fold',
        description: 'Premium detergents and extra care for your clothes'
      }
    ]
  },
  {
    id: 'ironing',
    name: 'Ironing',
    icon: <Droplets size={24} className="text-amber-500" />,
    description: 'Professional pressing and wrinkle removal',
    subServices: [
      {
        id: 'basic-ironing',
        name: 'Basic Ironing',
        description: 'Standard ironing for shirts, pants, and dresses'
      },
      {
        id: 'full-outfit-pressing',
        name: 'Full Outfit Pressing',
        description: 'Complete pressing for suits, dresses, and formal outfits'
      }
    ]
  },
  {
    id: 'express',
    name: 'Express Services',
    icon: <TimerReset size={24} className="text-red-500" />,
    description: 'Quick turnaround for urgent requirements',
    subServices: [
      {
        id: 'same-day-service',
        name: 'Same-Day Service',
        description: 'Get your items back on the same day when ordered before 10 AM'
      },
      {
        id: 'rush-hour-service',
        name: 'Rush Hour Service',
        description: '3-hour service for urgent cleaning needs'
      }
    ]
  },
  {
    id: 'special',
    name: 'Special Treatments',
    icon: <Zap size={24} className="text-purple-500" />,
    description: 'Specialized cleaning for specific items and stains',
    subServices: [
      {
        id: 'stain-removal',
        name: 'Stain Removal',
        description: 'Professional treatment for tough stains'
      },
      {
        id: 'odor-removal',
        name: 'Odor Removal',
        description: 'Special treatment to eliminate unpleasant odors'
      }
    ]
  }
];
