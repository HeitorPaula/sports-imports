import { Shield, Truck, Award, RefreshCw } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Equipamentos Esportivos
            <span className="block text-red-200 mt-2">Importados com Qualidade</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">
            Os melhores produtos para sua jornada fitness, com qualidade internacional e preços acessíveis
          </p>

          {/* Benefícios principais em cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <Truck className="w-10 h-10 mx-auto mb-4 text-white" />
              <h3 className="font-semibold text-lg mb-2">Frete Grátis</h3>
              <p className="text-sm opacity-90">Acima de R$ 200</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <Shield className="w-10 h-10 mx-auto mb-4 text-white" />
              <h3 className="font-semibold text-lg mb-2">Compra Segura</h3>
              <p className="text-sm opacity-90">100% Protegida</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <RefreshCw className="w-10 h-10 mx-auto mb-4 text-white" />
              <h3 className="font-semibold text-lg mb-2">15 Dias</h3>
              <p className="text-sm opacity-90">Para devolução</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <Award className="w-10 h-10 mx-auto mb-4 text-white" />
              <h3 className="font-semibold text-lg mb-2">Qualidade</h3>
              <p className="text-sm opacity-90">Internacional</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}