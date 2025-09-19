import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FailurePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");

  return (
    <section className="py-16 min-h-screen bg-red-50">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-8xl mb-6">❌</div>
          <h2 className="text-4xl font-bold text-red-600 mb-4">
            Pagamento Rejeitado
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Infelizmente, não foi possível processar seu pagamento.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-800 mb-4">
              O que aconteceu?
            </h3>
            <div className="text-left space-y-2">
              <p className="text-red-700">• Dados do cartão incorretos</p>
              <p className="text-red-700">• Limite insuficiente</p>
              <p className="text-red-700">• Cartão bloqueado ou vencido</p>
              <p className="text-red-700">• Problemas na conexão</p>
            </div>

            {paymentId && (
              <div className="mt-4 pt-4 border-t border-red-200">
                <div className="flex justify-between">
                  <span className="text-red-600">ID da Tentativa:</span>
                  <span className="font-semibold">{paymentId}</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Não se preocupe! Você pode tentar novamente com outro cartão ou
              forma de pagamento.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/produtos")}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FailurePage;
