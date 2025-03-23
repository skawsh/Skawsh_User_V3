
import { Service } from '@/types/serviceTypes';
import { 
  addToCart, 
  getServiceWeight, 
  getServiceQuantity, 
  removeServiceFromCart,
  serviceExistsInCart,
  createServiceOrderDetails
} from './cartUtils';

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
  if (existingWashType && existingWashType !== currentWashType && !serviceExistsInCart(service.id, cartItems)) {
    handleShowMixedServicesDialog(service);
    return;
  }
  
  if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
    const currentWeight = getServiceWeight(service.id, cartItems) || 0;
    const newWeight = Math.round((currentWeight + 0.1) * 10) / 10;
    
    const orderDetails = createServiceOrderDetails(
      service,
      1,
      newWeight,
      currentWashType === "express",
      studioId
    );
    
    handleAddToCart(orderDetails);
  } else {
    const existingQuantity = getServiceQuantity(service.id, cartItems) || 0;
    const newQuantity = existingQuantity + 1;
    
    const orderDetails = createServiceOrderDetails(
      service,
      newQuantity,
      null,
      currentWashType === "express",
      studioId
    );
    
    handleAddToCart(orderDetails);
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
    
    const orderDetails = createServiceOrderDetails(
      service,
      1,
      newWeight,
      currentWashType === "express",
      studioId
    );
    
    handleAddToCart(orderDetails);
  } else {
    const existingQuantity = getServiceQuantity(service.id, cartItems) || 0;
    
    if (existingQuantity <= 1) {
      const updatedItems = removeServiceFromCart(service.id, cartItems);
      setCartItems(updatedItems);
      return;
    }
    
    const newQuantity = existingQuantity - 1;
    
    const orderDetails = createServiceOrderDetails(
      service,
      newQuantity,
      null,
      currentWashType === "express",
      studioId
    );
    
    handleAddToCart(orderDetails);
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
  const serviceExists = serviceExistsInCart(service.id, cartItems);
  
  if (serviceExists) {
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

/**
 * Add a simple service directly to cart
 */
export const addSimpleServiceToCart = (
  service: Service,
  cartItems: any[],
  studioId: string,
  selectedTab: string,
  handleShowMixedServicesDialog: (service: Service) => void,
  handleAddToCart: (orderDetails: any) => void
) => {
  const existingWashType = getExistingWashType(cartItems);
  
  if (existingWashType && existingWashType !== selectedTab && !serviceExistsInCart(service.id, cartItems)) {
    handleShowMixedServicesDialog(service);
    return;
  }
  
  const orderDetails = createServiceOrderDetails(
    service,
    1,
    null,
    selectedTab === "express",
    studioId
  );
  
  handleAddToCart(orderDetails);
};
