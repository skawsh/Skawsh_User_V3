
import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  image?: string;
  index: number;
  isSticky?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  image,
  index,
  isSticky = false
}) => {
  return <Link to="/services" className="animate-fade-in transition-all duration-500 ease-in-out" style={{
    animationDelay: `${150 + index * 75}ms`
  }}>
      <div className="flex flex-col items-center text-center">
        <div className={`p-2 mb-1.5 w-14 h-14 flex items-center justify-center overflow-hidden transition-all duration-500 ease-in-out ${isSticky ? 'bg-white/20' : 'bg-blue-100'} px-[6px] py-[6px] rounded-full`}>
          {image ? <img src={image} alt={title} className="w-full h-full object-cover rounded-full" /> : <div className={`${isSticky ? 'text-white' : 'text-primary-500'}`}>{icon}</div>}
        </div>
        <h3 className={`text-xs font-medium ${isSticky ? 'text-white' : 'text-gray-800'} mt-1`}>{title}</h3>
      </div>
    </Link>;
};

export default ServiceCard;
