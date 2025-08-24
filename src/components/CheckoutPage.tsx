import { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle, MapPin, User, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useCart } from '../hooks/useCart';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface CheckoutPageProps {
  onBack: () => void;
}

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { cart, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const shippingCost = cart.total >= 200 ? 0 : 15.90;
  const finalTotal = cart.total + shippingCost;

  const steps = [
    { id: 1, title: 'Dados Pessoais', icon: User },
    { id: 2, title: 'Endereço', icon: MapPin },
    { id: 3, title: 'Pagamento', icon: CreditCard }
  ];

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    return customerData.name && customerData.email && customerData.phone && customerData.cpf;
  };

  const validateStep2 = () => {
    return customerData.cep && customerData.address && customerData.number && 
           customerData.neighborhood && customerData.city && customerData.state;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) {
      toast.error('Preencha todos os campos obrigatórios!');
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      toast.error('Preencha todos os campos do endereço!');
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishOrder = () => {
    if (!validateStep1() || !validateStep2() || !paymentMethod) {
      toast.error('Verifique todos os dados antes de finalizar!');
      return;
    }

    // Simulação do processo de pedido
    const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    toast.success(
      `🎉 Pedido #${orderNumber} realizado com sucesso! Você receberá as instruções de pagamento por email.`,
      { duration: 5000 }
    );
    
    // Limpar carrinho e voltar
    clearCart();
    onBack();
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-lg shadow-sm max-w-md">
          <h2 className="text-xl font-semibold mb-4">Carrinho Vazio</h2>
          <p className="text-gray-600 mb-6">Adicione produtos ao carrinho para continuar.</p>
          <Button onClick={onBack} className="bg-red-600 hover:bg-red-700">
            Voltar às Compras
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da página */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Finalizar Compra</h1>
              <p className="text-sm text-gray-600">Secure checkout • {cart.itemCount} itens</p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de progresso */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-3 ${
                  currentStep >= step.id ? 'text-red-600' : 'text-gray-400'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep > step.id 
                      ? 'bg-red-600 border-red-600 text-white' 
                      : currentStep === step.id
                        ? 'border-red-600 text-red-600'
                        : 'border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="font-medium hidden sm:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-red-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {currentStep === 1 && <><User className="w-5 h-5 text-red-600" /> Dados Pessoais</>}
                  {currentStep === 2 && <><MapPin className="w-5 h-5 text-red-600" /> Endereço de Entrega</>}
                  {currentStep === 3 && <><CreditCard className="w-5 h-5 text-red-600" /> Forma de Pagamento</>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Etapa 1: Dados Pessoais */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={customerData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Digite seu nome completo"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="seu@email.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={customerData.phone}
                        onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                        placeholder="(11) 99999-9999"
                        className="mt-1"
                        maxLength={15}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={customerData.cpf}
                        onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                        placeholder="000.000.000-00"
                        className="mt-1"
                        maxLength={14}
                      />
                    </div>
                  </div>
                )}

                {/* Etapa 2: Endereço */}
                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        value={customerData.cep}
                        onChange={(e) => handleInputChange('cep', formatCEP(e.target.value))}
                        placeholder="00000-000"
                        className="mt-1"
                        maxLength={9}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Select value={customerData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                          <SelectItem value="BA">Bahia</SelectItem>
                          <SelectItem value="GO">Goiás</SelectItem>
                          <SelectItem value="DF">Distrito Federal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Rua/Avenida *</Label>
                      <Input
                        id="address"
                        value={customerData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Nome da rua/avenida"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={customerData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        placeholder="123"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={customerData.complement}
                        onChange={(e) => handleInputChange('complement', e.target.value)}
                        placeholder="Apt 12, Bloco A..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={customerData.neighborhood}
                        onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                        placeholder="Nome do bairro"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={customerData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Nome da cidade"
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {/* Etapa 3: Pagamento */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="pix" id="pix" />
                          <Label htmlFor="pix" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">PIX</span>
                                </div>
                                <div>
                                  <div className="font-medium">PIX</div>
                                  <div className="text-sm text-gray-600">Aprovação instantânea</div>
                                </div>
                              </div>
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                Recomendado
                              </Badge>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="boleto" id="boleto" />
                          <Label htmlFor="boleto" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">B</span>
                              </div>
                              <div>
                                <div className="font-medium">Boleto Bancário</div>
                                <div className="text-sm text-gray-600">Vencimento em 3 dias úteis</div>
                              </div>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="cartao" id="cartao" />
                          <Label htmlFor="cartao" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                <CreditCard className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="font-medium">Cartão de Crédito</div>
                                <div className="text-sm text-gray-600">Parcelamento até 12x sem juros</div>
                              </div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">Compra 100% Segura</h4>
                          <p className="text-sm text-blue-700">
                            Seus dados estão protegidos com criptografia SSL e não armazenamos informações de cartão.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botões de navegação */}
                <div className="flex gap-4 pt-6 border-t">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={handlePreviousStep} className="flex-1">
                      Voltar
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button onClick={handleNextStep} className="flex-1 bg-red-600 hover:bg-red-700">
                      Continuar
                    </Button>
                  ) : (
                    <Button onClick={handleFinishOrder} className="flex-1 bg-red-600 hover:bg-red-700">
                      Finalizar Pedido
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do pedido */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Produtos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2 mb-1">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                        <p className="text-sm font-semibold text-red-600">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Totais */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({cart.itemCount} itens):</span>
                      <span>R$ {cart.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Frete:</span>
                      <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                        {shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-red-600">R$ {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Entrega:</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Prazo: 15-30 dias úteis<br />
                      Rastreamento incluído
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}