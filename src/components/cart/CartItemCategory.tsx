
import React from 'react';
import { Shirt, Package, Footprints, Clock } from 'lucide-react';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '@/types/serviceTypes';
import { cn } from '@/lib/utils';

interface CartItemCategoryProps {
  categoryName: string;
  items: CartItemType[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  inWashTypeSection?: boolean;
}

const CartItemCategory: React.FC<CartItemCategoryProps> = ({ 
  categoryName, 
  items,
  onQuantityChange,
  onRemoveItem,
  inWashTypeSection = false
}) => {
  const getCategoryIcon = () => {
    switch (categoryName) {
      case 'Dry Cleaning Services':
        return <Shirt size={18} className="text-gray-700 mr-2" />;
      case 'Core Laundry Services':
        return <Package size={18} className="text-gray-700 mr-2" />;
      case 'Shoe Laundry Services':
        return <Footprints size={18} className="text-gray-700 mr-2" />;
      default:
        return null;
    }
  };
  
  const subCategories = Array.from(new Set(items.map(item => item.serviceSubCategory).filter(Boolean)));
  
  return (
    <div className="mb-4 animate-fade-in">
      <div className="flex items-center py-2">
        {getCategoryIcon()}
        <h3 className="font-semibold text-gray-800">{categoryName}</h3>
      </div>
      
      {subCategories.length > 0 ? (
        // Group items by subcategory
        subCategories.map(subCategory => (
          <div key={subCategory} className="pl-6 mb-4">
            <div className="text-sm text-gray-600 font-medium mb-1">
              {subCategory}
            </div>
            <div className="border-t border-gray-100">
              {items
                .filter(item => item.serviceSubCategory === subCategory)
                .map(item => (
                  <div key={item.serviceId} className="border-b border-gray-100 last:border-b-0">
                    <CartItem 
                      item={item}
                      onQuantityChange={onQuantityChange}
                      onRemoveItem={onRemoveItem}
                      hideWashTypeLabel={inWashTypeSection}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        ))
      ) : (
        // Display items without subcategory
        <div className="border-t border-gray-100">
          {items.map((item) => (
            <div key={item.serviceId} className="border-b border-gray-100 last:border-b-0">
              <CartItem 
                item={item}
                onQuantityChange={onQuantityChange}
                onRemoveItem={onRemoveItem}
                hideWashTypeLabel={inWashTypeSection}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItemCategory;
