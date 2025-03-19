
import React from 'react';
import GlassCard from '../ui-elements/GlassCard';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LogOut, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Settings, 
  MessageSquare, 
  Users, 
  Building, 
  HelpCircle, 
  Pencil, 
  Phone, 
  Mail 
} from 'lucide-react';

const ProfileInfo: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary-100">
              <AvatarImage src="/lovable-uploads/b78ac98e-5efb-4027-998b-c7528d5e2f90.png" alt="Raksha sha" />
              <AvatarFallback className="bg-primary-100 text-primary-500">RS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">Raksha sha</h1>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Phone size={14} />
                <span>9876123540</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Mail size={14} />
                <span>kavyasri@gmail.com</span>
              </div>
            </div>
          </div>
          <button className="text-gray-500 hover:text-primary-500 transition-colors">
            <Pencil size={20} />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <ProfileMenuItem icon={<Calendar size={18} />} title="My Activities" />
        <ProfileMenuItem icon={<MapPin size={18} />} title="Addresses" />
        <ProfileMenuItem icon={<CreditCard size={18} />} title="Payments and Refund" />
        <ProfileMenuItem icon={<Settings size={18} />} title="Settings" />
        <ProfileMenuItem icon={<MessageSquare size={18} />} title="Send Feedback" />
        <ProfileMenuItem icon={<Users size={18} />} title="Refer" />
        <ProfileMenuItem icon={<Building size={18} />} title="Skawsh for Studio" />
        <ProfileMenuItem icon={<HelpCircle size={18} />} title="Support" />
        
        <button 
          className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center gap-3 text-red-500 hover:bg-gray-50 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, title }) => {
  return (
    <GlassCard className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-gray-500">{icon}</div>
        <span className="text-gray-700">{title}</span>
      </div>
    </GlassCard>
  );
};

export default ProfileInfo;
