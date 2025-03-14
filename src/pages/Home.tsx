import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import LocationBar from '../components/home/LocationBar';
import SearchBar from '../components/home/SearchBar';
import PromotionSlider from '../components/home/PromotionSlider';
import ServiceCard from '../components/home/ServiceCard';
import StudioCard from '../components/home/StudioCard';
import { Footprints, Clock, Palette, Medal, HomeIcon, Briefcase, MapPin, Tag, Star, TrendingUp, Heart } from 'lucide-react';

const Home: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [stickyHeight, setStickyHeight] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const studiosRef = useRef<HTMLDivElement>(null);
  const servicesRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const servicesRow = servicesRowRef.current;
      const invisibleDivider = dividerRef.current;
      if (invisibleDivider && servicesRow) {
        const dividerPosition = invisibleDivider.getBoundingClientRect().top;
        const shouldStick = dividerPosition <= 0;
        if (shouldStick && !isSticky) {
          setStickyHeight(servicesRow.offsetHeight);
          requestAnimationFrame(() => {
            setIsSticky(true);
          });
        } else if (!shouldStick && isSticky) {
          requestAnimationFrame(() => {
            setIsSticky(false);
          });
        }
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  useEffect(() => {
    if (servicesRowRef.current && stickyHeight === 0) {
      setStickyHeight(servicesRowRef.current.offsetHeight);
    }
  }, []);

  const services = [{
    id: '1',
    title: 'Wash & Fold',
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '2',
    title: 'Dry Clean',
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '3',
    title: 'Iron Only',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '4',
    title: 'Shoe Laundry',
    icon: <Footprints size={24} />
  }, {
    id: '5',
    title: 'Stain Removal',
    icon: <Palette size={24} />
  }, {
    id: '6',
    title: 'Express Service',
    icon: <Clock size={24} />
  }, {
    id: '7',
    title: 'Premium Care',
    icon: <Medal size={24} />
  }, {
    id: '8',
    title: 'Home Textiles',
    icon: <HomeIcon size={24} />
  }, {
    id: '9',
    title: 'Business Attire',
    icon: <Briefcase size={24} />
  }];

  const studios = [{
    id: '1',
    name: 'Pristine Laundry',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    deliveryTime: '1-2 days',
    distance: '1.2 km',
    workingHours: '9 AM - 8 PM',
    promoted: true
  }, {
    id: '2',
    name: 'Fresh Fabrics',
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 4.6,
    deliveryTime: 'Same Day',
    distance: '0.8 km',
    workingHours: '8 AM - 9 PM',
    promoted: false
  }, {
    id: '3',
    name: 'Luxury Laundromat',
    image: 'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    deliveryTime: '1 day',
    distance: '2.5 km',
    workingHours: '10 AM - 7 PM',
    promoted: true
  }, {
    id: '4',
    name: 'Quick Wash',
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
    name: 'Premium Wash',
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
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '2',
    title: 'Express Service',
    description: 'Ready in Just 3 Hours',
    bgColor: 'bg-purple-600',
    buttonColor: 'bg-green-400',
    textColor: 'text-gray-800',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '3',
    title: 'Eco Friendly',
    description: 'Sustainable Cleaning Solutions',
    bgColor: 'bg-teal-600',
    buttonColor: 'bg-amber-400',
    textColor: 'text-gray-800',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '4',
    title: 'First Order Discount',
    description: '25% Off on Your First Order',
    bgColor: 'bg-pink-600',
    buttonColor: 'bg-blue-400',
    textColor: 'text-gray-800',
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }];

  return <Layout>
    <div className="section-container p-0">
      <div className="bg-gradient-to-r from-[#020024] via-[#090979] to-[#00d4ff] px-4 -mx-4 -mt-10 pt-4 pb-3 rounded-b-3xl">
        <LocationBar />
        <SearchBar />
        <PromotionSlider banners={banners} />
        <div className="flex items-center justify-center text-white text-sm mt-0 pb-1">
          <span className="font-normal text-xs">Welcome to Skawsh</span>
          <Heart size={14} className="ml-1 text-white" fill="white" />
        </div>
      </div>
      
      <div className="px-4 pb-1 -mx-4" ref={servicesRef}>
        <h2 className="section-title text-base mb-2 pt-2">Explore Services</h2>
        
        <div ref={dividerRef} className="h-[1px] w-full invisible" aria-hidden="true"></div>
        
        <div id="services-row" ref={servicesRowRef} className={`${isSticky ? 'fixed top-0 left-0 right-0 bg-gradient-to-r from-[#020024] via-[#090979] to-[#00d4ff] backdrop-blur-sm shadow-md z-40 px-4 py-2 border-b' : 'bg-white'} will-change-transform`} style={{
          transition: 'transform 0.2s ease, opacity 0.2s ease'
        }}>
          <div className="overflow-x-auto overflow-y-hidden">
            <div className="flex gap-3 pb-1.5 min-w-max">
              {services.map((service, index) => (
                <ServiceCard 
                  key={service.id} 
                  icon={service.icon} 
                  title={service.title} 
                  image={service.image} 
                  index={index}
                  isSticky={isSticky}
                />
              ))}
            </div>
          </div>
        </div>
        
        {isSticky && <div style={{
          height: `${stickyHeight}px`,
          opacity: 1
        }} className="pointer-events-none" aria-hidden="true"></div>}
      </div>
      
      <div ref={studiosRef} style={{
        position: 'relative',
        zIndex: 0,
        marginTop: '15px'
      }} className="mb-10 px-0 my-[14px]">
        <h2 className="section-title text-base mb-4">Explore Studios</h2>
        
        <div className="flex gap-3 mb-4 pb-2 overflow-x-auto">
          <FilterButton icon={<MapPin size={14} />} label="Nearby" />
          <FilterButton icon={<Tag size={14} />} label="Offers" />
          <FilterButton icon={<Clock size={14} />} label="Express Delivery" />
          <FilterButton icon={<Star size={14} />} label="Top Rated" />
          <FilterButton icon={<TrendingUp size={14} />} label="Budget Friendly" />
        </div>
        
        <div className="space-y-4">
          {studios.map((studio, index) => <StudioCard key={studio.id} id={studio.id} name={studio.name} image={studio.image} rating={studio.rating} deliveryTime={studio.deliveryTime} distance={studio.distance} workingHours={studio.workingHours} index={index} promoted={studio.promoted} />)}
        </div>
      </div>
    </div>
  </Layout>;
};

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  icon,
  label,
  active = false
}) => {
  return <button className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs whitespace-nowrap ${active ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
      {icon}
      {label}
    </button>;
};

export default Home;
