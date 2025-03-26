
import { Service } from '@/types/serviceTypes';
import { getServiceImage, getServiceCategoryImage } from './serviceImageUtils';

// Helper function to get a price for a service
export const getServiceBasePrice = (service: Service): string => {
  // This would be replaced with real pricing logic in a production app
  const priceMap: Record<string, string> = {
    'wash-fold': '199',
    'wash-iron': '249',
    'daily-wear': '299',
    'ethnic-wear': '399',
    'winter-wear': '499',
    'miscellaneous': '349',
    'stain-removal': '249',
    'odor-removal': '199',
    'calf-boots': '349',
    'heels': '299',
    'high-boots': '399',
    'sandals': '249',
    'shoe-boots': '349',
    'canvas-sports': '329',
    'leather-formal': '399',
    'regular-wash-fold': '199',
    'premium-wash-fold': '299',
    'basic-ironing': '149',
    'full-outfit-pressing': '249',
    'same-day-service': '399',
    'rush-hour-service': '499',
  };
  
  return priceMap[service.id] || '199';
};

// Cache for subservice images to prevent redundant lookups
const subserviceImageCache: Record<string, string> = {};

export const getSubserviceImage = (serviceId: string, subserviceId: string): string => {
  // Check if image is in cache first
  const cacheKey = `${serviceId}-${subserviceId}`;
  if (subserviceImageCache[cacheKey]) {
    return subserviceImageCache[cacheKey];
  }
  
  // If not in cache, get the image and store it
  // Try to get a specific image for the subservice first
  const image = getServiceImage(subserviceId);
  subserviceImageCache[cacheKey] = image;
  return image;
};
