
import { useState, useEffect } from 'react';
import { ClothingItem } from '../ClothingItemsList';
import { formatDecimal } from '@/utils/formatUtils';

const DEFAULT_CLOTHING_ITEMS = [
  { name: 'Shirt', quantity: 0 },
  { name: 'T-Shirt', quantity: 0 },
  { name: 'Cotton Saree', quantity: 0 },
  { name: 'Silk Saree', quantity: 0 },
  { name: 'Jeans', quantity: 0 },
  { name: 'Pants', quantity: 0 }
];

interface UseServiceOrderProps {
  isOpen: boolean;
  service: {
    id: string;
    name: string;
    price: number;
    unit?: string;
  };
  isExpress?: boolean;
  studioId?: string;
  onAddToCart: (order: any) => void;
  onClose: () => void;
}

export const useServiceOrder = ({
  isOpen,
  service,
  isExpress = false,
  studioId = '',
  onAddToCart,
  onClose
}: UseServiceOrderProps) => {
  const [weight, setWeight] = useState<number | string>('');
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(DEFAULT_CLOTHING_ITEMS);
  const [newItemName, setNewItemName] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [unit, setUnit] = useState<string>('kg');
  const [isClothingItemsOpen, setIsClothingItemsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setWeight('');
      setClothingItems(DEFAULT_CLOTHING_ITEMS);
      setNewItemName('');
      setIsAddingItem(false);
      setIsClothingItemsOpen(false);
      
      if (service.unit && service.unit.includes('per sft')) {
        setUnit('sft');
      } else {
        setUnit('kg');
      }
    }
  }, [isOpen, service.unit]);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
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
        quantity: 0
      }]);
      setNewItemName('');
      setIsAddingItem(false);
    }
  };

  const handleNewItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(e.target.value);
  };

  const totalPrice = () => {
    const numWeight = typeof weight === 'string' ? parseFloat(weight) : weight;
    if (isNaN(numWeight)) return 0;
    const basePrice = service.price * numWeight;
    return Math.round(isExpress ? basePrice * 1.5 : basePrice);
  };

  const handleAddToCart = () => {
    let numWeight = typeof weight === 'string' ? parseFloat(weight) : weight;
    
    if (!isNaN(numWeight) && numWeight > 0) {
      numWeight = formatDecimal(numWeight);
      
      const orderDetails = {
        serviceId: service.id,
        serviceName: service.name,
        weight: numWeight, 
        price: service.price,
        items: clothingItems.filter(item => item.quantity > 0),
        isExpress: isExpress,
        studioId: studioId
      };
      onAddToCart(orderDetails);
      onClose();
    }
  };

  const isAddToCartEnabled = () => {
    const numWeight = typeof weight === 'string' ? parseFloat(weight) : weight;
    return !isNaN(numWeight) && numWeight > 0;
  };

  const isWeightValid = () => {
    const numWeight = typeof weight === 'string' ? parseFloat(weight) : weight;
    return !isNaN(numWeight) && numWeight > 0;
  };

  return {
    weight,
    unit,
    clothingItems,
    newItemName,
    isAddingItem,
    isClothingItemsOpen,
    handleWeightChange,
    handleQuantityChange,
    handleAddItem,
    handleNewItemNameChange,
    totalPrice,
    handleAddToCart,
    isAddToCartEnabled,
    isWeightValid,
    setIsAddingItem,
    setIsClothingItemsOpen
  };
};
