import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LocationBar from '../components/home/LocationBar';
import SearchBar from '../components/home/SearchBar';
import PromotionSlider from '../components/home/PromotionSlider';
import ServiceCard from '../components/home/ServiceCard';
import StudioCard from '../components/home/StudioCard';
import { Shirt, Wind, Droplets, Footprints, MapPin, Clock, Tag, Palette, Medal, Home as HomeIcon, Briefcase, Bed, FileText } from 'lucide-react';

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
      title: 'Shoe Laundry',
      icon: <Footprints size={24} />
    },
    {
      id: '5',
      title: 'Stain Removal',
      icon: <Palette size={24} />
    },
    {
      id: '6',
      title: 'Express Service',
      icon: <Clock size={24} />
    },
    {
      id: '7',
      title: 'Premium Care',
      icon: <Medal size={24} />
    },
    {
      id: '8',
      title: 'Home Textiles',
      icon: <HomeIcon size={24} />
    },
    {
      id: '9',
      title: 'Business Attire',
      icon: <Briefcase size={24} />
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
    },
    {
      id: '2',
      name: 'Fresh Fabrics',
      image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.6,
      deliveryTime: 'Same Day',
      promoted: false
    },
    {
      id: '3',
      name: 'Luxury Laundromat',
      image: 'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.9,
      deliveryTime: '1 day',
      promoted: true
    },
    {
      id: '4',
      name: 'Quick Wash',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.3,
      deliveryTime: '3-4 hours',
      promoted: false
    },
    {
      id: '5',
      name: 'Eco Clean',
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.7,
      deliveryTime: '2 days',
      promoted: false
    },
    {
      id: '6',
      name: 'Premium Wash',
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 5.0,
      deliveryTime: '1-2 days',
      promoted: true
    }
  ];
  
  const banners = [
    {
      id: '1',
      title: 'Premium Care',
      description: 'For Your Delicate Fabrics',
      bgColor: 'bg-blue-700',
      buttonColor: 'bg-yellow-400',
      textColor: 'text-gray-800',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: '2',
      title: 'Express Service',
      description: 'Ready in Just 3 Hours',
      bgColor: 'bg-purple-600',
      buttonColor: 'bg-green-400',
      textColor: 'text-gray-800',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: '3',
      title: 'Eco Friendly',
      description: 'Sustainable Cleaning Solutions',
      bgColor: 'bg-teal-600',
      buttonColor: 'bg-amber-400',
      textColor: 'text-gray-800',
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: '4',
      title: 'First Order Discount',
      description: '25% Off on Your First Order',
      bgColor: 'bg-pink-600',
      buttonColor: 'bg-blue-400',
      textColor: 'text-gray-800',
      image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    }
  ];
  
  return (
    <Layout>
      <div className="section-container pb-6">
        <LocationBar />
        <SearchBar />
        <PromotionSlider banners={banners} />
        
        <div className="mb-6">
          <h2 className="section-title text-base mb-4">Explore Services</h2>
          <div className="overflow-x-auto overflow-y-hidden">
            <div className="flex gap-4 pb-2 min-w-max">
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
        </div>
        
        <div className="mb-10">
          <h2 className="section-title text-base mb-4">Explore Studios</h2>
          
          <div className="flex gap-3 mb-4 pb-2">
            <FilterButton icon={<MapPin size={14} />} label="Nearby" active />
            <FilterButton icon={<Tag size={14} />} label="Offers" />
            <FilterButton icon={<Clock size={14} />} label="Express Delivery" />
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
