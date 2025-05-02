import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [flight, setFlight] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    gate: '',
    time: '',
    notes: ''
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('skyeats_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      
      const savedFlight = localStorage.getItem('skyeats_flight');
      if (savedFlight) {
        setFlight(JSON.parse(savedFlight));
      }
      
      const savedDeliveryDetails = localStorage.getItem('skyeats_delivery');
      if (savedDeliveryDetails) {
        setDeliveryDetails(JSON.parse(savedDeliveryDetails));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('skyeats_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);
  
  // Save flight to localStorage whenever it changes
  useEffect(() => {
    try {
      if (flight) {
        localStorage.setItem('skyeats_flight', JSON.stringify(flight));
      }
    } catch (error) {
      console.error('Error saving flight to localStorage:', error);
    }
  }, [flight]);
  
  // Save delivery details to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('skyeats_delivery', JSON.stringify(deliveryDetails));
    } catch (error) {
      console.error('Error saving delivery details to localStorage:', error);
    }
  }, [deliveryDetails]);

  const addToCart = (item) => {
    setCart(prevCart => {
      // Check if the item is already in the cart
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === itemId);
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        const currentItem = updatedCart[existingItemIndex];
        
        if (currentItem.quantity > 1) {
          // Decrease quantity by 1
          updatedCart[existingItemIndex] = {
            ...currentItem,
            quantity: currentItem.quantity - 1
          };
          return updatedCart;
        } else {
          // Remove item if quantity would be less than 1
          return prevCart.filter(item => item.id !== itemId);
        }
      }
      
      return prevCart;
    });
  };

  const deleteFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const setFlightDetails = (flightDetails) => {
    setFlight(flightDetails);
  };

  const updateDeliveryDetails = (details) => {
    setDeliveryDetails(prev => ({ ...prev, ...details }));
  };

  return (
    <CartContext.Provider value={{
      cart,
      flight,
      deliveryDetails,
      addToCart,
      removeFromCart,
      deleteFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      setFlightDetails,
      updateDeliveryDetails
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 