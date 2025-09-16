import { createContext, useState } from "react";

const CartContext = createContext();
const productsData = [
  {
    id: 1,
    name: "Vestido Floral Elegante",
    price: 159.9,
    image: "👗",
    category: "Vestidos",
  },
  {
    id: 2,
    name: "Camisa Social Masculina",
    price: 89.9,
    image: "👔",
    category: "Camisas",
  },
  {
    id: 3,
    name: "Jeans Skinny Feminino",
    price: 129.9,
    image: "👖",
    category: "Calças",
  },
  {
    id: 4,
    name: "Blazer Executivo",
    price: 199.9,
    image: "🧥",
    category: "Blazers",
  },
  {
    id: 5,
    name: "Saia Midi Plissada",
    price: 79.9,
    image: "👗",
    category: "Saias",
  },
  {
    id: 6,
    name: "Polo Masculina",
    price: 69.9,
    image: "👕",
    category: "Polos",
  },
  {
    id: 7,
    name: "Vestido Longo Festa",
    price: 249.9,
    image: "👗",
    category: "Vestidos",
  },
  {
    id: 8,
    name: "Calça Social Masculina",
    price: 119.9,
    image: "👔",
    category: "Calças",
  },
];

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (productId) => {
    const product = productsData.find((p) => p.id === productId);
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, change) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const showCheckout = () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    setIsCheckoutOpen(true);
    setIsCartOpen(false);
  };

  const hideCheckout = () => {
    setIsCheckoutOpen(false);
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        isCheckoutOpen,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleCart,
        showCheckout,
        hideCheckout,
        productsData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
