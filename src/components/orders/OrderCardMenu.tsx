
import React from 'react';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Trash2 } from 'lucide-react';

interface OrderCardMenuProps {
  isHistory: boolean;
  isOngoing: boolean;
  editOrderEnabled: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

const OrderCardMenu: React.FC<OrderCardMenuProps> = ({
  isHistory,
  isOngoing,
  editOrderEnabled,
  onEdit,
  onCancel
}) => {
  // For history orders, return empty content - no options will be shown
  if (isHistory) {
    return null;
  }
  
  return (
    <DropdownMenuContent align="end" className="bg-white">
      <DropdownMenuItem 
        onClick={onCancel} 
        disabled={!isOngoing} 
        className="text-red-500 focus:text-red-500"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Cancel Order
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default OrderCardMenu;
