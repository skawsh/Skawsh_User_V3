
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronRight, MoreVertical, Trash2, PenLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Order } from '@/types/order';
import { cancelOrder } from '@/utils/ordersUtils';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface OrderCardProps {
  order: Order;
  onCancelComplete?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ 
  order,
  onCancelComplete 
}) => {
  const { toast } = useToast();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const queryClient = useQueryClient();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleCancelOrder = async () => {
    if (isCancelling) return;
    
    setIsCancelling(true);
    try {
      await cancelOrder(order.id);
      
      // Close the dialog immediately before any other operations
      setShowCancelDialog(false);
      
      // Show success toast
      toast({
        title: "Order cancelled",
        description: "Your order has been cancelled successfully.",
        duration: 3000, // Auto dismiss after 3 seconds
      });
      
      // Invalidate queries to refresh the order list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      // Call the optional callback to help reset focus at the parent level
      if (onCancelComplete) {
        onCancelComplete();
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast({
        title: "Error",
        description: "Failed to cancel order. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      // Always ensure dialog is closed and state is reset
      setShowCancelDialog(false);
      setIsCancelling(false);
      
      // Explicitly blur any focused element to prevent blinking cursor
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  const handleOpenDialog = () => {
    setShowCancelDialog(true);
  };

  const handleCloseDialog = () => {
    setShowCancelDialog(false);
    
    // Explicitly blur any focused element
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const isPendingPayment = order.status === 'pending_payment';
  const isOngoing = order.status !== 'completed' && order.status !== 'cancelled';

  return (
    <>
      <Card 
        className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        ref={cardRef}
        tabIndex={-1}
      >
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
                <DropdownMenuItem 
                  onClick={handleOpenDialog}
                  disabled={!isOngoing || isCancelling}
                  className="text-red-500 focus:text-red-500"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Cancel Order
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PenLine className="mr-2 h-4 w-4" />
                  Edit Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="mt-2">
            <Link to={`/studio/${order.studioId}`} className="text-sm text-primary-500 flex items-center">
              View Menu <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="mt-3 flex gap-2">
            <Button 
              asChild
              variant="outline" 
              size="sm" 
              className="rounded-full shadow-sm hover:shadow flex-1"
            >
              <Link to={`/orders/${order.id}`}>View Details</Link>
            </Button>
            
            {isPendingPayment && (
              <Button 
                asChild
                variant="default" 
                size="sm" 
                className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow flex-1"
              >
                <Link to={`/payment/${order.id}`}>Pay Now ₹{order.totalAmount}</Link>
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Only render the AlertDialog when showCancelDialog is true */}
      {showCancelDialog && (
        <AlertDialog 
          open={showCancelDialog} 
          onOpenChange={handleCloseDialog}
        >
          <AlertDialogContent 
            className="rounded-lg" 
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleCloseDialog();
              }
            }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Order</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to cancel this order? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel 
                className="rounded-full"
                disabled={isCancelling}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCloseDialog();
                }}
                tabIndex={0}
              >
                No
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCancelOrder();
                }}
                disabled={isCancelling}
                className="rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                type="button"
                tabIndex={0}
              >
                {isCancelling ? 'Cancelling...' : 'Yes'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default OrderCard;
