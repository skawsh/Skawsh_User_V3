
import React from 'react';
import { Star } from 'lucide-react';

interface ServiceDetailsProps {
  name: string;
  price: number;
  unit?: string;
  description: string;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  name,
  price,
  unit,
  description
}) => {
  return (
    <div>
      <h3 className="font-medium text-gray-800">{name}</h3>
      <div className="flex items-center gap-1">
        <span className="text-primary font-semibold">
          ₹{price.toFixed(0)}
          {unit ? ` ${unit}` : ''}
        </span>
        <div className="flex items-center gap-0.5 ml-1">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-500">4.8</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>
    </div>
  );
};

export default ServiceDetails;
