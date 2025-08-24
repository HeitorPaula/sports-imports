import { X, Search } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductsSectionProps {
  selectedCategory: string;
  filteredProducts: Product[];
  onProductClick: (product: Product) => void;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onClearSearch: () => void;
  onAddToCart?: () => void;
}

export function ProductsSection({ 
  selectedCategory, 
  filteredProducts, 
  onProductClick, 
  onCategoryChange,
  searchTerm,
  onClearSearch,
  onAddToCart
}: ProductsSectionProps) {
  const hasActiveFilters = selectedCategory !== 'Todos' || searchTerm.trim() !== '';
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {searchTerm ? `Resultados para "${searchTerm}"` : 
                 selectedCategory === 'Todos' ? 'Todos os Produtos' : selectedCategory}
              </h2>
              <p className="text-lg text-muted-foreground">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} 
                {searchTerm ? ' encontrado' : ' disponível'}{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Botão para limpar filtros */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={onClearSearch}
                className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              >
                <X className="w-4 h-4" />
                Limpar Filtros
              </Button>
            )}
          </div>

          {/* Filtros ativos */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory !== 'Todos' && (
                <Badge 
                  variant="secondary" 
                  className="bg-red-100 text-red-700 hover:bg-red-100 px-3 py-1"
                >
                  Categoria: {selectedCategory}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-4 w-4 p-0 hover:bg-red-200"
                    onClick={() => onCategoryChange('Todos')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              
              {searchTerm.trim() && (
                <Badge 
                  variant="secondary" 
                  className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 py-1"
                >
                  Busca: "{searchTerm.trim()}"
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-4 w-4 p-0 hover:bg-blue-200"
                    onClick={() => onClearSearch()}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Lista de produtos */}
        {filteredProducts.length === 0 ? (
          <EmptyState 
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            onClearSearch={onClearSearch}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EmptyState({ 
  searchTerm, 
  selectedCategory,
  onCategoryChange,
  onClearSearch
}: { 
  searchTerm: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClearSearch: () => void;
}) {
  const hasSearch = searchTerm.trim() !== '';
  const hasCategory = selectedCategory !== 'Todos';

  return (
    <div className="text-center py-20">
      <div className="bg-card rounded-xl shadow-sm border p-12 max-w-md mx-auto">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {hasSearch ? 'Nenhum produto encontrado' : 'Nenhum produto nesta categoria'}
        </h3>
        
        <div className="text-muted-foreground mb-8 space-y-2">
          {hasSearch && (
            <p>Não encontramos produtos para "<strong>{searchTerm}</strong>"</p>
          )}
          {hasCategory && !hasSearch && (
            <p>Não há produtos disponíveis na categoria <strong>{selectedCategory}</strong></p>
          )}
          
          <div className="text-sm mt-4 space-y-1">
            <p>Dicas para melhorar sua busca:</p>
            <ul className="text-left max-w-xs mx-auto space-y-1">
              <li>• Verifique a ortografia</li>
              <li>• Use termos mais gerais</li>
              <li>• Experimente sinônimos</li>
              <li>• Remova filtros aplicados</li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-3">
          {(hasSearch || hasCategory) && (
            <Button 
              onClick={onClearSearch}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3"
            >
              Ver todos os produtos
            </Button>
          )}
          
          {hasSearch && hasCategory && (
            <Button 
              variant="outline"
              onClick={() => onCategoryChange('Todos')}
              className="w-full"
            >
              Remover filtro de categoria
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}