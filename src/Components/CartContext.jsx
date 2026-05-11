import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add To Cart (with color)
  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item._id === product._id && item.selectedColor === product.selectedColor
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id && item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1 },
      ]);
    }

    // Popup Open
    setIsCartOpen(true);
  };

  // Increase Quantity
  const increaseQuantity = (id, color) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id && item.selectedColor === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id, color) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id && item.selectedColor === color && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove
  const removeFromCart = (id, color) => {
    setCartItems(
      cartItems.filter((item) => !(item._id === id && item.selectedColor === color))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);