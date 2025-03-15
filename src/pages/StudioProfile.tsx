import React from 'react';
import Layout from '../components/Layout';
import StudioHeader from '../components/studio/StudioHeader';
import ServiceList from '../components/studio/ServiceList';
import ReviewSection from '../components/studio/ReviewSection';
import { Button } from "@/components/ui/button";
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
  
  const services = [
    {
      id: '1',
      name: 'Wash & Care',
      description: 'Professional cleaning for delicate fabrics and special care items.',
      price: 100
    },
    {
      id: '2',
      name: 'Wash & Fold',
      description: 'Complete laundry service charged by weight.',
      price: 100
    },
    {
      id: '3',
      name: 'Wash & Iron',
      description: 'Professional pressing and wrinkle removal.',
      price: 150
    },
    {
      id: '4',
      name: 'Upper Wear',
      description: 'Cleaning services for upper body garments.',
      price: 120
    }
  ];
  
  const reviews = [
    {
      id: '1',
      userName: 'Alex Johnson',
      rating: 5,
      comment: 'Great service! My clothes came back perfectly clean and neatly folded.',
      date: 'May 15, 2023'
    },
    {
      id: '2',
      userName: 'Sarah Williams',
      rating: 4,
      comment: 'Very professional service, though delivery was a bit delayed.',
      date: 'Apr 30, 2023'
    },
    {
      id: '3',
      userName: 'Michael Brown',
      rating: 5,
      comment: 'Outstanding quality every time. Will continue using their services.',
      date: 'Apr 22, 2023'
    }
  ];
  
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
          
          <div className="fixed bottom-20 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 animate-slide-in">
            <Button 
              className="w-full shadow-lg rounded-full"
            >
              <ShoppingBag size={18} className="mr-2" />
              View Sack (3 items)
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudioProfile;
