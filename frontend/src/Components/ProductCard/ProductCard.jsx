import React from "react";
import { useCart } from "../../Contexts/CartContext";

const ProductCard = ({ product }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-6xl">
        {product.image}
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
        <p className="text-gray-600 text-sm mb-3">{product.category}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-purple-600">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
        </div>

        {quantity === 0 ? (
          <button
            onClick={() => addToCart(product.id)}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Adicionar ao Carrinho
          </button>
        ) : (
          <div className="quantity-controls space-y-3">
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                -
              </button>
              <span className="font-semibold text-lg">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, 1)}
                className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(product.id)}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              🗑️ Remover do Carrinho
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
