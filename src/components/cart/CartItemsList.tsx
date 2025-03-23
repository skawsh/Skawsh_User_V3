
import React from 'react';
import CartItemCategory from './CartItemCategory';
import WashTypeHeader from './WashTypeHeader';
import WeightWarning from './WeightWarning';
import { CartItem } from '@/types/serviceTypes';
import { cn } from '@/lib/utils';

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
  // First separate items by wash type
  const standardItems = items.filter(item => item.washType === 'standard' || !item.washType);
  const expressItems = items.filter(item => item.washType === 'express');
  
  // Then group items by category within each wash type
  const groupItemsByCategory = (items: CartItem[]) => {
    return items.reduce((acc: Record<string, CartItem[]>, item) => {
      const category = item.serviceCategory || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  };
  
  const standardGroupedItems = groupItemsByCategory(standardItems);
  const expressGroupedItems = groupItemsByCategory(expressItems);
  
  // Check if we have both wash types
  const hasBothWashTypes = standardItems.length > 0 && expressItems.length > 0;
  
  return (
    <div className="mb-4 animate-fade-in" style={{animationDelay: "100ms"}}>
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Review your order</h2>
      
      <WeightWarning />
      
      {/* Show main wash type header if not mixed */}
      {!hasBothWashTypes && dominantWashType && (
        <WashTypeHeader washType={dominantWashType} />
      )}
      
      {/* Show individual wash type sections when using both standard and express */}
      {hasBothWashTypes ? (
        <>
          {/* Standard Wash Section */}
          {standardItems.length > 0 && (
            <div className="mb-5 bg-blue-50 rounded-xl overflow-hidden">
              <WashTypeHeader washType="standard" />
              
              <div className="p-4">
                {Object.entries(standardGroupedItems).map(([categoryName, categoryItems]) => (
                  <CartItemCategory
                    key={`standard-${categoryName}`}
                    categoryName={categoryName}
                    items={categoryItems}
                    onQuantityChange={onQuantityChange}
                    onRemoveItem={onRemoveItem}
                    inWashTypeSection={true}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Express Wash Section */}
          {expressItems.length > 0 && (
            <div className="mb-5 bg-orange-50 rounded-xl overflow-hidden">
              <WashTypeHeader washType="express" />
              
              <div className="p-4">
                {Object.entries(expressGroupedItems).map(([categoryName, categoryItems]) => (
                  <CartItemCategory
                    key={`express-${categoryName}`}
                    categoryName={categoryName}
                    items={categoryItems}
                    onQuantityChange={onQuantityChange}
                    onRemoveItem={onRemoveItem}
                    inWashTypeSection={true}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        // Single wash type display
        <>
          {Object.entries(groupItemsByCategory(items)).map(([categoryName, categoryItems]) => (
            <CartItemCategory
              key={categoryName}
              categoryName={categoryName}
              items={categoryItems}
              onQuantityChange={onQuantityChange}
              onRemoveItem={onRemoveItem}
              inWashTypeSection={false}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CartItemsList;
