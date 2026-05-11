import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { useCart } from "../Components/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [availableColors, setAvailableColors] = useState(["Black", "White", "Blue", "Red", "Green"]);

useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        const data = response.data?.data || response.data;
        setProduct(data);
        
        // Set default color if product has color info
        if (data?.color) {
          setSelectedColor(data.color);
        } else {
          setSelectedColor(availableColors[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const {
    addToCart,
    setIsCartOpen,
  } = useCart();

  const handleAddToCart = (product, color) => {
    // Add color to product object before adding to cart
    const productWithColor = {
      ...product,
      selectedColor: color,
      color: color
    };
    addToCart(productWithColor);
    // Popup Open
    setIsCartOpen(true);
  };

  // Loading
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <h1 className="text-2xl font-bold mt-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Cart Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            🛒 Cart
          </button>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Image */}
          <div className="p-5">
            <img
              src={product.images?.[0]}
              alt={product.product_name}
              className="w-full h-[450px] object-cover rounded-xl"
            />
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            
            <h1 className="text-4xl font-bold mb-4">
              {product.product_name}
            </h1>

            <p className="text-gray-600 text-lg mb-6">
              {product.description}
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mb-6">
              ₹ {product.price}
            </h2>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Select Color:</h3>
              <div className="flex gap-3 flex-wrap">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      px-4 py-2 rounded-lg border-2 transition-all
                      ${selectedColor === color 
                        ? 'border-blue-600 bg-blue-50 text-blue-600' 
                        : 'border-gray-300 hover:border-blue-400 text-gray-700'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-5 h-5 rounded-full"
                        style={{
                          backgroundColor: color.toLowerCase(),
                          border: color === "White" ? "1px solid #ccc" : "none"
                        }}
                      ></div>
                      {color}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => handleAddToCart(product, selectedColor)} 
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition flex-1"
              >
                Add To Cart ({selectedColor})
              </button>
            </div>

            {/* Selected Color Display */}
            <p className="text-sm text-gray-500 mt-4">
              Selected color: <span className="font-semibold text-blue-600">{selectedColor}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;