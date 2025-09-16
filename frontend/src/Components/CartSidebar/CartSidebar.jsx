import React from "react";

const CartSidebar = ({
  isOpen,
  toggleCart,
  cart,
  updateQuantity,
  removeFromCart,
  showCheckout,
}) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Carrinho de Compras</h3>
          <button
            onClick={toggleCart}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-6"
        style={{ height: "calc(100vh - 200px)" }}
      >
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Seu carrinho está vazio
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="cart-item-enter flex items-center space-x-4 py-4 border-b"
              >
                <div className="text-3xl">{item.image}</div>
                <div className="flex-1">
                  <h5 className="font-semibold">{item.name}</h5>
                  <p className="text-purple-600 font-bold">
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="border-t p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold text-purple-600">
              R$ {totalPrice.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <button
            onClick={showCheckout}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
