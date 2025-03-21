
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Building, Clock, Package, X, Trash2 } from 'lucide-react';
import { 
  Order, 
  formatDate, 
  getStatusColor, 
  cancelOrder, 
  deleteOrder 
} from '@/utils/ordersUtils';
import { useToast } from '@/components/ui/use-toast';

interface OrderCardProps {
  order: Order;
  onUpdate: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdate }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleViewStudio = () => {
    navigate(`/studio/${order.studioId}`);
  };

  const handleCancelOrder = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      if (cancelOrder(order.id)) {
        setTimeout(() => {
          onUpdate();
          setIsLoading(false);
        }, 300);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to cancel order. Please try again."
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred."
      });
      setIsLoading(false);
    }
  };

  const handleDeleteOrder = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      if (deleteOrder(order.id)) {
        setTimeout(() => {
          onUpdate();
          setIsLoading(false);
        }, 300);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete order. Please try again."
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred."
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden mb-4 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={order.studioImage} alt={order.studioName} />
              <AvatarFallback>
                <Building size={20} />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-800">{order.studioName}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={12} />
                <span>Order placed: {formatDate(order.orderDate)}</span>
              </div>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div>
        </div>

        <div className="space-y-2 my-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-1 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-primary-400" />
                <span className="text-sm">{item.serviceName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">x{item.quantity}</span>
                <span className="text-sm font-medium">₹{item.price}</span>
              </div>
            </div>
          ))}

          {order.scheduledDate && (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
              <Clock size={14} className="text-primary-500" />
              <span>Scheduled for: {formatDate(order.scheduledDate)}</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 font-medium">
            <span className="text-gray-600">Total</span>
            <span className="text-primary-600">₹{order.totalAmount}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 text-gray-600" 
          onClick={handleViewStudio}
        >
          View Studio
        </Button>
        
        {['pending', 'confirmed'].includes(order.status) ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-red-500 border-red-200 hover:bg-red-50" 
            onClick={handleCancelOrder}
            disabled={isLoading}
          >
            <X size={16} className="mr-1" /> Cancel
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-red-500 border-red-200 hover:bg-red-50" 
            onClick={handleDeleteOrder}
            disabled={isLoading}
          >
            <Trash2 size={16} className="mr-1" /> Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
