
import React from 'react';
import { ShoppingBag, Clock, Footprints, Shirt } from 'lucide-react';

interface ServiceIconProps {
  serviceName: string;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ serviceName }) => {
  if (serviceName.includes('Fold')) {
    return (
      <img 
        src="/lovable-uploads/0ef15cb3-a69a-4edc-b3d3-cecffd98ac53.png" 
        alt="Laundry" 
        className="w-full h-full object-cover" 
      />
    );
  } else if (serviceName.includes('Iron')) {
    return (
      <img 
        src="/lovable-uploads/9023929c-2175-414d-a1f2-b5e24e4b1fcb.png" 
        alt="Iron Only" 
        className="w-full h-full object-cover"
      />
    );
  } else if (
    serviceName.includes('Shoe') || 
    serviceName.includes('shoe') || 
    serviceName.includes('Sneaker') || 
    serviceName.includes('Sandal') || 
    serviceName.includes('Canvas') || 
    serviceName.includes('Leather') || 
    serviceName.includes('Heel')
  ) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Footprints size={20} className="text-blue-500" />
      </div>
    );
  } else if (
    serviceName.includes('Shirt') || 
    serviceName.includes('T-shirt') || 
    serviceName.includes('Top')
  ) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Shirt size={20} className="text-green-500" />
      </div>
    );
  } else if (serviceName.includes('Pant')) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Shirt size={20} className="text-purple-500" />
      </div>
    );
  } else if (serviceName.includes('Stain') || serviceName.includes('stain')) {
    return (
      <img 
        src="/lovable-uploads/96bfc3cc-fd94-45ef-b8cb-527f655f2f26.png" 
        alt="Stain Removal" 
        className="w-full h-full object-cover"
      />
    );
  } else {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <ShoppingBag size={20} className="text-indigo-500" />
      </div>
    );
  }
};

export default ServiceIcon;
