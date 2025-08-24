import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { useCart } from '../hooks/useCart';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToCheckout: () => void;
}

export function Cart({ isOpen, onClose, onGoToCheckout }: CartProps) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const shippingCost = cart.total >= 200 ? 0 : 15.90;
  const finalTotal = cart.total + shippingCost;

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }
    onGoToCheckout();
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removido do carrinho!`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Carrinho limpo com sucesso!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="h-full flex flex-col rounded-none border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <ShoppingBag className="w-5 h-5 text-red-600" />
              Carrinho
              {cart.itemCount > 0 && (
                <Badge className="bg-red-600 hover:bg-red-600 text-white">
                  {cart.itemCount}
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">Carrinho vazio</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Adicione produtos para começar suas compras!
                </p>
                <Button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white">
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item, index) => (
                  <div 
                    key={`${item.product.id}-${index}`} 
                    className="flex gap-3 p-3 border border-border rounded-lg bg-background"
                  >
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium mb-1 line-clamp-2 text-foreground">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-red-600 font-semibold mb-2">
                        R$ {item.product.price.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="h-6 w-6 p-0"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm px-2 font-medium text-foreground min-w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          {cart.items.length > 0 && (
            <div className="border-t border-border p-4 space-y-4 bg-muted/30">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-foreground">
                  <span>Subtotal:</span>
                  <span>R$ {cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-foreground">
                  <span>Frete:</span>
                  <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                    {shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-foreground">
                  <span>Total:</span>
                  <span className="text-red-600">
                    R$ {finalTotal.toFixed(2)}
                  </span>
                </div>
                {cart.total < 200 && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <p className="text-xs text-blue-700">
                      Faltam <span className="font-semibold">R$ {(200 - cart.total).toFixed(2)}</span> para frete grátis!
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Button onClick={handleCheckout} className="w-full bg-red-600 hover:bg-red-700 text-white" size="lg">
                  <span>Finalizar Compra</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleClearCart} 
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  size="sm"
                >
                  Limpar Carrinho
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}