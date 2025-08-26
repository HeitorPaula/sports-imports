import { useState, useEffect, useCallback } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const CART_STORAGE_KEY = 'sports-imports-cart';

// Evento personalizado para notificar mudanças no carrinho
const CART_CHANGE_EVENT = 'cart-changed';

// Função para disparar evento de mudança no carrinho
const dispatchCartChange = () => {
  window.dispatchEvent(new CustomEvent(CART_CHANGE_EVENT));
};

// Função para carregar carrinho do localStorage
const getCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Função para salvar carrinho no localStorage
const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    dispatchCartChange(); // Notifica todos os componentes sobre a mudança
  } catch (error) {
    console.error('Erro ao salvar carrinho:', error);
  }
};

// Função para calcular totais
const calculateTotals = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [, setUpdateTrigger] = useState(0);

  // Função para forçar re-render
  const forceUpdate = useCallback(() => {
    setUpdateTrigger(prev => prev + 1);
  }, []);

  // Carrega carrinho inicial e escuta mudanças
  useEffect(() => {
    // Carrega estado inicial
    const loadCart = () => {
      const cartItems = getCartFromStorage();
      setItems(cartItems);
    };

    loadCart();

    // Escuta mudanças no carrinho
    const handleCartChange = () => {
      const cartItems = getCartFromStorage();
      setItems(cartItems);
      forceUpdate();
    };

    window.addEventListener(CART_CHANGE_EVENT, handleCartChange);
    window.addEventListener('storage', handleCartChange); // Para mudanças em outras abas

    return () => {
      window.removeEventListener(CART_CHANGE_EVENT, handleCartChange);
      window.removeEventListener('storage', handleCartChange);
    };
  }, [forceUpdate]);

  // Estado do carrinho calculado dinamicamente
  const cart: CartState = {
    items,
    ...calculateTotals(items)
  };

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    const currentItems = getCartFromStorage();
    const existingIndex = currentItems.findIndex(item => item.product.id === product.id);
    
    let newItems: CartItem[];
    
    if (existingIndex >= 0) {
      // Produto já existe - aumentar quantidade
      newItems = currentItems.map((item, index) => 
        index === existingIndex 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Novo produto
      newItems = [...currentItems, { product, quantity }];
    }
    
    saveCartToStorage(newItems);
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    const currentItems = getCartFromStorage();
    
    if (newQuantity <= 0) {
      // Remove item se quantidade for 0 ou menor
      const newItems = currentItems.filter(item => item.product.id !== productId);
      saveCartToStorage(newItems);
    } else {
      // Atualiza quantidade
      const newItems = currentItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      saveCartToStorage(newItems);
    }
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    const currentItems = getCartFromStorage();
    const newItems = currentItems.filter(item => item.product.id !== productId);
    saveCartToStorage(newItems);
  }, []);

  const clearCart = useCallback(() => {
    saveCartToStorage([]);
  }, []);

  const getItemQuantity = useCallback((productId: string): number => {
    const currentItems = getCartFromStorage();
    const item = currentItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }, []);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity
  };
}