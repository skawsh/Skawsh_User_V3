
import React from 'react';
import { ShoppingBag, Clock, Footprints, Shirt } from 'lucide-react';

interface ServiceIconProps {
  serviceName: string;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ serviceName }) => {
  if (serviceName.includes('Fold')) {
    return (
      <img src="/lovable-uploads/0ef15cb3-a69a-4edc-b3d3-cecffd98ac53.png" alt="Laundry" className="w-full h-full object-cover" />
    );
  } else if (serviceName.includes('Iron')) {
    return (
      <img 
        src="https://images.unsplash.com/photo-1591643485762-b49e9f823bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
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
        <Footprints size={20} className="text-gray-500" />
      </div>
    );
  } else if (
    serviceName.includes('Shirt') || 
    serviceName.includes('T-shirt') || 
    serviceName.includes('Top')
  ) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Shirt size={20} className="text-gray-500" />
      </div>
    );
  } else if (serviceName.includes('Pant')) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Shirt size={20} className="text-gray-500" />
      </div>
    );
  } else if (serviceName.includes('Stain') || serviceName.includes('stain')) {
    return (
      <img 
        src="https://images.unsplash.com/photo-1585421514284-efb74320a966?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
        alt="Stain Removal" 
        className="w-full h-full object-cover"
      />
    );
  } else {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <ShoppingBag size={20} className="text-gray-500" />
      </div>
    );
  }
};

export default ServiceIcon;
