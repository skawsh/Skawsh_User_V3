
import React from 'react';
import Layout from '../components/Layout';
import StudioHeader from '../components/studio/StudioHeader';
import ServiceList from '../components/studio/ServiceList';
import ReviewSection from '../components/studio/ReviewSection';
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
  
  const reviews = [{
    id: '1',
    userName: 'Alex Johnson',
    rating: 5,
    comment: 'Great service! My clothes came back perfectly clean and neatly folded.',
    date: 'May 15, 2023'
  }, {
    id: '2',
    userName: 'Sarah Williams',
    rating: 4,
    comment: 'Very professional service, though delivery was a bit delayed.',
    date: 'Apr 30, 2023'
  }, {
    id: '3',
    userName: 'Michael Brown',
    rating: 5,
    comment: 'Outstanding quality every time. Will continue using their services.',
    date: 'Apr 22, 2023'
  }];

  return (
    <Layout>
      <div>
        <StudioHeader 
          name={studio.name} 
          image={studio.image} 
          rating={studio.rating} 
          reviewCount={studio.reviewCount} 
          deliveryTime={studio.deliveryTime} 
        />
        
        <div className="section-container relative">
          <p className="text-gray-600 my-4 animate-fade-in">
            {studio.description}
          </p>
          
          <ServiceList services={services} />
          
          <ReviewSection reviews={reviews} />
          
          <div className="fixed bottom-6 left-0 right-0 flex justify-center z-10">
            <Button 
              variant="primary" 
              size="lg"
              className="shadow-lg bg-blue-600 hover:bg-blue-700"
              icon={<ShoppingBag size={18} />}
            >
              View Cart
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudioProfile;
