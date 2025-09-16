import { useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import ProductCard from "../../Components/ProductCard/ProductCard";
const HomePage = () => {
  const { productsData } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Moda que Inspira</h2>
          <p className="text-xl mb-8">
            Descubra as últimas tendências em roupas femininas e masculinas
          </p>
          <button
            onClick={() => navigate("/produtos")}
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Ver Coleção
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Produtos em Destaque
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productsData.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
