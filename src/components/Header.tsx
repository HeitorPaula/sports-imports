import { useState } from 'react';
import { ShoppingCart, Menu, X, Search, Dumbbell, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';

interface HeaderProps {
  onCartClick: () => void;
  onFavoritesClick: () => void;
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const categories = ['Todos', 'Calçados', 'Musculação', 'Yoga', 'Acessórios', 'Suplementos', 'Kits'];

export function Header({ 
  onCartClick,
  onFavoritesClick, 
  onCategoryChange, 
  selectedCategory,
  searchTerm,
  onSearchChange
}: HeaderProps) {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50 border-b border-border">
      {/* Barra promocional superior */}
      <div className="bg-red-600 text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium">
            🔥 FRETE GRÁTIS em compras acima de R$ 200 • Até 15 dias para devolução
          </p>
        </div>
      </div>

      {/* Header principal */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative bg-red-600 p-3 rounded-xl shadow-lg">
              <Dumbbell className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Sports Imports</h1>
              <p className="text-xs text-muted-foreground">Equipamentos Esportivos</p>
            </div>
          </div>

          {/* Barra de pesquisa - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Buscar produtos, marcas, categorias..." 
                className="pl-10 border-border focus:border-red-500 focus:ring-red-500/20 bg-input-background"
                value={searchTerm}
                onChange={handleSearchInput}
              />
              {searchTerm && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-200"
                  onClick={() => onSearchChange('')}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </form>
          </div>

          {/* Favoritos, Carrinho e menu */}
          <div className="flex items-center gap-2">
            {/* Favoritos */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onFavoritesClick}
              className="relative border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600"
            >
              <Heart className="w-4 h-4" />
              {favorites.itemCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-600 min-w-5 h-5 flex items-center justify-center p-0 text-xs text-white"
                >
                  {favorites.itemCount}
                </Badge>
              )}
              <span className="hidden lg:inline ml-2 font-medium">
                Favoritos
              </span>
            </Button>

            {/* Carrinho */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onCartClick}
              className="relative border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600"
            >
              <ShoppingCart className="w-4 h-4" />
              {cart.itemCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-600 min-w-5 h-5 flex items-center justify-center p-0 text-xs text-white"
                >
                  {cart.itemCount}
                </Badge>
              )}
              <span className="hidden sm:inline ml-2 font-medium">
                R$ {cart.total.toFixed(2)}
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="md:hidden border-border"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Pesquisa mobile */}
        <div className="md:hidden mt-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Buscar produtos, marcas, categorias..." 
              className="pl-10 pr-10 border-border bg-input-background"
              value={searchTerm}
              onChange={handleSearchInput}
            />
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-200"
                onClick={() => onSearchChange('')}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </form>
        </div>
      </div>

      {/* Navegação de categorias */}
      <nav className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 py-3 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className={`text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'text-muted-foreground hover:text-red-600 hover:bg-red-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onCategoryChange(category);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-sm justify-start font-medium ${
                      selectedCategory === category 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'text-muted-foreground hover:text-red-600'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}