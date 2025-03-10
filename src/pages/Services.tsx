
import React, { useState } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/ui-elements/GlassCard';
import { Shirt, Wind, Droplets, TimerReset, DollarSign, Zap } from 'lucide-react';

const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'dry-cleaning', label: 'Dry Cleaning' },
    { id: 'wash-fold', label: 'Wash & Fold' },
    { id: 'ironing', label: 'Ironing' },
    { id: 'express', label: 'Express' }
  ];
  
  const services = [
    {
      id: '1',
      category: 'dry-cleaning',
      icon: <Shirt size={24} />,
      name: 'Regular Dry Cleaning',
      price: '$7.99 per item',
      description: 'Professional cleaning for everyday garments.'
    },
    {
      id: '2',
      category: 'dry-cleaning',
      icon: <Shirt size={24} />,
      name: 'Delicate Dry Cleaning',
      price: '$12.99 per item',
      description: 'Special care for sensitive fabrics and materials.'
    },
    {
      id: '3',
      category: 'wash-fold',
      icon: <Wind size={24} />,
      name: 'Regular Wash & Fold',
      price: '$2.49 per lb',
      description: 'Standard washing and folding for everyday laundry.'
    },
    {
      id: '4',
      category: 'wash-fold',
      icon: <Wind size={24} />,
      name: 'Premium Wash & Fold',
      price: '$3.99 per lb',
      description: 'Premium detergents and extra care for your clothes.'
    },
    {
      id: '5',
      category: 'ironing',
      icon: <Droplets size={24} />,
      name: 'Basic Ironing',
      price: '$4.99 per item',
      description: 'Standard ironing for shirts, pants, and dresses.'
    },
    {
      id: '6',
      category: 'ironing',
      icon: <Droplets size={24} />,
      name: 'Full Outfit Pressing',
      price: '$19.99 per outfit',
      description: 'Complete pressing for suits, dresses, and formal outfits.'
    },
    {
      id: '7',
      category: 'express',
      icon: <TimerReset size={24} />,
      name: 'Same-Day Service',
      price: '+$5.99 per order',
      description: 'Get your items back on the same day when ordered before 10 AM.'
    },
    {
      id: '8',
      category: 'express',
      icon: <Zap size={24} />,
      name: 'Rush Hour Service',
      price: '+$9.99 per order',
      description: '3-hour service for urgent cleaning needs.'
    }
  ];
  
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);
  
  return (
    <Layout>
      <div className="section-container pb-10">
        <h1 className="text-2xl font-semibold mb-6 pt-2 animate-fade-in">Services</h1>
        
        <div className="overflow-x-auto pb-2 mb-4 animate-fade-in animate-stagger-1">
          <div className="flex gap-2 min-w-max">
            {categories.map(category => (
              <button
                key={category.id}
                className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4 animate-fade-in animate-stagger-2">
          {filteredServices.map((service, index) => (
            <GlassCard
              key={service.id}
              className="p-4"
              style={{ animationDelay: `${200 + index * 75}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary-50 p-3 text-primary-500 flex-shrink-0">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800 mb-1">{service.name}</h3>
                    <div className="flex items-center gap-1 text-primary-500 font-semibold">
                      <DollarSign size={16} />
                      <span>{service.price}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Services;
