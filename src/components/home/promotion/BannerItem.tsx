
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Banner } from './types';

interface BannerItemProps {
  banner: Banner;
  isSwiping: React.MutableRefObject<boolean>;
}

export const BannerItem: React.FC<BannerItemProps> = ({ banner, isSwiping }) => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    // Don't navigate if the user was swiping
    if (isSwiping.current) return;
    
    // Determine service ID - either from banner or derived from title
    const serviceId = banner.serviceId || banner.title.toLowerCase().replace(/\s+/g, '-');
    
    // Navigate to the service page with the banner title as the service name
    navigate(`/services/${serviceId}`, {
      state: {
        serviceName: banner.title,
        from: window.location.pathname
      }
    });
  };

  return (
    <div 
      className={`${banner.bgColor} text-white p-5 rounded-xl min-w-[92%] mr-[1%] shrink-0 relative overflow-hidden cursor-pointer`}
      onClick={handleBannerClick}
    >
      <div className="relative z-10">
        <h3 className="font-semibold text-xl mb-1">{banner.title}</h3>
        <p className="text-white/90 text-sm mb-4">
          {banner.description}
        </p>
        <button 
          className={`${banner.buttonColor} ${banner.textColor} font-medium text-sm py-1.5 px-4 rounded-full flex items-center gap-2`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent banner click handler from firing
            handleBannerClick();
          }}
        >
          EXPLORE <ArrowRight size={16} />
        </button>
      </div>
      <div className="absolute top-0 right-0 w-full h-full bg-no-repeat bg-right bg-contain opacity-20"
           style={{ backgroundImage: `url('${banner.image}')` }}>
      </div>
    </div>
  );
};
