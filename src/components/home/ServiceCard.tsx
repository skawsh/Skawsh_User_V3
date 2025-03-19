
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  image?: string;
  index: number;
  isSticky?: boolean;
  showTitle?: boolean;
  showPrice?: boolean;
  price?: number;
  onClick?: () => void;
  id?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  image,
  index,
  isSticky = false,
  showTitle = true,
  showPrice = false,
  price,
  onClick,
  id
}) => {
  const navigate = useNavigate();
  const formatIndianRupee = (amount: number | undefined): string => {
    if (!amount) return '';
    return `₹${amount.toFixed(0)}`;
  };

  const handleServiceClick = () => {
    // Convert title to a URL-friendly string for the serviceId
    const serviceId = title.toLowerCase().replace(/\s+/g, '-');
    
    // Navigate to the new page with service details
    navigate(`/services/${id || serviceId}`, {
      state: { 
        serviceName: title,
        from: window.location.pathname
      }
    });
  };

  const content = (
    <div className="flex flex-col items-center text-center animate-fade-in" style={{
      animationDelay: `${150 + index * 75}ms`
    }}>
      <div className="relative">
        <div className="p-2 mb-1.5 w-14 h-14 flex items-center justify-center overflow-hidden transition-all duration-500 ease-in-out bg-blue-100 px-[6px] py-[6px] rounded-full">
          {image ? 
            <img src={image} alt={title} className="w-full h-full object-cover rounded-full" /> : 
            <div className="text-primary-500">{icon}</div>
          }
        </div>
        {onClick && (
          <button 
            onClick={onClick}
            className="absolute -right-1 -bottom-1 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-blue-700"
            aria-label={`Add ${title}`}
          >
            <PlusCircle size={14} />
          </button>
        )}
      </div>
      {showTitle && <h3 className={`text-xs font-bold mt-1 ${isSticky ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>{title}</h3>}
      {showPrice && price && <span className="text-xs text-blue-600 font-medium mt-0.5">{formatIndianRupee(price)}</span>}
    </div>
  );

  if (onClick) {
    return content;
  }

  return (
    <div 
      className="transition-all duration-500 ease-in-out cursor-pointer" 
      onClick={handleServiceClick}
    >
      {content}
    </div>
  );
};

export default ServiceCard;
