
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronRight, MoreVertical, Trash2, Edit } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Order } from '@/types/order';
import CancelOrderModal from './CancelOrderModal';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PaymentMethodDrawer from './PaymentMethodDrawer';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

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
  
  useEffect(() => {
    // Check for special codes when component mounts
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
    // Navigate to the studio page with the order ID
    navigate(`/studio/${order.studioId}?orderId=${order.id}`);
  };

  const handlePayNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check if user has a preferred payment method saved
    const preferredMethod = localStorage.getItem('preferredPaymentMethod');
    
    if (preferredMethod) {
      // Simulate payment with preferred method without showing drawer
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
        
        // Show toast notification
        toast.success('Payment Successful', {
          description: `₹${order.totalAmount} paid successfully using ${preferredMethod}`,
          duration: 3000,
        });
        
        // Refresh the orders list
        if (onDeleteComplete) {
          onDeleteComplete();
        }
      }, 500);
    } else {
      // Show payment drawer if no preferred method
      setShowPaymentDrawer(true);
    }
  };

  const isPendingPayment = order.status === 'pending_payment';
  const isOngoing = order.status !== 'completed' && order.status !== 'cancelled';
  const isHistory = order.status === 'completed' || order.status === 'cancelled';

  return <>
      <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow" ref={cardRef} tabIndex={-1}>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{order.studioName}</h3>
              <p className="text-sm text-gray-500">Order #{order.id.substring(0, 8)}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()} • {order.status.replace('_', ' ')}
              </p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isHistory ? (
                  <></>
                ) : (
                  <>
                    <DropdownMenuItem 
                      onClick={handleEditOrder}
                      disabled={!editOrderEnabled} 
                      className="text-blue-500 focus:text-blue-500"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Order
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={openCancelModal} 
                      disabled={!isOngoing} 
                      className="text-red-500 focus:text-red-500"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Cancel Order
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="mt-2">
            <Link to={`/studio/${order.studioId}`} className="text-sm text-primary-500 flex items-center">
              View Menu <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="mt-3 flex gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-full shadow-sm hover:shadow flex-1">
              <Link to={`/orders/${order.id}`}>View Details</Link>
            </Button>
            
            {isPendingPayment && (
              <Button 
                variant="default" 
                size="sm" 
                className={`rounded-full shadow-sm hover:shadow flex-1 transition-colors ${specialCodeActivated ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'}`} 
                disabled={!specialCodeActivated}
                onClick={specialCodeActivated ? handlePayNowClick : undefined}
              >
                Pay Now ₹{order.totalAmount}
              </Button>
            )}
          </div>
        </div>
      </Card>

      {showCancelModal && <CancelOrderModal orderId={order.id} onClose={closeCancelModal} onCancelSuccess={onCancelComplete} />}

      <Dialog open={showDeleteDialog} onOpenChange={open => {
      if (!open) {
        closeDeleteDialog();
      }
    }}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={e => {
        e.preventDefault();
      }}>
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>
              Do you want to delete this order from your history?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={closeDeleteDialog}>
              No
            </Button>
            <Button variant="destructive" onClick={handleDeleteOrder} className="bg-red-500 hover:bg-red-600">
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
