
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const WeightWarning: React.FC = () => {
  return (
    <div className="bg-yellow-50 p-3 rounded-xl mb-4 flex items-start shadow-sm border border-yellow-100">
      <AlertTriangle size={18} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-gray-700">
        Price may vary depending on the weight and clothing items during pickup of your order.
      </p>
    </div>
  );
};

export default WeightWarning;
