
import React from 'react';
import WeightInput from '../WeightInput';
import { Label } from "@/components/ui/label";

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
    <div className="space-y-3">
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
    </div>
  );
};

export default WeightInputSection;
