
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import StudioCard from './StudioCard';
import StudioFilters from '../studio/StudioFilters';
import { FilterType } from '../studio/StudioFilters';

interface StudioItem {
  id: string;
  name: string;
  image: string;
  rating?: number;
  deliveryTime?: string;
  distance?: string;
  workingHours?: string;
  promoted?: boolean;
}

interface StudiosSectionProps {
  studios: StudioItem[];
}

const StudiosSection: React.FC<StudiosSectionProps> = ({ studios }) => {
  const [isFiltersSticky, setIsFiltersSticky] = useState(false);
  const [stickyHeight, setStickyHeight] = useState(0);
  const [filteredStudios, setFilteredStudios] = useState<StudioItem[]>(studios);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  
  const studiosRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const filtersWrapperRef = useRef<HTMLDivElement>(null);

  // Handle filter change
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    
    if (filter === null) {
      setFilteredStudios(studios);
      return;
    }
    
    // Apply filtering logic based on the selected filter
    let filtered = [...studios];
    
    switch (filter) {
      case 'nearby':
        filtered = studios.filter(
          (studio) => studio.distance && parseFloat(studio.distance) < 2.0
        );
        break;
      case 'offers':
        filtered = studios.filter((studio) => studio.promoted);
        break;
      case 'express':
        filtered = studios.filter(
          (studio) =>
            (studio.deliveryTime &&
              studio.deliveryTime.toLowerCase().includes('same day')) ||
            (studio.deliveryTime && studio.deliveryTime.includes('hours'))
        );
        break;
      case 'rated':
        filtered = studios.filter(
          (studio) => studio.rating && studio.rating >= 4.7
        );
        break;
      case 'budget':
        // Example filter - in a real app you'd have price data
        filtered = studios.filter((_, index) => index % 2 === 0);
        break;
      default:
        filtered = studios;
    }
    
    setFilteredStudios(filtered);
  };

  useEffect(() => {
    const servicesRow = document.getElementById('services-row');
    if (!servicesRow) return;

    // Calculate the point at which the filter bar should become sticky
    const servicesOffsetTop = servicesRow.offsetTop;
    const servicesHeight = servicesRow.offsetHeight;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const servicesSticky = scrollPosition > 0;
      const filtersThreshold = servicesOffsetTop + servicesHeight;
      
      // The filters should become sticky when we scroll past the services section
      // but only if the services section is already sticky
      const shouldFiltersBeSticky = scrollPosition >= filtersThreshold && servicesSticky;
      
      if (shouldFiltersBeSticky !== isFiltersSticky) {
        setIsFiltersSticky(shouldFiltersBeSticky);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFiltersSticky]);

  // Measure the filters container height once (for placeholder)
  useEffect(() => {
    if (filtersRef.current) {
      setStickyHeight(filtersRef.current.offsetHeight);
    }
  }, []);

  return (
    <div 
      ref={studiosRef} 
      className="mb-10 my-[14px] -mx-4 px-[5px]"
      style={{
        position: 'relative',
        zIndex: 0,
        marginTop: '15px'
      }}
    >
      <Card className="border-none shadow-none bg-transparent mb-2">
        <CardContent className="p-0 px-[15px]">
          <h2 className="section-title mb-4 font-bold text-lg">Explore Laundry Studios</h2>
        </CardContent>
      </Card>
      
      <div ref={filtersWrapperRef} className="relative">
        {/* Filters container */}
        <div 
          ref={filtersRef}
          className={isFiltersSticky ? 'fixed left-0 right-0 z-30' : 'relative'}
          style={{
            // If sticky, position it right below the services row
            top: isFiltersSticky ? 
              (document.getElementById('services-row')?.offsetHeight || 0) + 'px' : 
              'auto',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <StudioFilters 
            onFilterChange={handleFilterChange} 
            isSticky={isFiltersSticky}
          />
        </div>
        
        {/* Placeholder to prevent content jump when filters become sticky */}
        {isFiltersSticky && (
          <div 
            style={{ height: `${stickyHeight}px` }} 
            className="w-full pointer-events-none" 
            aria-hidden="true"
          />
        )}
      </div>
      
      <div className="space-y-4 mx-0 px-2">
        {filteredStudios.length > 0 ? filteredStudios.map((studio, index) => (
          <StudioCard 
            key={studio.id} 
            id={studio.id} 
            name={studio.name} 
            image={studio.image} 
            rating={studio.rating} 
            deliveryTime={studio.deliveryTime} 
            distance={studio.distance} 
            workingHours={studio.workingHours} 
            index={index} 
            promoted={studio.promoted} 
          />
        )) : (
          <div className="text-center py-10 text-gray-500">
            No studios match the selected filter. Try another filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudiosSection;
