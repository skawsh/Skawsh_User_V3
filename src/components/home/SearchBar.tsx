
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface SearchSuggestion {
  id: string;
  name: string;
  type: 'service' | 'studio';
  image?: string;
}

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(searchRef, () => setShowSuggestions(false));

  // Mock suggestions data
  const allSuggestions: SearchSuggestion[] = [
    { id: 'dry-clean', name: 'Dry Clean', type: 'service' },
    { id: 'wash-fold', name: 'Wash & Fold', type: 'service' },
    { id: 'iron-only', name: 'Iron Only', type: 'service' },
    { id: 'shoe-laundry', name: 'Shoe Laundry', type: 'service' },
    { id: 'stain-removal', name: 'Stain Removal', type: 'service' },
    { id: '1', name: 'Busy Bee', type: 'studio', image: '/lovable-uploads/6050892e-ca31-4f41-9899-4970d59197a0.png' },
    { id: '2', name: 'U clean', type: 'studio' },
    { id: '3', name: 'Tumble Dry', type: 'studio' },
    { id: '4', name: 'Fabrico', type: 'studio' },
    { id: '5', name: 'Eco Clean', type: 'studio' },
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredSuggestions = allSuggestions.filter(suggestion => 
        suggestion.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for special codes
    if (searchQuery === '27102001') {
      // Store the special code in localStorage
      localStorage.setItem('specialCode', 'true');
      // Navigate to orders page
      navigate('/orders');
    } else if (searchQuery === '25092001') {
      // Store the edit order special code in localStorage
      localStorage.setItem('editOrderEnabled', 'true');
      // Navigate to orders page
      navigate('/orders');
    } else {
      // Regular search functionality
      console.log('Searching for:', searchQuery);
      // Navigate to search results page if no suggestions selected
      if (suggestions.length > 0) {
        handleSuggestionClick(suggestions[0]);
      }
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'service') {
      navigate(`/services/${suggestion.id}`);
    } else {
      navigate(`/studio/${suggestion.id}`);
    }
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <div className="mb-4 mt-2 animate-fade-in animate-stagger-1" ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm px-4 py-2.5 border border-white/20 transition-all duration-300 hover:shadow-md">
          <input 
            type="text" 
            placeholder="Search for services/studios" 
            className="bg-transparent w-full outline-none text-gray-800 placeholder:text-gray-400 text-sm" 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
            onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost" 
            className="p-0 h-8 w-8 hover:bg-primary-100/50 text-primary-500"
          >
            <Search size={18} />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full max-w-md bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden">
          <div className="py-1 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <div
                key={`${suggestion.type}-${suggestion.id}`}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.image && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                    <img 
                      src={suggestion.image} 
                      alt={suggestion.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">{suggestion.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{suggestion.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
