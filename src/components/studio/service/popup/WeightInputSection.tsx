
import React from 'react';
import WeightInput from '../WeightInput';

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
    <div>
      <label htmlFor="weight" className="text-sm font-medium block mb-2 text-gray-700">
        {unit === 'sft' ? 'Estimated Area (SFT)' : 'Estimated Weight (KG)'}
      </label>
      <WeightInput 
        weight={weight} 
        unit={unit} 
        price={price} 
        onChange={onChange} 
        placeholder="Please enter the estimated weight"
      />
    </div>
  );
};

export default WeightInputSection;
