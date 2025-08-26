// Sports Imports - Products Data

const PRODUCTS = [
  // Calçados
  {
    id: 'tenis-corrida-nike-1',
    name: 'Tênis de Corrida Nike Air Zoom Pegasus 40',
    description: 'Tênis de corrida com tecnologia Air Zoom para máximo conforto e performance.',
    fullDescription: 'O Nike Air Zoom Pegasus 40 é o tênis perfeito para corredores que buscam conforto e performance. Com a tecnologia Air Zoom no antepé, oferece um retorno de energia responsivo a cada passada. A parte superior em mesh respirável mantém os pés frescos durante treinos intensos.',
    price: 799.99,
    originalPrice: 999.99,
    discount: 20,
    category: 'Calçados',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 324,
    inStock: true
  },
  {
    id: 'tenis-basketball-jordan-1',
    name: 'Tênis Basketball Air Jordan 1 Mid',
    description: 'Tênis de basquete clássico com design icônico e tecnologia moderna.',
    fullDescription: 'O Air Jordan 1 Mid combina o estilo clássico do basquete com tecnologia moderna. Inspirado no tênis original de 1985, mantém todos os elementos que tornaram o Air Jordan um ícone. Construção premium com couro genuíno e solado de borracha durável.',
    price: 899.99,
    originalPrice: 1199.99,
    discount: 25,
    category: 'Calçados',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 256,
    inStock: true
  },
  {
    id: 'tenis-training-adidas-1',
    name: 'Tênis Training Adidas Ultraboost 22',
    description: 'Tênis de treino com tecnologia Boost para energia infinita.',
    fullDescription: 'O Adidas Ultraboost 22 é projetado para treinos intensos e corridas de longa distância. A tecnologia Boost na entressola oferece retorno de energia excepcional, enquanto o upper Primeknit+ se adapta ao formato do pé.',
    price: 1199.99,
    originalPrice: 1499.99,
    discount: 20,
    category: 'Calçados',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 189,
    inStock: true
  },
  {
    id: 'chuteira-society-nike',
    name: 'Chuteira Society Nike Mercurial Vapor',
    description: 'Chuteira para campo society com tecnologia de velocidade.',
    fullDescription: 'A Nike Mercurial Vapor foi desenvolvida para jogadores que valorizam velocidade e agilidade. Com solado específico para society e upper sintético de alta qualidade.',
    price: 449.99,
    originalPrice: 599.99,
    discount: 25,
    category: 'Calçados',
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 178,
    inStock: true
  },
  {
    id: 'tenis-caminhada-asics',
    name: 'Tênis Caminhada Asics Gel-Nimbus 25',
    description: 'Tênis para caminhada com máximo amortecimento e conforto.',
    fullDescription: 'O Asics Gel-Nimbus 25 oferece amortecimento superior com tecnologia GEL no calcanhar e antepé. Ideal para caminhadas longas e corridas leves.',
    price: 649.99,
    originalPrice: 849.99,
    discount: 24,
    category: 'Calçados',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 212,
    inStock: true
  },
  {
    id: 'tenis-skate-vans',
    name: 'Tênis Skate Vans Old Skool Classic',
    description: 'Tênis clássico para skate com durabilidade e estilo.',
    fullDescription: 'O Vans Old Skool é um ícone do skate. Com upper em canvas e camurça, oferece durabilidade e grip excepcional. Solado waffle para máxima aderência.',
    price: 329.99,
    originalPrice: 429.99,
    discount: 23,
    category: 'Calçados',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviews: 445,
    inStock: true
  },

  // Musculação
  {
    id: 'halter-ajustavel-40kg',
    name: 'Halter Ajustável 40kg PowerTech Pro',
    description: 'Halter ajustável com sistema de travas rápidas e anilhas revestidas.',
    fullDescription: 'O Halter Ajustável PowerTech Pro 40kg é a solução completa para treinos em casa. Com sistema de travas rápidas, permite ajustes de peso de 2,5kg até 40kg por halter. Anilhas com revestimento emborrachado para proteção.',
    price: 899.99,
    originalPrice: 1299.99,
    discount: 31,
    category: 'Musculação',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 143,
    inStock: true
  },
  {
    id: 'banco-supino-regulavel',
    name: 'Banco Supino Regulável ProGym Elite',
    description: 'Banco multifuncional com 7 posições de inclinação e suporte até 300kg.',
    fullDescription: 'O Banco Supino ProGym Elite é projetado para atletas sérios. Com 7 posições de inclinação (de -20° a 85°), permite execução de diversos exercícios. Estrutura reforçada suporta até 300kg.',
    price: 1499.99,
    originalPrice: 1999.99,
    discount: 25,
    category: 'Musculação',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 97,
    inStock: true
  },
  {
    id: 'kit-anilhas-olimpicas-100kg',
    name: 'Kit Anilhas Olímpicas 100kg Iron Master',
    description: 'Conjunto completo de anilhas olímpicas com barra 20kg incluída.',
    fullDescription: 'O Kit Anilhas Olímpicas Iron Master é a escolha profissional para treinos sérios. Inclui barra olímpica de 20kg (220cm) e anilhas totalizando 100kg. Acabamento em ferro fundido de alta qualidade.',
    price: 1899.99,
    originalPrice: 2499.99,
    discount: 24,
    category: 'Musculação',
    image: 'https://images.unsplash.com/photo-1534368420009-621bea9deb8d?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 234,
    inStock: true
  },

  // Yoga
  {
    id: 'tapete-yoga-premium-6mm',
    name: 'Tapete Yoga Premium TPE 6mm EcoZen',
    description: 'Tapete de yoga ecológico com aderência superior e alinhamento corporal.',
    fullDescription: 'O Tapete Yoga EcoZen é fabricado em TPE 100% ecológico, livre de látex e PVC. Com 6mm de espessura, oferece amortecimento ideal para articulações sensíveis. Linhas de alinhamento auxiliam na postura correta.',
    price: 199.99,
    originalPrice: 299.99,
    discount: 33,
    category: 'Yoga',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 456,
    inStock: true
  },
  {
    id: 'bloco-yoga-cortica',
    name: 'Bloco Yoga Cortiça Natural ZenBlock',
    description: 'Bloco de yoga em cortiça 100% natural para apoio e alinhamento.',
    fullDescription: 'O ZenBlock é feito de cortiça portuguesa 100% natural e sustentável. Suas propriedades antimicrobianas naturais mantêm a higiene durante a prática. Densidade ideal para suporte firme.',
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    category: 'Yoga',
    image: 'https://images.unsplash.com/photo-1506629905607-45781842d5b8?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 189,
    inStock: true
  },
  {
    id: 'cinta-yoga-algodao-3m',
    name: 'Cinta Yoga Algodão Orgânico 3m FlexStrap',
    description: 'Cinta de yoga em algodão orgânico com fivela de metal resistente.',
    fullDescription: 'A FlexStrap é confeccionada em algodão orgânico 100% certificado, oferecendo máximo conforto e durabilidade. Com 3 metros de comprimento e 3,8cm de largura, permite diversos alongamentos.',
    price: 59.99,
    originalPrice: 89.99,
    discount: 33,
    category: 'Yoga',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 267,
    inStock: true
  },

  // Acessórios
  {
    id: 'garrafa-shaker-700ml-smart',
    name: 'Garrafa Shaker 700ml SmartShake Pro',
    description: 'Garrafa shaker inteligente com compartimentos e misturador de vórtex.',
    fullDescription: 'A SmartShake Pro revoluciona a preparação de suplementos. Com capacidade de 700ml, possui compartimentos removíveis para pré-treino, BCAA e vitaminas. Sistema de mistura por vórtex garante dissolução perfeita.',
    price: 79.99,
    originalPrice: 119.99,
    discount: 33,
    category: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviews: 334,
    inStock: true
  },
  {
    id: 'faixa-elastica-kit-resistencia',
    name: 'Kit Faixas Elásticas Resistência Total Power',
    description: 'Kit completo com 5 faixas de resistência e acessórios para treino funcional.',
    fullDescription: 'O Kit Power oferece treino completo em qualquer lugar. Inclui 5 faixas de látex natural com resistências progressivas (10-50lbs), alças acolchoadas, âncora de porta e bolsa de transporte.',
    price: 149.99,
    originalPrice: 229.99,
    discount: 35,
    category: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 445,
    inStock: true
  },

  // Suplementos
  {
    id: 'whey-protein-concentrado-2kg',
    name: 'Whey Protein Concentrado 2kg Premium',
    description: 'Proteína do soro do leite com 80% de proteína e sabor chocolate belga.',
    fullDescription: 'Whey Protein Premium com 80% de concentração proteica e perfil completo de aminoácidos essenciais. Cada porção (30g) fornece 24g de proteína de alto valor biológico. Sabor chocolate belga irresistível.',
    price: 189.99,
    originalPrice: 249.99,
    discount: 24,
    category: 'Suplementos',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 789,
    inStock: true
  },
  {
    id: 'creatina-monohidratada-300g',
    name: 'Creatina Monohidratada 300g Pure Creatine',
    description: 'Creatina 100% pura, micronizada para absorção otimizada.',
    fullDescription: 'Pure Creatine oferece creatina monohidratada 99,9% pura, micronizada para absorção máxima. Cada porção (3g) fornece a dose cientificamente comprovada para aumento de força e massa muscular.',
    price: 79.99,
    originalPrice: 119.99,
    discount: 33,
    category: 'Suplementos',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 445,
    inStock: false
  },

  // Kits
  {
    id: 'kit-home-gym-completo',
    name: 'Kit Home Gym Completo FitMax Pro',
    description: 'Kit completo para academia em casa com equipamentos essenciais.',
    fullDescription: 'O Kit Home Gym FitMax Pro é a solução completa para treinar em casa com qualidade profissional. Inclui: par de halteres ajustáveis (até 24kg cada), banco regulável, kit de faixas elásticas, tapete de exercícios e manual de treinos.',
    price: 1999.99,
    originalPrice: 2999.99,
    discount: 33,
    category: 'Kits',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 156,
    inStock: true
  }
];

window.PRODUCTS = PRODUCTS;