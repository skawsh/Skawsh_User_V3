
import React, { useState } from 'react';
import { MapPin, Tag, Clock, Star, TrendingUp } from 'lucide-react';
import FilterButton from '../home/FilterButton';

export type FilterType = 'nearby' | 'offers' | 'express' | 'rated' | 'budget' | null;

interface StudioFiltersProps {
  onFilterChange?: (filter: FilterType) => void;
}

const StudioFilters: React.FC<StudioFiltersProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  const handleFilterClick = (filter: FilterType) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      onFilterChange?.(null);
    } else {
      setActiveFilter(filter);
      onFilterChange?.(filter);
    }
  };

  return (
    <div className="flex gap-3 mb-4 pb-2 overflow-x-auto no-scrollbar px-[12px]">
      <FilterButton
        icon={<MapPin size={14} />}
        label="Nearby"
        active={activeFilter === 'nearby'}
        onClick={() => handleFilterClick('nearby')}
      />
      <FilterButton
        icon={<Tag size={14} />}
        label="Offers"
        active={activeFilter === 'offers'}
        onClick={() => handleFilterClick('offers')}
      />
      <FilterButton
        icon={<Clock size={14} />}
        label="Express Delivery"
        active={activeFilter === 'express'}
        onClick={() => handleFilterClick('express')}
      />
      <FilterButton
        icon={<Star size={14} />}
        label="Top Rated"
        active={activeFilter === 'rated'}
        onClick={() => handleFilterClick('rated')}
      />
      <FilterButton
        icon={<TrendingUp size={14} />}
        label="Budget Friendly"
        active={activeFilter === 'budget'}
        onClick={() => handleFilterClick('budget')}
      />
    </div>
  );
};

export default StudioFilters;
