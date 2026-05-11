import React from "react";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/CartContext";

const CartPopUp = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Helper function to get color style
  const getColorStyle = (color) => {
    const colorMap = {
      'Black': '#000000',
      'White': '#FFFFFF',
      'Blue': '#3B82F6',
      'Red': '#EF4444',
      'Green': '#10B981',
      'Yellow': '#F59E0B',
      'Purple': '#8B5CF6',
      'Pink': '#EC4899',
      'Orange': '#F97316',
      'Gray': '#6B7280'
    };
    return colorMap[color] || '#CCCCCC';
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60] transition-all duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-4 right-4 bottom-4 w-full max-w-[420px] bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[70] rounded-3xl transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-7 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Cart
              <span className="text-indigo-600">.</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">
              {cartItems.length} Items Selected
            </p>
          </div>
          <button
            onClick={onClose}
            className="group bg-slate-100 hover:bg-slate-900 transition-all duration-300 p-3 rounded-2xl"
          >
            <X size={20} className="group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 h-[calc(100vh-370px)] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center animate-bounce">
                <ShoppingBag size={40} className="text-slate-300" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-800">Your bag is empty</p>
                <p className="text-slate-500 text-sm mt-2">Start shopping now</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  navigate("/products");
                }}
                className="flex items-center gap-2 font-bold text-indigo-600 hover:gap-4 transition-all"
              >
                Explore Products
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.selectedColor}`}
                  className="group relative flex gap-4 p-4 bg-white rounded-3xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.images?.[0] || "/no-image.png"}
                      alt={item.product_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <h3 className="font-bold text-slate-800 leading-tight line-clamp-1">
                        {item.product_name}
                      </h3>
                      
                      {/* Color Display */}
                      {item.selectedColor && (
                        <div className="flex items-center gap-2 mt-1">
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ 
                              backgroundColor: getColorStyle(item.selectedColor),
                              border: item.selectedColor === "White" ? "1px solid #ccc" : "none"
                            }}
                          ></div>
                          <span className="text-xs text-gray-500">
                            Color: {item.selectedColor}
                          </span>
                        </div>
                      )}
                      
                      <p className="text-indigo-600 font-black mt-1">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-slate-100 rounded-xl p-1">
                        <button
                          onClick={() => decreaseQuantity(item._id, item.selectedColor)}
                          className="p-1 hover:bg-white rounded-lg transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-bold text-slate-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item._id, item.selectedColor)}
                          className="p-1 hover:bg-white rounded-lg transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item._id, item.selectedColor)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-white/40 backdrop-blur-md border-t border-white/20 rounded-b-[32px]">
            {/* Total */}
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[2px]">
                  Estimated Total
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-slate-900">₹</span>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    {subtotal.toLocaleString()}
                  </h3>
                </div>
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Free Delivery
              </div>
            </div>

            {/* Checkout */}
            <button
              onClick={() => {
                onClose();
                navigate("/checkout", { state: { cartItems } });
              }}
              className="group relative w-full overflow-hidden rounded-2xl bg-slate-900 py-4 transition-all duration-300 active:scale-[0.98] hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)]"
            >
              <div className="relative z-10 flex items-center justify-center gap-3 text-white font-bold tracking-wide">
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-4 font-medium italic">
              Secure 256-bit SSL Encrypted Payment
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPopUp;