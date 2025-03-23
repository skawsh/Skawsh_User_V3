
import { Service } from '@/types/serviceTypes';
import { addToCart, getServiceWeight, getServiceQuantity, removeServiceFromCart } from './cartUtils';

/**
 * Handle increasing the weight or quantity of a service
 */
export const increaseServiceWeight = (
  service: Service,
  cartItems: any[],
  existingWashType: string | null,
  currentWashType: string,
  studioId: string,
  handleShowMixedServicesDialog: (service: Service) => void,
  handleAddToCart: (orderDetails: any) => void
) => {
  // Check if there's a wash type mismatch
  if (existingWashType && existingWashType !== currentWashType && !cartItems.some(item => item.serviceId === service.id)) {
    handleShowMixedServicesDialog(service);
    return;
  }
  
  if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
    const currentWeight = getServiceWeight(service.id, cartItems) || 0;
    const newWeight = Math.round((currentWeight + 0.1) * 10) / 10;
    
    handleAddToCart({
      serviceId: service.id,
      serviceName: service.name,
      weight: newWeight,
      price: service.price * newWeight,
      studioId: studioId,
      items: []
    });
  } else {
    const existingItem = cartItems.find(item => item.serviceId === service.id);
    const quantity = existingItem && existingItem.quantity ? existingItem.quantity + 1 : 1;
    
    handleAddToCart({
      serviceId: service.id,
      serviceName: service.name,
      quantity: quantity,
      price: service.price * quantity,
      studioId: studioId,
      items: []
    });
  }
};

/**
 * Handle decreasing the weight or quantity of a service
 */
export const decreaseServiceWeight = (
  service: Service,
  cartItems: any[],
  studioId: string,
  currentWashType: string,
  setCartItems: (items: any[]) => void,
  handleAddToCart: (orderDetails: any) => void
) => {
  if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
    const currentWeight = getServiceWeight(service.id, cartItems) || 0;
    
    if (currentWeight <= 1) {
      const updatedItems = removeServiceFromCart(service.id, cartItems);
      setCartItems(updatedItems);
      return;
    }
    
    const newWeight = Math.round((currentWeight - 0.1) * 10) / 10;
    handleAddToCart({
      serviceId: service.id,
      serviceName: service.name,
      weight: newWeight,
      price: service.price * newWeight,
      studioId: studioId,
      items: []
    });
  } else {
    const existingItem = cartItems.find(item => item.serviceId === service.id);
    if (!existingItem) return;
    
    const quantity = existingItem.quantity ? existingItem.quantity - 1 : 0;
    
    if (quantity <= 0) {
      const updatedItems = removeServiceFromCart(service.id, cartItems);
      setCartItems(updatedItems);
      return;
    }
    
    handleAddToCart({
      serviceId: service.id,
      serviceName: service.name,
      quantity: quantity,
      price: service.price * quantity,
      studioId: studioId,
      items: []
    });
  }
};

/**
 * Handle service card click
 */
export const handleServiceCardClick = (
  service: Service,
  cartItems: any[],
  existingWashType: string | null,
  currentWashType: string,
  handleShowMixedServicesDialog: (service: Service) => void,
  handleOpenServicePopup: (service: Service) => void
) => {
  const existingItem = cartItems.find(item => item.serviceId === service.id);
  
  if (existingItem) {
    if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
      handleOpenServicePopup(service);
    }
  } else {
    if (existingWashType && existingWashType !== currentWashType) {
      handleShowMixedServicesDialog(service);
      return;
    }
    
    handleOpenServicePopup(service);
  }
};
