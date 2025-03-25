
import React from 'react';
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const isWeightValid = typeof weight === 'number' || (typeof weight === 'string' && weight !== '' && !isNaN(parseFloat(weight)));
  
  return (
    <div className="relative space-y-4">
      <motion.div 
        className="flex items-center overflow-hidden rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-primary-100 focus-within:border-primary-400 border border-gray-200 transition-all duration-300 bg-white hover:border-primary-300"
        whileHover={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
        initial={{ opacity: 0.9, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Input
          type="number"
          inputMode="decimal"
          value={weight}
          onChange={onChange}
          className="border-0 h-12 sm:h-14 flex-grow focus-visible:ring-0 focus-visible:ring-offset-0 text-base font-medium"
          placeholder={placeholder}
          step="0.1"
          min="0.1"
          aria-label={unit === 'sft' ? 'Estimated Area' : 'Estimated Weight'}
        />
        <div className="bg-gray-50 px-3 sm:px-4 py-3 text-gray-600 h-full flex items-center font-medium border-l border-gray-200">
          {unit}
        </div>
      </motion.div>
      
      {price > 0 && isWeightValid && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30,
            duration: 0.5 
          }}
          className="flex items-center justify-end gap-2 text-sm font-medium text-emerald-600 bg-emerald-50/70 py-2 px-4 rounded-lg ml-auto"
        >
          <ArrowDown className="h-3.5 w-3.5 animate-bounce-once" />
          <span>Estimated Price: ₹{price}</span>
        </motion.div>
      )}
    </div>
  );
};

export default WeightInput;
