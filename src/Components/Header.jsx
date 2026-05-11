import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import CartPopUp from "./CartPopUp";
import { useCart } from "../Components/CartContext";

const Header = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <>
      <header className="w-full bg-white shadow-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/logo.jpg"
              alt="Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6">

            <Link to="/home">
              Home
            </Link>

            <Link to="/products">
              Product
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingBag className="w-7 h-7" />

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

          </nav>
        </div>
      </header>

      {/* Popup */}
      <CartPopUp
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </>
  );
};

export default Header;