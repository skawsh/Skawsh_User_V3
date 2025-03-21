
import React, { useRef, useEffect } from 'react';
import { cancelOrder } from '@/utils/ordersUtils';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
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

interface CancelOrderModalProps {
  orderId: string;
  onClose: () => void;
  onCancelSuccess?: () => void;
}

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  orderId,
  onClose,
  onCancelSuccess
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const dialogContentRef = useRef<HTMLDivElement>(null);
  
  // Set focus on the dialog content when it mounts
  useEffect(() => {
    if (dialogContentRef.current) {
      dialogContentRef.current.focus();
    }
    
    // Cleanup function to ensure focus is properly reset
    return () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };
  }, []);

  // Handle order cancellation
  const handleCancelOrder = async () => {
    try {
      await cancelOrder(orderId);
      
      // Close the dialog first to prevent focus issues
      onClose();
      
      // Show success toast
      toast({
        title: "Order cancelled",
        description: "Your order has been cancelled successfully.",
        duration: 3000,
      });
      
      // Invalidate queries to refresh the order list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      // Call the optional success callback
      if (onCancelSuccess) {
        onCancelSuccess();
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to cancel order. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      
      // Still close the dialog to prevent UI lockup
      onClose();
    }
  };

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent 
        ref={dialogContentRef}
        className="rounded-lg" 
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
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
            className="rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            tabIndex={0}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelOrderModal;
