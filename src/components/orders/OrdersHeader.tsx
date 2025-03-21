
import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';

interface OrdersHeaderProps {
  isScrolled: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({ 
  isScrolled, 
  searchQuery, 
  setSearchQuery, 
  onSearch 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <>
      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm py-2 px-4 flex items-center">
          <button 
            onClick={handleBack} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-3" 
            aria-label="Go back to profile"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <span className="font-medium text-gray-800">Your Orders</span>
        </div>
      )}
      
      <div className="flex items-center mb-4 pt-2">
        <button 
          onClick={handleBack} 
          className="p-2 rounded-full hover:bg-white/80 transition-colors" 
          aria-label="Go back to profile"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-bold flex-1 text-gray-800 mx-[80px] py-0 my-0 px-0 text-left">Your Orders</h1>
      </div>
      
      <form onSubmit={onSearch} className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          className="pl-10 pr-4 py-2 bg-white rounded-full border-gray-200" 
          placeholder="Search by Studio or Services" 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
        />
      </form>
    </>
  );
};

export default OrdersHeader;
