
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const FooterSignature: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 bg-gradient-to-t from-primary-50/90 to-transparent text-center rounded-t-xl">
      <div className="space-y-3 px-4 max-w-md">
        <div className="flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-amber-400" />
          <h3 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-purple-500 bg-clip-text text-transparent">Made for You</h3>
          <Sparkles size={16} className="text-amber-400" />
        </div>
        <div className="flex items-center justify-center gap-1.5 text-sm text-gray-600">
          <span className="font-medium">Crafted in Hyderabad with</span>
          <Heart 
            size={18} 
            className="text-rose-500 fill-rose-500" 
            style={{ 
              animation: 'pulse-heart 1.5s infinite ease-in-out',
              filter: 'drop-shadow(0 0 2px rgba(244, 63, 94, 0.4))'
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default FooterSignature;
