
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Service, CartItem } from '@/types/serviceTypes';
import { addToCart, getExistingWashType, getServiceWeight, getServiceQuantity } from '@/utils/cartUtils';
import { increaseServiceWeight, decreaseServiceWeight, handleServiceCardClick } from '@/utils/serviceInteractionUtils';
import { switchToStandardWash, continueMixedTypes } from '@/utils/mixedServicesUtils';

interface UseServiceInteractionsProps {
  studioId?: string;
  selectedTab: string;
  onOpenServicePopup: (service: Service) => void;
}

export const useServiceInteractions = ({ 
  studioId = '1', 
  selectedTab,
  onOpenServicePopup
}: UseServiceInteractionsProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [pendingService, setPendingService] = useState<Service | null>(null);
  const [mixedServicesDialogOpen, setMixedServicesDialogOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Load cart items from localStorage
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      try {
        const parsedItems = JSON.parse(storedCartItems);
        setCartItems(parsedItems);
      } catch (error) {
        console.error('Error parsing cart items:', error);
        setCartItems([]);
      }
    }
  }, []);

  // Handle adding to cart
  const handleAddToCart = (orderDetails: any) => {
    const updatedItems = addToCart(orderDetails, cartItems, studioId, selectedTab);
    setCartItems(updatedItems);
    
    // Show celebration animation if this is the first item
    const hasShownCelebration = localStorage.getItem('hasShownCelebration');
    if (!hasShownCelebration && cartItems.length === 0 && updatedItems.length > 0) {
      setShowCelebration(true);
      localStorage.setItem('hasShownCelebration', 'true');
    }
  };

  // Show mixed services dialog
  const handleShowMixedServicesDialog = (service: Service) => {
    setPendingService(service);
    setMixedServicesDialogOpen(true);
  };

  // Handle service interactions
  const handleServiceInteractions = {
    increaseWeight: (service: Service) => {
      increaseServiceWeight(
        service,
        cartItems,
        getExistingWashType(cartItems),
        selectedTab,
        studioId,
        handleShowMixedServicesDialog,
        handleAddToCart
      );
    },

    decreaseWeight: (service: Service) => {
      decreaseServiceWeight(
        service,
        cartItems,
        studioId,
        selectedTab,
        setCartItems,
        handleAddToCart
      );
    },

    cardClick: (service: Service) => {
      handleServiceCardClick(
        service,
        cartItems,
        getExistingWashType(cartItems),
        selectedTab,
        handleShowMixedServicesDialog,
        handleOpenServicePopup
      );
    }
  };

  // Handle opening service popup with type checking
  const handleOpenServicePopup = (service: Service) => {
    const existingWashType = getExistingWashType(cartItems);
    
    if (existingWashType && existingWashType !== selectedTab) {
      handleShowMixedServicesDialog(service);
      return;
    }
    
    if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
      onOpenServicePopup(service);
    } else {
      handleAddToCart({
        serviceId: service.id,
        serviceName: service.name,
        quantity: 1,
        price: selectedTab === "express" ? service.price * 1.5 : service.price,
        studioId: studioId,
        items: []
      });
    }
  };

  // Handle switching to standard wash
  const handleSwitchToStandard = () => {
    switchToStandardWash(
      cartItems,
      pendingService,
      setCartItems,
      onOpenServicePopup,
      handleAddToCart,
      studioId,
      setMixedServicesDialogOpen,
      setPendingService
    );
  };
  
  // Handle continuing with mixed types
  const handleContinueMixedTypes = () => {
    continueMixedTypes(
      pendingService,
      selectedTab,
      handleAddToCart,
      onOpenServicePopup,
      studioId,
      setPendingService,
      setMixedServicesDialogOpen
    );
  };

  return {
    cartItems,
    pendingService,
    mixedServicesDialogOpen,
    showCelebration,
    getServiceWeight: (serviceId: string) => getServiceWeight(serviceId, cartItems),
    getServiceQuantity: (serviceId: string) => getServiceQuantity(serviceId, cartItems),
    handleServiceInteractions,
    getExistingWashType: () => getExistingWashType(cartItems),
    setMixedServicesDialogOpen,
    handleSwitchToStandard,
    handleContinueMixedTypes,
    handleAddToCart,
    setShowCelebration
  };
};
