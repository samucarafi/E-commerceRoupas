import React, { useEffect, useState } from "react";

const CheckoutModal = ({ isOpen, hideCheckout, cart }) => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mp, setMp] = useState(null);
  const [cardForm, setCardForm] = useState(null);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Initialize Mercado Pago
  useEffect(() => {
    if (isOpen && !mp) {
      const mercadopago = new window.MercadoPago(
        import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY
      );
      setMp(mercadopago);
    }
  }, [isOpen, mp]);

  // Create PIX Payment
  const createPixPayment = async () => {
    setIsProcessing(true);
    try {
      const orderData = {
        items: cart.map((item) => ({
          id: item.id.toString(),
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        })),
        payer: {
          email: "test@test.com",
        },
        payment_methods: {
          excluded_payment_types: [
            { id: "credit_card" },
            { id: "debit_card" },
            { id: "ticket" },
          ],
        },
        back_urls: {
          success: window.location.href,
          failure: window.location.href,
          pending: window.location.href,
        },
        auto_return: "approved",
      };

      // Simular criação de preferência (em produção, isso seria feito no backend)
      console.log("Dados do pedido PIX:", orderData);

      // Simular resposta do PIX
      setTimeout(() => {
        setIsProcessing(false);
        setShowSuccess(true);
      }, 2000);
    } catch (error) {
      console.error("Erro ao processar PIX:", error);
      setIsProcessing(false);
      alert("Erro ao processar pagamento PIX. Tente novamente.");
    }
  };

  // Create Card Payment Form
  const initializeCardForm = () => {
    if (!mp) return;

    const cardFormInstance = mp.cardForm({
      amount: totalPrice.toString(),
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número do cartão",
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/YY",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de segurança",
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular do cartão",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emissor",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Parcelas",
        },
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número do documento",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
      },
      callbacks: {
        onFormMounted: (error) => {
          if (error) console.warn("Form Mounted handling error: ", error);
        },
        onSubmit: (event) => {
          event.preventDefault();
          setIsProcessing(true);

          const {
            paymentMethodId,
            issuerId,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardFormInstance.getCardFormData();

          // Simular processamento do cartão
          console.log("Dados do cartão:", {
            paymentMethodId,
            issuerId,
            email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          });

          setTimeout(() => {
            setIsProcessing(false);
            setShowSuccess(true);
          }, 3000);
        },
        onFetching: (resource) => {
          console.log("Fetching resource: ", resource);
        },
      },
    });

    setCardForm(cardFormInstance);
  };

  // Create Boleto Payment
  const createBoletoPayment = async () => {
    setIsProcessing(true);
    try {
      const orderData = {
        items: cart.map((item) => ({
          id: item.id.toString(),
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        })),
        payer: {
          email: "test@test.com",
        },
        payment_methods: {
          excluded_payment_types: [
            { id: "credit_card" },
            { id: "debit_card" },
            { id: "pix" },
          ],
        },
      };

      console.log("Dados do pedido Boleto:", orderData);

      setTimeout(() => {
        setIsProcessing(false);
        setShowSuccess(true);
      }, 2000);
    } catch (error) {
      console.error("Erro ao processar Boleto:", error);
      setIsProcessing(false);
      alert("Erro ao processar pagamento via Boleto. Tente novamente.");
    }
  };

  const processPayment = () => {
    if (!selectedPayment) {
      alert("Por favor, selecione uma forma de pagamento.");
      return;
    }

    switch (selectedPayment) {
      case "pix":
        createPixPayment();
        break;
      case "card":
        if (cardForm) {
          const submitButton = document.getElementById("form-checkout__submit");
          if (submitButton) {
            submitButton.click();
          }
        } else {
          alert("Formulário do cartão não está pronto. Tente novamente.");
        }
        break;
      case "boleto":
        createBoletoPayment();
        break;
      default:
        alert("Forma de pagamento não implementada.");
    }
  };

  // Initialize card form when card payment is selected
  useEffect(() => {
    if (selectedPayment === "card" && mp && !cardForm) {
      setTimeout(() => {
        initializeCardForm();
      }, 100);
    }
  }, [selectedPayment, mp, cardForm]);

  const closeSuccess = () => {
    setShowSuccess(false);
    hideCheckout();
  };

  if (showSuccess) {
    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold mb-4 text-green-600">
            Pagamento Processado!
          </h3>
          <p className="text-gray-600 mb-6">
            Seu pagamento foi processado com sucesso via Mercado Pago. Você
            receberá um e-mail com os detalhes em breve.
          </p>
          <button
            onClick={closeSuccess}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

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
            Processando Pagamento...
          </h3>
          <p className="text-gray-600 mb-6">
            Aguarde enquanto processamos seu pagamento via Mercado Pago.
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

          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Forma de Pagamento</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {["card", "pix", "boleto"].map((method) => (
                <div
                  key={method}
                  onClick={() => setSelectedPayment(method)}
                  className={`payment-option border-2 rounded-lg p-4 cursor-pointer hover:border-purple-500 ${
                    selectedPayment === method
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">
                      {method === "card"
                        ? "💳"
                        : method === "pix"
                        ? "📱"
                        : "🧾"}
                    </div>
                    <div className="font-semibold">
                      {method === "card"
                        ? "Cartão de Crédito"
                        : method === "pix"
                        ? "PIX"
                        : "Boleto"}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {method === "card"
                        ? "Até 12x sem juros"
                        : method === "pix"
                        ? "Aprovação imediata"
                        : "Vencimento em 3 dias"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Card Form */}
            {selectedPayment === "card" && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h5 className="text-lg font-semibold mb-4">Dados do Cartão</h5>
                <form id="form-checkout" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número do Cartão
                      </label>
                      <input
                        type="text"
                        id="form-checkout__cardNumber"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Validade
                      </label>
                      <input
                        type="text"
                        id="form-checkout__expirationDate"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código de Segurança
                      </label>
                      <input
                        type="text"
                        id="form-checkout__securityCode"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parcelas
                      </label>
                      <select
                        id="form-checkout__installments"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      ></select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Titular
                    </label>
                    <input
                      type="text"
                      id="form-checkout__cardholderName"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Documento
                      </label>
                      <select
                        id="form-checkout__identificationType"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      ></select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número do Documento
                      </label>
                      <input
                        type="text"
                        id="form-checkout__identificationNumber"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="form-checkout__cardholderEmail"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>

                  <select
                    id="form-checkout__issuer"
                    className="hidden"
                  ></select>
                  <button
                    type="submit"
                    id="form-checkout__submit"
                    className="hidden"
                  >
                    Pagar
                  </button>
                </form>
              </div>
            )}

            {/* PIX Info */}
            {selectedPayment === "pix" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="text-blue-500 mr-3 text-2xl">📱</div>
                  <div>
                    <h5 className="font-semibold text-blue-800">
                      Pagamento via PIX
                    </h5>
                    <p className="text-blue-700 text-sm">
                      Após confirmar, você receberá o código PIX para pagamento
                      instantâneo.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Boleto Info */}
            {selectedPayment === "boleto" && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="text-orange-500 mr-3 text-2xl">🧾</div>
                  <div>
                    <h5 className="font-semibold text-orange-800">
                      Pagamento via Boleto
                    </h5>
                    <p className="text-orange-700 text-sm">
                      O boleto será gerado após a confirmação e terá vencimento
                      em 3 dias úteis.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-blue-500 mr-3">ℹ️</div>
              <div>
                <p className="text-blue-800 font-semibold">
                  Integração Mercado Pago
                </p>
                <p className="text-blue-700 text-sm">
                  Para usar em produção, substitua a chave pública de teste pela
                  sua chave real do Mercado Pago. Atualmente usando chave de
                  teste para demonstração.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={processPayment}
            disabled={!selectedPayment}
            className={`w-full py-3 rounded-lg transition-colors font-semibold text-lg ${
              selectedPayment
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedPayment === "pix"
              ? "Gerar PIX"
              : selectedPayment === "card"
              ? "Pagar com Cartão"
              : selectedPayment === "boleto"
              ? "Gerar Boleto"
              : "Selecione uma forma de pagamento"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default CheckoutModal;
