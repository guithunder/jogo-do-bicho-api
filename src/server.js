import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

// Render precisa dessa lógica (usa PORT deles ou 10000 como fallback)
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
