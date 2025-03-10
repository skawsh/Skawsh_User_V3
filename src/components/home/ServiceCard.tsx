
import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  image?: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, image, index }) => {
  return (
    <Link to="/services" className="animate-fade-in" style={{ animationDelay: `${150 + index * 75}ms` }}>
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-gray-100 p-2 mb-2 w-16 h-16 flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-primary-500">{icon}</div>
          )}
        </div>
        <h3 className="text-xs font-medium text-gray-800">{title}</h3>
      </div>
    </Link>
  );
};

export default ServiceCard;
