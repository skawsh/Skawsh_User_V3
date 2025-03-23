
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
}

export interface CartItem {
  serviceId: string;
  serviceName: string;
  weight?: number;
  price: number;
  quantity: number; // Changed from optional to required
  studioId?: string;
  studioName?: string;
  items: {
    name: string;
    quantity: number;
  }[];
  washType?: string;
  serviceCategory?: string;  // Added to match usage in Cart components
  serviceSubCategory?: string; // Added to match usage in Cart components
}

export interface SubCategory {
  title: string;
  icon: React.ReactNode;
  services: Service[];
}

export interface ServiceCategory {
  title: string;
  icon: React.ReactNode;
  services: Service[];
  count?: number;
  subCategories?: SubCategory[];
}
