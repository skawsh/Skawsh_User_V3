
import React from 'react';
import Layout from '../components/Layout';
import ProfileInfo from '../components/profile/ProfileInfo';

const Profile: React.FC = () => {
  return (
    <Layout>
      <div className="section-container pb-10">
        <h1 className="text-2xl font-semibold mb-6 pt-2 animate-fade-in">Profile</h1>
        <ProfileInfo />
      </div>
    </Layout>
  );
};

export default Profile;
