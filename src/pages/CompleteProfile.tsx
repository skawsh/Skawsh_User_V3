
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';

// Profile form schema
const profileSchema = z.object({
  name: z.string()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[a-zA-Z0-9 ._-]+$/, "Name can contain letters, numbers, spaces, and some special characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  referralCode: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const CompleteProfile: React.FC = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      referralCode: '',
    },
  });

  useEffect(() => {
    // Get the mobile number from sessionStorage
    const storedMobile = sessionStorage.getItem('otpVerificationMobile');
    const isNewUser = sessionStorage.getItem('isNewUser') === 'true';
    
    if (!storedMobile || !isNewUser) {
      // If mobile number is not found or not a new user, redirect to login page
      navigate('/login');
      return;
    }
    
    setMobile(storedMobile);
  }, [navigate]);
  
  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Creating profile:", {
        mobile,
        ...values,
      });
      
      // Store user data in localStorage for profile display
      const userData = {
        name: values.name,
        mobile: mobile,
        email: values.email || '',
        referralCode: values.referralCode || '',
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Simulate server delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear the verification session data
      sessionStorage.removeItem('otpVerificationMobile');
      sessionStorage.removeItem('isNewUser');
      
      // In a real app, we'd set authentication state/token here
      navigate('/');
      toast.success("Account created successfully! Welcome to Skawsh.");
      
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout hideFooter={true}>
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center p-4">
          <button
            onClick={() => navigate('/verify-otp')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="mb-8 text-center">
            <img 
              src="/lovable-uploads/f9c8201e-220e-43f1-b1c4-b0fbbdd0fc7a.png" 
              alt="Skawsh Logo" 
              className="w-40 h-auto mx-auto"
            />
            <h1 className="mt-6 text-2xl font-bold text-primary-500">Complete Your Profile</h1>
            <p className="mt-2 text-gray-500">
              Just a few more details to get started
            </p>
          </div>
          
          <div className="w-full max-w-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address <span className="text-gray-400 text-sm">(Optional)</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email address" 
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        We'll never share your email with anyone else.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="referralCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referral Code <span className="text-gray-400 text-sm">(Optional)</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter referral code if you have one" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary-500 hover:bg-primary-600" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Complete Registration"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompleteProfile;
