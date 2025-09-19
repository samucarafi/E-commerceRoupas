import React from "react";
import { useCart } from "../../Contexts/CartContext";
import ProductCard from "../../Components/ProductCard/ProductCard";

const ProductsPage = () => {
  const { productsData } = useCart();
  return (
    <section className="py-16 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Nossa Coleção Completa
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
