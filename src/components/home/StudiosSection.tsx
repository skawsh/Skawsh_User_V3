
import React, { useRef } from 'react';
import { MapPin, Tag, Clock, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import StudioCard from './StudioCard';
import FilterButton from './FilterButton';

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
  const studiosRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={studiosRef} 
      style={{
        position: 'relative',
        zIndex: 0,
        marginTop: '15px'
      }} 
      className="mb-10 my-[14px] -mx-4 px-[5px]"
    >
      <Card className="border-none shadow-none bg-transparent mb-2">
        <CardContent className="p-0 px-[15px]">
          <h2 className="section-title mb-4 font-bold text-lg">Explore Laundry Studios</h2>
        </CardContent>
      </Card>
      
      <div className="flex gap-3 mb-4 pb-2 overflow-x-auto no-scrollbar px-[12px]">
        <FilterButton icon={<MapPin size={14} />} label="Nearby" />
        <FilterButton icon={<Tag size={14} />} label="Offers" />
        <FilterButton icon={<Clock size={14} />} label="Express Delivery" />
        <FilterButton icon={<Star size={14} />} label="Top Rated" />
        <FilterButton icon={<TrendingUp size={14} />} label="Budget Friendly" />
      </div>
      
      <div className="space-y-4 mx-0 px-2">
        {studios.map((studio, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default StudiosSection;
