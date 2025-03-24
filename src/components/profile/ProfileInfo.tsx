
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LogOut, 
  MapPin, 
  Settings, 
  MessageSquare, 
  Users, 
  Building, 
  HelpCircle, 
  Pencil, 
  Phone, 
  Mail,
  User,
  Heart
} from 'lucide-react';
import ProfilePhotoEditor from './ProfilePhotoEditor';

const ProfileInfo: React.FC = () => {
  const navigate = useNavigate();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>('/lovable-uploads/b78ac98e-5efb-4027-998b-c7528d5e2f90.png');
  const [isEditing, setIsEditing] = useState(false);

  const handleMenuItem = (path: string) => {
    // Navigate to the respective path
    navigate(path);
  };

  const handleLogout = () => {
    // For now, just redirect to home
    navigate('/');
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handlePhotoChange = (newPhotoUrl: string) => {
    setProfilePhotoUrl(newPhotoUrl);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <Card className="overflow-hidden shadow-md border-none">
        <CardContent className="p-6 bg-gradient-to-r from-primary-100 to-primary-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              {isEditing ? (
                <ProfilePhotoEditor 
                  currentPhotoUrl={profilePhotoUrl} 
                  onPhotoChange={handlePhotoChange} 
                />
              ) : (
                <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                  <AvatarImage src={profilePhotoUrl} alt="Raksha sha" />
                  <AvatarFallback className="bg-blue-50 text-blue-500">
                    <User size={32} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Raksha sha</h1>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <Phone size={14} className="text-primary-500" />
                  <span className="text-sm">9876123540</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <Mail size={14} className="text-primary-500" />
                  <span className="text-sm">kavyasri@gmail.com</span>
                </div>
              </div>
            </div>
            <button 
              className="text-primary-500 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-white/50"
              onClick={handleEditProfile}
            >
              <Pencil size={20} />
            </button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 gap-4">
        <h2 className="text-lg font-medium text-gray-700 mb-1 px-1">Account</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ProfileMenuItem 
            icon={<Heart size={18} className="text-primary-500" />} 
            title="Washlist" 
            description="Your favorite studios and services"
            onClick={() => handleMenuItem('/favorites')} 
          />
          <ProfileMenuItem 
            icon={<MapPin size={18} className="text-primary-500" />} 
            title="Addresses" 
            description="Manage your saved addresses"
            onClick={() => handleMenuItem('/addresses')} 
          />
          <ProfileMenuItem 
            icon={<Settings size={18} className="text-primary-500" />} 
            title="Settings" 
            description="Manage your account settings"
            onClick={() => handleMenuItem('/settings')} 
          />
        </div>
        
        <h2 className="text-lg font-medium text-gray-700 mt-4 mb-1 px-1">Support & More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ProfileMenuItem 
            icon={<MessageSquare size={18} className="text-primary-500" />} 
            title="Send Feedback" 
            description="Help us improve our services"
            onClick={() => handleMenuItem('/feedback')} 
          />
          <ProfileMenuItem 
            icon={<Users size={18} className="text-primary-500" />} 
            title="Refer Friends" 
            description="Invite friends and earn rewards"
            onClick={() => handleMenuItem('/refer')} 
          />
          <ProfileMenuItem 
            icon={<Building size={18} className="text-primary-500" />} 
            title="Skawsh for Studio" 
            description="Partner with us for your business"
            onClick={() => handleMenuItem('/studio')} 
          />
          <ProfileMenuItem 
            icon={<HelpCircle size={18} className="text-primary-500" />} 
            title="Support" 
            description="Get help with your queries"
            onClick={() => handleMenuItem('/support')} 
          />
        </div>
        
        <Card 
          className="mt-4 cursor-pointer transition-colors overflow-hidden bg-gradient-to-r from-red-50 to-white hover:from-red-100 hover:to-red-50 border-none shadow-sm"
          onClick={handleLogout}
        >
          <CardContent className="p-4 flex items-center gap-3 text-red-500">
            <div className="p-2 rounded-full bg-red-100">
              <LogOut size={18} />
            </div>
            <div>
              <span className="font-medium">Logout</span>
              <p className="text-xs text-gray-500">Sign out from your account</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, title, description, onClick }) => {
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md border-none shadow-sm bg-white hover:bg-gradient-to-br hover:from-primary-50 hover:to-white"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-primary-50">{icon}</div>
          <div className="flex-1">
            <span className="font-medium text-gray-800">{title}</span>
            {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
