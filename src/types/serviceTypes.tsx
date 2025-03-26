
import React from 'react';

export interface SubService {
  id: string;
  name: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  subServices: SubService[];
  title?: string;
  services?: Service[];
  count?: number;
  subCategories?: SubCategory[];
}

export interface FavoriteService {
  id: string;
  studioId: string;
  studioName: string;
  name: string;
  price: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price?: number;
  unit?: string;
}

export interface CartItem {
  serviceId: string;
  serviceName: string;
  weight?: number;
  price: number;
  quantity: number; 
  studioId?: string;
  studioName?: string;
  items: {
    name: string;
    quantity: number;
  }[];
  washType?: string;
  serviceCategory?: string;
  serviceSubCategory?: string;
}

export interface IconConfig {
  icon: string;
  color: string;
}

export interface SubCategory {
  title: string;
  icon: React.ReactNode | IconConfig;
  services: Service[];
}
