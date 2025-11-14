import express from "express";
import cors from "cors";
import betsRoutes from "./routes/bets.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/bets", betsRoutes);

app.get("/", (req, res) => res.json({ message: "API Jogo do Bicho funcionando!" }));

export default app;
