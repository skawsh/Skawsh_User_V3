
import React from 'react';
import GlassCard from '../ui-elements/GlassCard';
import { Mail, Phone, MapPin, CreditCard, Clock, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

const ProfileInfo: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center mb-4 text-white text-2xl font-semibold border-4 border-white shadow-xl">
          JS
        </div>
        <h1 className="text-xl font-semibold">John Smith</h1>
        <p className="text-gray-500">john.smith@example.com</p>
      </div>
      
      <div className="space-y-4">
        <GlassCard className="p-4" interactive={false}>
          <h2 className="font-medium text-gray-800 mb-3">Personal Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={18} className="text-primary-500" />
              <span>john.smith@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone size={18} className="text-primary-500" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin size={18} className="text-primary-500" />
              <span>123 Main St, New York, NY</span>
            </div>
          </div>
        </GlassCard>
        
        <ProfileSection 
          title="Payment Methods" 
          icon={<CreditCard size={18} />} 
          linkText="Manage Payment Options"
        />
        
        <ProfileSection 
          title="Order History" 
          icon={<Clock size={18} />} 
          linkText="View Past Orders"
        />
        
        <ProfileSection 
          title="Help & Support" 
          icon={<HelpCircle size={18} />} 
          linkText="Get Help"
        />
        
        <GlassCard className="p-4 text-red-500 flex items-center justify-center gap-2">
          <LogOut size={18} />
          <span className="font-medium">Log Out</span>
        </GlassCard>
      </div>
    </div>
  );
};

interface ProfileSectionProps {
  title: string;
  icon: React.ReactNode;
  linkText: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, icon, linkText }) => {
  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-primary-500">{icon}</div>
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        <ChevronRight className="text-gray-400" size={18} />
      </div>
      <p className="mt-1 text-sm text-primary-500 font-medium">{linkText}</p>
    </GlassCard>
  );
};

export default ProfileInfo;
