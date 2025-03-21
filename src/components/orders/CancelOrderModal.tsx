
import React, { useRef, useEffect } from 'react';
import { cancelOrder } from '@/utils/ordersUtils';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface CancelOrderModalProps {
  orderId: string;
  onClose: () => void;
  onCancelSuccess?: () => void;
}

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  orderId,
  onClose,
  onCancelSuccess,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus the modal when it mounts
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
    return () => {
      // Clear any lingering focus
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };
  }, []);

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(orderId);
      // Close the modal immediately to remove overlay/focus traps
      onClose();
      toast({
        title: 'Order cancelled',
        description: 'Your order has been cancelled successfully.',
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      if (onCancelSuccess) {
        onCancelSuccess();
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel order. Please try again.',
        variant: 'destructive',
        duration: 3000,
      });
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Clicking outside closes the modal
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing modal
      >
        <h2 className="text-xl font-bold mb-4">Cancel Order</h2>
        <p className="mb-6">
          Do you want to cancel this order? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 focus:outline-none"
          >
            No
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCancelOrder();
            }}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
