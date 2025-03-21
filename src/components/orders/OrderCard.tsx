
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Order, cancelOrder } from '@/utils/ordersUtils';
import { ChevronRight, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigate = useNavigate();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleViewStudio = () => {
    navigate(`/studio/${order.studioId}`);
  };

  const handleViewDetails = () => {
    // For now, just navigate to the studio page
    // In a real app, this would go to a detailed order view
    navigate(`/studio/${order.studioId}`);
  };

  const handleCancelOrder = () => {
    setShowCancelDialog(true);
  };

  const confirmCancelOrder = () => {
    // Call the cancelOrder function and handle the result
    const success = cancelOrder(order.id);
    
    // Always close the dialog, regardless of success
    setShowCancelDialog(false);
  };
  
  const totalAmount = order.totalAmount;
  const isPending = order.status === 'pending' || order.status === 'confirmed';

  return (
    <>
      <Card className="overflow-hidden border border-gray-300 rounded-lg">
        {/* Studio info */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {order.studioImage ? (
                <img src={order.studioImage} alt={order.studioName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-xs font-bold">LOGO</span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg">{order.studioName}</h3>
            </div>
          </div>
          
          {/* More options button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0" 
                aria-label="More options"
              >
                <MoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                Edit Order
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCancelOrder}>
                Cancel Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* View menu button - moved below studio name */}
        <div className="px-3 py-2 border-b border-gray-200">
          <button 
            onClick={handleViewStudio}
            className="flex items-center text-primary-500 text-sm font-medium"
          >
            View menu <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-between p-3 bg-gray-100">
          <button
            onClick={handleViewDetails}
            className="px-4 py-2 bg-primary-500 text-white rounded-md font-medium"
          >
            View Details
          </button>
          
          {isPending && (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md font-medium"
            >
              Pay Now<br />₹{totalAmount}
            </button>
          )}
        </div>
      </Card>

      {/* Cancel Order Confirmation Dialog */}
      <AlertDialog 
        open={showCancelDialog} 
        onOpenChange={setShowCancelDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel the order?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                confirmCancelOrder();
              }} 
              className="bg-destructive text-destructive-foreground"
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrderCard;
