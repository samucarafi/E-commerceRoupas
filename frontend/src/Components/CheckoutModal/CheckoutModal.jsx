import { useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
const CheckoutModal = ({ isOpen, hideCheckout, cart }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [preferenceId, setPreferenceId] = useState(null);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY);
  console.log(import.meta.env.VITE_API_URL);
  initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY);

  const createPreference = async () => {
    setIsProcessing(true);
    setError("");

    try {
      // Preparar dados para enviar ao backend
      const orderData = {
        items: cart.map((item) => ({
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      };

      // Fazer requisição para o backend criar a preferência
      const response = await axios.post(
        import.meta.env.VITE_API_URL,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.id) {
        setPreferenceId(response.data.id);
        setIsProcessing(false);
      } else {
        throw new Error("Resposta inválida do servidor");
      }
    } catch (error) {
      console.error("Erro ao criar preferência:", error);
      setError(
        error.response?.data?.message ||
          "Erro ao processar pagamento. Verifique se o servidor está rodando."
      );
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <h3 className="text-2xl font-bold mb-4 text-purple-600">
            Preparando Pagamento...
          </h3>
          <p className="text-gray-600 mb-6">
            Criando preferência no Mercado Pago...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Finalizar Compra</h3>
            <button
              onClick={hideCheckout}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Resumo do Pedido</h4>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-semibold">
                    R${" "}
                    {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-purple-600">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="text-blue-500 mr-3 text-2xl">💳</div>
              <div>
                <h4 className="font-semibold text-blue-800">Mercado Pago</h4>
                <p className="text-blue-700 text-sm">
                  Pagamento seguro e confiável
                </p>
              </div>
            </div>

            <div className="text-sm text-blue-700 space-y-1">
              <p>✅ Cartão de crédito e débito</p>
              <p>✅ PIX instantâneo</p>
              <p>✅ Boleto bancário</p>
              <p>✅ Parcelamento em até 12x</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="text-red-500 mr-3">❌</div>
                <div>
                  <h5 className="font-semibold text-red-800">
                    Erro no Pagamento
                  </h5>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!preferenceId && !error && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="text-gray-500 mr-3">ℹ️</div>
                <div>
                  <p className="text-gray-800 font-semibold">
                    Configuração Necessária
                  </p>
                  <p className="text-gray-700 text-sm">
                    Certifique-se de que seu servidor Node.js está rodando em
                    localhost:3000 com o endpoint /create-preference
                    configurado.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Container para o botão do Mercado Pago */}
          {preferenceId ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <h1>Botão de Pagamento</h1>
              <p>Clique no botão para realizar o pagamento.</p>
              {/* Renderize o botão de pagamento */}
              <div style={{ width: "300px" }}>
                <Wallet initialization={{ preferenceId: preferenceId }} />
              </div>
            </div>
          ) : (
            <button
              onClick={createPreference}
              disabled={isProcessing}
              className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processando..." : "Criar Pagamento"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// const CheckoutModal = ({ isOpen, hideCheckout, cart }) => {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState("");

//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const createPreference = async () => {
//     setIsProcessing(true);
//     setError("");

//     try {
//       // Preparar dados para enviar ao backend
//       const orderData = {
//         items: cart.map((item) => ({
//           title: item.name,
//           quantity: item.quantity,
//           unit_price: item.price,
//         })),
//       };

//       // Fazer requisição para o backend criar a preferência
//       const response = await axios.post(
//         import.meta.env.API_URL || "http://localhost:4000/create-preference",
//         orderData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data && response.data.init_point) {
//         // Redirecionar para o Checkout Pro do Mercado Pago
//         window.location.href = response.data.init_point;
//       } else {
//         throw new Error("Resposta inválida do servidor");
//       }
//     } catch (error) {
//       console.error("Erro ao criar preferência:", error);
//       setError(
//         error.response?.data?.message ||
//           "Erro ao processar pagamento. Verifique se o servidor está rodando."
//       );
//       setIsProcessing(false);
//     }
//   };

//   if (isProcessing) {
//     return (
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ${
//           isOpen ? "" : "hidden"
//         }`}
//       >
//         <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
//           <div className="animate-spin text-6xl mb-4">⏳</div>
//           <h3 className="text-2xl font-bold mb-4 text-purple-600">
//             Preparando Pagamento...
//           </h3>
//           <p className="text-gray-600 mb-6">
//             Redirecionando para o Mercado Pago...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ${
//         isOpen ? "" : "hidden"
//       }`}
//     >
//       <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
//         <div className="p-6 border-b">
//           <div className="flex justify-between items-center">
//             <h3 className="text-2xl font-bold">Finalizar Compra</h3>
//             <button
//               onClick={hideCheckout}
//               className="text-gray-500 hover:text-gray-700 text-2xl"
//             >
//               ✕
//             </button>
//           </div>
//         </div>

//         <div className="p-6">
//           <div className="mb-8">
//             <h4 className="text-lg font-semibold mb-4">Resumo do Pedido</h4>
//             <div className="space-y-3 mb-4">
//               {cart.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex justify-between items-center"
//                 >
//                   <span>
//                     {item.name} x{item.quantity}
//                   </span>
//                   <span className="font-semibold">
//                     R${" "}
//                     {(item.price * item.quantity).toFixed(2).replace(".", ",")}
//                   </span>
//                 </div>
//               ))}
//             </div>
//             <div className="border-t pt-4">
//               <div className="flex justify-between text-xl font-bold">
//                 <span>Total:</span>
//                 <span className="text-purple-600">
//                   R$ {totalPrice.toFixed(2).replace(".", ",")}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
//             <div className="flex items-center mb-4">
//               <div className="text-blue-500 mr-3 text-2xl">💳</div>
//               <div>
//                 <h4 className="font-semibold text-blue-800">
//                   Checkout Pro - Mercado Pago
//                 </h4>
//                 <p className="text-blue-700 text-sm">
//                   Você será redirecionado para o ambiente seguro do Mercado Pago
//                 </p>
//               </div>
//             </div>

//             <div className="text-sm text-blue-700 space-y-1">
//               <p>✅ Pagamento com cartão de crédito e débito</p>
//               <p>✅ PIX instantâneo</p>
//               <p>✅ Boleto bancário</p>
//               <p>✅ Parcelamento em até 12x</p>
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//               <div className="flex items-center">
//                 <div className="text-red-500 mr-3">❌</div>
//                 <div>
//                   <h5 className="font-semibold text-red-800">
//                     Erro no Pagamento
//                   </h5>
//                   <p className="text-red-700 text-sm">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
//             <div className="flex items-center">
//               <div className="text-gray-500 mr-3">ℹ️</div>
//               <div>
//                 <p className="text-gray-800 font-semibold">
//                   Configuração do Backend
//                 </p>
//                 <p className="text-gray-700 text-sm">
//                   Certifique-se de que seu servidor Node.js está rodando em
//                   localhost:3000 com o endpoint /create-preference configurado.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={createPreference}
//             disabled={isProcessing}
//             className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isProcessing ? "Processando..." : "Pagar com Mercado Pago"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default CheckoutModal;
