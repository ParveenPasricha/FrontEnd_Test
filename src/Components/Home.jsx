import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        
        <h2 className="text-3xl font-bold text-center mb-14">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">🚚</div>

            <h3 className="text-2xl font-semibold mb-3">
              Fast Delivery
            </h3>

            <p className="text-gray-600">
              Get your orders delivered quickly at your doorstep.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">💳</div>

            <h3 className="text-2xl font-semibold mb-3">
              Secure Payment
            </h3>

            <p className="text-gray-600">
              Safe and secure payment options for all customers.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">⭐</div>

            <h3 className="text-2xl font-semibold mb-3">
              Best Quality
            </h3>

            <p className="text-gray-600">
              Premium quality products with affordable pricing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-20">
        
        <div className="max-w-4xl mx-auto text-center px-4">
          
          <h2 className="text-4xl font-bold mb-6">
            Start Shopping Today
          </h2>

          <p className="text-lg text-gray-200 mb-8">
            Explore our wide range of products and enjoy great deals.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Explore Products
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;