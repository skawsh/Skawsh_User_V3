
import React, { useState } from 'react';
import { ArrowLeft, Copy, Share, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';

const ReferFriends: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Example referral code
  const referralCode = "SKAWSH2025";
  const referralLink = `https://skawsh.com/join?ref=${referralCode}`;

  const handleBack = () => {
    navigate('/profile');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard!",
      description: "Your referral code has been copied."
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me on Skawsh!',
          text: `Use my referral code ${referralCode} to get a discount on your first order!`,
          url: referralLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      handleCopyCode();
    }
  };

  const handleEmailInvite = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address."
      });
      return;
    }
    
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Invitation sent!",
        description: `We've sent an invitation to ${email}`
      });
      setIsSending(false);
      setEmail('');
    }, 1500);
  };

  const rewards = [
    { title: "Friend signs up", description: "Your friend gets ₹100 off their first order", amount: "₹0" },
    { title: "First order", description: "When your friend places their first order", amount: "₹100" },
    { title: "Subsequent orders", description: "For each of their next 3 orders", amount: "₹50" }
  ];

  return (
    <Layout hideFooter={true}>
      <div className="section-container bg-white min-h-screen">
        <div className="sticky top-0 pt-2 z-10 bg-white">
          <div className="flex items-center mb-4">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-2"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold">Refer Friends</h1>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card className="overflow-hidden border-none shadow-md">
            <CardContent className="p-6 bg-gradient-to-r from-primary-100 to-primary-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Invite friends & earn rewards</h2>
              <p className="text-sm text-gray-600 mb-4">
                Share your referral code with friends and you both get rewards when they join and order!
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center mt-2">
                <div className="font-bold text-lg tracking-wider text-primary-700">{referralCode}</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCopyCode}
                  className="text-primary-500 hover:text-primary-600"
                >
                  {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                </Button>
              </div>
              
              <div className="flex gap-3 mt-4">
                <Button 
                  className="flex-1 bg-primary-500 hover:bg-primary-600"
                  onClick={handleShare}
                >
                  <Share size={16} className="mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-gray-700">Invite via email</h2>
            <form onSubmit={handleEmailInvite} className="flex gap-2">
              <Input
                type="email"
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
              />
              <Button 
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 whitespace-nowrap"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Invite"}
              </Button>
            </form>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-gray-700">How you earn</h2>
            <div className="space-y-3">
              {rewards.map((reward, index) => (
                <Card key={index} className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800">{reward.title}</h3>
                        <p className="text-xs text-gray-500">{reward.description}</p>
                      </div>
                      <div className="text-lg font-bold text-primary-600">{reward.amount}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReferFriends;
