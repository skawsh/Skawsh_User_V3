
import React from 'react';
import Layout from '../components/Layout';
import StudioCard from '../components/home/StudioCard';
import { useParams, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudiosByService: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const location = useLocation();
  const serviceName = location.state?.serviceName || 'Service';
  
  // Mock data for studios offering this service
  // In a real app, you would fetch this data based on the serviceId
  const studios = [
    {
      id: '1',
      name: 'Busy Bee',
      image: '/lovable-uploads/6050892e-ca31-4f41-9899-4970d59197a0.png',
      rating: 4.8,
      deliveryTime: '1-2 days',
      distance: '1.2 km',
      workingHours: '9 AM - 8 PM',
      promoted: true
    },
    {
      id: '2',
      name: 'U clean',
      image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.6,
      deliveryTime: 'Same Day',
      distance: '0.8 km',
      workingHours: '8 AM - 9 PM',
      promoted: false
    },
    {
      id: '3',
      name: 'Tumble Dry',
      image: 'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.9,
      deliveryTime: '1 day',
      distance: '2.5 km',
      workingHours: '10 AM - 7 PM',
      promoted: true
    },
    {
      id: '4',
      name: 'Fabrico',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.3,
      deliveryTime: '3-4 hours',
      distance: '3.1 km',
      workingHours: '24 hours',
      promoted: false
    }
  ];

  return (
    <Layout>
      <div className="section-container pb-10">
        <div className="flex items-center gap-3 mb-4">
          <Link to={location.state?.from || '/'} className="bg-gray-100 p-2 rounded-full">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <h1 className="text-2xl font-semibold animate-fade-in">
            Studios offering <Badge variant="outline" className="ml-1">{serviceName}</Badge>
          </h1>
        </div>
        
        <p className="text-gray-500 mb-6 animate-fade-in">
          We found {studios.length} laundry studios that offer {serviceName} services in your area.
        </p>
        
        <div className="space-y-4 mx-0 px-0 animate-fade-in">
          {studios.map((studio, index) => (
            <StudioCard 
              key={studio.id} 
              id={studio.id} 
              name={studio.name} 
              image={studio.image} 
              rating={studio.rating} 
              deliveryTime={studio.deliveryTime} 
              distance={studio.distance} 
              workingHours={studio.workingHours} 
              index={index} 
              promoted={studio.promoted} 
            />
          ))}
        </div>
        
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Layout>
  );
};

export default StudiosByService;
