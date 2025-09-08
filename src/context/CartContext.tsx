import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  cod: string;
  availability: string;
  image: string;
  description: string;
  features: string[];
  rfqId: string | null;
  status: string | null;
  addedDate: string;
};

type CartContextValue = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'rfqId' | 'status' | 'addedDate'>) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  updateCartItem: (itemId: string, updates: Partial<CartItem>) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carregar itens do localStorage na inicialização
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cartItems');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  }, []);

  // Salvar no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'rfqId' | 'status' | 'addedDate'>) => {
    const cartItem: CartItem = {
      ...item,
      rfqId: null,
      status: null,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setCartItems(prev => {
      // Verificar se o item já existe
      const exists = prev.some(existingItem => existingItem.id === cartItem.id);
      return exists ? prev : [...prev, cartItem];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCartItem = (itemId: string, updates: Partial<CartItem>) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    );
  };

  const cartCount = cartItems.length;

  const value = useMemo<CartContextValue>(() => ({
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItem,
  }), [cartItems]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
