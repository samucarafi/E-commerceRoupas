import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const merchantOrderId = searchParams.get("merchant_order_id");

  return (
    <section className="py-16 min-h-screen bg-green-50">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-8xl mb-6">✅</div>
          <h2 className="text-4xl font-bold text-green-600 mb-4">
            Pagamento Aprovado!
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Parabéns! Seu pagamento foi processado com sucesso.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              Detalhes do Pagamento
            </h3>
            <div className="space-y-2 text-left">
              {paymentId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">ID do Pagamento:</span>
                  <span className="font-semibold">{paymentId}</span>
                </div>
              )}
              {status && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600">{status}</span>
                </div>
              )}
              {merchantOrderId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Pedido:</span>
                  <span className="font-semibold">#{merchantOrderId}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Você receberá um e-mail de confirmação em breve com todos os
              detalhes da sua compra.
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

export default SuccessPage;
