
import React from 'react';
import Layout from '../components/Layout';
import ProfileInfo from '../components/profile/ProfileInfo';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="section-container pb-10">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <button className="flex items-center gap-1 text-primary-500 hover:text-primary-600 transition-colors">
            <span className="text-sm">Logout</span>
          </button>
        </div>
        <ProfileInfo />
      </div>
    </Layout>
  );
};

export default Profile;
