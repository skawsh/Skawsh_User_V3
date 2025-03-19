
import React, { useEffect } from 'react';
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
        {/* Header with border */}
        <div className="border-b">
          {/* Top header with back button and title */}
          <div className="flex items-center p-4 border-b">
            <Link to={location.state?.from || '/'} 
                  className="p-1">
              <ChevronLeft size={24} className="text-black" />
            </Link>
            <h1 className="text-2xl font-bold flex-1 text-center pr-6">Studios</h1>
          </div>
          
          {/* Subheader with service info */}
          <div className="p-4 text-center">
            <p className="text-gray-600">
              We found {studios.length} studios that offer {formattedServiceName} services
            </p>
          </div>
        </div>
        
        {/* Studios list */}
        <div className="p-4 space-y-4">
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
  };
  onClick: () => void;
}

const StudioCard: React.FC<StudioProps> = ({ studio, onClick }) => {
  // Determine which logo to display based on studio name
  const logoSrc = studio.name === 'Busy Bee' 
    ? 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22100%22%3E%3Crect%20width%3D%22300%22%20height%3D%22100%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20d%3D%22M120%2030h60v10h-60z%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%2260%22%20font-family%3D%22Arial%22%20font-size%3D%2224%22%20font-weight%3D%22bold%22%20fill%3D%22%23004165%22%3EBUSY%20BEES%3C%2Ftext%3E%3Cpath%20d%3D%22M40%2050a15%2015%200%200%200%2030%200a15%2015%200%200%200-30%200%22%20fill%3D%22%2387CEEB%22%2F%3E%3Cpath%20d%3D%22M55%2050a5%205%200%200%200%2010%200a5%205%200%200%200-10%200%22%20fill%3D%22%23FFC0CB%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%2280%22%20font-family%3D%22Arial%22%20font-size%3D%2212%22%20fill%3D%22%23004165%22%3EFresh%20Clothes%20Fresh%20Life%3C%2Ftext%3E%3C%2Fsvg%3E'
    : 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Crect%20width%3D%22200%22%20height%3D%22100%22%20fill%3D%22%23fff%22%2F%3E%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%2240%22%20height%3D%2260%22%20rx%3D%225%22%20fill%3D%22%2350C878%22%2F%3E%3Cpath%20d%3D%22M30%2020v40h20v-40%22%20fill%3D%22%2350C878%22%20stroke%3D%22%23fff%22%20stroke-width%3D%225%22%2F%3E%3Ctext%20x%3D%2270%22%20y%3D%2255%22%20font-family%3D%22Arial%22%20font-size%3D%2230%22%20font-weight%3D%22bold%22%20fill%3D%22%2350C878%22%3EClean%3C%2Ftext%3E%3Ctext%20x%3D%2270%22%20y%3D%2275%22%20font-family%3D%22Arial%22%20font-size%3D%2212%22%20fill%3D%22%23666%22%3EWe%20Love%20Laundry%3C%2Ftext%3E%3C%2Fsvg%3E';

  // Custom logos based on actual designs 
  const busyBeeLogo = (
    <div className="w-full h-full flex justify-center items-center bg-white py-3">
      <div className="text-center">
        <div className="text-[#004165] font-bold text-2xl flex items-center justify-center">
          BUSY<span className="text-[#87CEEB] mx-1">B</span>EES
        </div>
        <div className="text-[#004165] text-xs mt-1">≡ Fresh Clothes Fresh Life ≡</div>
      </div>
    </div>
  );

  const uCleanLogo = (
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

  return (
    <div className="border rounded-2xl overflow-hidden shadow-sm mb-4" onClick={onClick}>
      {/* Logo Section */}
      <div className="border-b">
        {studio.name === 'Busy Bee' ? busyBeeLogo : uCleanLogo}
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
