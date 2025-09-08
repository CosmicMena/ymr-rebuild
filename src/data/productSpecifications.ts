// src/data/productSpecifications.ts

export interface Specification {
  label: string;
  value: string;
}

export interface SpecificationCategory {
  category: string;
  specs: Specification[];
}

export const productSpecifications: SpecificationCategory[] = [
  { 
    category: 'Potência', 
    specs: [
      { label: 'Potência Nominal', value: '750 kW' },
      { label: 'Potência Máxima', value: '825 kW' },
      { label: 'Tensão', value: '380V / 440V' },
      { label: 'Frequência', value: '50/60 Hz' },
      { label: 'Fator de Potência', value: '0.8' }
    ]
  },
  { 
    category: 'Motor', 
    specs: [
      { label: 'Marca', value: 'Caterpillar' },
      { label: 'Modelo', value: 'C32 ACERT' },
      { label: 'Cilindros', value: '12' },
      { label: 'Aspiração', value: 'Turboalimentado' },
      { label: 'Combustível', value: 'Diesel' }
    ]
  },
  { 
    category: 'Dimensões', 
    specs: [
      { label: 'Comprimento', value: '6.2 m' },
      { label: 'Largura', value: '2.1 m' },
      { label: 'Altura', value: '2.8 m' },
      { label: 'Peso', value: '8.500 kg' },
      { label: 'Tanque', value: '1.200 L' }
    ]
  },
  { 
    category: 'Operação', 
    specs: [
      { label: 'Nível de Ruído', value: '75 dB(A)' },
      { label: 'Consumo', value: '180 L/h' },
      { label: 'Autonomia', value: '6.7 horas' },
      { label: 'Temperatura Op.', value: '-20°C a +50°C' },
      { label: 'Partida', value: 'Automática' }
    ]
  }
];
