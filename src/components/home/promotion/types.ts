
export interface Banner {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  buttonColor: string;
  textColor: string;
  image: string;
  serviceId?: string; // Optional service ID to link to specific service
}

export interface PromotionSliderProps {
  banners: Banner[];
}
