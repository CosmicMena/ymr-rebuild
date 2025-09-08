// src/data/companyValues.ts
import { Award, Users, Heart, Shield } from 'lucide-react';

export interface CompanyValue {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

export const companyValues: CompanyValue[] = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'We never compromise on quality. Every product we offer meets the highest industrial standards.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Users,
    title: 'Client-Centered Service',
    description: 'Our clients are at the heart of everything we do. We provide personalized solutions and support.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Heart,
    title: 'Sustainability',
    description: 'We are committed to sustainable practices and environmentally responsible solutions.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Shield,
    title: 'Safety & Reliability',
    description: 'Every product is tested and certified to ensure maximum safety and reliability in industrial environments.',
    color: 'from-orange-500 to-orange-600'
  }
];
