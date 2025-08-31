import { useState, useEffect } from 'react';
import { CartItem } from '../data/mockData';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState<string>('1');

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('baleafiya-cart');
    const savedPickupPoint = localStorage.getItem('baleafiya-pickup-point');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedPickupPoint) {
      setSelectedPickupPoint(savedPickupPoint);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('baleafiya-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save pickup point to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('baleafiya-pickup-point', selectedPickupPoint);
  }, [selectedPickupPoint]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      // Check if adding from different restaurant
      if (prevItems.length > 0 && prevItems[0].restaurantId !== item.restaurantId) {
        // Replace cart with new restaurant items
        return [{ ...item, quantity: 1 }];
      }

      // Check if item already exists
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.menuItemId === item.menuItemId);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.menuItemId !== menuItemId));
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.menuItemId === menuItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCurrentRestaurantId = () => {
    return cartItems.length > 0 ? cartItems[0].restaurantId : null;
  };

  return {
    cartItems,
    selectedPickupPoint,
    setSelectedPickupPoint,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getCurrentRestaurantId
  };
};