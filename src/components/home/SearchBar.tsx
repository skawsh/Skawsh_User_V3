
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for special code
    if (searchQuery === '27102001') {
      // Store the special code in localStorage
      localStorage.setItem('specialCode', 'true');
      
      // Navigate to orders page
      navigate('/orders');
    } else {
      // Regular search functionality
      console.log('Searching for:', searchQuery);
      // You could navigate to a search results page or filter the current page
    }
  };

  return (
    <div className="mb-4 mt-2 animate-fade-in animate-stagger-1">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm px-4 py-2.5 border border-white/20 transition-all duration-300 hover:shadow-md">
          <Search size={18} className="text-primary-500" />
          <input 
            type="text" 
            placeholder="Search for services/studios" 
            className="bg-transparent w-full outline-none text-gray-800 placeholder:text-gray-400 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="hidden">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
