
import React from 'react';
import { Scale } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { formatIndianRupee } from "@/pages/StudioProfile";

interface WeightInputProps {
  weight: number | string;
  unit: string;
  price: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WeightInput: React.FC<WeightInputProps> = ({
  weight,
  unit,
  price,
  onChange
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-grow relative">
        <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input 
          id="weight" 
          type="text" 
          value={weight} 
          onChange={onChange} 
          className="pl-9" 
          placeholder={unit === 'sft' ? "Please enter the area" : "Please enter the weight"}
        />
      </div>
      <div className="bg-blue-50 rounded-md p-2 min-w-[80px] text-center">
        <div className="text-xs text-gray-600">Total</div>
        <div className="font-semibold text-blue-600">{formatIndianRupee(price)}</div>
      </div>
    </div>
  );
};

export default WeightInput;
