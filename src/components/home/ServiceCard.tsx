
import React from 'react';
import GlassCard from '../ui-elements/GlassCard';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => {
  return (
    <Link to="/services" className="animate-fade-in" style={{ animationDelay: `${150 + index * 75}ms` }}>
      <GlassCard className="h-full flex flex-col items-center text-center p-4">
        <div className="rounded-full bg-primary-50 p-3 mb-3 text-primary-500">
          {icon}
        </div>
        <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </GlassCard>
    </Link>
  );
};

export default ServiceCard;
