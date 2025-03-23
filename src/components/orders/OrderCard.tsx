
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Order } from '@/types/order';
import CancelOrderModal from './CancelOrderModal';
import PaymentMethodDrawer from './PaymentMethodDrawer';
import { Toaster } from 'sonner';
import OrderCardHeader from './OrderCardHeader';
import OrderCardMenu from './OrderCardMenu';
import OrderCardActions from './OrderCardActions';
import DeleteOrderDialog from './DeleteOrderDialog';
import FeedbackDialog from './FeedbackDialog';
import OrderRatingSection from './OrderRatingSection';
import { useRatingSystem } from '@/hooks/useRatingSystem';
import { useOrderModals } from '@/hooks/useOrderModals';

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
  const [specialCodeActivated, setSpecialCodeActivated] = useState(false);
  const [editOrderEnabled, setEditOrderEnabled] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Using the extracted rating hook
  const { 
    selectedRating, 
    isRatingSubmitted, 
    handleRatingClick, 
    handleFeedbackSubmit, 
    showFeedbackDialog, 
    setShowFeedbackDialog 
  } = useRatingSystem(order.id);
  
  // Using the extracted modals management hook
  const {
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
  } = useOrderModals({ order, onCancelComplete, onDeleteComplete });
  
  useEffect(() => {
    const hasSpecialCode = localStorage.getItem('specialCode') === 'true';
    const canEditOrder = localStorage.getItem('editOrderEnabled') === 'true';
    
    setSpecialCodeActivated(hasSpecialCode);
    setEditOrderEnabled(canEditOrder);
  }, [order.id]);

  const handleEditOrder = () => {
    navigate(`/studio/${order.studioId}?orderId=${order.id}`);
  };

  const isPendingPayment = order.status === 'pending_payment';
  const isOngoing = order.status !== 'completed' && order.status !== 'cancelled';
  const isHistory = order.status === 'completed' || order.status === 'cancelled';
  const isCompleted = order.status === 'completed';

  return <>
      <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow" ref={cardRef} tabIndex={-1}>
        <div className="p-4">
          {/* Header with dropdown menu */}
          <OrderCardHeader 
            order={order} 
            dropdownMenuContent={
              <OrderCardMenu 
                isHistory={isHistory} 
                isOngoing={isOngoing} 
                editOrderEnabled={editOrderEnabled}
                onEdit={handleEditOrder}
                onCancel={openCancelModal}
              />
            }
          />
          
          <OrderCardActions 
            order={order}
            specialCodeActivated={specialCodeActivated}
            isPendingPayment={isPendingPayment}
            onPayNowClick={handlePayNowClick}
          />
          
          {/* Rating section for completed orders */}
          <OrderRatingSection
            isCompleted={isCompleted}
            isRatingSubmitted={isRatingSubmitted}
            selectedRating={selectedRating}
            onRatingClick={handleRatingClick}
          />
        </div>
      </Card>

      {showCancelModal && <CancelOrderModal orderId={order.id} onClose={closeCancelModal} onCancelSuccess={onCancelComplete} />}

      <DeleteOrderDialog 
        open={showDeleteDialog} 
        onOpenChange={closeDeleteDialog} 
        onDelete={handleDeleteOrder} 
      />

      <PaymentMethodDrawer 
        open={showPaymentDrawer} 
        onOpenChange={setShowPaymentDrawer} 
        orderId={order.id} 
        amount={order.totalAmount} 
      />
      
      {/* Feedback Dialog */}
      <FeedbackDialog 
        open={showFeedbackDialog}
        onOpenChange={setShowFeedbackDialog}
        onSubmit={handleFeedbackSubmit}
        rating={selectedRating}
      />

      <Toaster position="top-center" />
    </>;
};

export default OrderCard;
