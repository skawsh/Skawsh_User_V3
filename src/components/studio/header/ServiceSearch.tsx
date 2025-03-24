
import React, { useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface ServiceSuggestion {
  id: string;
  name: string;
  price: number;
  category?: string;
}

interface ServiceSearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions: ServiceSuggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  onServiceSelect: (serviceId: string) => void;
}

const ServiceSearch: React.FC<ServiceSearchProps> = ({
  searchTerm,
  onSearchChange,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  onServiceSelect
}) => {
  const searchRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(searchRef, () => setShowSuggestions(false));

  return (
    <div className="relative" ref={searchRef}>
      <Input 
        placeholder="Search services in this studio..." 
        className="bg-gray-50 border-gray-200 rounded-full shadow-sm pr-10 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" 
        value={searchTerm}
        onChange={onSearchChange}
        onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search size={18} />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden mt-1" style={{ zIndex: 50000, position: 'absolute' }}>
          <div className="py-1 max-h-60 overflow-y-auto">
            {suggestions.map((service) => (
              <div
                key={service.id}
                className="px-4 py-2.5 hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => onServiceSelect(service.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{service.name}</p>
                    {service.category && (
                      <p className="text-xs text-gray-500 mt-0.5">{service.category}</p>
                    )}
                  </div>
                  <p className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                    ₹{service.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSearch;
