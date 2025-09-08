// src/data/cartData.ts

export interface CartItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  cod: string;
  availability: string;
  image: string;
  description: string;
  features: string[];
  rfqId?: string | null;
  status?: string | null;
}

export interface Rfq {
  id: string;
  name: string;
  date: string;
  itemCount: number;
}

export const initialCartItems: CartItem[] = [
  {
    id: 'GEN-750-KW-2024',
    name: 'Gerador Industrial 750kW',
    category: 'Geradores de Energia',
    brand: 'YMR Power Solutions',
    model: 'YMR-750i Pro',
    cod: 'YMR-GEN-750-2024-001',
    availability: 'Em Estoque',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop',
    description: 'Gerador industrial de alta performance com 750kW de potência, ideal para operações offshore e industriais de grande porte. Equipado com tecnologia avançada de controle automático.',
    features: [
      'Potência nominal de 750kW',
      'Motor Caterpillar C32 ACERT',
      'Sistema de controle automático',
      'Proteção IP65',
      'Partida automática em 10 segundos',
      'Tanque de combustível 1200L',
      'Baixo nível de ruído (75 dB)',
      'Certificação ISO 9001'
    ]
  },
  {
    id: 'COMP-AIR-500-2024',
    name: 'Compressor de Ar 500 CFM',
    category: 'Compressores',
    brand: 'Atlas Copco',
    model: 'GA-500VSD',
    cod: 'AC-COMP-500-2024-002',
    availability: 'Disponível',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
    description: 'Compressor de ar industrial com tecnologia VSD para máxima eficiência energética. Ideal para aplicações que requerem ar comprimido de alta qualidade.',
    features: [
      'Capacidade 500 CFM',
      'Pressão máxima 10 bar',
      'Tecnologia VSD',
      'Eficiência energética superior',
      'Baixa manutenção',
      'Controle digital integrado',
      'Filtro de ar de alta eficiência',
      'Garantia de 3 anos'
    ]
  },
  {
    id: 'PUMP-CENT-300-2024',
    name: 'Bomba Centrífuga 300 GPM',
    category: 'Bombas',
    brand: 'Grundfos',
    model: 'CR-300-15',
    cod: 'GF-PUMP-300-2024-003',
    availability: 'Em Estoque',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
    description: 'Bomba centrífuga de alta eficiência para aplicações industriais. Construção em aço inoxidável com vedações mecânicas de longa duração.',
    features: [
      'Vazão 300 GPM',
      'Altura manométrica 150m',
      'Construção em aço inoxidável',
      'Vedações mecânicas Grundfos',
      'Motor IE3 alta eficiência',
      'Operação silenciosa',
      'Fácil manutenção',
      'Certificação ATEX'
    ]
  }
];

export const initialRfqList: Rfq[] = [
  { 
    id: 'RFQ-2024-001', 
    name: 'Projeto Plataforma Alpha', 
    date: '2024-08-15', 
    itemCount: 2 
  },
  { 
    id: 'RFQ-2024-002', 
    name: 'Expansão Refinaria Beta', 
    date: '2024-08-20', 
    itemCount: 1 
  }
];
