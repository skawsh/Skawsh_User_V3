
import React from 'react';
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

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
  const isWeightValid = typeof weight === 'number' || (typeof weight === 'string' && weight !== '' && !isNaN(parseFloat(weight)));
  
  return (
    <div className="relative">
      <div className="flex items-center overflow-hidden rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-primary-100 focus-within:border-primary-400 border border-gray-200 transition-all duration-200 bg-white">
        <Input
          type="number"
          value={weight}
          onChange={onChange}
          className="border-0 h-14 flex-grow focus-visible:ring-0 focus-visible:ring-offset-0 text-base font-medium"
          placeholder={placeholder}
          step="0.1"
          min="0.1"
          aria-label={unit === 'sft' ? 'Estimated Area' : 'Estimated Weight'}
        />
        <div className="bg-gray-50 px-4 py-3 text-gray-600 h-full flex items-center font-medium border-l border-gray-200">
          {unit}
        </div>
      </div>
      
      {price > 0 && isWeightValid && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-right text-sm mt-3 font-medium text-emerald-600 bg-emerald-50 py-2 px-4 rounded-lg inline-block ml-auto"
        >
          Estimated Price: ₹{price}
        </motion.div>
      )}
    </div>
  );
};

export default WeightInput;
