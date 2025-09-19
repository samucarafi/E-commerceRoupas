import express from "express";
import cors from "cors";
import "dotenv/config";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const app = express();
app.use(cors());
app.use(express.json());

// Configuração com Access Token (chave secreta do Mercado Pago)
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

app.post("/create-preference", async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ error: "Itens do pedido são obrigatórios" });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.title,
          quantity: Number(item.quantity),
          unit_price: Number(item.unit_price),
        })),
        // back_urls: {
        //   success: "https://google.com",
        //   failure: "http://localhost:5173/failure",
        //   pending: "http://localhost:5173/pending",
        // },
        // auto_return: "approved",
      },
    });

    res.json(result);
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    res.status(500).json({ error: "Erro ao criar preferência" });
  }
});

app.listen(4000, () => {
  console.log("🚀 Servidor rodando na porta 4000");
});
