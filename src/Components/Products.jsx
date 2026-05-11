import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

import { useCart } from "../Components/CartContext";
import Loader from "../Components/Loader";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const {
    addToCart,
    cartItems,
    setIsCartOpen,
  } = useCart();

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);

        const response = await api.get("/products");

        const data =
          response.data?.data ||
          (Array.isArray(response.data)
            ? response.data
            : []);

        setProducts(data);

      } catch (error) {

        console.log("Products Fetch Error:", error);

      } finally {

        setLoading(false);
      }
    };

    fetchProducts();

  }, []);

  const handleAddToCart = (product) => {

    const productWithDefaultColor = {
      ...product,
      selectedColor: product.color || "Black",
    };

    addToCart(productWithDefaultColor);

    // Open Cart Sidebar
    setIsCartOpen(true);
  };


  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

          {/* Title */}
          <div>

            <h1 className="text-3xl font-bold text-gray-900">
              Products
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Discover premium quality products
            </p>

          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-black text-white px-5 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 shadow-md"
          >

            Cart

            {/* Cart Count */}
            <span className="ml-2 bg-white text-black text-sm font-semibold px-2 py-1 rounded-full">
              {cartItems.length}
            </span>

          </button>

        </div>

      </div>

      {/* ========================= */}
      {/* Products Section */}
      {/* ========================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Empty Products */}
        {products.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-24">

            <h2 className="text-2xl font-semibold text-gray-700">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              Products will appear here once added.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {products.map((product) => (

              <div
                key={product._id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >

                {/* ========================= */}
                {/* Product Image */}
                {/* ========================= */}
                <div
                  onClick={() =>
                    navigate(`/product/${product._id}`)
                  }
                  className="relative overflow-hidden cursor-pointer"
                >

                  <img
                    src={product.images?.[0]}
                    alt={product.product_name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />

                </div>

                {/* ========================= */}
                {/* Product Content */}
                {/* ========================= */}
                <div className="p-5">

                  {/* Product Name */}
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                    {product.product_name}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between mt-5">

                    {/* Price */}
                    <div>

                      <p className="text-sm text-gray-400">
                        Price
                      </p>

                      <h3 className="text-2xl font-bold text-black">
                        ₹ {product.price}
                      </h3>

                    </div>

                    {/* Add To Cart */}
                    <button
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className="bg-black text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all duration-300 active:scale-95"
                    >
                      Add To Cart
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Products;