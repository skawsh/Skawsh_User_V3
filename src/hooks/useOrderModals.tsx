
import { useState } from 'react';
import { toast } from 'sonner';
import { Order } from '@/types/order';

interface UseOrderModalsProps {
  order: Order;
  onCancelComplete?: () => void;
  onDeleteComplete?: () => void;
}

export const useOrderModals = ({ 
  order, 
  onCancelComplete, 
  onDeleteComplete 
}: UseOrderModalsProps) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPaymentDrawer, setShowPaymentDrawer] = useState(false);

  const openCancelModal = () => {
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (onCancelComplete) {
      onCancelComplete();
    }
  };

  const openDeleteDialog = () => {
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleDeleteOrder = () => {
    const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
    const updatedOrders = orders.filter((o: Order) => o.id !== order.id);
    sessionStorage.setItem('orders', JSON.stringify(updatedOrders));
    setShowDeleteDialog(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setTimeout(() => {
      if (onDeleteComplete) {
        onDeleteComplete();
      }
    }, 100);
  };

  const handlePayNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const preferredMethod = localStorage.getItem('preferredPaymentMethod');
    
    if (preferredMethod) {
      setTimeout(() => {
        const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
        const updatedOrders = orders.map((o: Order) => {
          if (o.id === order.id) {
            return {
              ...o,
              status: 'processing', // Keep as processing instead of completed
              paymentMethod: preferredMethod,
              paymentStatus: 'paid'
            };
          }
          return o;
        });
        sessionStorage.setItem('orders', JSON.stringify(updatedOrders));
        
        toast.success('Payment Successful', {
          description: `₹${order.totalAmount} paid successfully using ${preferredMethod}`,
          duration: 3000,
        });
        
        localStorage.setItem('showRatingPopup', 'true');
        
        if (onDeleteComplete) {
          onDeleteComplete();
        }
      }, 500);
    } else {
      setShowPaymentDrawer(true);
    }
  };

  return {
    showCancelModal,
    showDeleteDialog,
    showPaymentDrawer,
    setShowPaymentDrawer,
    openCancelModal,
    closeCancelModal,
    openDeleteDialog,
    closeDeleteDialog,
    handleDeleteOrder,
    handlePayNowClick
  };
};
