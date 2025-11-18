import express from "express";
import cors from "cors";

import betsRoutes from "./routes/bets.routes.js";
import authRoutes from "./routes/auth.routes.js"; // (se existir e for usado)
import registerRoutes from "./routes/register.routes.js"; 
import loginRoutes from "./routes/login.routes.js";
import { supabase } from "./config/supabase.js";

const app = express();

app.use(cors());
app.use(express.json());

// ROTAS DE AUTENTICAÇÃO
app.use("/auth/register", registerRoutes);
app.use("/auth/login", loginRoutes);

// Se você realmente usa /auth para outra coisa, mantém aqui:
app.use("/auth", authRoutes); // opcional — só se existir mesmo

// ROTAS DE APOSTAS
app.use("/bets", betsRoutes);

// ROTA PRINCIPAL
app.get("/", (req, res) => {
  res.json({ message: "API Jogo do Bicho funcionando!" });
});

// ROTA DE TESTE DO SUPABASE
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
