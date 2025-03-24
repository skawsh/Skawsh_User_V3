
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, Mail, Building, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Studio: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Profile data (this could be fetched from a user context/state in a real app)
  const profileData = {
    name: "Raksha sha",
    phone: "9876123540",
    email: "kavyasri@gmail.com",
    photoUrl: '/lovable-uploads/b78ac98e-5efb-4027-998b-c7528d5e2f90.png'
  };
  
  // Form state
  const [studioData, setStudioData] = useState({
    name: "",
    address: ""
  });
  
  // Form validation
  const [errors, setErrors] = useState({
    name: false,
    address: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudioData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      name: !studioData.name.trim(),
      address: !studioData.address.trim()
    };
    
    setErrors(newErrors);
    
    // If there are any errors, don't submit
    if (newErrors.name || newErrors.address) {
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      toast.success("Studio registration submitted successfully!");
      setIsSubmitting(false);
      // Redirect to home after successful submission
      navigate('/');
    }, 1500);
  };
  
  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <Layout>
      <div className="section-container min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <div className="sticky top-0 z-10 bg-primary-50/90 backdrop-blur-sm py-2">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-white/80 transition-colors"
              aria-label="Go back to profile"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Register Your Studio</h1>
          </div>
        </div>
        
        <div className="py-6 space-y-6 animate-fade-in">
          {/* Profile Info Card */}
          <Card className="overflow-hidden shadow-md border-none">
            <CardContent className="p-6 bg-gradient-to-r from-primary-100 to-primary-50">
              <div className="flex items-center gap-5">
                <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                  <AvatarImage src={profileData.photoUrl} alt={profileData.name} />
                  <AvatarFallback className="bg-blue-50 text-blue-500">
                    <User size={28} />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h2 className="text-lg font-medium text-gray-800">{profileData.name}</h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} className="text-primary-500" />
                    <span className="text-sm">{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} className="text-primary-500" />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Studio Registration Form */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700 px-1">Studio Details</h3>
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">
                      Studio Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                      <Input
                        id="name"
                        name="name"
                        value={studioData.name}
                        onChange={handleInputChange}
                        className={`pl-10 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        placeholder="Enter your studio name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm">Studio name is required</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-700">
                      Studio Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                      <Input
                        id="address"
                        name="address"
                        value={studioData.address}
                        onChange={handleInputChange}
                        className={`pl-10 ${errors.address ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        placeholder="Enter your studio address"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-sm">Studio address is required</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary-500 hover:bg-primary-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Register Studio'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Studio;
