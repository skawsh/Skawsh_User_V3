
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const StudiosByService: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const serviceName = location.state?.serviceName || 'Service';
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  
  // Mock data for studios offering this service
  // In a real app, you would fetch this data based on the serviceId
  const studios = [
    {
      id: '1',
      name: 'Busy Bee',
      logo: '/lovable-uploads/83f30409-611d-4580-bd80-ffd0c547a8ee.png',
      rating: 4.8,
      workingHours: '09:00 AM - 08:00 PM',
      distance: '4.1 km',
      location: 'Tolichowki',
      promoted: true
    },
    {
      id: '2',
      name: 'U Clean',
      logo: '/lovable-uploads/83f30409-611d-4580-bd80-ffd0c547a8ee.png',
      rating: 4.8,
      workingHours: '09:00 AM - 08:00 PM',
      distance: '4.1 km',
      location: 'Tolichowki',
      promoted: false
    },
    {
      id: '3',
      name: 'LaundroMax',
      logo: '/lovable-uploads/83f30409-611d-4580-bd80-ffd0c547a8ee.png',
      rating: 4.5,
      workingHours: '08:00 AM - 09:00 PM',
      distance: '3.2 km',
      location: 'Banjara Hills',
      promoted: false
    },
    {
      id: '4',
      name: 'Shine & Clean',
      logo: '/lovable-uploads/83f30409-611d-4580-bd80-ffd0c547a8ee.png',
      rating: 4.2,
      workingHours: '10:00 AM - 07:00 PM',
      distance: '5.3 km',
      location: 'Jubilee Hills',
      promoted: true
    },
    {
      id: '5',
      name: 'Fresh Fold',
      logo: '/lovable-uploads/83f30409-611d-4580-bd80-ffd0c547a8ee.png',
      rating: 4.7,
      workingHours: '09:30 AM - 08:30 PM',
      distance: '2.7 km',
      location: 'Hitech City',
      promoted: false
    },
    {
      id: '6',
      name: 'Wash & Go',
      logo: '/lovable-uploads/83f30409-611d-4580-bd80-ffd0c547a8ee.png',
      rating: 4.3,
      workingHours: '08:30 AM - 09:30 PM',
      distance: '6.1 km',
      location: 'Kondapur',
      promoted: true
    }
  ];

  useEffect(() => {
    // If no state was passed (direct URL access), try to extract service name from serviceId
    if (!location.state?.serviceName && serviceId) {
      const formattedServiceName = serviceId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      document.title = `Studios offering ${formattedServiceName}`;
    }

    // Add scroll event listener to handle sticky header
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [serviceId, location.state]);

  // Format service name for display
  const formattedServiceName = location.state?.serviceName || 
    (serviceId ? serviceId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') 
    : 'Service');

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header with border - now sticky when scrolling */}
        <div className={cn(
          "border-b transition-all duration-200 bg-white",
          isHeaderSticky ? "fixed top-0 left-0 right-0 z-50 shadow-sm" : ""
        )}>
          {/* Top header with back button and title */}
          <div className="flex items-center p-4 max-w-md mx-auto">
            <Link to={location.state?.from || '/'} 
                  className="p-1">
              <ChevronLeft size={24} className="text-black" />
            </Link>
            <h1 className="text-2xl font-bold flex-1 text-center pr-6">Studios</h1>
          </div>
        </div>
        
        {/* Spacer for when header is sticky */}
        {isHeaderSticky && <div className="h-[56px]"></div>}
        
        {/* Studios list with info text about number of found studios */}
        <div className="p-4 space-y-4">
          <p className="text-gray-600 text-center mb-4">
            We found {studios.length} studios that offer {formattedServiceName} services
          </p>
          
          {studios.map((studio, index) => (
            <StudioCard 
              key={studio.id} 
              studio={studio} 
              onClick={() => navigate(`/studio/${studio.id}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

interface StudioProps {
  studio: {
    id: string;
    name: string;
    logo: string;
    rating: number;
    workingHours: string;
    distance: string;
    location: string;
    promoted?: boolean;
  };
  onClick: () => void;
}

const StudioCard: React.FC<StudioProps> = ({ studio, onClick }) => {
  // Determine the appropriate logo to display based on studio name
  let logoContent;
  
  if (studio.name === 'Busy Bee') {
    logoContent = (
      <div className="w-full h-full flex justify-center items-center bg-white py-3">
        <div className="text-center">
          <div className="text-[#004165] font-bold text-2xl flex items-center justify-center">
            BUSY<span className="text-[#87CEEB] mx-1">B</span>EES
          </div>
          <div className="text-[#004165] text-xs mt-1">≡ Fresh Clothes Fresh Life ≡</div>
        </div>
      </div>
    );
  } else if (studio.name === 'U Clean') {
    logoContent = (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex items-center">
          <div className="bg-[#50C878] text-white h-10 w-8 flex items-center justify-center rounded-sm text-xl font-bold mr-2">U</div>
          <div className="flex flex-col">
            <span className="text-[#50C878] font-bold text-xl leading-tight">Clean</span>
            <span className="text-gray-600 text-xs">We Love Laundry</span>
          </div>
        </div>
      </div>
    );
  } else if (studio.name === 'LaundroMax') {
    logoContent = (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-purple-700 font-bold text-2xl">LaundroMax</span>
          <span className="text-gray-600 text-xs">Maximum Cleaning, Minimum Effort</span>
        </div>
      </div>
    );
  } else if (studio.name === 'Shine & Clean') {
    logoContent = (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-blue-600 font-bold text-2xl">Shine & Clean</span>
          <span className="text-gray-600 text-xs">Your Clothes' Best Friend</span>
        </div>
      </div>
    );
  } else if (studio.name === 'Fresh Fold') {
    logoContent = (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-green-600 font-bold text-2xl">Fresh Fold</span>
          <span className="text-gray-600 text-xs">Folded with Care</span>
        </div>
      </div>
    );
  } else if (studio.name === 'Wash & Go') {
    logoContent = (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-orange-500 font-bold text-2xl">Wash & Go</span>
          <span className="text-gray-600 text-xs">Quick. Clean. Quality.</span>
        </div>
      </div>
    );
  } else {
    // Default logo for any other studio
    logoContent = (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-gray-800 font-bold text-2xl">{studio.name}</span>
          <span className="text-gray-600 text-xs">Professional Laundry Services</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-2xl overflow-hidden shadow-sm mb-4" onClick={onClick}>
      {/* Logo Section */}
      <div className="border-b">
        {logoContent}
      </div>
      
      {/* Details Section */}
      <div className="p-3">
        {/* Studio Name */}
        <h3 className="text-lg font-semibold">{studio.name}</h3>
        
        {/* Operating Hours */}
        <div className="mt-1">
          <p className="text-sm font-medium">Operating Hours</p>
          <p className="text-sm text-gray-600">{studio.workingHours}</p>
        </div>
        
        {/* Rating & Location */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center text-blue-500 text-sm cursor-pointer">
            <span>{studio.distance} · {studio.location}</span>
            <ChevronDown size={16} className="ml-1" />
          </div>
          
          <div className="flex items-center">
            <div className="bg-green-500 text-white px-2 py-0.5 rounded-full flex items-center">
              <span className="text-xs mr-1">★</span>
              <span className="text-xs font-bold">{studio.rating}</span>
            </div>
            <span className="text-xs text-blue-500 underline ml-1">See all reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudiosByService;
