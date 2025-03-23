
import React from 'react';
import CartItemCategory from './CartItemCategory';
import WashTypeHeader from './WashTypeHeader';
import WeightWarning from './WeightWarning';
import { CartItem } from '@/types/serviceTypes';

interface CartItemsListProps {
  items: CartItem[];
  dominantWashType: string | null;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ 
  items, 
  dominantWashType,
  onQuantityChange,
  onRemoveItem
}) => {
  // Group items by category
  const groupedItems = items.reduce((acc: Record<string, CartItem[]>, item) => {
    const category = item.serviceCategory || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
  
  return (
    <div className="mb-4 animate-fade-in" style={{animationDelay: "100ms"}}>
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Review your order</h2>
      
      <WeightWarning />
      
      {dominantWashType && <WashTypeHeader washType={dominantWashType} />}
      
      {Object.entries(groupedItems).map(([categoryName, categoryItems], index) => (
        <CartItemCategory
          key={categoryName}
          categoryName={categoryName}
          items={categoryItems}
          onQuantityChange={onQuantityChange}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
};

export default CartItemsList;
