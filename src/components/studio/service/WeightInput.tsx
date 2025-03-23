
import React from 'react';
import { Input } from "@/components/ui/input";

interface WeightInputProps {
  weight: string | number;
  unit: string;
  price: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const WeightInput: React.FC<WeightInputProps> = ({ 
  weight, 
  unit, 
  price, 
  onChange,
  placeholder = "Enter weight" 
}) => {
  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <Input
          type="number"
          value={weight}
          onChange={onChange}
          className="border-0 h-12 flex-grow"
          placeholder={placeholder}
          step="0.1"
          min="0.1"
        />
        <div className="bg-gray-100 px-3 py-3 text-gray-600 h-full flex items-center">
          {unit}
        </div>
      </div>
      
      <div className="text-right text-sm mt-2 font-medium">
        {price > 0 ? `Estimated Price: ₹${price}` : ''}
      </div>
    </div>
  );
};

export default WeightInput;
