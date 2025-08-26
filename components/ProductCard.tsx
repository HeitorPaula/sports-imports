import { Star, ShoppingCart, Heart, Truck } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Product } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart?: () => void;
}

export function ProductCard({ product, onProductClick, onAddToCart }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    addToCart(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
    
    if (onAddToCart) {
      // Pequeno delay para garantir que o estado foi atualizado
      setTimeout(() => {
        onAddToCart();
      }, 100);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const wasAdded = toggleFavorite(product);
    if (wasAdded) {
      toast.success(`${product.name} adicionado aos favoritos!`);
    } else {
      toast.success(`${product.name} removido dos favoritos`);
    }
  };

  const handleProductClick = () => {
    onProductClick(product);
  };

  const isProductFavorited = isFavorite(product.id);

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border border-border hover:border-red-300 hover:shadow-lg transition-all duration-300 bg-card"
      onClick={handleProductClick}
    >
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badge de desconto */}
        {product.discount > 0 && (
          <Badge 
            className="absolute top-3 left-3 bg-red-600 hover:bg-red-600 text-white font-bold"
          >
            -{product.discount}%
          </Badge>
        )}

        {/* Botão de favoritar */}
        <Button
          size="sm"
          variant="secondary"
          className={`absolute top-3 right-3 p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg ${
            isProductFavorited 
              ? 'bg-red-50 hover:bg-red-100 border-red-200' 
              : 'bg-card/90 hover:bg-card'
          }`}
          onClick={handleToggleFavorite}
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isProductFavorited 
                ? 'text-red-500 fill-current' 
                : 'text-red-500'
            }`} 
          />
        </Button>

        {/* Frete grátis */}
        {product.price >= 200 && (
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Badge variant="secondary" className="bg-green-600 hover:bg-green-600 text-white shadow-lg">
              <Truck className="w-3 h-3 mr-1" />
              Frete Grátis
            </Badge>
          </div>
        )}

        {/* Indicador de estoque */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="secondary" className="bg-gray-800 text-white">
              Esgotado
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Categoria */}
        <Badge 
          variant="outline" 
          className="mb-2 text-xs text-red-600 border-red-200 hover:bg-red-50"
        >
          {product.category}
        </Badge>

        {/* Nome do produto */}
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {product.name}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Avaliação */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-border'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Preços */}
        <div className="flex items-end gap-2 mb-3">
          <span className="text-lg font-bold text-foreground">
            R$ {product.price.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Parcelamento */}
        <p className="text-xs text-muted-foreground mb-4">
          12x de R$ {(product.price / 12).toFixed(2)} sem juros
        </p>

        {/* Botão de adicionar ao carrinho */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full font-medium transition-all duration-200 ${
            product.inStock 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-muted text-muted-foreground'
          }`}
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock ? 'Adicionar' : 'Esgotado'}
        </Button>
      </CardContent>
    </Card>
  );
}