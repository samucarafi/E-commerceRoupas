import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";

const Header = () => {
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">StyleHub</h1>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`transition-colors ${
                location.pathname === "/"
                  ? "text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Início
            </Link>
            <Link
              to="/produtos"
              className={`transition-colors ${
                location.pathname === "/produtos"
                  ? "text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Produtos
            </Link>
            <Link
              to="/sobre"
              className={`transition-colors ${
                location.pathname === "/sobre"
                  ? "text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Sobre
            </Link>
            <Link
              to="/contato"
              className={`transition-colors ${
                location.pathname === "/contato"
                  ? "text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Contato
            </Link>
          </nav>

          <button
            onClick={toggleCart}
            className="relative bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            🛒 Carrinho
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
