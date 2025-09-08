// src/data/userProfileData.ts
import { ShoppingBag, MessageCircle, Package, Star, User } from 'lucide-react';

export interface ActivityStat {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface OrderHistory {
  id: string;
  date: string;
  service: string;
  status: string;
  value: string;
  statusColor: string;
}

export interface RecentActivity {
  action: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const activityStats: ActivityStat[] = [
  { 
    label: 'Pedidos Realizados', 
    value: '24', 
    icon: ShoppingBag, 
    color: 'bg-blue-500' 
  },
  { 
    label: 'Consultorias Solicitadas', 
    value: '8', 
    icon: MessageCircle, 
    color: 'bg-green-500' 
  },
  { 
    label: 'Equipamentos Alugados', 
    value: '12', 
    icon: Package, 
    color: 'bg-purple-500' 
  },
  { 
    label: 'Pontos de Fidelidade', 
    value: '2,340', 
    icon: Star, 
    color: 'bg-yellow-500' 
  }
];

export const orderHistory: OrderHistory[] = [
  {
    id: 'YMR-2024-001',
    date: '2024-08-05',
    service: 'Aluguer Gerador Industrial 500kW',
    status: 'Concluído',
    value: 'Kz 850,000',
    statusColor: 'text-green-600 bg-green-100'
  },
  {
    id: 'YMR-2024-002', 
    date: '2024-07-28',
    service: 'Consultoria Engenharia de Poços',
    status: 'Em Andamento',
    value: 'Kz 1,200,000',
    statusColor: 'text-blue-600 bg-blue-100'
  },
  {
    id: 'YMR-2024-003',
    date: '2024-07-15',
    service: 'Aluguer Compressor 350 Bar',
    status: 'Entregue',
    value: 'Kz 450,000',
    statusColor: 'text-purple-600 bg-purple-100'
  },
  {
    id: 'YMR-2024-004',
    date: '2024-07-10',
    service: 'Treinamento Técnico Offshore',
    status: 'Concluído',
    value: 'Kz 320,000',
    statusColor: 'text-green-600 bg-green-100'
  }
];

export const recentActivities: RecentActivity[] = [
  { 
    action: 'Solicitou orçamento para gerador 750kW',
    time: '2 horas atrás',
    icon: ShoppingBag,
    color: 'text-blue-600'
  },
  {
    action: 'Atualizou informações de perfil',
    time: '1 dia atrás', 
    icon: User,
    color: 'text-green-600'
  },
  {
    action: 'Participou do webinar "Inovações em Perfuração"',
    time: '3 dias atrás',
    icon: Package,
    color: 'text-purple-600'
  },
  {
    action: 'Baixou catálogo de compressores industriais',
    time: '5 dias atrás',
    icon: MessageCircle,
    color: 'text-orange-600'
  },
  {
    action: 'Concluiu treinamento técnico offshore',
    time: '1 semana atrás',
    icon: Star,
    color: 'text-green-600'
  }
];
