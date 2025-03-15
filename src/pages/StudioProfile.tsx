
import React from 'react';
import Layout from '../components/Layout';
import StudioHeader from '../components/studio/StudioHeader';
import ServiceList from '../components/studio/ServiceList';
import Button from '../components/ui-elements/Button';
import { ShoppingBag } from 'lucide-react';

const StudioProfile: React.FC = () => {
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
        <StudioHeader name={studio.name} image={studio.image} rating={studio.rating} reviewCount={studio.reviewCount} deliveryTime={studio.deliveryTime} />
        
        <div className="section-container relative">
          <ServiceList services={services} />
        </div>
      </div>
    </Layout>;
};

export default StudioProfile;
