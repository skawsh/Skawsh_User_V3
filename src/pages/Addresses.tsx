
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { ArrowLeft, MapPin, Pencil } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui-elements/Button";
import { ScrollArea } from '@/components/ui/scroll-area';

interface AddressItem {
  id: string;
  type: string;
  isDefault: boolean;
  address: string;
}

const Addresses: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [addresses, setAddresses] = useState<AddressItem[]>([{
    id: '1',
    type: 'Home',
    isDefault: true,
    address: 'Navi Apartments, Plot no 305, Sarover Hills, Madhapur, Telangana, 500003...'
  }, {
    id: '2',
    type: "Rishi's Home",
    isDefault: false,
    address: 'Navi Apartments, Plot no 305, Sarover Hills, Madhapur, Telangana, 500003...'
  }]);

  const returnToCart = location.state?.returnToCart || false;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBack = () => {
    const fromPath = location.state?.from;
    if (fromPath === '/cart') {
      navigate('/cart', { state: { previousPath: location.pathname } });
    } else if (fromPath === '/') {
      navigate('/');
    } else {
      navigate('/profile');
    }
  };

  const handleAddAddress = () => {
    console.log('Add new address');
  };

  const handleSelectAddress = (address: AddressItem) => {
    if (returnToCart) {
      navigate('/cart', { 
        state: { 
          selectedAddress: address,
          previousPath: location.pathname
        } 
      });
    }
  };

  return (
    <Layout hideFooter={true}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Sticky header that appears when scrolled */}
        {isScrolled && (
          <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm py-2 px-4 flex items-center">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-3"
              aria-label="Go back to profile"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <span className="font-medium text-gray-800">Addresses</span>
          </div>
        )}

        <div className="sticky top-0 z-10 bg-white ${isScrolled ? 'shadow-sm' : ''} transition-shadow duration-200">
          <div className="flex items-center gap-3 py-3 px-4">
            <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back to profile">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-lg font-medium">Addresses</h1>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="section-container pt-4">
            <div className="space-y-3 mb-6">
              {addresses.map(address => (
                <Card 
                  key={address.id} 
                  className="border border-gray-200 shadow-sm cursor-pointer hover:border-primary-300 transition-colors"
                  onClick={() => handleSelectAddress(address)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="mt-1">
                          <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
                            <MapPin size={16} className="text-primary-500" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-800 font-medium">{address.type}</span>
                            {address.isDefault && (
                              <span className="text-xs bg-primary-50 text-primary-500 px-2 py-0.5 rounded font-medium">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 pr-6">{address.address}</p>
                        </div>
                      </div>
                      <button 
                        className="text-primary-500 hover:text-primary-600 p-1.5"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Edit address functionality would go here
                        }}
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button 
              onClick={handleAddAddress} 
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-md flex items-center justify-center gap-1 mb-6"
            >
              + Add New Address
            </Button>
          </div>
        </ScrollArea>
      </div>
    </Layout>
  );
};

export default Addresses;
