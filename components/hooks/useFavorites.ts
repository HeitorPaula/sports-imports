import { useState, useEffect, useCallback } from 'react';
import { Product } from '../data/products';

interface FavoritesState {
  items: Product[];
  itemCount: number;
}

const FAVORITES_STORAGE_KEY = 'sports-imports-favorites';

// Evento personalizado para notificar mudanças nos favoritos
const FAVORITES_CHANGE_EVENT = 'favorites-changed';

// Função para disparar evento de mudança nos favoritos
const dispatchFavoritesChange = () => {
  window.dispatchEvent(new CustomEvent(FAVORITES_CHANGE_EVENT));
};

// Função para carregar favoritos do localStorage
const getFavoritesFromStorage = (): Product[] => {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Função para salvar favoritos no localStorage
const saveFavoritesToStorage = (items: Product[]) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
    dispatchFavoritesChange(); // Notifica todos os componentes sobre a mudança
  } catch (error) {
    console.error('Erro ao salvar favoritos:', error);
  }
};

export function useFavorites() {
  const [items, setItems] = useState<Product[]>([]);
  const [, setUpdateTrigger] = useState(0);

  // Função para forçar re-render
  const forceUpdate = useCallback(() => {
    setUpdateTrigger(prev => prev + 1);
  }, []);

  // Carrega favoritos inicial e escuta mudanças
  useEffect(() => {
    // Carrega estado inicial
    const loadFavorites = () => {
      const favoriteItems = getFavoritesFromStorage();
      setItems(favoriteItems);
    };

    loadFavorites();

    // Escuta mudanças nos favoritos
    const handleFavoritesChange = () => {
      const favoriteItems = getFavoritesFromStorage();
      setItems(favoriteItems);
      forceUpdate();
    };

    window.addEventListener(FAVORITES_CHANGE_EVENT, handleFavoritesChange);
    window.addEventListener('storage', handleFavoritesChange); // Para mudanças em outras abas

    return () => {
      window.removeEventListener(FAVORITES_CHANGE_EVENT, handleFavoritesChange);
      window.removeEventListener('storage', handleFavoritesChange);
    };
  }, [forceUpdate]);

  // Estado dos favoritos
  const favorites: FavoritesState = {
    items,
    itemCount: items.length
  };

  const addToFavorites = useCallback((product: Product) => {
    const currentItems = getFavoritesFromStorage();
    
    // Verifica se já está nos favoritos
    const exists = currentItems.some(item => item.id === product.id);
    
    if (!exists) {
      const newItems = [...currentItems, product];
      saveFavoritesToStorage(newItems);
    }
  }, []);

  const removeFromFavorites = useCallback((productId: string) => {
    const currentItems = getFavoritesFromStorage();
    const newItems = currentItems.filter(item => item.id !== productId);
    saveFavoritesToStorage(newItems);
  }, []);

  const isFavorite = useCallback((productId: string) => {
    const currentItems = getFavoritesFromStorage();
    return currentItems.some(item => item.id === productId);
  }, []);

  const toggleFavorite = useCallback((product: Product) => {
    const currentItems = getFavoritesFromStorage();
    const exists = currentItems.some(item => item.id === product.id);
    
    if (exists) {
      removeFromFavorites(product.id);
      return false; // Removido
    } else {
      addToFavorites(product);
      return true; // Adicionado
    }
  }, [addToFavorites, removeFromFavorites]);

  const clearFavorites = useCallback(() => {
    saveFavoritesToStorage([]);
  }, []);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites
  };
}