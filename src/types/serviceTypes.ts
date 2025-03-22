
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
  quantity?: number;
  studioId?: string;
  items: {
    name: string;
    quantity: number;
  }[];
  washType?: string;
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
