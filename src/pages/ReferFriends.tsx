import React, { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Example referral code
  const referralCode = "SKAWSH2025";
  const referralLink = `https://skawsh.com/join?ref=${referralCode}`;

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBack = () => {
    navigate('/profile');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    
    toast("Copied to clipboard! Your referral code has been copied.");
    
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
      toast("Error: Invalid email. Please enter a valid email address.");
      return;
    }
    
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      toast(`Invitation sent! We've sent an invitation to ${email}`);
      setIsSending(false);
      setEmail('');
    }, 1500);
  };

  return (
    <Layout hideFooter={true}>
      <div className="section-container bg-white min-h-screen">
        {/* Sticky header that appears when scrolled */}
        {isScrolled && (
          <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm py-2 px-4 flex items-center">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-3"
              aria-label="Go back to profile"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <span className="font-medium text-gray-800">Refer Friends</span>
          </div>
        )}
        
        <div className={`sticky top-0 z-10 bg-white ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-200`}>
          <div className="flex items-center mb-4 px-4 py-3">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-2"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold">Refer Friends</h1>
          </div>
        </div>
        
        <div className="space-y-6 px-4">
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
        </div>
      </div>
    </Layout>
  );
};

export default ReferFriends;
