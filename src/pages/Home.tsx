
import React from 'react';
import Layout from '../components/Layout';
import LocationBar from '../components/home/LocationBar';
import SearchBar from '../components/home/SearchBar';
import PremiumBanner from '../components/home/PremiumBanner';
import ServiceCard from '../components/home/ServiceCard';
import StudioCard from '../components/home/StudioCard';
import { Shirt, Wind, Droplets, TimerReset, Filter } from 'lucide-react';
import Button from '../components/ui-elements/Button';

const Home: React.FC = () => {
  const services = [
    {
      id: '1',
      icon: <Shirt size={24} />,
      title: 'Dry Cleaning',
      description: 'Professional cleaning for delicate fabrics'
    },
    {
      id: '2',
      icon: <Wind size={24} />,
      title: 'Wash & Fold',
      description: 'Basic laundry services for everyday items'
    },
    {
      id: '3',
      icon: <Droplets size={24} />,
      title: 'Ironing',
      description: 'Wrinkle removal and professional pressing'
    },
    {
      id: '4',
      icon: <TimerReset size={24} />,
      title: 'Express',
      description: 'Same-day or next-day laundry services'
    }
  ];
  
  const studios = [
    {
      id: '1',
      name: 'Pristine Laundry',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.8,
      deliveryTime: '1-2 days'
    },
    {
      id: '2',
      name: 'Fresh & Clean Co.',
      image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.6,
      deliveryTime: 'Same day'
    },
    {
      id: '3',
      name: 'Urban Laundromat',
      image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.5,
      deliveryTime: '1 day'
    }
  ];
  
  return (
    <Layout>
      <div className="section-container pb-6">
        <LocationBar />
        <SearchBar />
        <PremiumBanner />
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Services</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                icon={service.icon} 
                title={service.title} 
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Nearby Studios</h2>
            <Button 
              variant="secondary" 
              size="sm" 
              icon={<Filter size={14} />} 
              className="rounded-full"
            >
              Filter
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {studios.map((studio, index) => (
              <StudioCard 
                key={studio.id}
                id={studio.id}
                name={studio.name}
                image={studio.image}
                rating={studio.rating}
                deliveryTime={studio.deliveryTime}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
