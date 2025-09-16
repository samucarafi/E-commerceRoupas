import "./App.css";
import { useCart } from "./Contexts/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import CartSidebar from "./Components/CartSidebar/CartSidebar";
import CheckoutModal from "./Components/CheckoutModal/CheckoutModal";
import Header from "./Pages/Header/Header";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
function App() {
  const {
    cart,
    isCartOpen,
    isCheckoutOpen,
    updateQuantity,
    removeFromCart,
    toggleCart,
    showCheckout,
    hideCheckout,
  } = useCart();
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
        </Routes>

        <CartSidebar
          isOpen={isCartOpen}
          toggleCart={toggleCart}
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          showCheckout={showCheckout}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          hideCheckout={hideCheckout}
          cart={cart}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
