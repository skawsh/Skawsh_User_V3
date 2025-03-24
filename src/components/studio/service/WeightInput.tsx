
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
  placeholder = "Please enter the estimated weight" 
}) => {
  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all duration-200">
        <Input
          type="number"
          value={weight}
          onChange={onChange}
          className="border-0 h-12 flex-grow focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder={placeholder}
          step="0.1"
          min="0.1"
        />
        <div className="bg-gray-100 px-3 py-3 text-gray-600 h-full flex items-center font-medium">
          {unit}
        </div>
      </div>
      
      <div className="text-right text-sm mt-2 font-medium text-emerald-600 transition-all duration-300">
        {price > 0 ? `Estimated Price: ₹${price}` : ''}
      </div>
    </div>
  );
};

export default WeightInput;
