
import React from 'react';
import { Shirt, Package, Footprints } from 'lucide-react';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '@/types/serviceTypes';

interface CartItemCategoryProps {
  categoryName: string;
  items: CartItemType[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItemCategory: React.FC<CartItemCategoryProps> = ({ 
  categoryName, 
  items,
  onQuantityChange,
  onRemoveItem
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
    <div className="mb-5 animate-fade-in">
      <div className="flex items-center mb-2">
        {getCategoryIcon()}
        <h3 className="font-semibold text-gray-800">{categoryName}</h3>
      </div>
      
      {subCategories.length > 0 && (
        <div className="pl-6 mb-2">
          {subCategories.map(
            subCategory => subCategory && (
              <div key={subCategory} className="text-sm text-gray-600 font-medium">
                {subCategory}
              </div>
            )
          )}
        </div>
      )}
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <CartItem 
            key={item.serviceId}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItemCategory;
