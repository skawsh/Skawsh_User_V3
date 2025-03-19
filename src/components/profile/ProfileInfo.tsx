
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
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
  Mail,
  User
} from 'lucide-react';

const ProfileInfo: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuItem = (path: string) => {
    // Navigate to the respective path
    navigate(path);
  };

  const handleLogout = () => {
    // For now, just redirect to home
    navigate('/');
  };

  return (
    <div className="animate-fade-in">
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary-100">
                <AvatarImage src="/lovable-uploads/b78ac98e-5efb-4027-998b-c7528d5e2f90.png" alt="Raksha sha" />
                <AvatarFallback className="bg-primary-100 text-primary-500">
                  <User size={24} />
                </AvatarFallback>
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
        </CardContent>
      </Card>
      
      <div className="space-y-3">
        <ProfileMenuItem 
          icon={<Calendar size={18} />} 
          title="My Activities" 
          onClick={() => handleMenuItem('/activities')} 
        />
        <ProfileMenuItem 
          icon={<MapPin size={18} />} 
          title="Addresses" 
          onClick={() => handleMenuItem('/addresses')} 
        />
        <ProfileMenuItem 
          icon={<CreditCard size={18} />} 
          title="Payments and Refund" 
          onClick={() => handleMenuItem('/payments')} 
        />
        <ProfileMenuItem 
          icon={<Settings size={18} />} 
          title="Settings" 
          onClick={() => handleMenuItem('/settings')} 
        />
        <ProfileMenuItem 
          icon={<MessageSquare size={18} />} 
          title="Send Feedback" 
          onClick={() => handleMenuItem('/feedback')} 
        />
        <ProfileMenuItem 
          icon={<Users size={18} />} 
          title="Refer" 
          onClick={() => handleMenuItem('/refer')} 
        />
        <ProfileMenuItem 
          icon={<Building size={18} />} 
          title="Skawsh for Studio" 
          onClick={() => handleMenuItem('/studio')} 
        />
        <ProfileMenuItem 
          icon={<HelpCircle size={18} />} 
          title="Support" 
          onClick={() => handleMenuItem('/support')} 
        />
        
        <Card 
          className="cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleLogout}
        >
          <CardContent className="p-4 flex items-center gap-3 text-red-500">
            <LogOut size={18} />
            <span>Logout</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, title, onClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="text-gray-500">{icon}</div>
          <span className="text-gray-700">{title}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
