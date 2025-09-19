import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PendingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const merchantOrderId = searchParams.get("merchant_order_id");

  return (
    <section className="py-16 min-h-screen bg-yellow-50">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-8xl mb-6">⏳</div>
          <h2 className="text-4xl font-bold text-yellow-600 mb-4">
            Pagamento Pendente
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Seu pagamento está sendo processado e será confirmado em breve.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">
              Próximos Passos
            </h3>
            <div className="text-left space-y-3">
              <div className="flex items-start">
                <div className="text-yellow-600 mr-3 mt-1">📱</div>
                <div>
                  <p className="font-semibold text-yellow-800">PIX</p>
                  <p className="text-yellow-700 text-sm">
                    Se escolheu PIX, complete o pagamento no seu banco
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-yellow-600 mr-3 mt-1">🧾</div>
                <div>
                  <p className="font-semibold text-yellow-800">Boleto</p>
                  <p className="text-yellow-700 text-sm">
                    Se escolheu boleto, pague até a data de vencimento
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-yellow-600 mr-3 mt-1">💳</div>
                <div>
                  <p className="font-semibold text-yellow-800">Cartão</p>
                  <p className="text-yellow-700 text-sm">
                    Aguarde a confirmação do banco emissor
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-yellow-200">
              <div className="space-y-2">
                {paymentId && (
                  <div className="flex justify-between">
                    <span className="text-yellow-600">ID do Pagamento:</span>
                    <span className="font-semibold">{paymentId}</span>
                  </div>
                )}
                {merchantOrderId && (
                  <div className="flex justify-between">
                    <span className="text-yellow-600">Pedido:</span>
                    <span className="font-semibold">#{merchantOrderId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Você receberá uma notificação assim que o pagamento for
              confirmado. Guarde o número do pedido para acompanhamento.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/produtos")}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Continuar Comprando
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

export default PendingPage;
