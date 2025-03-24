
import React from 'react';
import WeightInput from '../WeightInput';
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface WeightInputSectionProps {
  weight: number | string;
  unit: string;
  price: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WeightInputSection: React.FC<WeightInputSectionProps> = ({
  weight,
  unit,
  price,
  onChange
}) => {
  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Label htmlFor="weight" className="text-base font-medium text-gray-700">
        {unit === 'sft' ? 'Estimated Area (SFT)' : 'Estimated Weight (KG)'}
      </Label>
      <WeightInput 
        weight={weight} 
        unit={unit} 
        price={price} 
        onChange={onChange} 
        placeholder={unit === 'sft' ? "Enter the estimated area" : "Enter the estimated weight"}
      />
    </motion.div>
  );
};

export default WeightInputSection;
