
import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import StudioHeader from '../components/studio/StudioHeader';
import ServiceList from '../components/studio/ServiceList';
import Button from '../components/ui-elements/Button';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudioProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (backButtonRef.current) {
        const backButtonPosition = backButtonRef.current.getBoundingClientRect().top;
        setIsScrolled(backButtonPosition < 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const studio = {
    id: '1',
    name: 'Pristine Laundry',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 126,
    deliveryTime: '1-2 days',
    description: 'Premium laundry services with eco-friendly cleaning options.'
  };
  
  const services = [{
    id: '1',
    name: 'Dry Cleaning',
    description: 'Professional cleaning for delicate fabrics and special care items.',
    price: 8.99
  }, {
    id: '2',
    name: 'Wash & Fold',
    description: 'Complete laundry service charged by weight.',
    price: 2.49
  }, {
    id: '3',
    name: 'Ironing',
    description: 'Professional pressing and wrinkle removal.',
    price: 4.99
  }, {
    id: '4',
    name: 'Express Service',
    description: 'Same-day service when ordered before 10 AM.',
    price: 12.99
  }];
  
  return <Layout>
      <div>
        {isScrolled && (
          <div className="fixed top-0 left-0 right-0 bg-white z-40 shadow-md animate-fade-in">
            <div className="flex items-center px-4 py-3">
              <button 
                onClick={() => navigate(-1)} 
                className="mr-3 p-1 rounded-full text-gray-700"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-lg font-semibold truncate">{studio.name}</h2>
            </div>
          </div>
        )}
        
        <StudioHeader 
          name={studio.name} 
          image={studio.image} 
          rating={studio.rating} 
          reviewCount={studio.reviewCount} 
          deliveryTime={studio.deliveryTime}
          backButtonRef={backButtonRef}
        />
        
        <div className="section-container relative">
          <ServiceList services={services} />
        </div>
      </div>
    </Layout>;
};

export default StudioProfile;
