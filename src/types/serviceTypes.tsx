
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
}

export interface FavoriteService {
  id: string;
  studioId: string;
  studioName: string;
  name: string;
  price: string;
}
