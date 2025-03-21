
import React, { useState } from 'react';
import { MoreVertical, Edit, X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/card';
import Button from '../../components/ui-elements/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '../../components/ui/alert-dialog';
import { toast } from "sonner";

interface OrderCardProps {
  id: string;
  studioName: string;
  studioLogo: string;
  isCompleted?: boolean;
  isSpecialCode?: boolean;
  onCancelOrder: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  studioName,
  studioLogo,
  isCompleted,
  isSpecialCode,
  onCancelOrder
}) => {
  const navigate = useNavigate();
  
  // State for confirmation dialogs - separate from any DOM operations
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const handleViewMenu = () => {
    navigate('/studio/1');
  };
  
  const handleViewDetails = () => {
    console.log('View order details');
  };
  
  const handlePayNow = () => {
    console.log('Pay now for order');
  };
  
  // Function to open confirmation dialog
  const openConfirmationDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCompleted) {
      setShowDeleteDialog(true);
    } else {
      setShowCancelDialog(true);
    }
  };
  
  // Simplified confirmation action - close dialog first, then handle order removal
  const confirmAction = () => {
    // Close the dialog first
    setShowCancelDialog(false);
    setShowDeleteDialog(false);
    
    // Use a slight delay to ensure dialog is fully closed before state updates
    setTimeout(() => {
      // Call the cancellation function
      onCancelOrder(id);
      
      // Show success message
      if (isCompleted) {
        toast.success("Order has been deleted from history");
      } else {
        toast.success("Order has been canceled");
      }
    }, 150);
  };
  
  const handleEditOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success("Redirecting to edit order");
    console.log('Edit order');
  };
  
  return (
    <>
      <Card className="border rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              <img src={studioLogo} alt={studioName} className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{studioName}</h3>
              <button onClick={handleViewMenu} className="text-primary-500 text-sm font-medium flex items-center">
                View menu
                <span className="inline-block ml-1 text-primary-500">▶</span>
              </button>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <MoreVertical size={20} className="text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              {!isCompleted && (
                <>
                  <DropdownMenuItem 
                    onClick={handleEditOrder} 
                    className={`${isSpecialCode ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                    disabled={!isSpecialCode}
                  >
                    <Edit size={16} className={`mr-2 ${isSpecialCode ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span>Edit Order</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={openConfirmationDialog} className="cursor-pointer">
                    <X size={16} className="mr-2 text-red-500" />
                    <span>Cancel Order</span>
                  </DropdownMenuItem>
                </>
              )}
              
              {isCompleted && (
                <DropdownMenuItem onClick={openConfirmationDialog} className="cursor-pointer">
                  <Trash2 size={16} className="mr-2 text-red-500" />
                  <span>Delete Order</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <CardContent className="p-3 flex items-center justify-between">
          <Button variant="outline" onClick={handleViewDetails} className="bg-blue-500 text-white hover:bg-blue-600 border-none shadow-md px-4">
            View Details
          </Button>
          
          {!isCompleted && <Button onClick={handlePayNow} className={isSpecialCode ? "bg-green-500 hover:bg-green-600 text-white border-none shadow-md px-4" : "bg-gray-500 hover:bg-gray-600 text-white border-none shadow-md px-4"} disabled={!isSpecialCode}>
              Pay Now
            </Button>}
          
          {isCompleted && <span className="text-green-500 font-medium">Completed</span>}
        </CardContent>
      </Card>

      {/* Cancel Order Dialog - Separate from the main component rendering flow */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowCancelDialog(false)}>No, keep it</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction} className="bg-red-500 hover:bg-red-600">
              Yes, cancel it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Order Dialog - Separate from the main component rendering flow */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this order from history? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>No, keep it</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction} className="bg-red-500 hover:bg-red-600">
              Yes, delete it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrderCard;
