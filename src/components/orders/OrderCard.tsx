
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
import FeedbackDialog from './FeedbackDialog';
import OrderRatingSection from './OrderRatingSection';

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
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const hasSpecialCode = localStorage.getItem('specialCode') === 'true';
    const canEditOrder = localStorage.getItem('editOrderEnabled') === 'true';
    
    setSpecialCodeActivated(hasSpecialCode);
    setEditOrderEnabled(canEditOrder);
    
    // Check if rating was already submitted for this order
    if (order.id) {
      const ratedOrders = JSON.parse(localStorage.getItem('ratedOrders') || '{}');
      if (ratedOrders[order.id]) {
        setIsRatingSubmitted(true);
      }
    }
  }, [order.id]);

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
  
  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setShowFeedbackDialog(true);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    // Save the rating and feedback
    const ratedOrders = JSON.parse(localStorage.getItem('ratedOrders') || '{}');
    ratedOrders[order.id] = { rating: selectedRating, feedback, date: new Date().toISOString() };
    localStorage.setItem('ratedOrders', JSON.stringify(ratedOrders));
    
    setIsRatingSubmitted(true);
    setShowFeedbackDialog(false);
    
    if (onDeleteComplete) {
      onDeleteComplete();
    }
  };

  const isPendingPayment = order.status === 'pending_payment';
  const isOngoing = order.status !== 'completed' && order.status !== 'cancelled';
  const isHistory = order.status === 'completed' || order.status === 'cancelled';
  const isCompleted = order.status === 'completed';

  // Function to navigate to order details
  const handleViewDetails = () => {
    navigate(`/orders/${order.id}`);
  };

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
          
          {/* View Details button */}
          <div className="mt-3">
            <button 
              onClick={handleViewDetails}
              className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View Details
            </button>
          </div>
          
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
        onOpenChange={setShowDeleteDialog} 
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
