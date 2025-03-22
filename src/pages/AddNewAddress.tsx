
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Mic } from 'lucide-react';
import Layout from '../components/Layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Button from "@/components/ui-elements/Button";
import { Card } from '@/components/ui/card';
import MapComponent from '@/components/address/MapComponent';
import { toast } from "sonner";

interface AddressFormData {
  flatNo: string;
  area: string;
  directions: string;
  type: 'Home' | 'Work' | 'Friends and Family' | 'Other';
}

const AddNewAddress: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMapSelected, setIsMapSelected] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  
  const [formData, setFormData] = useState<AddressFormData>({
    flatNo: '',
    area: '',
    directions: '',
    type: 'Home'
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMapSelect = (address: string) => {
    setSelectedAddress(address);
    setIsMapSelected(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof AddressFormData
  ) => {
    if (field === 'directions') {
      setCharacterCount(e.target.value.length);
    }
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleTypeSelect = (type: AddressFormData['type']) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const handleVoiceRecord = () => {
    toast.info("Voice recording feature will be available soon!");
  };

  const handleBack = () => {
    const fromPath = location.state?.from;
    if (fromPath === '/cart') {
      navigate('/cart', { state: { previousPath: location.pathname } });
    } else {
      navigate('/addresses', { state: { previousPath: location.pathname } });
    }
  };

  const handleSubmit = () => {
    if (!formData.flatNo) {
      toast.error("Please enter house/flat/block number");
      return;
    }

    const newAddress = {
      id: Date.now().toString(),
      type: formData.type,
      isDefault: false,
      address: `${formData.flatNo}, ${formData.area}, ${selectedAddress}`
    };

    const fromPath = location.state?.from;
    if (fromPath === '/cart') {
      navigate('/cart', { 
        state: { 
          selectedAddress: newAddress,
          previousPath: location.pathname
        } 
      });
    } else {
      navigate('/addresses', { 
        state: { 
          newAddress, 
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
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <span className="font-medium text-gray-800">Add New Address</span>
          </div>
        )}

        <div className="sticky top-0 z-10 bg-white transition-shadow duration-200">
          <div className="flex items-center gap-3 py-3 px-4">
            <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-lg font-medium">Add New Address</h1>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="section-container pt-4">
            {/* Map component */}
            <div className="mb-6">
              <MapComponent onLocationSelect={handleMapSelect} />
            </div>

            {isMapSelected && (
              <div className="space-y-6">
                {/* Selected address */}
                <Card className="border border-gray-200 shadow-sm p-4">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
                        <MapPin size={16} className="text-primary-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-800 font-medium">Selected Location</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 pr-6">{selectedAddress}</p>
                    </div>
                  </div>
                </Card>

                {/* Address form */}
                <div className="space-y-5">
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm">
                    A detailed address will help our Delivery Partner reach your doorstep easily
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">HOUSE / FLAT / BLOCK NO.</p>
                      <Input 
                        value={formData.flatNo}
                        onChange={(e) => handleInputChange(e, 'flatNo')}
                        className="border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary-500" 
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">APARTMENT / ROAD / AREA <span className="text-gray-400">(RECOMMENDED)</span></p>
                      <Input 
                        value={formData.area}
                        onChange={(e) => handleInputChange(e, 'area')}
                        className="border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary-500" 
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">DIRECTIONS TO REACH <span className="text-gray-400">(OPTIONAL)</span></p>
                      
                      <div className="relative mb-2">
                        <div className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-2 gap-2">
                          <div className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded">NEW</div>
                          <span className="text-sm">Tap to record voice directions</span>
                          <button 
                            onClick={handleVoiceRecord}
                            className="ml-auto text-gray-500 hover:text-gray-700"
                          >
                            <Mic size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <Textarea 
                        value={formData.directions}
                        onChange={(e) => handleInputChange(e, 'directions')}
                        placeholder="e.g. Ring the bell on the red gate"
                        className="min-h-20 border border-gray-300 text-sm focus-visible:ring-0 focus-visible:border-primary-500" 
                      />
                      <div className="text-xs text-right text-gray-400 mt-1">
                        {characterCount}/200
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 mb-1">SAVE AS</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => handleTypeSelect('Home')}
                          className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full text-sm ${
                            formData.type === 'Home' 
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="material-icons-outlined text-lg">🏠</span>
                          Home
                        </button>
                        <button 
                          onClick={() => handleTypeSelect('Work')}
                          className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full text-sm ${
                            formData.type === 'Work' 
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="material-icons-outlined text-lg">💼</span>
                          Work
                        </button>
                        <button 
                          onClick={() => handleTypeSelect('Friends and Family')}
                          className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full text-sm ${
                            formData.type === 'Friends and Family' 
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="material-icons-outlined text-lg">👨‍👩‍👧</span>
                          Friends and Family
                        </button>
                        <button 
                          onClick={() => handleTypeSelect('Other')}
                          className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full text-sm ${
                            formData.type === 'Other' 
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="material-icons-outlined text-lg">📍</span>
                          Other
                        </button>
                      </div>
                    </div>
                  </div>
                
                  <Button 
                    onClick={handleSubmit}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md flex items-center justify-center gap-1 my-6"
                  >
                    ENTER HOUSE / FLAT / BLOCK NO.
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </Layout>
  );
};

export default AddNewAddress;
