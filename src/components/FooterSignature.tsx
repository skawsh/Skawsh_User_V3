
import React from 'react';
import { Heart } from 'lucide-react';

const FooterSignature: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 bg-gradient-to-t from-gray-50/80 to-transparent text-center">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Made for You</h3>
        <div className="flex items-center justify-center gap-1.5 text-sm text-gray-600">
          <span>Crafted in Hyderabad with</span>
          <Heart 
            size={16} 
            className="text-red-500 fill-red-500 animate-pulse" 
            style={{ 
              animation: 'pulse-heart 1.5s infinite ease-in-out'
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default FooterSignature;
