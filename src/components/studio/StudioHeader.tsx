import React, { useState } from 'react';
import { ChevronLeft, Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderOptionsMenu from './header/HeaderOptionsMenu';
import StudioRating from './header/StudioRating';
import LocationDrawer from './header/LocationDrawer';
import ServiceSearch from './header/ServiceSearch';

interface StudioHeaderProps {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  backButtonRef?: React.RefObject<HTMLButtonElement>;
  description?: string;
  onBackClick?: () => void;
  onReportClick?: () => void;
}

interface LocationOption {
  name: string;
  area: string;
  rating: number;
  time: string;
  distance: string;
  isCurrent?: boolean;
  isNearest?: boolean;
  isClosedForDelivery?: boolean;
}

interface ServiceSuggestion {
  id: string;
  name: string;
  price: number;
  category?: string;
}

const StudioHeader: React.FC<StudioHeaderProps> = ({
  name,
  image,
  rating,
  reviewCount,
  deliveryTime,
  backButtonRef,
  description,
  onBackClick,
  onReportClick
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentLocation: LocationOption = {
    name: "Tolichowki",
    area: "Hyderabad",
    rating: 4.1,
    time: "",
    distance: "4.1 km",
    isCurrent: true,
    isNearest: true
  };
  
  const otherLocations: LocationOption[] = [
    {
      name: "Mehdipatnam",
      area: "Hyderabad",
      rating: 4.2,
      time: "",
      distance: "8.0 km"
    },
    {
      name: "Attapur",
      area: "Hyderabad",
      rating: 4.1,
      time: "",
      distance: "9.7 km"
    },
    {
      name: "Panjagutta",
      area: "Hyderabad",
      rating: 3.8,
      time: "",
      distance: "10.5 km"
    },
    {
      name: "Narsingi",
      area: "Hyderabad",
      rating: 4.0,
      time: "",
      distance: "11.2 km",
      isClosedForDelivery: true
    }
  ];
  
  const serviceSuggestions: ServiceSuggestion[] = [
    {
      id: '1',
      name: 'Dry Cleaning',
      price: 8.99,
      category: 'Premium Services'
    },
    {
      id: '2',
      name: 'Wash & Fold',
      price: 2.49,
      category: 'Basic Services'
    },
    {
      id: '3',
      name: 'Ironing',
      price: 4.99,
      category: 'Basic Services'
    },
    {
      id: '4',
      name: 'Express Service',
      price: 12.99,
      category: 'Premium Services'
    },
    {
      id: '5',
      name: 'Shirt Cleaning',
      price: 5.99,
      category: 'Upper Wear'
    },
    {
      id: '6',
      name: 'Trouser Cleaning',
      price: 6.99,
      category: 'Lower Wear'
    },
    {
      id: '7',
      name: 'Carpet Cleaning',
      price: 3.49,
      category: 'Home Textiles'
    }
  ];

  const getOpeningHours = () => {
    const timeMappings: Record<string, string> = {
      "1-2 days": "09:00 AM - 08:00 PM",
      "Same Day": "08:00 AM - 09:00 PM",
      "1 day": "10:00 AM - 07:00 PM",
      "3-4 hours": "24 hours",
      "2 days": "08:00 AM - 06:00 PM"
    };
    return timeMappings[deliveryTime] || deliveryTime;
  };

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const handleShareStudio = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out ${name}`,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleAboutStudio = () => {
    navigate(`/studio/${id}/about`);
  };

  const handleReportStudio = () => {
    if (onReportClick) {
      onReportClick();
    } else {
      alert(`Thank you for your feedback. ${name} has been reported.`);
    }
  };

  const handleLocationSelect = (location: LocationOption) => {
    console.log(`Selected location: ${location.name}, ${location.area}`);
    setDrawerOpen(false);
  };

  const handleViewAllReviews = () => {
    navigate(`/studio/${name.toLowerCase().replace(/\s+/g, '-')}/reviews`);
  };

  const handleServiceSelect = (serviceId: string) => {
    console.log('Selected service:', serviceId);
    const serviceElement = document.getElementById(`service-${serviceId}`);
    if (serviceElement) {
      serviceElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      serviceElement.classList.add('bg-primary-50');
      setTimeout(() => {
        serviceElement.classList.remove('bg-primary-50');
      }, 1500);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="relative bg-gray-200 w-full rounded-xl overflow-hidden shadow-md" style={{
        maxHeight: '280px'
      }}>
        <div className="flex justify-between items-center p-4">
          <button 
            ref={backButtonRef} 
            onClick={handleBackClick} 
            className="text-gray-700 bg-white/80 p-2 rounded-full hover:bg-white/90 transition-all shadow-sm" 
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          
          <HeaderOptionsMenu 
            onShare={handleShareStudio}
            onViewAbout={handleAboutStudio}
            onReport={handleReportStudio}
          />
        </div>
        
        <div className="mx-auto px-4 pb-4">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-50">
            <h1 className="text-2xl font-bold text-left mb-2">{name}</h1>
            
            <div className="flex justify-between items-start mt-2">
              <div className="mt-2">
                <p className="font-medium text-gray-800">Operating Hours</p>
                <p className="text-gray-600">{getOpeningHours()}</p>
              </div>
              
              <StudioRating 
                rating={rating} 
                onViewReviews={handleViewAllReviews} 
              />
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <LocationDrawer 
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                currentLocation={currentLocation}
                otherLocations={otherLocations}
                studioName={name}
                onLocationSelect={handleLocationSelect}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 pb-2 bg-white relative" style={{
        zIndex: 9999
      }}>
        <ServiceSearch 
          serviceSuggestions={serviceSuggestions}
          onServiceSelect={handleServiceSelect}
        />
      </div>
    </div>
  );
};

export default StudioHeader;
