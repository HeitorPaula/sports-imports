// Dados dos produtos - mesma estrutura do arquivo TypeScript original
const products = [
  // Calçados
  {
    id: 'tenis-corrida-nike-1',
    name: 'Tênis de Corrida Nike Air Zoom Pegasus 40',
    description: 'Tênis de corrida com tecnologia Air Zoom para máximo conforto e performance.',
    fullDescription: 'O Nike Air Zoom Pegasus 40 é o tênis perfeito para corredores que buscam conforto e performance. Com a tecnologia Air Zoom no antepé, oferece um retorno de energia responsivo a cada passada. O cabedal em mesh respirável mantém os pés frescos durante os treinos mais intensos. A entressola de espuma React proporciona amortecimento duradouro, enquanto a sola de borracha oferece tração excepcional em diversas superfícies. Ideal para corridas de rua e treinos diários.',
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
    fullDescription: 'O Air Jordan 1 Mid combina o estilo clássico do basquete com tecnologia moderna. Inspirado no tênis original de 1985, mantém todos os elementos que tornaram o Air Jordan um ícone: silhueta distintiva, logo Wings e a sola com padrão circular. O cabedal em couro premium oferece durabilidade e estilo, enquanto a entressola Air-Sole proporciona amortecimento leve. Perfeito tanto para jogos quanto para uso casual, este tênis é uma declaração de estilo atemporal.',
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
    fullDescription: 'O Adidas Ultraboost 22 é projetado para treinos intensos e corridas de longa distância. A tecnologia Boost na entressola oferece retorno de energia excepcional, enquanto o cabedal Primeknit+ se adapta ao formato do pé. O sistema de cadarço com gaiola de suporte proporciona ajuste personalizado e estabilidade. A sola Continental™ Rubber garante tração superior em qualquer superfície. Ideal para atletas que não aceitam limites.',
    price: 1199.99,
    originalPrice: 1499.99,
    discount: 20,
    category: 'Calçados',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 189,
    inStock: true
  },

  // Musculação
  {
    id: 'halter-ajustavel-40kg',
    name: 'Halter Ajustável 40kg PowerTech Pro',
    description: 'Halter ajustável com sistema de travas rápidas e anilhas revestidas.',
    fullDescription: 'O Halter Ajustável PowerTech Pro 40kg é a solução completa para treinos em casa. Com sistema de travas rápidas, permite ajustes de peso de 2,5kg até 40kg por halter. As anilhas são revestidas com borracha premium que protege o piso e reduz ruídos. A empunhadura ergonômica com textura antiderrapante garante pegada segura durante os exercícios. Inclui suporte para armazenamento. Perfeito para treinos de força, hipertrofia e definição muscular.',
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
    fullDescription: 'O Banco Supino ProGym Elite é projetado para atletas sérios. Com 7 posições de inclinação (de -20° a 85°), permite execução de diversos exercícios. Estrutura em aço carbono suporta até 300kg com total segurança. O estofamento em couro sintético de alta densidade proporciona conforto durante treinos longos. Base com design triangular garante estabilidade máxima. Inclui suporte para halteres e sistema de dobramento rápido para economia de espaço.',
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
    fullDescription: 'O Kit Anilhas Olímpicas Iron Master é a escolha profissional para treinos sérios. Inclui barra olímpica de 20kg (220cm) e anilhas de 2,5kg, 5kg, 10kg, 15kg e 20kg, totalizando 100kg. Todas as anilhas possuem furo de 50mm padrão olímpico e são fabricadas em ferro fundido com acabamento premium. A barra possui knurling texturizado para pegada segura e rolamentos de alta qualidade. Ideal para levantamento terra, agachamento, supino e desenvolvimento.',
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
    fullDescription: 'O Tapete Yoga EcoZen é fabricado em TPE 100% ecológico, livre de látex e PVC. Com 6mm de espessura, oferece amortecimento ideal para articulações sensíveis. A superfície texturizada garante aderência excepcional, mesmo com as mãos suadas. Linhas de alinhamento corporal auxiliam no posicionamento correto durante as asanas. Dimensões: 183cm x 61cm. Resistente a odores e fácil limpeza. Inclui alça de transporte. Perfeito para yoga, pilates e meditação.',
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
    fullDescription: 'O ZenBlock é feito de cortiça portuguesa 100% natural e sustentável. Suas propriedades antimicrobianas naturais mantêm a higiene durante a prática. A superfície ligeiramente rugosa oferece aderência perfeita e o material é leve porém resistente. Dimensões ideais: 22,5cm x 15cm x 7,5cm. Auxilia em posturas avançadas, melhora o alinhamento e reduz o risco de lesões. Durável, ecológico e com bordas arredondadas para maior conforto.',
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
    fullDescription: 'A FlexStrap é confeccionada em algodão orgânico 100% certificado, oferecendo máximo conforto e durabilidade. Com 3 metros de comprimento e 3,8cm de largura, proporciona versatilidade total nos exercícios. A fivela de liga metálica permite ajustes precisos e seguros. Ideal para melhorar flexibilidade, auxiliar em posturas desafiadoras e exercícios de reabilitação. Testada para suportar até 150kg. Lavável na máquina e livre de corantes químicos.',
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
    fullDescription: 'A SmartShake Pro revoluciona a preparação de suplementos. Com capacidade de 700ml, possui compartimentos removíveis para pré-treino, BCAA e vitaminas. O sistema de misturador em vórtex elimina grumos completamente. Fabricada em Tritan™ livre de BPA, é resistente a odores e manchas. Tampa com vedação dupla previne vazamentos. Graduação em ml e oz facilita medições precisas. Design ergonômico com alça antiderrapante. Ideal para academia, trabalho e viagens.',
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
    fullDescription: 'O Kit Power oferece treino completo em qualquer lugar. Inclui 5 faixas de látex natural com resistências progressivas (10-50lbs), âncora de porta, alças acolchoadas, presilhas para tornozelo e bolsa de transporte. As faixas são codificadas por cores e podem ser combinadas para resistência até 150lbs. Látex de alta qualidade garante 10.000+ repetições sem desgaste. Manual com 30 exercícios ilustrados incluso. Perfeito para fortalecimento, reabilitação e condicionamento.',
    price: 149.99,
    originalPrice: 229.99,
    discount: 35,
    category: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 445,
    inStock: true
  },
  {
    id: 'luvas-musculacao-protecao',
    name: 'Luvas Musculação Proteção Pro Grip',
    description: 'Luvas de treino com proteção para palma e dedos, material respirável.',
    fullDescription: 'As luvas Pro Grip são desenvolvidas para treinos intensos. Palm pad duplo em couro sintético protege contra calosidades e bolhas. Dedos em material respirável mesh mantêm as mãos secas. Punho com velcro ajustável oferece suporte ideal. Grip antiderrapante na palma melhora pegada em barras e halteres. Design anatômico segue o formato natural das mãos. Costuras reforçadas garantem durabilidade. Disponível em tamanhos P, M, G e GG. Lavável e de secagem rápida.',
    price: 49.99,
    originalPrice: 79.99,
    discount: 38,
    category: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    reviews: 234,
    inStock: true
  },

  // Suplementos
  {
    id: 'whey-protein-concentrado-2kg',
    name: 'Whey Protein Concentrado 2kg Premium',
    description: 'Proteína do soro do leite com 80% de proteína e sabor chocolate belga.',
    fullDescription: 'Whey Protein Premium com 80% de concentração proteica e perfil completo de aminoácidos essenciais. Cada porção (30g) fornece 24g de proteína de alto valor biológico, ideal para recuperação muscular pós-treino. Sabor chocolate belga desenvolvido com cacau importado para experiência sensorial única. Livre de glúten, rico em BCAA naturais e com digestibilidade superior. Dissolução instantânea sem grumos. Embalagem de 2kg rende aproximadamente 66 porções. Certificado por laboratório independente.',
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
    fullDescription: 'Pure Creatine oferece creatina monohidratada 99,9% pura, micronizada para absorção máxima. Cada porção (3g) fornece a dose cientificamente comprovada para aumento de força, potência e volume muscular. Processo de micronização garante dissolução completa sem resíduos. Livre de aditivos, corantes e conservantes. Testada em laboratório para pureza e potência. Embalagem de 300g rende 100 porções. Ideal para modalidades que exigem explosão e força. Combina perfeitamente com whey protein.',
    price: 79.99,
    originalPrice: 119.99,
    discount: 33,
    category: 'Suplementos',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 445,
    inStock: false
  },
  {
    id: 'bcaa-aminoacidos-120caps',
    name: 'BCAA Aminoácidos 2:1:1 120 Cápsulas',
    description: 'Aminoácidos de cadeia ramificada na proporção ideal 2:1:1.',
    fullDescription: 'BCAA 2:1:1 com leucina, isoleucina e valina na proporção cientificamente validada. Cada cápsula contém 500mg de aminoácidos puros, sendo 250mg de leucina, 125mg de isoleucina e 125mg de valina. Previne catabolismo muscular, acelera recuperação e reduz fadiga durante treinos intensos. Cápsulas vegetais de fácil digestão, sem aditivos artificiais. Recomendado consumir antes, durante ou após o treino. Frasco com 120 cápsulas para 30 dias de uso. Produzido em instalações certificadas GMP.',
    price: 89.99,
    originalPrice: 139.99,
    discount: 36,
    category: 'Suplementos',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 234,
    inStock: true
  },

  // Kits
  {
    id: 'kit-home-gym-completo',
    name: 'Kit Home Gym Completo FitMax Pro',
    description: 'Kit completo para academia em casa com equipamentos essenciais.',
    fullDescription: 'O Kit Home Gym FitMax Pro é a solução completa para treinar em casa com qualidade profissional. Inclui: par de halteres ajustáveis (5-25kg cada), banco regulável, kit de faixas elásticas, tapete de exercícios, barra pull-up de porta, corda de pular profissional e AB wheel. Todos os equipamentos são fabricados com materiais premium e testados para durabilidade. Manual de treinos com 50 exercícios e plano de 12 semanas incluso. Ocupa espaço mínimo e transforma qualquer ambiente em academia completa.',
    price: 1999.99,
    originalPrice: 2999.99,
    discount: 33,
    category: 'Kits',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 156,
    inStock: true
  },
  {
    id: 'kit-yoga-iniciante-premium',
    name: 'Kit Yoga Iniciante Premium ZenStarter',
    description: 'Kit completo para começar yoga com equipamentos profissionais.',
    fullDescription: 'O Kit ZenStarter foi desenvolvido especialmente para iniciantes que desejam começar a prática de yoga com equipamentos de qualidade. Inclui: tapete TPE premium 6mm com linhas de alinhamento, 2 blocos de cortiça natural, cinta de algodão orgânico 3m, almofada de meditação zabuton, bolster para relaxamento e bolsa de transporte eco-friendly. Guia completo com 25 posturas fundamentais e sequências para iniciantes. Todos os itens são ecológicos e livres de materiais tóxicos.',
    price: 599.99,
    originalPrice: 899.99,
    discount: 33,
    category: 'Kits',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 289,
    inStock: true
  },
  {
    id: 'kit-corrida-performance',
    name: 'Kit Corrida Performance RunnerPro',
    description: 'Kit essencial para corredores com acessórios de performance.',
    fullDescription: 'O Kit RunnerPro reúne tudo que um corredor sério precisa. Inclui: tênis de corrida premium (numeração sob consulta), garrafa hidratação 600ml com bico esportivo, cinto de hidratação com 2 refis, pulseira GPS monitor cardíaco, meias técnicas antiatrito (3 pares), gel energético sabores variados (10 unidades) e mochila técnica 20L. Todos os produtos são testados por atletas profissionais. Ideal para treinos, corridas de rua e maratonas. Disponível em kits masculino e feminino.',
    price: 1299.99,
    originalPrice: 1799.99,
    discount: 28,
    category: 'Kits',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 123,
    inStock: true
  }
];

// Categorias disponíveis
const categories = ['Todos', 'Calçados', 'Musculação', 'Yoga', 'Acessórios', 'Suplementos', 'Kits'];

// Função para buscar produtos por categoria
function getProductsByCategory(category) {
  if (category === 'Todos') {
    return products;
  }
  return products.filter(product => product.category === category);
}

// Função para buscar produto por ID
function getProductById(id) {
  return products.find(product => product.id === id);
}

// Função para buscar produtos
function searchProducts(searchTerm, category = 'Todos') {
  let filtered = getProductsByCategory(category);
  
  if (searchTerm.trim()) {
    const searchLower = searchTerm.toLowerCase().trim();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.fullDescription.toLowerCase().includes(searchLower)
    );
  }
  
  return filtered;
}