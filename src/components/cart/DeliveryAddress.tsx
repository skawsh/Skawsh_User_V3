
import React from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DeliveryAddressProps {
  address: string;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ address }) => {
  const navigate = useNavigate();
  
  const handleChangeAddress = () => {
    navigate('/addresses', { 
      state: { 
        from: '/cart',
        returnToCart: true
      } 
    });
  };
  
  return (
    <div className="bg-blue-50 p-4 rounded-xl mb-4 animate-fade-in shadow-sm border border-blue-100">
      <div className="flex justify-between items-center">
        <div className="flex items-start">
          <MapPin size={20} className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-700">Delivery Address</p>
            <p className="text-sm text-gray-600">{address}</p>
          </div>
        </div>
        <button 
          onClick={handleChangeAddress}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default DeliveryAddress;
