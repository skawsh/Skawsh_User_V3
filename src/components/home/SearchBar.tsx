
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="mb-4 mt-2 animate-fade-in animate-stagger-1">
      <div className="flex items-center gap-2 bg-white rounded-full shadow-sm px-4 py-2.5 border border-gray-200">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search for services/studios" 
          className="bg-transparent w-full outline-none text-gray-800 placeholder:text-gray-400 text-sm"
        />
      </div>
    </div>
  );
};

export default SearchBar;
