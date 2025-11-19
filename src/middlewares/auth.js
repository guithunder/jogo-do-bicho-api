// src/middlewares/auth.js
import jwt from "jsonwebtoken";

export async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido." });
    }

    // Remove "Bearer "
    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return res.status(401).json({ error: "Token inválido." });
    }

    // Valida o token usando seu JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Injeta os dados do usuário no request
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Erro no middleware auth:", err);
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}
