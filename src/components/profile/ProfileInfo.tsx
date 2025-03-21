
import React from 'react';
import { User, Settings, MapPin, Package, Heart, MessageSquare, Users, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileInfo = () => {
  const profileMenuItems = [
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <MapPin size={20} />, label: 'Addresses', path: '/addresses' },
    { icon: <Package size={20} />, label: 'Your Orders', path: '/orders' },
    { icon: <Heart size={20} />, label: 'Favorites', path: '/favorites' },
    { icon: <MessageSquare size={20} />, label: 'Feedback', path: '/feedback' },
    { icon: <Users size={20} />, label: 'Refer Friends', path: '/refer' },
    { icon: <HelpCircle size={20} />, label: 'Help & Support', path: '/support' },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Profile header */}
      <div className="flex items-center gap-4 p-4">
        <div className="bg-gray-100 rounded-full p-4">
          <User size={40} className="text-gray-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Guest User</h2>
          <p className="text-gray-500">+91 98765 43210</p>
        </div>
      </div>

      {/* Menu items */}
      <div className="grid divide-y divide-gray-100">
        {profileMenuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="text-primary-500">{item.icon}</div>
              <span>{item.label}</span>
            </div>
            <div className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="px-4">
        <button className="text-red-500 font-medium">Log Out</button>
      </div>
    </div>
  );
};

export default ProfileInfo;
