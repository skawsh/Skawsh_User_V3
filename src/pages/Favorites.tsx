
import React from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/ui-elements/GlassCard';
import { Star, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites: React.FC = () => {
  const favoriteStudios = [
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
    }
  ];
  
  const favoriteServices = [
    {
      id: '1',
      studioId: '1',
      studioName: 'Pristine Laundry',
      name: 'Premium Dry Cleaning',
      price: '$8.99 per item'
    },
    {
      id: '2',
      studioId: '2',
      studioName: 'Fresh & Clean Co.',
      name: 'Express Wash & Fold',
      price: '$3.49 per lb'
    }
  ];
  
  return (
    <Layout>
      <div className="section-container pb-10">
        <h1 className="text-2xl font-semibold mb-6 pt-2 animate-fade-in">Washlist</h1>
        
        {favoriteStudios.length === 0 && favoriteServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center animate-fade-in">
            <Heart size={48} className="text-gray-300 mb-4" />
            <h2 className="text-lg font-medium text-gray-700 mb-2">Your Washlist is Empty</h2>
            <p className="text-gray-500 mb-4">Save your favorite laundry studios and services here.</p>
            <Link 
              to="/" 
              className="text-primary-500 font-medium hover:text-primary-600 transition-colors"
            >
              Explore Studios
            </Link>
          </div>
        ) : (
          <>
            {favoriteStudios.length > 0 && (
              <div className="mb-8 animate-fade-in animate-stagger-1">
                <h2 className="text-lg font-semibold mb-4">Favorite Studios</h2>
                <div className="space-y-4">
                  {favoriteStudios.map((studio, index) => (
                    <Link key={studio.id} to={`/studio/${studio.id}`}>
                      <GlassCard 
                        className="flex overflow-hidden p-0 h-24"
                        style={{ animationDelay: `${150 + index * 75}ms` }}
                      >
                        <div 
                          className="w-24 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${studio.image})` }} 
                        />
                        <div className="flex-1 p-3 flex flex-col justify-between">
                          <div>
                            <h3 className="font-medium text-gray-800">{studio.name}</h3>
                            <div className="flex items-center gap-1 mt-1">
                              <Star size={14} className="fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-700">{studio.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 self-end">
                            <Clock size={14} />
                            <span className="text-xs">{studio.deliveryTime}</span>
                          </div>
                        </div>
                        <button className="p-3 text-red-500">
                          <Heart size={20} className="fill-red-500" />
                        </button>
                      </GlassCard>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {favoriteServices.length > 0 && (
              <div className="animate-fade-in animate-stagger-2">
                <h2 className="text-lg font-semibold mb-4">Favorite Services</h2>
                <div className="space-y-4">
                  {favoriteServices.map((service, index) => (
                    <Link key={service.id} to={`/studio/${service.studioId}`}>
                      <GlassCard 
                        className="p-4"
                        style={{ animationDelay: `${200 + index * 75}ms` }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-800 mb-1">{service.name}</h3>
                            <p className="text-sm text-gray-500 mb-1">From: {service.studioName}</p>
                            <div className="text-primary-500 font-semibold">{service.price}</div>
                          </div>
                          <button className="p-1 text-red-500">
                            <Heart size={20} className="fill-red-500" />
                          </button>
                        </div>
                      </GlassCard>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
