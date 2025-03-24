
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import StudioProfile from "./pages/StudioProfile";
import StudioReviews from "./pages/StudioReviews";
import StudioAbout from "./pages/StudioAbout";
import Services from "./pages/Services";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Addresses from "./pages/Addresses";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import StudiosByService from "./pages/StudiosByService";
import ScrollToTop from "./components/ScrollToTop";
import Feedback from "./pages/Feedback";
import ReferFriends from "./pages/ReferFriends";
import Support from "./pages/Support";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import AddNewAddress from "./pages/AddNewAddress";
import OrderConfirmation from './pages/OrderConfirmation';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Studio from './pages/Studio';
import { useState, useEffect } from "react";
import RateExperiencePopup from "./components/RateExperiencePopup";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  
  // Check for the rating popup flag whenever the App component mounts or updates
  useEffect(() => {
    const checkForRatingPopup = () => {
      const shouldShowPopup = localStorage.getItem('showRatingPopup') === 'true';
      if (shouldShowPopup) {
        setShowRatingPopup(true);
        // Clear the flag after showing the popup
        localStorage.removeItem('showRatingPopup');
      }
    };
    
    // Check immediately on mount
    checkForRatingPopup();
    
    // Also listen for storage events (in case localStorage changes)
    window.addEventListener('storage', checkForRatingPopup);
    
    return () => {
      window.removeEventListener('storage', checkForRatingPopup);
    };
  }, []);
  
  const handleCloseRatingPopup = () => {
    setShowRatingPopup(false);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index" element={<Index />} />
            <Route path="/studio/:id" element={<StudioProfile />} />
            <Route path="/studio/:id/about" element={<StudioAbout />} />
            <Route path="/studio/:studioId/reviews" element={<StudioReviews />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<StudiosByService />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="/add-new-address" element={<AddNewAddress />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/refer" element={<ReferFriends />} />
            <Route path="/support" element={<Support />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/register-studio" element={<Studio />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Rating Popup */}
          <RateExperiencePopup 
            isOpen={showRatingPopup} 
            onClose={handleCloseRatingPopup} 
          />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
