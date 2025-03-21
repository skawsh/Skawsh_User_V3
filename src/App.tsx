
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import StudiosByService from "./pages/StudiosByService";
import ScrollToTop from "./components/ScrollToTop";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
