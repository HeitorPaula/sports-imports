import { Shield, Truck, Award, Clock, Star, Headphones } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Qualidade Garantida',
      description: 'Produtos importados dos melhores fornecedores mundiais, com rigoroso controle de qualidade e certificações internacionais.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Truck,
      title: 'Entrega Rápida',
      description: 'Frete grátis em compras acima de R$ 200 e entrega rápida para todo o Brasil com código de rastreamento.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Award,
      title: 'Suporte Premium',
      description: 'Atendimento especializado, 15 dias para devolução e garantia de satisfação ou seu dinheiro de volta.',
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  const stats = [
    { number: '10k+', label: 'Clientes Satisfeitos' },
    { number: '15 dias', label: 'Garantia de Devolução' },
    { number: '4.8★', label: 'Avaliação Média' },
    { number: '24/7', label: 'Suporte Online' }
  ];

  return (
    <section className="bg-card py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Por que escolher a Sports Imports?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Oferecemos produtos de qualidade internacional com a segurança, praticidade e suporte 
            que você precisa para alcançar seus objetivos fitness
          </p>
        </div>

        {/* Features principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className={`w-20 h-20 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-10 h-10" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-red-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção adicional de benefícios */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-background border rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
            <Clock className="w-8 h-8 text-blue-600 mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Entrega Expressa</h4>
            <p className="text-sm text-muted-foreground">
              Receba seus produtos em casa com segurança e rapidez
            </p>
          </div>

          <div className="bg-background border rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
            <Star className="w-8 h-8 text-yellow-600 mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Produtos Avaliados</h4>
            <p className="text-sm text-muted-foreground">
              Todos os produtos são testados e avaliados por nossos clientes
            </p>
          </div>

          <div className="bg-background border rounded-xl p-6 hover:shadow-md transition-shadow duration-300 md:col-span-2 lg:col-span-1">
            <Headphones className="w-8 h-8 text-green-600 mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Suporte Especializado</h4>
            <p className="text-sm text-muted-foreground">
              Nossa equipe está pronta para ajudar com suas dúvidas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}