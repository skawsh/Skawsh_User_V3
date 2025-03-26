
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServiceImage } from '@/utils/serviceImageUtils';

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

// Using memo to prevent unnecessary re-renders
const ServiceCard: React.FC<ServiceCardProps> = memo(({
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

  // Get the service image based on ID - only computed when props change
  const serviceImage = id ? getServiceImage(id) : image;

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
        <Avatar className={`w-16 h-16 mb-1.5 transition-all duration-500 ease-in-out ${isSticky ? 'border-2 border-white' : 'shadow-md'}`}>
          {serviceImage ? (
            <AvatarImage 
              src={serviceImage} 
              alt={title} 
              className="object-cover grayscale" 
              loading="lazy"
            />
          ) : (
            <AvatarFallback className={`${isSticky ? 'bg-gray-800 text-white' : 'bg-black text-white'} rounded-full`}>
              {icon}
            </AvatarFallback>
          )}
        </Avatar>
        {onClick && (
          <button 
            onClick={onClick}
            className="absolute -right-1 -bottom-1 bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-primary-600 transition-colors"
            aria-label={`Add ${title}`}
          >
            <PlusCircle size={14} />
          </button>
        )}
      </div>
      {showTitle && <h3 className={`text-xs font-bold mt-2 ${isSticky ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>{title}</h3>}
      {showPrice && price && <span className="text-xs text-primary-500 font-medium mt-0.5">{formatIndianRupee(price)}</span>}
    </div>
  );

  if (onClick) {
    return content;
  }

  return (
    <div 
      className="transition-all duration-500 ease-in-out cursor-pointer hover:scale-105" 
      onClick={handleServiceClick}
    >
      {content}
    </div>
  );
});

// Display name for React DevTools
ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
