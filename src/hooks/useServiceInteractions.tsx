
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Service, CartItem } from '@/types/serviceTypes';

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

  const getExistingWashType = (): string | null => {
    if (cartItems.length === 0) return null;
    
    const expressItemExists = cartItems.some(item => {
      return item.washType === "express";
    });
    
    return expressItemExists ? "express" : "standard";
  };

  const handleAddToCart = (orderDetails: any) => {
    const roundedWeight = orderDetails.weight ? Math.round(orderDetails.weight * 10) / 10 : 0;
    
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.serviceId === orderDetails.serviceId);
      
      const updatedOrderDetails = {
        ...orderDetails,
        washType: selectedTab
      };
      
      let updatedItems;
      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          serviceId: updatedOrderDetails.serviceId,
          serviceName: updatedOrderDetails.serviceName,
          weight: roundedWeight,
          price: Math.round(updatedOrderDetails.price * 100) / 100,
          quantity: updatedOrderDetails.quantity,
          studioId: studioId,
          items: updatedOrderDetails.items,
          washType: updatedOrderDetails.washType
        };
        updatedItems = newItems;
      } else {
        updatedItems = [...prev, {
          serviceId: updatedOrderDetails.serviceId,
          serviceName: updatedOrderDetails.serviceName,
          weight: roundedWeight,
          price: Math.round(updatedOrderDetails.price * 100) / 100,
          quantity: updatedOrderDetails.quantity,
          studioId: studioId,
          items: updatedOrderDetails.items,
          washType: updatedOrderDetails.washType
        }];
        
        const hasShownCelebration = localStorage.getItem('hasShownCelebration');
        if (!hasShownCelebration && prev.length === 0) {
          setShowCelebration(true);
          localStorage.setItem('hasShownCelebration', 'true');
        }
      }
      
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const getServiceWeight = (serviceId: string): number | null => {
    const item = cartItems.find(item => item.serviceId === serviceId);
    return item ? item.weight : null;
  };

  const getServiceQuantity = (serviceId: string): number | null => {
    const item = cartItems.find(item => item.serviceId === serviceId);
    return item && item.quantity ? item.quantity : null;
  };

  const handleServiceInteractions = {
    increaseWeight: (service: Service) => {
      const existingWashType = getExistingWashType();
      const currentWashType = selectedTab;
      
      if (existingWashType && existingWashType !== currentWashType && !cartItems.some(item => item.serviceId === service.id)) {
        setPendingService(service);
        setMixedServicesDialogOpen(true);
        return;
      }
      
      if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
        const currentWeight = getServiceWeight(service.id) || 0;
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
    },

    decreaseWeight: (service: Service) => {
      if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
        const currentWeight = getServiceWeight(service.id) || 0;
        
        if (currentWeight <= 1) {
          setCartItems(prev => prev.filter(item => item.serviceId !== service.id));
          localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(item => item.serviceId !== service.id)));
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
          setCartItems(prev => prev.filter(item => item.serviceId !== service.id));
          localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(item => item.serviceId !== service.id)));
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
    },

    cardClick: (service: Service) => {
      const existingItem = cartItems.find(item => item.serviceId === service.id);
      
      if (existingItem) {
        if (service.unit && (service.unit.includes('per kg') || service.unit.includes('per sft'))) {
          onOpenServicePopup(service);
        }
      } else {
        const existingWashType = getExistingWashType();
        const currentWashType = selectedTab;
        
        if (existingWashType && existingWashType !== currentWashType) {
          setPendingService(service);
          setMixedServicesDialogOpen(true);
          return;
        }
        
        handleOpenServicePopup(service);
      }
    }
  };

  const handleOpenServicePopup = (service: Service) => {
    const existingWashType = getExistingWashType();
    const currentWashType = selectedTab;
    
    if (existingWashType && existingWashType !== currentWashType) {
      setPendingService(service);
      setMixedServicesDialogOpen(true);
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

  const handleSwitchToStandard = () => {
    const updatedItems = cartItems.filter(item => item.washType !== "express");
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    document.dispatchEvent(new Event('cartUpdated'));
    
    setMixedServicesDialogOpen(false);
    
    if (pendingService) {
      setTimeout(() => {
        if (pendingService.unit && (pendingService.unit.includes('per kg') || pendingService.unit.includes('per sft'))) {
          onOpenServicePopup(pendingService);
        } else {
          handleAddToCart({
            serviceId: pendingService.id,
            serviceName: pendingService.name,
            quantity: 1,
            price: pendingService.price,
            studioId: studioId,
            items: []
          });
        }
        
        setPendingService(null);
      }, 300);
    }
  };
  
  const handleContinueMixedTypes = () => {
    if (pendingService) {
      if (pendingService.unit && (pendingService.unit.includes('per kg') || pendingService.unit.includes('per sft'))) {
        onOpenServicePopup(pendingService);
      } else {
        const price = selectedTab === "express" ? pendingService.price * 1.5 : pendingService.price;
        handleAddToCart({
          serviceId: pendingService.id,
          serviceName: pendingService.name,
          quantity: 1,
          price: price,
          studioId: studioId,
          items: []
        });
      }
      
      setPendingService(null);
      setMixedServicesDialogOpen(false);
      
      toast("Multiple delivery types selected. Your items will be delivered separately");
    }
  };

  return {
    cartItems,
    pendingService,
    mixedServicesDialogOpen,
    showCelebration,
    getServiceWeight,
    getServiceQuantity,
    handleServiceInteractions,
    getExistingWashType,
    setMixedServicesDialogOpen,
    handleSwitchToStandard,
    handleContinueMixedTypes,
    handleAddToCart,
    setShowCelebration
  };
};
