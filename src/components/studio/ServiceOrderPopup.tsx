
import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import WeightInput from './service/WeightInput';
import ClothingItemsList, { ClothingItem } from './service/ClothingItemsList';
import AddClothingItemForm from './service/AddClothingItemForm';
import { formatDecimal } from '@/utils/formatUtils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent 
        className="max-w-md p-0 gap-0 rounded-xl shadow-lg animate-in duration-300 slide-in-from-bottom"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            {service.name}
            {isExpress && (
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                Express
              </span>
            )}
          </DialogTitle>
        </div>
        
        <div className="p-6 space-y-5">
          <div>
            <label htmlFor="weight" className="text-sm font-medium block mb-2">
              {unit === 'sft' ? 'Estimated Area (SFT)' : 'Estimated Weight (KG)'}
            </label>
            <WeightInput 
              weight={weight} 
              unit={unit} 
              price={totalPrice()} 
              onChange={handleWeightChange} 
              placeholder="Please enter the estimated weight"
            />
          </div>
          
          {unit === 'kg' && isWeightValid() && (
            <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Add clothing items within {weight}{unit} (Optional)
                </label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-sm text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsClothingItemsOpen(!isClothingItemsOpen)}
                >
                  {isClothingItemsOpen ? (
                    <span className="flex items-center gap-1">
                      Hide <ChevronUp className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      Show <ChevronDown className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
              
              <Collapsible open={isClothingItemsOpen} onOpenChange={setIsClothingItemsOpen}>
                <CollapsibleContent className="space-y-4 pt-2 animate-in slide-in-from-top duration-200">
                  <AddClothingItemForm 
                    isAddingItem={isAddingItem}
                    newItemName={newItemName}
                    onNewItemNameChange={handleNewItemNameChange}
                    onAddItem={handleAddItem}
                    onToggleAddingItem={setIsAddingItem}
                    isDisabled={!isWeightValid()}
                  />
                  
                  <ClothingItemsList 
                    clothingItems={clothingItems} 
                    onQuantityChange={handleQuantityChange}
                    isDisabled={!isWeightValid()}
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </div>
        
        <div className="p-6 pt-0">
          <Button 
            className={cn(
              "w-full h-12 rounded-lg text-white shadow-md transition-all", 
              isAddToCartEnabled() 
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" 
                : "bg-gray-300 hover:bg-gray-400 text-gray-600"
            )} 
            onClick={handleAddToCart} 
            disabled={!isAddToCartEnabled()}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Sack
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceOrderPopup;
