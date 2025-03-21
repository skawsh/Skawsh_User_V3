
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Order } from '@/utils/ordersUtils';
import { ChevronRight, MoreVertical } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigate = useNavigate();

  const handleViewStudio = () => {
    navigate(`/studio/${order.studioId}`);
  };

  const handleViewDetails = () => {
    // For now, just navigate to the studio page
    // In a real app, this would go to a detailed order view
    navigate(`/studio/${order.studioId}`);
  };
  
  const totalAmount = order.totalAmount;
  const isPending = order.status === 'pending' || order.status === 'confirmed';

  return (
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
        <ContextMenu>
          <ContextMenuTrigger>
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0" 
              aria-label="More options"
            >
              <MoreVertical size={20} />
            </Button>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={handleViewStudio}>
              View Studio
            </ContextMenuItem>
            <ContextMenuItem onClick={handleViewDetails}>
              Order Details
            </ContextMenuItem>
            {isPending && (
              <ContextMenuItem>
                Cancel Order
              </ContextMenuItem>
            )}
          </ContextMenuContent>
        </ContextMenu>
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
  );
};

export default OrderCard;
