
import React from 'react';
import Layout from '../components/Layout';
import HeaderSection from '../components/home/HeaderSection';
import ServicesSection from '../components/home/ServicesSection';
import StudiosSection from '../components/home/StudiosSection';
import FooterSignature from '../components/FooterSignature';
import { Footprints, Clock, Palette, Medal, HomeIcon, Briefcase } from 'lucide-react';

const Home: React.FC = () => {
  const services = [{
    id: 'wash-fold',
    title: 'Wash & Fold',
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 'dry-clean',
    title: 'Dry Clean',
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 'iron-only',
    title: 'Iron Only',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 'shoe-laundry',
    title: 'Shoe Laundry',
    icon: <Footprints size={24} />
  }, {
    id: 'stain-removal',
    title: 'Stain Removal',
    icon: <Palette size={24} />
  }, {
    id: 'express-service',
    title: 'Express Service',
    icon: <Clock size={24} />
  }, {
    id: 'premium-care',
    title: 'Premium Care',
    icon: <Medal size={24} />
  }, {
    id: 'home-textiles',
    title: 'Home Textiles',
    icon: <HomeIcon size={24} />
  }, {
    id: 'business-attire',
    title: 'Business Attire',
    icon: <Briefcase size={24} />
  }];

  const studios = [{
    id: '1',
    name: 'Busy Bee',
    image: '/lovable-uploads/6050892e-ca31-4f41-9899-4970d59197a0.png',
    rating: 4.8,
    deliveryTime: '1-2 days',
    distance: '1.2 km',
    workingHours: '9 AM - 8 PM',
    promoted: true
  }, {
    id: '2',
    name: 'U clean',
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 4.6,
    deliveryTime: 'Same Day',
    distance: '0.8 km',
    workingHours: '8 AM - 9 PM',
    promoted: false
  }, {
    id: '3',
    name: 'Tumble Dry',
    image: 'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    deliveryTime: '1 day',
    distance: '2.5 km',
    workingHours: '10 AM - 7 PM',
    promoted: true
  }, {
    id: '4',
    name: 'Fabrico',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 4.3,
    deliveryTime: '3-4 hours',
    distance: '3.1 km',
    workingHours: '24 hours',
    promoted: false
  }, {
    id: '5',
    name: 'Eco Clean',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    deliveryTime: '2 days',
    distance: '1.5 km',
    workingHours: '8 AM - 6 PM',
    promoted: false
  }, {
    id: '6',
    name: 'Mycloth',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    deliveryTime: '1-2 days',
    distance: '0.5 km',
    workingHours: '7 AM - 10 PM',
    promoted: true
  }];

  const banners = [{
    id: '1',
    title: 'Premium Care',
    description: 'For Your Delicate Fabrics',
    bgColor: 'bg-blue-700',
    buttonColor: 'bg-yellow-400',
    textColor: 'text-gray-800',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    serviceId: 'premium-care'
  }, {
    id: '2',
    title: 'Express Service',
    description: 'Ready in Just 3 Hours',
    bgColor: 'bg-purple-600',
    buttonColor: 'bg-green-400',
    textColor: 'text-gray-800',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    serviceId: 'express-service'
  }, {
    id: '3',
    title: 'Eco Friendly',
    description: 'Sustainable Cleaning Solutions',
    bgColor: 'bg-teal-600',
    buttonColor: 'bg-amber-400',
    textColor: 'text-gray-800',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    serviceId: 'eco-friendly'
  }, {
    id: '4',
    title: 'First Order Discount',
    description: '25% Off on Your First Order',
    bgColor: 'bg-pink-600',
    buttonColor: 'bg-blue-400',
    textColor: 'text-gray-800',
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    serviceId: 'wash-fold'
  }];

  return (
    <Layout>
      <div className="section-container p-0 bg-gradient-to-b from-primary-50 to-white">
        <HeaderSection banners={banners} />
        <ServicesSection services={services} />
        <StudiosSection studios={studios} />
        <FooterSignature />
      </div>
    </Layout>
  );
};

export default Home;
