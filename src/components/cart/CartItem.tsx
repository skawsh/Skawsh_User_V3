
import React from 'react';
import { Minus, Plus, Trash2, Clock, ShoppingBag, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CartItem as CartItemType } from '@/types/serviceTypes';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  hideWashTypeLabel?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onQuantityChange, 
  onRemoveItem,
  hideWashTypeLabel = false
}) => {
  const formatIndianRupee = (amount: number): string => {
    return `₹${amount.toFixed(0)}`;
  };
  
  const showWeightDetails = item.weight && item.weight > 0;
  const hasClothingItems = item.items && item.items.length > 0;
  
  return (
    <div className="bg-white px-4 py-3 animate-fade-in">
      {!hideWashTypeLabel && item.washType && (
        <div className={cn(
          "text-xs font-medium mb-1 flex items-center",
          item.washType === "standard" ? "text-blue-600" : "text-orange-500"
        )}>
          <Clock size={12} className="mr-1" /> 
          {item.washType === "standard" ? "Standard Wash" : "Express Wash"}
        </div>
      )}
      <div className="mb-1">
        <h4 className="font-medium text-gray-800">{item.serviceName}</h4>
        
        {showWeightDetails ? (
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>{item.weight} kg × {formatIndianRupee(item.price)}</span>
            <span className="font-medium text-gray-800">{formatIndianRupee(item.price * item.weight)}</span>
          </div>
        ) : (
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>{item.quantity} Item × {formatIndianRupee(item.price)}</span>
            <span className="font-medium text-gray-800">{formatIndianRupee(item.price * item.quantity)}</span>
          </div>
        )}
        
        <div className="text-xs text-gray-500 mb-2 flex items-center">
          <Clock size={12} className="inline mr-1" /> 
          <span>
            {item.washType === "express" ? "12h Express Delivery" : "36h Standard Delivery"}
          </span>
        </div>
        
        {/* Display clothing items if they exist */}
        {hasClothingItems && (
          <div className="mt-2 mb-3 bg-gray-50 p-2 rounded-md">
            <div className="text-xs font-medium text-gray-700 mb-1 flex items-center">
              <ShoppingBag size={12} className="mr-1" /> 
              Selected Items:
            </div>
            <ul className="space-y-1">
              {item.items.map((clothingItem, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-center">
                  <Check size={14} className="text-green-500 mr-1" />
                  <span className="flex-1">{clothingItem.name}</span>
                  <span className="text-gray-500 ml-1">× {clothingItem.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        {showWeightDetails ? (
          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden shadow-sm">
            <button 
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => {
                // For weight-based items, decrease by 0.1kg
                const newWeight = Math.max(0.1, parseFloat((item.weight - 0.1).toFixed(1)));
                onQuantityChange(item.serviceId, newWeight);
              }}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 border-x border-gray-200 bg-white">{item.weight} kg</span>
            <button 
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => {
                // For weight-based items, increase by 0.1kg
                const newWeight = parseFloat((item.weight + 0.1).toFixed(1));
                onQuantityChange(item.serviceId, newWeight);
              }}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        ) : (
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
        )}
        
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
