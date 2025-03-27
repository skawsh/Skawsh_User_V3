
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Mail, Ticket, Heart, MapPin, ShoppingBag, MessageSquare, Share2, HelpCircle, UserRound, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfilePhotoEditor from './ProfilePhotoEditor';

interface UserInfo {
  name: string;
  mobile: string;
  email: string;
  referralCode?: string;
  photoUrl?: string;
}

interface ProfileSection {
  title: string;
  icon: React.ReactNode;
  route: string;
  description?: string;
}

const ProfileInfo: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    mobile: '',
    email: '',
    referralCode: '',
    photoUrl: ''
  });

  useEffect(() => {
    // Load user data from localStorage
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserInfo(parsedData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);

  const handleProfilePhotoChange = (newPhotoUrl: string) => {
    const updatedUserInfo = { ...userInfo, photoUrl: newPhotoUrl };
    setUserInfo(updatedUserInfo);
    
    // Update localStorage
    try {
      localStorage.setItem('userData', JSON.stringify(updatedUserInfo));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const profileSections: ProfileSection[] = [
    { 
      title: 'My Orders', 
      icon: <ShoppingBag size={20} className="text-primary-500" />, 
      route: '/orders',
      description: 'View your order history and track current orders'
    },
    { 
      title: 'Addresses', 
      icon: <MapPin size={20} className="text-primary-500" />, 
      route: '/addresses',
      description: 'Manage your saved addresses'
    },
    { 
      title: 'Favorites', 
      icon: <Heart size={20} className="text-primary-500" />, 
      route: '/favorites',
      description: 'View your favorite services'
    },
    { 
      title: 'Refer Friends', 
      icon: <Share2 size={20} className="text-primary-500" />, 
      route: '/refer',
      description: 'Earn rewards by referring friends'
    },
    { 
      title: 'Support', 
      icon: <HelpCircle size={20} className="text-primary-500" />, 
      route: '/support',
      description: 'Get help with your orders and services'
    },
    { 
      title: 'Feedback', 
      icon: <MessageSquare size={20} className="text-primary-500" />, 
      route: '/feedback',
      description: 'Share your thoughts with us'
    },
    {
      title: 'Register your studio',
      icon: <Building size={20} className="text-primary-500" />,
      route: '/register-studio',
      description: 'Register your own laundry studio'
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="border border-gray-100 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                {userInfo.photoUrl ? (
                  <AvatarImage src={userInfo.photoUrl} alt={userInfo.name || 'User'} />
                ) : (
                  <AvatarFallback className="bg-primary-50">
                    <UserRound size={32} className="text-primary-500" />
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <div className="flex flex-col space-y-1">
              <h3 className="text-lg font-semibold">{userInfo.name || 'User'}</h3>
              
              <div className="flex items-center text-gray-500 text-sm">
                <Phone size={14} className="mr-2 flex-shrink-0" />
                <span>{userInfo.mobile || 'No phone number'}</span>
              </div>
              
              {userInfo.email && (
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Mail size={14} className="mr-2 flex-shrink-0" />
                  <span>{userInfo.email}</span>
                </div>
              )}
              
              {userInfo.referralCode && (
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Ticket size={14} className="mr-2 flex-shrink-0" />
                  <span>Referral Code: {userInfo.referralCode}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {profileSections.map((section, index) => (
          <Card 
            key={index} 
            className="border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleNavigate(section.route)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-50 p-2 rounded-full">{section.icon}</div>
                  <div>
                    <h4 className="font-medium">{section.title}</h4>
                    {section.description && (
                      <p className="text-sm text-gray-500">{section.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-gray-700">Made for You</h3>
        <p className="text-gray-600 mt-2">Crafted in Hyderabad with ❤️</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
