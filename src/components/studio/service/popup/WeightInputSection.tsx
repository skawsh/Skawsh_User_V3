
import React from 'react';
import WeightInput from '../WeightInput';
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Label 
        htmlFor="weight" 
        className={`${isMobile ? 'text-sm' : 'text-base'} font-medium text-gray-700`}
      >
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
