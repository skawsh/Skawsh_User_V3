
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Ticket } from 'lucide-react';

interface UserInfo {
  name: string;
  mobile: string;
  email: string;
  referralCode?: string;
}

const ProfileInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    mobile: '',
    email: '',
    referralCode: ''
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

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{userInfo.name || 'User'}</h3>
            
            <div className="flex items-center text-gray-500 text-sm">
              <Phone size={14} className="mr-2" />
              <span>{userInfo.mobile || 'No phone number'}</span>
            </div>
            
            {userInfo.email && (
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <Mail size={14} className="mr-2" />
                <span>{userInfo.email}</span>
              </div>
            )}
            
            {userInfo.referralCode && (
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <Ticket size={14} className="mr-2" />
                <span>Referral Code: {userInfo.referralCode}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
