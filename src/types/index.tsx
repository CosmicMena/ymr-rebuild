// src/types/index.ts
export type CTAButton = {
  text: string;
  link: string;
  variant?: 'primary' | 'secondary';
};

export type HeroSlide = {
  id: number | string;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttons: CTAButton[];
};

export type AdSlide = {
  id: number | string;
  image: string;
  title: string;
  discount?: string;
  cta?: string;
  link?: string;
  gradient?: string;
};

export type ProductSlide = {
  id: number | string;
  name: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  image: string;
  badge?: string;
};

export type NewsSlide = {
  id: number | string;
  title: string;
  summary: string;
  date: string;
  category: string;
  link: string;
  image: string;
};
