
import React from 'react';
import Layout from '../components/Layout';
import ProfileInfo from '../components/profile/ProfileInfo';
import { LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <Layout>
      <div className="section-container pb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">Profile</span>
          </div>
          <button className="flex items-center gap-1 text-primary-500 hover:text-primary-600 transition-colors">
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
        <ProfileInfo />
      </div>
    </Layout>
  );
};

export default Profile;
