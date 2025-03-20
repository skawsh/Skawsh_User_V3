
import React from 'react';
import Layout from '../components/Layout';
import { ArrowLeft, MapPin, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui-elements/Button";

interface AddressItem {
  id: string;
  type: string;
  isDefault: boolean;
  address: string;
}

const Addresses: React.FC = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = React.useState<AddressItem[]>([
    {
      id: '1',
      type: 'Home',
      isDefault: true,
      address: 'Navi Apartments, Plot no 305, Sarover Hills, Madhapur, Telangana, 500003...'
    },
    {
      id: '2',
      type: "Rishi's Home",
      isDefault: false,
      address: 'Navi Apartments, Plot no 305, Sarover Hills, Madhapur, Telangana, 500003...'
    }
  ]);

  const handleBack = () => {
    navigate('/profile');
  };

  const handleAddAddress = () => {
    // This would typically open a form modal or navigate to an add address page
    console.log('Add new address');
  };

  return (
    <Layout hideFooter={true}>
      <div className="section-container min-h-screen bg-gray-50">
        <div className="flex items-center gap-3 py-3 mb-4">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back to profile"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-medium">Address</h1>
        </div>

        <div className="space-y-3 mb-6">
          {addresses.map((address) => (
            <Card key={address.id} className="border border-gray-200 shadow-sm">
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
                  <button className="text-primary-500 hover:text-primary-600 p-1.5">
                    <Pencil size={18} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button 
          onClick={handleAddAddress}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-md flex items-center justify-center gap-1"
        >
          + Add New Address
        </Button>
      </div>
    </Layout>
  );
};

export default Addresses;
