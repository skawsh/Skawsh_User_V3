
import React from 'react';
import Layout from '../components/Layout';
import { ChevronLeft, Phone, MapPin, Share } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const StudioAbout: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // This would normally come from an API using the ID from the URL
  const studio = {
    id: id || '1',
    name: 'Busy Bee',
    locations: [
      'Deluxe Colony',
      'Hakeempet',
      'Shaikpet',
      'Tolichowki'
    ],
    city: 'Hyderabad',
    operatingHours: '08:00 AM – 10:00 PM',
    since: '2025',
    phone: '+91 9876543210' // Example phone number
  };

  const handleBackClick = () => {
    navigate(`/studio/${id}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: studio.name,
        text: `Check out ${studio.name}`,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${studio.phone}`;
  };

  const handleLocation = () => {
    // This would normally open the location in maps app
    // For now we'll just log it
    console.log(`Opening location for ${studio.name} in maps`);
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-white">
        <div className="sticky top-0 z-10 bg-white p-4 flex items-center justify-between shadow-sm">
          <button onClick={handleBackClick} className="p-1 rounded-full">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleShare} className="p-1 rounded-full">
            <Share size={20} />
          </button>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-2 border-gray-300 rounded-3xl overflow-hidden">
            <div className="p-6 flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-2">{studio.name}</h1>
              
              <p className="text-center mb-4">
                Locations:- {studio.locations[0]},<br />
                {studio.locations.slice(1).join(', ')}, {studio.city}
              </p>
              
              <div className="flex w-full justify-around mb-4">
                <div 
                  className="flex flex-col items-center cursor-pointer" 
                  onClick={handleCall}
                >
                  <div className="bg-blue-400 text-white p-3 rounded-full mb-1">
                    <Phone size={24} />
                  </div>
                  <span>Call</span>
                </div>
                
                <div 
                  className="flex flex-col items-center cursor-pointer" 
                  onClick={handleLocation}
                >
                  <div className="bg-blue-400 text-white p-3 rounded-full mb-1">
                    <MapPin size={24} />
                  </div>
                  <span>Location</span>
                </div>
              </div>
              
              <div className="w-full mb-3">
                <p className="font-medium">Operating Hours</p>
                <p>{studio.operatingHours}</p>
              </div>
            </div>
            
            <Separator className="bg-gray-300 h-[2px]" />
            
            <div className="p-4 text-center">
              <p>Live on Skawsh Since {studio.since}</p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StudioAbout;
