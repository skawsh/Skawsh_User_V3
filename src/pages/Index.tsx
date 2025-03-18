
import React from 'react';
import Layout from '@/components/Layout';

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to Skawshway</h1>
          <p className="text-xl text-gray-600 mb-8">Your one-stop solution for laundry and cleaning services</p>
          <a 
            href="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Explore Services
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
