
export interface LocationOption {
  name: string;
  area: string;
  rating: number;
  time: string;
  distance: string;
  isCurrent?: boolean;
  isNearest?: boolean;
  isClosedForDelivery?: boolean;
}

export interface ServiceSuggestion {
  id: string;
  name: string;
  price: number;
  category?: string;
}
