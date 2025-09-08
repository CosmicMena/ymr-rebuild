// src/data/aboutData.ts
import { Clock, Users, Building2, Shield } from 'lucide-react';

export interface AboutStat {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const aboutStats: AboutStat[] = [
  { 
    number: '10+', 
    label: 'Years of Experience', 
    icon: Clock 
  },
  { 
    number: '500+', 
    label: 'Satisfied Clients', 
    icon: Users 
  },
  { 
    number: '1000+', 
    label: 'Products Available', 
    icon: Building2 
  },
  { 
    number: '24/7', 
    label: 'Customer Support', 
    icon: Shield 
  }
];
