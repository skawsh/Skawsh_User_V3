
import React from 'react';
import Layout from '../components/Layout';
import LocationBar from '../components/home/LocationBar';
import SearchBar from '../components/home/SearchBar';
import PremiumBanner from '../components/home/PremiumBanner';
import ServiceCard from '../components/home/ServiceCard';
import StudioCard from '../components/home/StudioCard';
import { Shirt, Wind, Droplets, Sparkles, MapPin, Clock, Tag } from 'lucide-react';

const Home: React.FC = () => {
  const services = [
    {
      id: '1',
      title: 'Wash & Fold',
      image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: '2',
      title: 'Dry Clean',
      image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: '3',
      title: 'Iron Only',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: '4',
      title: 'Premium',
      icon: <Sparkles size={24} />
    }
  ];
  
  const studios = [
    {
      id: '1',
      name: 'Pristine Laundry',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.8,
      deliveryTime: '1-2 days',
      promoted: true
    }
  ];
  
  return (
    <Layout>
      <div className="section-container pb-6">
        <LocationBar />
        <SearchBar />
        <PremiumBanner />
        
        <div className="mb-6">
          <h2 className="section-title text-base mb-4">Explore Services</h2>
          <div className="grid grid-cols-4 gap-2">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                icon={service.icon} 
                title={service.title}
                image={service.image}
                index={index}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="section-title text-base mb-4">Explore Studios</h2>
          
          <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
            <FilterButton icon={<MapPin size={14} />} label="Nearby" active />
            <FilterButton icon={<Tag size={14} />} label="Offers" />
            <FilterButton icon={<Clock size={14} />} label="Express Delivery" />
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {studios.map((studio, index) => (
              <StudioCard 
                key={studio.id}
                id={studio.id}
                name={studio.name}
                image={studio.image}
                rating={studio.rating}
                deliveryTime={studio.deliveryTime}
                index={index}
                promoted={studio.promoted}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({ icon, label, active = false }) => {
  return (
    <button
      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs whitespace-nowrap ${
        active 
          ? 'bg-primary-500 text-white' 
          : 'bg-gray-100 text-gray-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default Home;
