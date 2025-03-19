
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
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
      logo: '/lovable-uploads/714e7b82-be66-4441-afee-0f7b49945d57.png',
      rating: 4.8,
      workingHours: '09:00 AM - 08:00 PM',
      distance: '4.1 km',
      location: 'Tolichowki',
      promoted: true
    },
    {
      id: '2',
      name: 'U Clean',
      logo: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.6,
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

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="p-4 border-b shadow-sm">
          <div className="flex items-center gap-2">
            <Link to={location.state?.from || '/'} 
                 className="rounded-full p-2 hover:bg-gray-100 transition-colors">
              <ChevronLeft size={22} className="text-gray-700" />
            </Link>
            <h1 className="text-2xl font-bold text-center flex-1 pr-8">Studios</h1>
          </div>
          
          <p className="text-center text-gray-600 mt-2">
            We found {studios.length} studios that offer {serviceName} services
          </p>
        </div>
        
        <div className="p-4 space-y-4">
          {studios.map((studio) => (
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
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm" onClick={onClick}>
      <div className="border-b p-3 flex justify-center bg-white">
        <img 
          src={studio.logo} 
          alt={studio.name} 
          className="h-16 object-contain"
        />
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{studio.name}</h3>
          <div className="flex items-center bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            ★ {studio.rating}
            <span className="ml-1 text-xs underline font-normal">See all reviews</span>
          </div>
        </div>
        
        <div className="text-gray-600 text-sm mt-1">
          <p><span className="font-medium">Operating Hours</span></p>
          <p>{studio.workingHours}</p>
        </div>
        
        <div className="flex items-center mt-2 text-sm text-blue-500">
          <span>{studio.distance} - {studio.location}</span>
          <ChevronLeft size={16} className="transform rotate-270 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default StudiosByService;
