
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from './ServiceCard';

interface ServiceItem {
  id: string;
  title: string;
  image?: string;
  icon?: React.ReactNode;
}

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [stickyHeight, setStickyHeight] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const servicesRowRef = useRef<HTMLDivElement>(null);

  // Memoize the scroll handler to prevent unnecessary renders
  const handleScroll = useCallback(() => {
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
  }, [isSticky]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (servicesRowRef.current && stickyHeight === 0) {
      setStickyHeight(servicesRowRef.current.offsetHeight);
    }
  }, []);

  return (
    <div ref={servicesRef} className="pb-1 -mx-4 px-[5px] bg-gradient-to-r from-gray-50 to-white">
      <Card className="border-none shadow-none bg-transparent mb-2">
        <CardContent className="p-0 pt-2 px-[15px]">
          <h2 className="section-title mb-2 font-bold text-lg">Explore Laundry Services</h2>
        </CardContent>
      </Card>
      
      <div ref={dividerRef} className="h-[1px] w-full invisible" aria-hidden="true"></div>
      
      <div 
        id="services-row" 
        ref={servicesRowRef} 
        className={`${isSticky ? 'fixed top-0 left-0 right-0 bg-black backdrop-blur-sm shadow-md z-40 px-4 py-2 border-b' : 'bg-transparent'} will-change-transform`} 
        style={{
          transition: 'transform 0.2s ease, opacity 0.2s ease'
        }}
      >
        <div className="overflow-x-auto overflow-y-hidden no-scrollbar">
          <div className="flex gap-3 pb-1.5 min-w-max px-[10px] bg-transparent">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                id={service.id} 
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
      
      {isSticky && (
        <div 
          style={{
            height: `${stickyHeight}px`,
            opacity: 1
          }} 
          className="pointer-events-none" 
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ServicesSection;
