import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Trash2, ShoppingBag, ChevronRight, AlertTriangle, ChevronLeft, MapPin, Clock, Minus, Plus, Edit, Tag, Package, CheckCircle2, Shirt, Footprints, PlusCircle, Info, File, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import Button from '../components/ui-elements/Button';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from '@/components/ui/scroll-area';
import ServiceCard from '../components/home/ServiceCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const formatIndianRupee = (amount: number): string => {
  return `₹${amount.toFixed(0)}`;
};

const formatDecimal = (value: number): number => {
  return Math.round(value * 10) / 10;
};

interface CartItem {
  serviceId: string;
  serviceName: string;
  studioId: string;
  price: number;
  quantity?: number;
  weight?: number;
  items?: {
    name: string;
    quantity: number;
  }[];
  isExpress?: boolean;
  serviceCategory?: string;
  serviceSubCategory?: string;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    toast
  } = useToast();
  const [specialInstructions, setSpecialInstructions] = useState<string[]>([]);
  const [newInstruction, setNewInstruction] = useState('');
  const [showInstructionsInput, setShowInstructionsInput] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const studioId = location.state?.studioId || null;
  const previousPath = location.state?.previousPath || "/";
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [flickerActive, setFlickerActive] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleBackNavigation = () => {
    if (previousPath) {
      navigate(previousPath);
    } else {
      navigate(-1); // Fallback to the browser's default back behavior
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollY = window.scrollY;
        setIsHeaderSticky(scrollY > 10);
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      try {
        const parsedItems = JSON.parse(storedCartItems);
        const filteredItems = studioId ? parsedItems.filter((item: CartItem) => !studioId || item.studioId === studioId) : parsedItems;
        const categorizedItems = filteredItems.map((item: CartItem) => {
          let serviceCategory = '';
          let serviceSubCategory = '';
          if (item.serviceId.includes('wash') || item.serviceId.includes('iron') || item.serviceId === '1' || item.serviceId === '2' || item.serviceId === '3' || item.serviceId === '4' || item.serviceId === 'wash-iron-1') {
            serviceCategory = 'Core Laundry Services';
          } else if (item.serviceId.includes('dry-upper')) {
            serviceCategory = 'Dry Cleaning Services';
            serviceSubCategory = 'Upper Wear';
          } else if (item.serviceId.includes('dry-bottom')) {
            serviceCategory = 'Dry Cleaning Services';
            serviceSubCategory = 'Bottom Wear';
          } else if (item.serviceId.includes('dry-ethnic')) {
            serviceCategory = 'Dry Cleaning Services';
            serviceSubCategory = 'Ethnic Wear';
          } else if (item.serviceId.includes('shoe')) {
            serviceCategory = 'Shoe Laundry Services';
          } else if (item.serviceId === 'stain-protection' || item.serviceId === 'premium-detergent') {
            serviceCategory = 'Additional Services';
          }
          return {
            ...item,
            serviceCategory,
            serviceSubCategory
          };
        });
        setCartItems(categorizedItems);
        console.log('Cart items loaded:', categorizedItems);
      } catch (error) {
        console.error('Error parsing cart items:', error);
        setCartItems([]);
      }
    }
  }, [studioId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let flickerTimer: NodeJS.Timeout;
    if (isOrderSummaryOpen) {
      setFlickerActive(true);
      setTimeout(() => setFlickerActive(false), 500);
      flickerTimer = setInterval(() => {
        setFlickerActive(true);
        setTimeout(() => setFlickerActive(false), 500);
      }, 5000);
    }
    return () => {
      if (flickerTimer) clearInterval(flickerTimer);
    };
  }, [isOrderSummaryOpen]);

  const services = [{
    id: 'wash-fold-1',
    title: 'Wash & Fold',
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 99,
    studioId: studioId || '',
    serviceCategory: 'Core Laundry Services'
  }, {
    id: 'wash-iron-1',
    title: 'Wash & Iron',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 129,
    studioId: studioId || '',
    serviceCategory: 'Core Laundry Services'
  }, {
    id: 'iron-only-1',
    title: 'Iron Only',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 79,
    studioId: studioId || '',
    serviceCategory: 'Core Laundry Services'
  }, {
    id: 'dry-upper-1',
    title: 'Shirts',
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 149,
    studioId: studioId || '',
    serviceCategory: 'Dry Cleaning Services',
    serviceSubCategory: 'Upper Wear'
  }, {
    id: 'dry-upper-2',
    title: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 129,
    studioId: studioId || '',
    serviceCategory: 'Dry Cleaning Services',
    serviceSubCategory: 'Upper Wear'
  }, {
    id: 'dry-bottom-1',
    title: 'Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 159,
    studioId: studioId || '',
    serviceCategory: 'Dry Cleaning Services',
    serviceSubCategory: 'Bottom Wear'
  }, {
    id: 'dry-bottom-2',
    title: 'Trousers',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 139,
    studioId: studioId || '',
    serviceCategory: 'Dry Cleaning Services',
    serviceSubCategory: 'Bottom Wear'
  }, {
    id: 'dry-ethnic-1',
    title: 'Saree',
    image: 'https://images.unsplash.com/photo-1610189185762-6eb7e639603f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 249,
    studioId: studioId || '',
    serviceCategory: 'Dry Cleaning Services',
    serviceSubCategory: 'Ethnic Wear'
  }, {
    id: 'shoe-laundry-1',
    title: 'Sneakers',
    icon: <Footprints size={24} />,
    price: 129,
    studioId: studioId || '',
    serviceCategory: 'Shoe Laundry Services'
  }, {
    id: 'shoe-laundry-2',
    title: 'Formal Shoes',
    icon: <Footprints size={24} />,
    price: 149,
    studioId: studioId || '',
    serviceCategory: 'Shoe Laundry Services'
  }, {
    id: 'stain-protection',
    title: 'Stain Protection',
    description: 'Add extra protection against stains',
    price: 99,
    studioId: studioId || '',
    serviceCategory: 'Additional Services'
  }, {
    id: 'premium-detergent',
    title: 'Premium Detergent',
    description: 'Use premium quality detergent',
    price: 49,
    studioId: studioId || '',
    serviceCategory: 'Additional Services'
  }];



