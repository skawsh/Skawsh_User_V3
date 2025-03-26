
import { SubService } from '@/types/serviceTypes';

// Helper function to get a price for a service
export const getServiceBasePrice = (service: SubService): string => {
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

export const getSubserviceImage = (serviceId: string, subserviceId: string): string => {
  if (serviceId === 'core-laundry') {
    if (subserviceId === 'wash-fold') {
      return '/lovable-uploads/03679588-3192-460b-ae06-1c4541039aa2.png';
    } else {
      return 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
    }
  } else if (serviceId === 'dry-cleaning') {
    return 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
  } else if (serviceId === 'shoe-laundry') {
    return 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
  } else {
    return 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
  }
};
