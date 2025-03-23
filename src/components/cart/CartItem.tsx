
import React, { useState } from 'react';
import { Minus, Plus, Trash2, Clock, ShoppingBag, Check, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CartItem as CartItemType } from '@/types/serviceTypes';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ClothingItemsList from '../studio/service/ClothingItemsList';
import AddClothingItemForm from '../studio/service/AddClothingItemForm';

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
  const [isEditingItems, setIsEditingItems] = useState(false);
  const [clothingItems, setClothingItems] = useState(item.items || []);
  const [newItemName, setNewItemName] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  const formatIndianRupee = (amount: number): string => {
    return `₹${amount.toFixed(0)}`;
  };
  
  const showWeightDetails = item.weight && item.weight > 0;
  const hasClothingItems = item.items && item.items.length > 0;
  
  const handleDecreaseQuantity = () => {
    if (showWeightDetails) {
      // For weight-based items, decrease by 0.1kg
      const newWeight = parseFloat((item.weight - 0.1).toFixed(1));
      if (newWeight <= 0) {
        onRemoveItem(item.serviceId);
      } else {
        onQuantityChange(item.serviceId, newWeight);
      }
    } else {
      // For count-based items, decrease by 1
      const newQuantity = item.quantity - 1;
      if (newQuantity <= 0) {
        onRemoveItem(item.serviceId);
      } else {
        onQuantityChange(item.serviceId, newQuantity);
      }
    }
  };
  
  const handleIncreaseQuantity = () => {
    if (showWeightDetails) {
      // For weight-based items, increase by 0.1kg
      const newWeight = parseFloat((item.weight + 0.1).toFixed(1));
      onQuantityChange(item.serviceId, newWeight);
    } else {
      // For count-based items, increase by 1
      onQuantityChange(item.serviceId, item.quantity + 1);
    }
  };

  const handleQuantityChange = (index: number, change: number) => {
    const newItems = [...clothingItems];
    const newQuantity = Math.max(0, newItems[index].quantity + change);
    newItems[index].quantity = newQuantity;
    setClothingItems(newItems);
  };

  const handleAddItem = () => {
    if (newItemName.trim()) {
      setClothingItems([...clothingItems, {
        name: newItemName.trim(),
        quantity: 1
      }]);
      setNewItemName('');
      setIsAddingItem(false);
    }
  };

  const handleNewItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(e.target.value);
  };

  const handleSaveItems = () => {
    // Filter out items with quantity 0
    const updatedItems = clothingItems.filter(item => item.quantity > 0);
    
    // Update the cart item with the new clothing items
    const updatedItem = {
      ...item,
      items: updatedItems
    };
    
    // Use the same onQuantityChange function to update the item
    // This will trigger a cart update with the new items
    onQuantityChange(item.serviceId, showWeightDetails ? item.weight : item.quantity);
    
    // Update local state
    localStorage.setItem('cartItems', JSON.stringify(
      JSON.parse(localStorage.getItem('cartItems') || '[]').map((cartItem: CartItemType) => 
        cartItem.serviceId === item.serviceId ? {...cartItem, items: updatedItems} : cartItem
      )
    ));
    
    // Dispatch custom event for cart updates
    document.dispatchEvent(new Event('cartUpdated'));
    
    setIsEditingItems(false);
  };
  
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
            <div className="text-xs font-medium text-gray-700 mb-1 flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingBag size={12} className="mr-1" /> 
                Selected Items:
              </div>
              
              {/* Edit button for weight-based items */}
              {showWeightDetails && (
                <Sheet>
                  <SheetTrigger asChild>
                    <button 
                      className="text-blue-500 hover:text-blue-700 text-xs flex items-center"
                      onClick={() => {
                        setClothingItems(item.items || []);
                        setIsAddingItem(false);
                      }}
                    >
                      <Edit size={12} className="mr-1" /> Edit
                    </button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="px-0 py-0 h-[70vh]">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-4">Edit Selected Items</h3>
                      
                      <AddClothingItemForm 
                        isAddingItem={isAddingItem}
                        newItemName={newItemName}
                        onNewItemNameChange={handleNewItemNameChange}
                        onAddItem={handleAddItem}
                        onToggleAddingItem={setIsAddingItem}
                        isDisabled={false}
                      />
                      
                      <ClothingItemsList 
                        clothingItems={clothingItems} 
                        onQuantityChange={handleQuantityChange}
                        isDisabled={false}
                      />
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button 
                          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={handleSaveItems}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
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
              onClick={handleDecreaseQuantity}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 border-x border-gray-200 bg-white">{item.weight} kg</span>
            <button 
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={handleIncreaseQuantity}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden shadow-sm">
            <button 
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={handleDecreaseQuantity}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 border-x border-gray-200 bg-white">{item.quantity}</span>
            <button 
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={handleIncreaseQuantity}
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
