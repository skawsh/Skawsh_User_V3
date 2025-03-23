
import React, { useState, useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import WeightInput from './service/WeightInput';
import ClothingItemsList, { ClothingItem } from './service/ClothingItemsList';
import AddClothingItemForm from './service/AddClothingItemForm';
import { formatDecimal } from '@/utils/formatUtils';

const DEFAULT_CLOTHING_ITEMS = [
  { name: 'Shirt', quantity: 0 },
  { name: 'T-Shirt', quantity: 0 },
  { name: 'Cotton Saree', quantity: 0 },
  { name: 'Silk Saree', quantity: 0 },
  { name: 'Jeans', quantity: 0 },
  { name: 'Pants', quantity: 0 }
];

interface ServiceOrderPopupProps {
  service: {
    id: string;
    name: string;
    price: number;
    unit?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (order: any) => void;
  initialWeight?: number;
  isExpress?: boolean;
  studioId?: string;
}

const ServiceOrderPopup: React.FC<ServiceOrderPopupProps> = ({
  service,
  isOpen,
  onClose,
  onAddToCart,
  initialWeight,
  isExpress = false,
  studioId = ''
}) => {
  const [weight, setWeight] = useState<number | string>(initialWeight || 1);
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(DEFAULT_CLOTHING_ITEMS);
  const [newItemName, setNewItemName] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [unit, setUnit] = useState<string>('kg');

  useEffect(() => {
    if (isOpen) {
      setWeight(initialWeight || 1);
      setClothingItems(DEFAULT_CLOTHING_ITEMS);
      setNewItemName('');
      setIsAddingItem(false);
      
      // Set the unit based on the service unit
      if (service.unit && service.unit.includes('per sft')) {
        setUnit('sft');
      } else {
        setUnit('kg');
      }
    }
  }, [isOpen, initialWeight, service.unit]);

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

  // Calculate price based on weight and express status
  const totalPrice = () => {
    const numWeight = typeof weight === 'string' ? parseFloat(weight) : weight;
    if (isNaN(numWeight)) return 0;
    // Apply 1.5x price multiplier for express service
    const basePrice = service.price * numWeight;
    return Math.round(isExpress ? basePrice * 1.5 : basePrice);
  };

  const handleAddToCart = () => {
    // Convert weight to number for cart
    let numWeight = typeof weight === 'string' ? parseFloat(weight) : weight;
    
    // Only proceed if weight is a valid number and greater than 0
    if (!isNaN(numWeight) && numWeight > 0) {
      // Format the weight to have only one decimal place
      numWeight = formatDecimal(numWeight);
      
      const orderDetails = {
        serviceId: service.id,
        serviceName: service.name,
        weight: numWeight, 
        price: service.price, // Store base price, not total
        items: clothingItems.filter(item => item.quantity > 0),
        isExpress: isExpress,
        studioId: studioId
      };
      onAddToCart(orderDetails);
      onClose();
    }
  };

  // Determine if Add to Cart button should be enabled
  const isAddToCartEnabled = () => {
    const numWeight = typeof weight === 'string' ? parseFloat(weight) : weight;
    return !isNaN(numWeight) && numWeight > 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-md p-0 gap-0 rounded-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            {service.name}
            {isExpress && (
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                Express
              </span>
            )}
          </DialogTitle>
          <DialogClose className="rounded-full h-6 w-6 flex items-center justify-center">
            <X size={18} />
          </DialogClose>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label htmlFor="weight" className="text-sm font-medium block mb-2">
              {unit === 'sft' ? 'Area (SFT)' : 'Weight (KG)'}
            </label>
            <WeightInput 
              weight={weight} 
              unit={unit} 
              price={totalPrice()} 
              onChange={handleWeightChange} 
            />
          </div>
          
          {unit === 'kg' && (
            <div>
              <label className="text-sm font-medium block mb-2">Select Clothing Items (Optional)</label>
              
              <AddClothingItemForm 
                isAddingItem={isAddingItem}
                newItemName={newItemName}
                onNewItemNameChange={handleNewItemNameChange}
                onAddItem={handleAddItem}
                onToggleAddingItem={setIsAddingItem}
              />
              
              <ClothingItemsList 
                clothingItems={clothingItems} 
                onQuantityChange={handleQuantityChange} 
              />
            </div>
          )}
        </div>
        
        <div className="p-4 pt-0">
          <Button 
            className={cn(
              "w-full h-12 rounded-lg text-white", 
              isAddToCartEnabled() ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 hover:bg-gray-400 text-gray-600"
            )} 
            onClick={handleAddToCart} 
            disabled={!isAddToCartEnabled()}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceOrderPopup;
