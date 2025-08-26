import { useState, useMemo } from 'react';
import { Toaster } from './components/ui/sonner';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductPage } from './components/ProductPage';
import { CheckoutPage } from './components/CheckoutPage';
import { Cart } from './components/Cart';
import { Favorites } from './components/Favorites';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ProductsSection } from './components/ProductsSection';
import { products, Product } from './data/products';

type AppView = 'home' | 'product' | 'checkout';

export default function App() {
  // Estado principal da aplicação
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Produtos filtrados por categoria e pesquisa
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtro por categoria
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtro por pesquisa
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.fullDescription.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm]);

  // Handlers de navegação
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleBackToHome = () => {
    setSelectedProduct(null);
    setCurrentView('home');
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleBackFromCheckout = () => {
    setCurrentView('home');
  };

  // Handlers do carrinho
  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  // Handlers dos favoritos
  const handleFavoritesOpen = () => setIsFavoritesOpen(true);
  const handleFavoritesClose = () => setIsFavoritesOpen(false);

  // Handlers de categoria
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    setCurrentView('home');
  };

  // Handler de pesquisa
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setSelectedProduct(null);
    setCurrentView('home');
  };

  // Handler para limpar pesquisa
  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('Todos');
  };

  // Handler para adicionar ao carrinho (abre automaticamente)
  const handleAddToCartAndOpen = () => {
    setIsCartOpen(true);
  };

  // Renderização condicional baseada na view atual
  if (currentView === 'checkout') {
    return (
      <div className="min-h-screen bg-background">
        <CheckoutPage onBack={handleBackFromCheckout} />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#dc2626',
              color: 'white',
              border: 'none',
            },
          }}
        />
      </div>
    );
  }

  if (currentView === 'product' && selectedProduct) {
    return (
      <div className="min-h-screen bg-background">
        <ProductPage 
          product={selectedProduct} 
          onBack={handleBackToHome}
          onAddToCart={handleAddToCartAndOpen}
        />
        <Cart 
          isOpen={isCartOpen} 
          onClose={handleCartClose} 
          onGoToCheckout={handleGoToCheckout}
        />
        <Favorites 
          isOpen={isFavoritesOpen}
          onClose={handleFavoritesClose}
          onProductClick={handleProductClick}
        />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#dc2626',
              color: 'white',
              border: 'none',
            },
          }}
        />
      </div>
    );
  }

  // Página inicial
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        onCartClick={handleCartOpen}
        onFavoritesClick={handleFavoritesOpen}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <main className="flex-1">
        <HeroSection />
        
        <ProductsSection 
          selectedCategory={selectedCategory}
          filteredProducts={filteredProducts}
          onProductClick={handleProductClick}
          onCategoryChange={handleCategoryChange}
          searchTerm={searchTerm}
          onClearSearch={handleClearSearch}
          onAddToCart={handleAddToCartAndOpen}
        />
        
        <FeaturesSection />
      </main>

      <Footer />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={handleCartClose} 
        onGoToCheckout={handleGoToCheckout}
      />

      <Favorites 
        isOpen={isFavoritesOpen}
        onClose={handleFavoritesClose}
        onProductClick={handleProductClick}
      />
      
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#dc2626',
            color: 'white',
            border: 'none',
          },
        }}
      />
    </div>
  );
}