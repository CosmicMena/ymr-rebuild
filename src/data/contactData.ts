// src/data/contactData.ts
import { Users, Award, Clock } from 'lucide-react';

export interface FAQ {
  question: string;
  answer: string;
}

export interface QuickStat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  color: string;
}

export const contactFaqs: FAQ[] = [
  {
    question: "What types of industrial products do you offer?",
    answer: "We offer a comprehensive range including ladders, construction machinery, cement tools, lubricants & sealants, safety gear, and industrial accessories. Our catalog features over 10,000 products from leading manufacturers worldwide."
  },
  {
    question: "Do you provide delivery services?",
    answer: "Yes, we provide fast and reliable delivery services across Angola. We offer same-day delivery in Luanda and 2-3 day delivery to other provinces. Contact us for specific delivery options and timelines."
  },
  {
    question: "Are your products certified?",
    answer: "All our products meet international quality standards and come with proper certifications and quality guarantees. We work only with certified manufacturers and provide full documentation for all equipment."
  },
  {
    question: "Do you offer bulk pricing for large orders?",
    answer: "Yes, we offer competitive pricing for bulk orders and long-term contracts. Our team can provide customized quotes based on your specific requirements and volume. Contact us for a personalized pricing proposal."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unused items in original packaging. Custom orders and special equipment may have different return terms. Please contact our customer service for specific return policies."
  },
  {
    question: "Do you provide technical support?",
    answer: "Yes, our technical team provides comprehensive support including installation guidance, maintenance tips, and troubleshooting. We also offer training sessions for complex equipment."
  }
];

export const contactQuickStats: QuickStat[] = [
  {
    icon: Users,
    value: "500+",
    label: "Happy Clients",
    color: "text-blue-400"
  },
  {
    icon: Award,
    value: "10+",
    label: "Years Experience",
    color: "text-yellow-400"
  },
  {
    icon: Clock,
    value: "24h",
    label: "Response Time",
    color: "text-green-400"
  }
];
