import React from "react";

const AboutPage = () => {
  return (
    <section className="py-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Sobre a StyleHub
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-purple-600">
              Nossa História
            </h3>
            <p className="text-gray-600 mb-4">
              Fundada em 2020, a StyleHub nasceu com o objetivo de democratizar
              a moda e tornar o estilo acessível para todos. Começamos como uma
              pequena loja online e hoje somos uma das principais referências em
              moda no Brasil.
            </p>
            <p className="text-gray-600">
              Nossa missão é oferecer roupas de qualidade, com design moderno e
              preços justos, sempre acompanhando as últimas tendências da moda
              mundial.
            </p>
          </div>
          <div className="text-center">
            <div className="text-8xl mb-4">👗</div>
            <p className="text-gray-500">Moda para todos os estilos</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-xl font-bold mb-3 text-gray-800">
              Nossa Missão
            </h4>
            <p className="text-gray-600">
              Democratizar a moda e tornar o estilo acessível para todas as
              pessoas, independente do seu perfil ou orçamento.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">👁️</div>
            <h4 className="text-xl font-bold mb-3 text-gray-800">
              Nossa Visão
            </h4>
            <p className="text-gray-600">
              Ser a principal referência em moda online no Brasil, reconhecida
              pela qualidade e inovação.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">💎</div>
            <h4 className="text-xl font-bold mb-3 text-gray-800">
              Nossos Valores
            </h4>
            <p className="text-gray-600">
              Qualidade, transparência, sustentabilidade e respeito pela
              diversidade e individualidade de cada cliente.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Junte-se à Nossa Comunidade
          </h3>
          <p className="text-lg mb-6">
            Mais de 100.000 clientes satisfeitos já escolheram a StyleHub. Faça
            parte você também!
          </p>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">100k+</div>
              <div className="text-sm">Clientes Felizes</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm">Produtos</div>
            </div>
            <div>
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm">Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
