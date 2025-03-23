
import { Service } from '@/types/serviceTypes';
import { toast } from "sonner";

/**
 * Switch to standard wash and remove express items
 */
export const switchToStandardWash = (
  cartItems: any[],
  pendingService: Service | null,
  setCartItems: (items: any[]) => void,
  onOpenServicePopup: (service: Service) => void,
  handleAddToCart: (orderDetails: any) => void,
  studioId: string,
  setMixedServicesDialogOpen: (open: boolean) => void,
  setPendingService: (service: Service | null) => void
) => {
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

/**
 * Continue with mixed wash types
 */
export const continueMixedTypes = (
  pendingService: Service | null,
  selectedTab: string,
  handleAddToCart: (orderDetails: any) => void,
  onOpenServicePopup: (service: Service) => void,
  studioId: string,
  setPendingService: (service: Service | null) => void,
  setMixedServicesDialogOpen: (open: boolean) => void
) => {
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
