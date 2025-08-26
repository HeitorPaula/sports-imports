import { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Plus, Minus, Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Product } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart?: () => void;
}

export function ProductPage({ product, onBack, onAddToCart }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    // Adiciona ao carrinho com a quantidade especificada
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    toast.success(`${quantity}x ${product.name} adicionado${quantity > 1 ? 's' : ''} ao carrinho!`);
    
    if (onAddToCart) {
      // Pequeno delay para garantir que o estado foi atualizado
      setTimeout(() => {
        onAddToCart();
      }, 150);
    }
  };

  const handleToggleFavorite = () => {
    const wasAdded = toggleFavorite(product);
    if (wasAdded) {
      toast.success(`${product.name} adicionado aos favoritos!`);
    } else {
      toast.success(`${product.name} removido dos favoritos`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  const isProductFavorited = isFavorite(product.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center gap-2 hover:bg-red-50 text-red-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleFavorite}
                className={`border-red-200 hover:bg-red-50 ${
                  isProductFavorited ? 'bg-red-50 text-red-600' : 'text-red-600'
                }`}
              >
                <Heart 
                  className={`w-4 h-4 ${
                    isProductFavorited ? 'fill-current' : ''
                  }`} 
                />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagem do produto */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white font-bold">
                  -{product.discount}%
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge variant="secondary" className="bg-gray-800 text-white text-lg px-4 py-2">
                    Produto Esgotado
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Informações do produto */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3 text-red-600 border-red-200">
                {product.category}
              </Badge>
              
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-4">
                {product.description}
              </p>

              {/* Avaliação */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-foreground font-medium">
                  {product.rating}
                </span>
                <span className="text-muted-foreground">
                  ({product.reviews} avaliações)
                </span>
              </div>
            </div>

            {/* Preços */}
            <div className="space-y-2">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-foreground">
                  R$ {product.price.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-xl text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground">
                12x de R$ {(product.price / 12).toFixed(2)} sem juros no cartão
              </p>
              
              {product.price >= 200 && (
                <div className="flex items-center gap-2 text-green-600">
                  <Truck className="w-4 h-4" />
                  <span className="font-medium">Frete grátis para todo o Brasil</span>
                </div>
              )}
            </div>

            {/* Quantidade e botões */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-foreground">Quantidade:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium min-w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 text-lg font-medium ${
                  product.inStock 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.inStock 
                  ? `Adicionar ao Carrinho - R$ ${(product.price * quantity).toFixed(2)}`
                  : 'Produto Esgotado'
                }
              </Button>
            </div>

            {/* Garantias e benefícios */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Garantias e Benefícios</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-muted-foreground">Produto original e garantia de qualidade</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                    <span className="text-muted-foreground">15 dias para devolução sem custos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-orange-600" />
                    <span className="text-muted-foreground">Entrega rápida e segura</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Descrição completa */}
        <div className="mt-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Descrição Completa</h2>
              <div className="prose max-w-none text-muted-foreground leading-relaxed">
                <p>{product.fullDescription}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}