
import React from 'react';
import GlassCard from '../ui-elements/GlassCard';
import Button from '../ui-elements/Button';
import { Sparkles } from 'lucide-react';

const PremiumBanner: React.FC = () => {
  return (
    <div className="mb-8 animate-fade-in animate-stagger-2">
      <GlassCard 
        className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-5 border-none shadow-xl"
        interactive={false}
      >
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-white/20 p-2.5">
            <Sparkles size={24} className="text-white animate-pulse-subtle" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">Premium Services</h3>
            <p className="text-white/90 text-sm mb-3">
              Express delivery, premium fabric care, and more.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 active:bg-white/30"
            >
              Explore Premium
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default PremiumBanner;
