
import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Scale } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ClothingItem {
  name: string;
  quantity: number;
}

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
}

const DEFAULT_CLOTHING_ITEMS = [
  {
    name: 'Shirt',
    quantity: 0
  },
  {
    name: 'T-Shirt',
    quantity: 0
  },
  {
    name: 'Cotton Saree',
    quantity: 0
  },
  {
    name: 'Silk Saree',
    quantity: 0
  },
  {
    name: 'Jeans',
    quantity: 0
  },
  {
    name: 'Pants',
    quantity: 0
  }
];

const ServiceOrderPopup: React.FC<ServiceOrderPopupProps> = ({
  service,
  isOpen,
  onClose,
  onAddToCart,
  initialWeight
}) => {
  const [weight, setWeight] = useState<number | string>(initialWeight || 1);
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(DEFAULT_CLOTHING_ITEMS);
  const [newItemName, setNewItemName] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setWeight(initialWeight || 1);
      setClothingItems(DEFAULT_CLOTHING_ITEMS);
      setNewItemName('');
      setIsAddingItem(false);
    }
  }, [isOpen, initialWeight]);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setWeight(inputValue);
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

  // Calculate price based on weight
  const totalPrice = () => {
    const numWeight = typeof weight === 'string' ? parseFloat(weight) : weight;
    if (isNaN(numWeight)) return 0;
    return Math.round(service.price * numWeight * 100) / 100;
  };

  const handleAddToCart = () => {
    // Convert weight to number for cart
    let numWeight = typeof weight === 'string' ? parseFloat(weight) : weight;
    
    // Only proceed if weight is a valid number and greater than 0
    if (!isNaN(numWeight) && numWeight > 0) {
      const orderDetails = {
        serviceId: service.id,
        serviceName: service.name,
        weight: numWeight, 
        price: totalPrice(),
        items: clothingItems.filter(item => item.quantity > 0)
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
          <DialogTitle className="text-lg font-semibold">{service.name}</DialogTitle>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label htmlFor="weight" className="text-sm font-medium block mb-2">
              Weight (KG)
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-grow relative">
                <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  id="weight" 
                  type="text" 
                  value={weight} 
                  onChange={handleWeightChange} 
                  className="pl-9" 
                  placeholder="Enter weight"
                />
              </div>
              <div className="bg-blue-50 rounded-md p-2 min-w-[80px] text-center">
                <div className="text-xs text-gray-600">Total</div>
                <div className="font-semibold text-blue-600">₹{totalPrice().toFixed(2)}</div>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-2">Select Clothing Items (Optional)</label>
            
            <div className="flex items-center justify-between mb-3">
              {isAddingItem ? <div className="flex w-full items-center gap-2">
                  <Input value={newItemName} onChange={e => setNewItemName(e.target.value)} placeholder="Item name" className="flex-grow" />
                  <Button onClick={handleAddItem} size="sm" className="whitespace-nowrap">
                    Add
                  </Button>
                  <Button onClick={() => setIsAddingItem(false)} size="sm" variant="ghost">
                    Cancel
                  </Button>
                </div> : <>
                  <Button onClick={() => setIsAddingItem(true)} variant="link" size="sm" className="text-blue-600 p-0 h-auto">Add clothing Item</Button>
                  <Button onClick={() => setIsAddingItem(true)} size="icon" variant="ghost" className="rounded-full h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </>}
            </div>
            
            <div className="space-y-4 max-h-[240px] overflow-y-auto">
              {clothingItems.map((item, index) => <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <Button size="icon" variant="outline" className="h-7 w-7 rounded-full border-gray-300" onClick={() => handleQuantityChange(index, -1)} disabled={item.quantity === 0}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="w-6 text-center">{item.quantity}</span>
                    
                    <Button size="icon" variant="outline" className="h-7 w-7 rounded-full border-gray-300" onClick={() => handleQuantityChange(index, 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>)}
            </div>
          </div>
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
