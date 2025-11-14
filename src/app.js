import express from "express";
import cors from "cors";
import betsRoutes from "./routes/bets.routes.js";
import testRoutes from "./routes/test.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/bets", betsRoutes);
app.use("/", testRoutes);

app.get("/", (req, res) => 
  res.json({ message: "API Jogo do Bicho funcionando!" })
);

export default app;
