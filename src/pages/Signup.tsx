
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  mobile: z.string().length(10, { message: "Mobile number must be exactly 10 digits" }),
});

type FormValues = z.infer<typeof formSchema>;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call to check if the number is already registered
      // and then request an OTP
      console.log("Requesting OTP for new user:", values.mobile);
      
      // Simulate server delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store mobile number in sessionStorage for the verification page
      sessionStorage.setItem('otpVerificationMobile', values.mobile);
      sessionStorage.setItem('isNewUser', 'true');
      
      // Navigate to OTP verification page
      navigate('/verify-otp');
      toast.success("OTP sent to your mobile number");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
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
              src="/public/lovable-uploads/f9c8201e-220e-43f1-b1c4-b0fbbdd0fc7a.png" 
              alt="Skawsh Logo" 
              className="w-44 h-auto mx-auto"
            />
            <h1 className="mt-6 text-2xl font-bold text-primary-500">Create an Account</h1>
            <p className="mt-2 text-gray-500">Sign up using mobile OTP verification</p>
          </div>
          
          <div className="w-full max-w-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your 10-digit mobile number" 
                          {...field}
                          type="tel"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          inputMode="numeric"
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
                  {isSubmitting ? "Sending OTP..." : "Get OTP"}
                </Button>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>
                    By continuing, you agree to our{" "}
                    <Link to="/terms" className="text-primary-500 hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary-500 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-primary-500 font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
