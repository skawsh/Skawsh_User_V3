
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronRight, MoreVertical, Trash2, PenLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Order } from '@/types/order';
import CancelOrderModal from './CancelOrderModal';

interface OrderCardProps {
  order: Order;
  onCancelComplete?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ 
  order,
  onCancelComplete 
}) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const openCancelModal = () => {
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    // Explicitly blur any focused element to remove any lingering cursor
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (onCancelComplete) {
      onCancelComplete();
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
                  onClick={openCancelModal}
                  disabled={!isOngoing}
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

      {/* Only render CancelOrderModal when showCancelModal is true */}
      {showCancelModal && (
        <CancelOrderModal
          orderId={order.id}
          onClose={closeCancelModal}
          onCancelSuccess={onCancelComplete}
        />
      )}
    </>
  );
};

export default OrderCard;
