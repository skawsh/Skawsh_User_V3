
import React from 'react';
import { Search } from 'lucide-react';
import GlassCard from '../ui-elements/GlassCard';

const SearchBar: React.FC = () => {
  return (
    <GlassCard className="mb-6 animate-fade-in animate-stagger-1" interactive={false}>
      <div className="flex items-center gap-2 text-gray-500">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Search for laundry services..." 
          className="bg-transparent w-full outline-none text-gray-800 placeholder:text-gray-500"
        />
      </div>
    </GlassCard>
  );
};

export default SearchBar;
