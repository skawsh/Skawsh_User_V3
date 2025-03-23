
import React from 'react';
import { Minus, Plus, Trash2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: {
    serviceId: string;
    serviceName: string;
    price: number;
    quantity: number;
    washType?: string;
  };
  onQuantityChange: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemoveItem }) => {
  const formatIndianRupee = (amount: number): string => {
    return `₹${amount.toFixed(0)}`;
  };
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
      {item.washType && (
        <div className={cn(
          "text-xs font-medium mb-1.5 flex items-center",
          item.washType === "Standard Wash" ? "text-blue-600" : "text-orange-500"
        )}>
          <Clock size={12} className="mr-1" /> {item.washType}
        </div>
      )}
      <div className="mb-1">
        <h4 className="font-medium text-gray-800">{item.serviceName}</h4>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{item.quantity} Item × {formatIndianRupee(item.price)}</span>
          <span className="font-medium text-gray-800">{formatIndianRupee(item.price * item.quantity)}</span>
        </div>
        <div className="text-xs text-gray-500 mb-2 flex items-center">
          <Clock size={12} className="inline mr-1" /> 
          <span>
            {item.washType === "Express Wash" ? "12h Express Delivery" : "36h Standard Delivery"}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden shadow-sm">
          <button 
            className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => onQuantityChange(item.serviceId, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1 border-x border-gray-200 bg-white">{item.quantity}</span>
          <button 
            className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => onQuantityChange(item.serviceId, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <button 
          className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
          onClick={() => onRemoveItem(item.serviceId)}
          aria-label="Remove item"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
