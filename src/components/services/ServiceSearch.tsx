
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface ServiceSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ServiceSearch: React.FC<ServiceSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-6 relative animate-fade-in">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={16} className="text-gray-400" />
      </div>
      <Input 
        type="text"
        placeholder="Search services..." 
        className="pl-10 bg-white border-gray-200 rounded-full shadow-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default ServiceSearch;
