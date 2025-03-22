
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface MapComponentProps {
  onLocationSelect: (address: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pinPosition, setPinPosition] = useState({ x: 50, y: 50 });

  // Demo map - this would be replaced with an actual map integration
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Get click coordinates relative to the map container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPinPosition({ x, y });
    generateAddress(x, y);
  };

  const generateAddress = (x: number, y: number) => {
    // Simulate getting an address based on coordinates
    // In a real implementation, this would call a geocoding API
    const addresses = [
      "1-98/5/B, Madhapur, Hyderabad, Telangana 500081",
      "Plot No.2, HITEC City, Hyderabad, Telangana 500032",
      "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033",
      "8-2-293/82/A/1130, Road Number 36, Hyderabad, Telangana 500034",
      "Survey No. 64, Gachibowli, Hyderabad, Telangana 500032"
    ];
    
    // Use x and y to "randomly" select an address from the list
    const index = Math.floor((x * y) % 5);
    onLocationSelect(addresses[index]);
  };

  return (
    <div className="relative w-full h-[250px] rounded-lg overflow-hidden border border-gray-300">
      {/* This is a placeholder for the actual map - in a real app, you'd use a map library */}
      <div 
        className="absolute inset-0 bg-gray-100 cursor-pointer"
        style={{ 
          backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/78.4867,17.3850,12,0/600x300?access_token=pk.placeholder')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onClick={handleMapClick}
      >
        {/* Map pin at the selected position */}
        <div 
          className="absolute"
          style={{ 
            left: `${pinPosition.x}%`, 
            top: `${pinPosition.y}%`, 
            transform: 'translate(-50%, -100%)'
          }}
        >
          <MapPin size={32} className="text-primary-500 filter drop-shadow-lg animate-bounce-once" />
        </div>
      </div>
      
      {/* Information overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-2 text-center text-sm">
        Tap on the map to select your location
      </div>
    </div>
  );
};

export default MapComponent;
