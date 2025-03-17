
import React from 'react';
import { ArrowRight } from 'lucide-react';

const PremiumBanner: React.FC = () => {
  return (
    <div className="mb-8 animate-fade-in animate-stagger-2">
      <div className="bg-blue-700 text-white p-5 rounded-xl shadow-md overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="font-bold text-xl mb-1">Premium Care</h3>
          <p className="text-white/90 text-sm mb-4">
            For Your Delicate Fabrics
          </p>
          <button className="bg-yellow-400 text-gray-800 font-medium text-sm py-1.5 px-4 rounded-full flex items-center gap-2">
            EXPLORE <ArrowRight size={16} />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-full h-full bg-no-repeat bg-right bg-contain opacity-20"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')" }}>
        </div>
      </div>
    </div>
  );
};

export default PremiumBanner;
