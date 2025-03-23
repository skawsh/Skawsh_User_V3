
import React from 'react';
import { Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddClothingItemFormProps {
  isAddingItem: boolean;
  newItemName: string;
  onNewItemNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddItem: () => void;
  onToggleAddingItem: (isAdding: boolean) => void;
}

const AddClothingItemForm: React.FC<AddClothingItemFormProps> = ({
  isAddingItem,
  newItemName,
  onNewItemNameChange,
  onAddItem,
  onToggleAddingItem
}) => {
  return (
    <div className="flex items-center justify-between mb-3">
      {isAddingItem ? (
        <div className="flex w-full items-center gap-2">
          <Input 
            value={newItemName} 
            onChange={onNewItemNameChange} 
            placeholder="Item name" 
            className="flex-grow" 
          />
          <Button onClick={onAddItem} size="sm" className="whitespace-nowrap">
            Add
          </Button>
          <Button onClick={() => onToggleAddingItem(false)} size="sm" variant="ghost">
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <Button 
            onClick={() => onToggleAddingItem(true)} 
            variant="link" 
            size="sm" 
            className="text-blue-600 p-0 h-auto"
          >
            Add clothing Item
          </Button>
          <Button 
            onClick={() => onToggleAddingItem(true)} 
            size="icon" 
            variant="ghost" 
            className="rounded-full h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default AddClothingItemForm;
