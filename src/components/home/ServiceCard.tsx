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
        <div className="bg-transparent">
          {image ? <img src={image} alt={title} className="w-full h-full object-cover rounded-full" /> : <div className={`transition-colors duration-300 ${isSticky ? 'text-primary-500' : 'text-primary-500'}`}>{icon}</div>}
        </div>
        <h3 className={`text-xs font-medium mt-1 transition-colors duration-300 ${isSticky ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
      </div>
    </Link>;
};
export default ServiceCard;