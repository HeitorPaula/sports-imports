// Sports Imports - Products Data (Identical to React version)

const products = [
  // CALÇADOS (3 produtos)
  {
    id: '1',
    name: 'Tênis de Corrida Profissional',
    description: 'Tênis de alta performance para corredores exigentes',
    fullDescription: 'Desenvolvido com tecnologia avançada de amortecimento, este tênis oferece máximo conforto e performance para suas corridas. Ideal para treinos diários e competições.',
    price: 199.90,
    originalPrice: 299.90,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1719523677291-a395426c1a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NTU5MzAwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Calçados',
    inStock: true,
    rating: 4.8,
    reviews: 152,
    features: [
      'Amortecimento responsivo',
      'Tecnologia anti-odor',
      'Solado antiderrapante',
      'Design ergonômico'
    ],
    specifications: {
      'Material': 'Mesh respirável + EVA',
      'Peso': '280g (por pé)',
      'Tamanhos': '36-44',
      'Cores': 'Preto, Branco, Azul'
    }
  },
  {
    id: '7',
    name: 'Tênis de Basquete Pro',
    description: 'Tênis de basquete com suporte superior para quadra',
    fullDescription: 'Tênis especialmente desenvolvido para basquete, oferecendo suporte lateral excepcional e amortecimento ideal para saltos e aterrissagens. Perfeito para jogadores de todos os níveis.',
    price: 229.90,
    originalPrice: 349.90,
    discount: 34,
    image: 'https://images.unsplash.com/photo-1623816874982-aab879ea7073?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwc2hvZXMlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NTU5OTE0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Calçados',
    inStock: true,
    rating: 4.9,
    reviews: 89,
    features: [
      'Suporte lateral reforçado',
      'Amortecimento Air',
      'Grip superior',
      'Cano alto para proteção'
    ],
    specifications: {
      'Material': 'Couro sintético + Mesh',
      'Peso': '450g (por pé)',
      'Tamanhos': '36-46',
      'Cores': 'Preto/Vermelho, Branco/Azul'
    }
  },
  {
    id: '8',
    name: 'Chuteira de Campo Society',
    description: 'Chuteira profissional para futebol society',
    fullDescription: 'Chuteira desenvolvida para campos de grama sintética e society, com travas especiais que oferecem tração ideal e controle de bola excepcional.',
    price: 189.90,
    originalPrice: 279.90,
    discount: 32,
    image: 'https://images.unsplash.com/photo-1612387050635-f1f1ae387e64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBjbGVhdHMlMjBmb290YmFsbHxlbnwxfHx8fDE3NTU5OTE0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Calçados',
    inStock: true,
    rating: 4.7,
    reviews: 134,
    features: [
      'Travas de borracha especiais',
      'Controle de bola superior',
      'Material sintético resistente',
      'Ajuste anatômico'
    ],
    specifications: {
      'Material': 'Sintético + Borracha',
      'Peso': '320g (por pé)',
      'Tamanhos': '36-44',
      'Cores': 'Preto/Branco, Azul/Branco'
    }
  },

  // MUSCULAÇÃO (3 produtos)
  {
    id: '2',
    name: 'Kit Halteres Ajustáveis',
    description: 'Set completo de halteres para treino em casa',
    fullDescription: 'Kit profissional de halteres ajustáveis, perfeito para quem quer montar sua academia em casa. Inclui diferentes pesos para exercícios variados.',
    price: 329.90,
    originalPrice: 489.90,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1623874228601-f4193c7b1818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZHVtYmJlbGxzJTIwd2VpZ2h0c3xlbnwxfHx8fDE3NTU5OTA4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Musculação',
    inStock: true,
    rating: 4.9,
    reviews: 89,
    features: [
      'Peso ajustável 2-24kg',
      'Sistema de travamento seguro',
      'Pegada antiderrapante',
      'Armazenamento compacto'
    ],
    specifications: {
      'Material': 'Ferro fundido + Borracha',
      'Peso total': '48kg (par)',
      'Incrementos': '2kg',
      'Garantia': '2 anos'
    }
  },
  {
    id: '9',
    name: 'Set de Halteres Hexagonais',
    description: 'Conjunto de halteres fixos hexagonais profissionais',
    fullDescription: 'Conjunto de halteres hexagonais em diferentes pesos, ideais para treinos funcionais e musculação. Design antiderrapante e formato que não rola.',
    price: 399.90,
    originalPrice: 599.90,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1710746904729-f3ad9f682bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBkdW1iYmVsbHMlMjB3ZWlnaHRzJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NTk5MTQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Musculação',
    inStock: true,
    rating: 4.8,
    reviews: 67,
    features: [
      'Formato hexagonal estável',
      'Pegada texturizada',
      'Não rola no chão',
      'Set completo 5-20kg'
    ],
    specifications: {
      'Material': 'Ferro fundido + Borracha',
      'Pesos': '5kg, 10kg, 15kg, 20kg',
      'Formato': 'Hexagonal',
      'Garantia': '3 anos'
    }
  },
  {
    id: '10',
    name: 'Kettlebell Profissional',
    description: 'Kettlebell de ferro fundido para treino funcional',
    fullDescription: 'Kettlebell profissional em ferro fundido, ideal para treinos funcionais, crossfit e fortalecimento. Pegada confortável e base estável.',
    price: 129.90,
    originalPrice: 189.90,
    discount: 32,
    image: 'https://images.unsplash.com/photo-1544368666-40de09f53bbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXR0bGViZWxsJTIwd29ya291dCUyMGZpdG5lc3N8ZW58MXx8fHwxNzU1OTkxNDYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Musculação',
    inStock: true,
    rating: 4.7,
    reviews: 123,
    features: [
      'Ferro fundido sólido',
      'Pegada anatômica',
      'Base estável',
      'Acabamento premium'
    ],
    specifications: {
      'Material': 'Ferro fundido',
      'Pesos disponíveis': '8kg, 12kg, 16kg, 20kg',
      'Dimensões': 'Standard',
      'Cor': 'Preto fosco'
    }
  },

  // YOGA (3 produtos)
  {
    id: '3',
    name: 'Tapete de Yoga Premium',
    description: 'Tapete antiderrapante para yoga e pilates',
    fullDescription: 'Tapete de yoga de alta qualidade, com superfície antiderrapante e amortecimento ideal para suas práticas de yoga, pilates e alongamento.',
    price: 99.90,
    originalPrice: 149.90,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1746796751590-a8c0f15d4900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0JTIwZXhlcmNpc2V8ZW58MXx8fHwxNzU1OTEyODI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Yoga',
    inStock: true,
    rating: 4.7,
    reviews: 203,
    features: [
      'Superfície antiderrapante',
      'Material eco-friendly',
      'Fácil de limpar',
      'Espessura 6mm'
    ],
    specifications: {
      'Material': 'TPE ecológico',
      'Dimensões': '183cm x 61cm x 6mm',
      'Peso': '1.2kg',
      'Cores': 'Roxo, Rosa, Verde, Azul'
    }
  },
  {
    id: '11',
    name: 'Kit Blocos de Yoga',
    description: 'Set de blocos e acessórios para yoga',
    fullDescription: 'Kit completo com blocos de yoga, alça e cinta para auxiliar nas posturas e aumentar a flexibilidade. Ideal para iniciantes e praticantes avançados.',
    price: 59.90,
    originalPrice: 89.90,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1646239646963-b0b9be56d6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwYmxvY2tzJTIwcHJvcHN8ZW58MXx8fHwxNzU1OTkxNDY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Yoga',
    inStock: true,
    rating: 4.6,
    reviews: 156,
    features: [
      '2 blocos de EVA',
      'Cinta ajustável',
      'Bolsa de transporte',
      'Material hipoalergênico'
    ],
    specifications: {
      'Material': 'EVA de alta densidade',
      'Dimensões blocos': '23x15x7.5cm',
      'Cor': 'Roxo, Azul, Verde',
      'Peso total': '800g'
    }
  },
  {
    id: '12',
    name: 'Bola de Pilates Swiss Ball',
    description: 'Bola suíça profissional para pilates e fisioterapia',
    fullDescription: 'Bola de pilates em PVC antiestouro, ideal para exercícios de equilíbrio, fortalecimento do core e fisioterapia. Inclui bomba de ar.',
    price: 79.90,
    originalPrice: 119.90,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1754257320362-5982d5cd58ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWxhdGVzJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NTk5MTQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Yoga',
    inStock: true,
    rating: 4.8,
    reviews: 98,
    features: [
      'Material antiestouro',
      'Suporta até 300kg',
      'Bomba incluída',
      'Superfície antiderrapante'
    ],
    specifications: {
      'Material': 'PVC anti-burst',
      'Diâmetros': '55cm, 65cm, 75cm',
      'Cor': 'Azul, Rosa, Cinza',
      'Garantia': '1 ano'
    }
  },

  // ACESSÓRIOS (3 produtos)
  {
    id: '4',
    name: 'Faixas Elásticas de Resistência',
    description: 'Kit com 5 faixas de diferentes resistências',
    fullDescription: 'Conjunto completo de faixas elásticas para treino funcional. Ideal para fortalecimento, reabilitação e exercícios de resistência em casa ou na academia.',
    price: 59.90,
    originalPrice: 89.90,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpc3RhbmNlJTIwYmFuZHMlMjBmaXRuZXNzfGVufDF8fHx8MTc1NTk1MTU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Acessórios',
    inStock: true,
    rating: 4.6,
    reviews: 127,
    features: [
      '5 níveis de resistência',
      'Material natural látex',
      'Alças confortáveis',
      'Âncora para porta incluída'
    ],
    specifications: {
      'Material': 'Látex natural',
      'Resistências': '4-6kg, 6-8kg, 9-11kg, 11-16kg, 16-20kg',
      'Comprimento': '120cm',
      'Garantia': '1 ano'
    }
  },
  {
    id: '13',
    name: 'Rolo de Massagem Foam Roller',
    description: 'Rolo de liberação miofascial para recuperação muscular',
    fullDescription: 'Rolo de massagem profissional para liberação miofascial, ideal para recuperação pós-treino, alívio de tensões musculares e melhora da mobilidade.',
    price: 49.90,
    originalPrice: 79.90,
    discount: 37,
    image: 'https://images.unsplash.com/photo-1591741535585-9c4f52b3f13f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2FtJTIwcm9sbGVyJTIwZml0bmVzc3xlbnwxfHx8fDE3NTU5OTE0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Acessórios',
    inStock: true,
    rating: 4.7,
    reviews: 89,
    features: [
      'Densidade média ideal',
      'Superfície texturizada',
      'Material EVA resistente',
      'Núcleo oco ultra-leve'
    ],
    specifications: {
      'Material': 'EVA + PVC',
      'Dimensões': '33cm x 14cm',
      'Peso': '650g',
      'Cores': 'Preto, Azul, Rosa'
    }
  },
  {
    id: '14',
    name: 'Kit Toalha + Garrafa Térmica',
    description: 'Set essencial para treino com toalha e garrafa',
    fullDescription: 'Kit completo para seus treinos com toalha de microfibra absorvente e garrafa térmica que mantém a temperatura por até 12 horas.',
    price: 44.90,
    originalPrice: 69.90,
    discount: 36,
    image: 'https://images.unsplash.com/photo-1592999641298-434e28c11d14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB0b3dlbCUyMHdhdGVyJTIwYm90dGxlfGVufDF8fHx8MTc1NTk5MTQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Acessórios',
    inStock: true,
    rating: 4.5,
    reviews: 234,
    features: [
      'Toalha microfibra 40x80cm',
      'Garrafa térmica 750ml',
      'Isolamento duplo parede',
      'Livre de BPA'
    ],
    specifications: {
      'Toalha': 'Microfibra 80% poliéster',
      'Garrafa': 'Aço inox 304',
      'Capacidade': '750ml',
      'Cores': 'Preto, Azul, Rosa'
    }
  },

  // SUPLEMENTOS (3 produtos)
  {
    id: '5',
    name: 'Garrafa Shaker Proteína',
    description: 'Coqueteleira com misturador para suplementos',
    fullDescription: 'Garrafa shaker profissional com sistema de mistura eficiente. Perfeita para preparar seus shakes de proteína, pré-treino e outros suplementos.',
    price: 24.90,
    originalPrice: 39.90,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1595002754613-a457cea51c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwc2hha2VyJTIwYm90dGxlfGVufDF8fHx8MTc1NTkyNTc2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Suplementos',
    inStock: true,
    rating: 4.5,
    reviews: 95,
    features: [
      'Sistema de mistura avançado',
      'Livre de BPA',
      'Tampa à prova de vazamentos',
      'Escala de medição'
    ],
    specifications: {
      'Capacidade': '600ml',
      'Material': 'Plástico livre de BPA',
      'Dimensões': '25cm x 9cm',
      'Cores': 'Preto, Transparente, Azul'
    }
  },
  {
    id: '15',
    name: 'Whey Protein Concentrado',
    description: 'Proteína isolada premium para ganho muscular',
    fullDescription: 'Whey Protein de alta qualidade com 25g de proteína por dose. Ideal para recuperação muscular pós-treino e ganho de massa magra.',
    price: 99.90,
    originalPrice: 159.90,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1693996045369-781799bbaea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGV5JTIwcHJvdGVpbiUyMHBvd2RlciUyMHN1cHBsZW1lbnR8ZW58MXx8fHwxNzU1OTkxNDcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Suplementos',
    inStock: true,
    rating: 4.8,
    reviews: 456,
    features: [
      '25g proteína por dose',
      'Rápida absorção',
      'Rico em aminoácidos',
      'Sabor premium'
    ],
    specifications: {
      'Peso líquido': '900g',
      'Porções': '30 doses',
      'Proteína por dose': '25g',
      'Sabores': 'Chocolate, Morango, Baunilha'
    }
  },
  {
    id: '16',
    name: 'Creatina Monohidratada',
    description: 'Creatina pura para performance e força',
    fullDescription: 'Creatina monohidratada micronizada de alta pureza. Aumenta força, potência muscular e acelera a recuperação entre séries.',
    price: 59.90,
    originalPrice: 89.90,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1693996046514-0406d0773a7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjcmVhdGluZSUyMHN1cHBsZW1lbnQlMjBmaXRuZXNzfGVufDF8fHx8MTc1NTk5MTQ3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Suplementos',
    inStock: true,
    rating: 4.9,
    reviews: 289,
    features: [
      '99.9% pura',
      'Micronizada',
      'Sem sabor',
      'Dissolução rápida'
    ],
    specifications: {
      'Peso líquido': '300g',
      'Porções': '100 doses',
      'Dose recomendada': '3g',
      'Pureza': '99.9%'
    }
  },

  // KITS (3 produtos)
  {
    id: '6',
    name: 'Kit Equipamentos Fitness',
    description: 'Kit completo para treino funcional em casa',
    fullDescription: 'Kit completo com diversos equipamentos para montagem de sua academia em casa. Inclui tudo que você precisa para treinos funcionais variados.',
    price: 259.90,
    originalPrice: 399.90,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1677417281771-2a861ce553ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBlcXVpcG1lbnQlMjBmaXRuZXNzfGVufDF8fHx8MTc1NTk1NzM3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Kits',
    inStock: true,
    rating: 4.8,
    reviews: 64,
    features: [
      'Corda de pular premium',
      'Elásticos de resistência',
      'Discos deslizantes',
      'Manual de exercícios'
    ],
    specifications: {
      'Itens inclusos': '12 peças',
      'Material': 'Diversos (látex, PVC, aço)',
      'Peso total': '3.5kg',
      'Bolsa de transporte': 'Incluída'
    }
  },
  {
    id: '17',
    name: 'Kit Mochila Esportiva Premium',
    description: 'Mochila esportiva com compartimentos especiais',
    fullDescription: 'Mochila esportiva premium com múltiplos compartimentos, incluindo espaço para tênis, roupas úmidas e acessórios. Ideal para academia e viagens.',
    price: 119.90,
    originalPrice: 179.90,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1663791088119-07535b0fafeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBiYWclMjBzcG9ydHMlMjBiYWNrcGFja3xlbnwxfHx8fDE3NTU5OTE0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Kits',
    inStock: true,
    rating: 4.6,
    reviews: 178,
    features: [
      'Compartimento para tênis',
      'Bolso para roupas úmidas',
      'Porta garrafa lateral',
      'Material impermeável'
    ],
    specifications: {
      'Capacidade': '35L',
      'Material': 'Nylon 1000D',
      'Dimensões': '50x35x20cm',
      'Cores': 'Preto, Azul, Cinza'
    }
  },
  {
    id: '18',
    name: 'Kit Luvas + Munhequeiras',
    description: 'Set de proteção completo para treino',
    fullDescription: 'Kit completo de proteção com luvas de treino acolchoadas e munhequeiras de suporte. Essencial para treinos de musculação e crossfit.',
    price: 49.90,
    originalPrice: 79.90,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1561532325-7d5231a2dede?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrb3V0JTIwZ2xvdmVzJTIwZml0bmVzc3xlbnwxfHx8fDE3NTU5OTE0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Kits',
    inStock: true,
    rating: 4.4,
    reviews: 145,
    features: [
      'Luvas com proteção palmar',
      'Munhequeiras ajustáveis',
      'Material respirável',
      'Velcro resistente'
    ],
    specifications: {
      'Material': 'Neoprene + Couro sintético',
      'Tamanhos': 'P, M, G, GG',
      'Kit inclui': '1 par luvas + 1 par munhequeiras',
      'Cores': 'Preto, Azul'
    }
  }
];

const categories = [
  'Todos',
  'Calçados',
  'Musculação',
  'Yoga',
  'Acessórios',
  'Suplementos',
  'Kits'
];

// Export to global scope
window.products = products;
window.categories = categories;