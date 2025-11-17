import express from "express";
import cors from "cors";
import betsRoutes from "./routes/bets.routes.js";
import { supabase } from "./config/supabase.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da sua API
app.use("/bets", betsRoutes);

// Rota principal
app.get("/", (req, res) => {
  res.json({ message: "API Jogo do Bicho funcionando!" });
});

// Rota de teste do Supabase
app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("bets").select("*").limit(1);

    if (error) {
      return res.status(500).json({
        connected: false,
        error: error.message,
      });
    }

    return res.json({
      connected: true,
      sample: data,
    });
  } catch (err) {
    return res.status(500).json({
      connected: false,
      error: err.message,
    });
  }
});

export default app;
