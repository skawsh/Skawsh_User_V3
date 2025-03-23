
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Order } from '@/types/order';
import CancelOrderModal from './CancelOrderModal';
import PaymentMethodDrawer from './PaymentMethodDrawer';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import OrderCardHeader from './OrderCardHeader';
import OrderCardMenu from './OrderCardMenu';
import OrderCardActions from './OrderCardActions';
import DeleteOrderDialog from './DeleteOrderDialog';

interface OrderCardProps {
  order: Order;
  onCancelComplete?: () => void;
  onDeleteComplete?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onCancelComplete,
  onDeleteComplete
}) => {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [specialCodeActivated, setSpecialCodeActivated] = useState(false);
  const [editOrderEnabled, setEditOrderEnabled] = useState(false);
  const [showPaymentDrawer, setShowPaymentDrawer] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  useEffect(() => {
    const hasSpecialCode = localStorage.getItem('specialCode') === 'true';
    const canEditOrder = localStorage.getItem('editOrderEnabled') === 'true';
    
    setSpecialCodeActivated(hasSpecialCode);
    setEditOrderEnabled(canEditOrder);
  }, []);

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

  const handleEditOrder = () => {
    navigate(`/studio/${order.studioId}?orderId=${order.id}`);
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
              status: 'processing',
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

  const isPendingPayment = order.status === 'pending_payment';
  const isOngoing = order.status !== 'completed' && order.status !== 'cancelled';
  const isHistory = order.status === 'completed' || order.status === 'cancelled';

  return <>
      <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow" ref={cardRef} tabIndex={-1}>
        <div className="p-4">
          <OrderCardHeader 
            order={order} 
            onOpenMenu={() => setDropdownOpen(true)} 
          />
          
          {dropdownOpen && (
            <OrderCardMenu 
              isHistory={isHistory} 
              isOngoing={isOngoing} 
              editOrderEnabled={editOrderEnabled}
              onEdit={handleEditOrder}
              onCancel={openCancelModal}
            />
          )}
          
          <OrderCardActions 
            order={order}
            specialCodeActivated={specialCodeActivated}
            isPendingPayment={isPendingPayment}
            onPayNowClick={handlePayNowClick}
          />
        </div>
      </Card>

      {showCancelModal && <CancelOrderModal orderId={order.id} onClose={closeCancelModal} onCancelSuccess={onCancelComplete} />}

      <DeleteOrderDialog 
        open={showDeleteDialog} 
        onOpenChange={setShowDeleteDialog} 
        onDelete={handleDeleteOrder} 
      />

      <PaymentMethodDrawer 
        open={showPaymentDrawer} 
        onOpenChange={setShowPaymentDrawer} 
        orderId={order.id} 
        amount={order.totalAmount} 
      />

      <Toaster position="top-center" />
    </>;
};

export default OrderCard;
