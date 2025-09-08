export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  category: string;
}

export const partners: Partner[] = [
  {
    id: '1',
    name: 'Caterpillar',
    logo: '/assets/partners/caterpillar.png',
    website: 'https://www.caterpillar.com',
    description: 'Maquinaria de construção e equipamentos industriais',
    category: 'Maquinaria'
  },
  {
    id: '2',
    name: 'Bosch',
    logo: '/assets/partners/bosch.png',
    website: 'https://www.bosch.com',
    description: 'Ferramentas e equipamentos industriais',
    category: 'Ferramentas'
  },
  {
    id: '3',
    name: '3M',
    logo: '/assets/partners/3m.png',
    website: 'https://www.3m.com',
    description: 'Produtos de segurança e equipamentos de proteção',
    category: 'Segurança'
  },
  {
    id: '4',
    name: 'Hilti',
    logo: '/assets/partners/hilti.png',
    website: 'https://www.hilti.com',
    description: 'Ferramentas profissionais e sistemas de fixação',
    category: 'Ferramentas'
  },
  {
    id: '5',
    name: 'Wacker Neuson',
    logo: '/assets/partners/wacker.png',
    website: 'https://www.wackerneuson.com',
    description: 'Equipamentos de compactação e construção',
    category: 'Maquinaria'
  },
  {
    id: '6',
    name: 'Makita',
    logo: '/assets/partners/makita.png',
    website: 'https://www.makita.com',
    description: 'Ferramentas elétricas profissionais',
    category: 'Ferramentas'
  },
  {
    id: '7',
    name: 'Honeywell',
    logo: '/assets/partners/honeywell.png',
    website: 'https://www.honeywell.com',
    description: 'Equipamentos de segurança e automação',
    category: 'Segurança'
  },
  {
    id: '8',
    name: 'Atlas Copco',
    logo: '/assets/partners/atlas-copco.png',
    website: 'https://www.atlascopco.com',
    description: 'Compressores e equipamentos industriais',
    category: 'Maquinaria'
  },
  {
    id: '9',
    name: 'DeWalt',
    logo: '/assets/partners/dewalt.png',
    website: 'https://www.dewalt.com',
    description: 'Ferramentas elétricas e acessórios',
    category: 'Ferramentas'
  },
  {
    id: '10',
    name: 'Stanley',
    logo: '/assets/partners/stanley.png',
    website: 'https://www.stanleyblackanddecker.com',
    description: 'Ferramentas manuais e equipamentos',
    category: 'Ferramentas'
  },
  {
    id: '11',
    name: 'Ingersoll Rand',
    logo: '/assets/partners/ingersoll-rand.png',
    website: 'https://www.ingersollrand.com',
    description: 'Compressores e ferramentas pneumáticas',
    category: 'Maquinaria'
  },
  {
    id: '12',
    name: 'Lincoln Electric',
    logo: '/assets/partners/lincoln-electric.png',
    website: 'https://www.lincolnelectric.com',
    description: 'Equipamentos de soldagem e corte',
    category: 'Ferramentas'
  }
];
