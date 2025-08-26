import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Dumbbell } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre a loja */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-600 p-2 rounded-lg">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold">Sports Imports</h3>
                <p className="text-sm text-gray-400">Equipamentos Esportivos</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Especializada em produtos esportivos importados de alta qualidade. 
              Transformamos sua jornada fitness com equipamentos profissionais e atendimento especializado.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800 text-gray-300 hover:text-white">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800 text-gray-300 hover:text-white">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800 text-gray-300 hover:text-white">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Links úteis */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Links Úteis</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Rastreamento</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Categorias</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Calçados Esportivos</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Equipamentos de Musculação</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Yoga e Pilates</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Acessórios Fitness</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Suplementos</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Kits Completos</a></li>
            </ul>
          </div>

          {/* Contato e newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contato</h4>
            <div className="space-y-3 text-sm text-gray-300 mb-6">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>contato@sportsimports.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3 text-white">Newsletter</h5>
              <p className="text-xs text-gray-400 mb-3">
                Receba ofertas exclusivas e novidades diretamente no seu email
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Seu e-mail" 
                  className="bg-gray-800 border-gray-700 text-white text-sm placeholder:text-gray-400 focus:border-red-500"
                />
                <Button className="bg-red-600 hover:bg-red-700 text-white font-medium">
                  OK
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="text-center md:text-left">
            <p>&copy; 2025 Sports Imports. Todos os direitos reservados.</p>
            <p className="text-xs mt-1">
              Produtos importados • Devolução em 15 dias • Qualidade garantida • CNPJ: 00.000.000/0001-00
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm">Formas de pagamento:</span>
            <div className="flex gap-2">
              <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                PIX
              </div>
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                Cartão
              </div>
              <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium">
                Boleto
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}