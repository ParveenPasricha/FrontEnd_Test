import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

import { useCart } from "../Components/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // Context API
  const {
    addToCart,
    cartItems,
    setIsCartOpen,
  } = useCart();

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        const data =
          response.data?.data ||
          (Array.isArray(response.data)
            ? response.data
            : []);

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);


  const handleAddToCart = (product) => {
    // Add default color if product doesn't have one
    const productWithDefaultColor = {
      ...product,
      selectedColor: product.color || "Black"
    };
    addToCart(productWithDefaultColor);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      {/* Heading */}
      <div className="flex items-center justify-between max-w-7xl mx-auto mb-10">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Cart ({cartItems.length})
        </button>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >

            {/* Product Image */}
            <div
              onClick={() =>
                navigate(`/product/${product._id}`)
              }
              className="cursor-pointer"
            >
              <img
                src={product.images?.[0]}
                alt={product.product_name}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5">

              <h2 className="text-xl font-semibold mb-2">
                {product.product_name}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-center justify-between">

                <span className="text-2xl font-bold text-blue-600">
                  ₹ {product.price}
                </span>

                {/* Add To Cart */}
                <button
                  onClick={() =>
                    handleAddToCart(product)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add To Cart
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;