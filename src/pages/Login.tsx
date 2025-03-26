
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout hideFooter={true}>
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center p-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="mb-10 text-center">
            <img 
              src="/lovable-uploads/f9c8201e-220e-43f1-b1c4-b0fbbdd0fc7a.png" 
              alt="Skawsh Logo" 
              className="w-44 h-auto mx-auto"
            />
            <h1 className="mt-6 text-2xl font-bold text-primary-500">Welcome Back</h1>
            <p className="mt-2 text-gray-500">Login to your account using mobile OTP</p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
