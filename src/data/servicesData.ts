// ===== TIPOS =====
import { LucideIcon } from 'lucide-react';
import { Wrench, Zap, Database, Briefcase, Cog, GraduationCap } from 'lucide-react';

export interface LocalService {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  image: string;
  backgroundImage?: string;
  specs?: string;
  price: string;
  duration: string;
  availability: string;
}

export interface AboudService {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  services: string[];
  benefits: string[];
  brands?: string[];
  specialties?: string[];
  certifications?: string[];
  targetAudience: string;
  duration: string;
  certification: string;
}

export interface ServiceStat {
  number: string;
  label: string;
}

// ===== DADOS DOS SERVIÇOS LOCAIS =====
export const localServices: LocalService[] = [
  {
    icon: Database,
    title: 'Tanques de Armazenamento de Óleos Pesados',
    description: 'Aluguer de tanques especializados para armazenamento seguro de óleos pesados com diferentes capacidades e sistemas de monitoramento avançados.',
    features: ['Capacidades de 50m³ a 500m³', 'Sistemas de segurança integrados', 'Monitoramento 24/7', 'Manutenção preventiva incluída', 'Certificação internacional'],
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
    backgroundImage: 'https://ymrindustrial.com/assets/produtos/us.jpg',
    specs: 'Ideal para refinarias, petroquímicas e distribuidoras',
    price: 'A partir de Kz 150,000/mês',
    duration: 'Contratos de 6-24 meses',
    availability: 'Disponível imediatamente'
  },
  {
    icon: Zap,
    title: 'Geradores Industriais Pesados',
    description: 'Aluguer de geradores industriais de alta potência (100kW a 2000kW) para garantir energia contínua e confiável em seus projetos mais exigentes.',
    features: ['Potência de 100kW a 2000kW', 'Consumo otimizado de combustível', 'Operação silenciosa', 'Suporte técnico 24/7', 'Instalação e configuração incluídas'],
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
    backgroundImage: 'https://ymrindustrial.com/assets/produtos/gerador.jpg',
    specs: 'Perfeito para construção, mineração e eventos industriais',
    price: 'A partir de Kz 200,000/mês',
    duration: 'Contratos flexíveis',
    availability: 'Estoque disponível'
  },
  {
    icon: Wrench,
    title: 'Compressores Industriais Pesados',
    description: 'Equipamentos de compressão industrial de última geração para aplicações em projetos de grande escala, com tecnologia avançada e eficiência superior.',
    features: ['Pressão até 350 bar', 'Tecnologia de ponta alemã', 'Baixíssima manutenção', 'Eficiência energética superior', 'Controle remoto disponível'],
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
    backgroundImage: 'https://ymrindustrial.com/assets/produtos/elgi.jpg',
    specs: 'Essencial para petróleo, gás e indústria química',
    price: 'Sob consulta',
    duration: 'Projetos de 3-18 meses',
    availability: 'Agendamento necessário'
  }
];

// ===== DADOS DETALHADOS DA ABOUD CONSULTORIA =====
export const aboudServices: AboudService[] = [
  {
    icon: Briefcase,
    title: 'Representações Comerciais',
    description: 'Representação exclusiva de marcas internacionais líderes em tecnologia para a indústria de petróleo e gás.',
    image: 'https://mobilit.com.br/wp-content/uploads/2021/11/executivos-c-level.jpg',
    services: [
      'Completação e estimulação de poços',
      'Acessórios de revestimento de alta qualidade',
      'Análise e otimização de perfuração',
      'Sensores de fundo de poço',
      'Sistemas de elevação artificial (ESP, BCS)',
      'Equipamentos de pescaria especializados',
      'Medidores de vazão multifásicos',
      'Bombas de jateamento de fundo'
    ],
    brands: ['Fishbones', 'Vulcan', 'Adaga', 'BBM', 'ABBON', 'Novomet'],
    benefits: [
      'Acesso a tecnologia de ponta internacional',
      'Suporte técnico especializado',
      'Preços competitivos no mercado',
      'Garantia de qualidade certificada',
      'Entrega rápida e confiável',
      'Treinamento técnico incluído'
    ],
    targetAudience: 'Operadoras de petróleo e gás, empresas de serviços',
    duration: 'Contratos de longo prazo',
    certification: 'ISO 9001, API, DNV'
  },
  {
    icon: Cog,
    title: 'Engenharia de Poço',
    description: 'Soluções completas em engenharia de poços com profissionais PhD e décadas de experiência internacional.',
    image: 'https://hidrocon.com/wp-content/uploads/2023/06/11122018_Hidrocon_%C2%A9tarsofigueira_0166-1.jpg',
    services: [
      'Perfuração direcional e horizontal',
      'Dimensionamento de colunas de perfuração',
      'Análise de estabilidade de poço',
      'Controle e contenção de areia',
      'Estimulação e fraturamento',
      'Cimentação especializada',
      'Intervenção em poços',
      'Garantia de escoamento'
    ],
    specialties: ['Perfuração Offshore', 'Poços Multilaterais', 'Análise Geomecânica'],
    benefits: [
      'Equipe com PhD em Engenharia de Petróleo',
      'Experiência internacional comprovada',
      'Software de simulação avançado',
      'Relatórios técnicos detalhados',
      'Acompanhamento durante execução',
      'Consultoria pós-projeto'
    ],
    targetAudience: 'Operadoras, empresas de E&P, consultorias',
    duration: 'Projetos de 3-12 meses',
    certification: 'SPE, IADC, API'
  },
  {
    icon: GraduationCap,
    title: 'Treinamento Técnico e Operacional',
    description: 'Programas de capacitação técnica desenvolvidos por especialistas com experiência internacional comprovada.',
    image: 'https://img.freepik.com/fotos-gratis/equipa-de-engenharia-profissional-que-utiliza-software-da-industria-40-numa-fabrica-inteligente_482257-126300.jpg?semt=ais_hybrid&w=740&q=80',
    services: [
      'Perfuração direcional avançada',
      'Operações offshore complexas',
      'Cimentação especializada',
      'Intervenção e workover',
      'Segurança operacional',
      'Análise de dados de perfuração',
      'Geomecânica aplicada',
      'Estimulação de reservatórios'
    ],
    certifications: ['Certificação Internacional', 'Módulos Personalizados', 'Treinamento In-Company'],
    benefits: [
      'Instrutores com experiência internacional',
      'Material didático atualizado',
      'Simulações práticas',
      'Certificação reconhecida',
      'Acompanhamento pós-treinamento',
      'Cursos customizados'
    ],
    targetAudience: 'Engenheiros, técnicos, gestores de E&P',
    duration: 'Cursos de 1-5 dias',
    certification: 'IADC, SPE, Certificação própria'
  }
];

// ===== ESTATÍSTICAS DA ABOUD =====
export const aboudStats: ServiceStat[] = [
  { number: '25+', label: 'Anos de Experiência' },
  { number: '10+', label: 'Marcas Representadas' },
  { number: '200+', label: 'Projetos Executados' },
  { number: '50+', label: 'Profissionais Treinados' }
];

// ===== FUNÇÕES UTILITÁRIAS =====
export const getServiceById = (id: number): LocalService | undefined => {
  return localServices.find(service => service === localServices[id]);
};

export const getAboudServiceById = (id: number): AboudService | undefined => {
  return aboudServices.find(service => service === aboudServices[id]);
};

export const getServicesByCategory = (category: string): LocalService[] => {
  return localServices.filter(service => 
    service.title.toLowerCase().includes(category.toLowerCase()) ||
    service.description.toLowerCase().includes(category.toLowerCase())
  );
};
