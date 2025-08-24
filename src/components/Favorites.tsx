import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface FavoritesProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: any) => void;
}

export function Favorites({ isOpen, onClose, onProductClick }: FavoritesProps) {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const handleRemoveFromFavorites = (productId: string, productName: string) => {
    removeFromFavorites(productId);
    toast.success(`${productName} removido dos favoritos`);
  };

  const handleProductClick = (product: any) => {
    onProductClick(product);
    onClose();
  };

  const handleClearFavorites = () => {
    clearFavorites();
    toast.success('Todos os favoritos foram removidos');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-xl border-l border-border">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <h2 className="font-semibold text-foreground">Favoritos</h2>
              {favorites.itemCount > 0 && (
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  {favorites.itemCount}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Conteúdo */}
          {favorites.itemCount === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Nenhum favorito ainda
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Adicione produtos aos favoritos para vê-los aqui
              </p>
              <Button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white">
                Explorar Produtos
              </Button>
            </div>
          ) : (
            <>
              {/* Lista de favoritos */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {favorites.items.map((product, index) => (
                    <div
                      key={`${product.id}-${index}`}
                      className="flex gap-3 p-3 bg-background rounded-lg border border-border hover:shadow-sm transition-shadow"
                    >
                      <div 
                        className="relative cursor-pointer flex-shrink-0"
                        onClick={() => handleProductClick(product)}
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        {product.discount > 0 && (
                          <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 py-0 h-5">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 
                          className="font-medium text-sm text-foreground line-clamp-2 cursor-pointer hover:text-red-600 transition-colors mb-2"
                          onClick={() => handleProductClick(product)}
                        >
                          {product.name}
                        </h4>
                        
                        <Badge 
                          variant="outline" 
                          className="text-xs text-red-600 border-red-200 mb-3"
                        >
                          {product.category}
                        </Badge>

                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs h-8"
                          >
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            {product.inStock ? 'Adicionar' : 'Esgotado'}
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveFromFavorites(product.id, product.name)}
                            className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="p-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleClearFavorites}
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpar Favoritos
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}