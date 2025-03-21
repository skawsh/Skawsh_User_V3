
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/ui-elements/GlassCard';
import { Star, Clock, Heart, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Define types for our favorites
interface FavoriteStudio {
  id: string;
  name: string;
  image: string;
  rating?: number;
  deliveryTime?: string;
}

interface FavoriteService {
  id: string;
  studioId: string;
  studioName: string;
  name: string;
  price: string;
}

// Try to get favorites from localStorage or use empty arrays
const getFavoritesFromStorage = () => {
  try {
    const studios = localStorage.getItem('favoriteStudios');
    const services = localStorage.getItem('favoriteServices');
    return {
      studios: studios ? JSON.parse(studios) : [],
      services: services ? JSON.parse(services) : []
    };
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return { studios: [], services: [] };
  }
};

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const [favoriteStudios, setFavoriteStudios] = useState<FavoriteStudio[]>([]);
  const [favoriteServices, setFavoriteServices] = useState<FavoriteService[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    // Load favorites from localStorage on component mount
    const { studios, services } = getFavoritesFromStorage();
    setFavoriteStudios(studios);
    setFavoriteServices(services);
    
    // Track scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Remove studio from favorites
  const removeStudioFromFavorites = (studioId: string) => {
    const updatedFavorites = favoriteStudios.filter(studio => studio.id !== studioId);
    setFavoriteStudios(updatedFavorites);
    localStorage.setItem('favoriteStudios', JSON.stringify(updatedFavorites));
  };
  
  // Remove service from favorites
  const removeServiceFromFavorites = (serviceId: string) => {
    const updatedFavorites = favoriteServices.filter(service => service.id !== serviceId);
    setFavoriteServices(updatedFavorites);
    localStorage.setItem('favoriteServices', JSON.stringify(updatedFavorites));
  };

  const handleBack = () => {
    navigate('/profile');
  };
  
  return (
    <Layout>
      <div className="section-container pb-10">
        {/* Sticky header that appears when scrolled */}
        {isScrolled && (
          <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm py-2 px-4 flex items-center">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-3"
              aria-label="Go back to profile"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <span className="font-medium text-gray-800">Washlist</span>
          </div>
        )}
        
        <div className={`sticky top-0 z-10 bg-white ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-200`}>
          <div className="flex items-center mb-6 px-4 py-3">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-2"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold">Washlist</h1>
          </div>
        </div>
        
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
              <div className="mb-8 animate-fade-in animate-stagger-1 px-4">
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
                            {studio.rating && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-gray-700">{studio.rating}</span>
                              </div>
                            )}
                          </div>
                          {studio.deliveryTime && (
                            <div className="flex items-center gap-1 text-gray-500 self-end">
                              <Clock size={14} />
                              <span className="text-xs">{studio.deliveryTime}</span>
                            </div>
                          )}
                        </div>
                        <button 
                          className="p-3 text-red-500"
                          onClick={(e) => {
                            e.preventDefault();
                            removeStudioFromFavorites(studio.id);
                          }}
                        >
                          <Heart size={20} className="fill-red-500" />
                        </button>
                      </GlassCard>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {favoriteServices.length > 0 && (
              <div className="animate-fade-in animate-stagger-2 px-4">
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
                          <button 
                            className="p-1 text-red-500"
                            onClick={(e) => {
                              e.preventDefault();
                              removeServiceFromFavorites(service.id);
                            }}
                          >
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
