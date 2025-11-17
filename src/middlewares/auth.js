import { supabase } from "../config/supabase.js";

export async function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido." });
    }

    // Aqui validamos o token usando o Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ error: "Token inválido." });
    }

    req.user = data.user;
    next();
  } catch (err) {
    console.error("Erro no middleware auth:", err);
    return res.status(500).json({ error: "Erro interno de autenticação." });
  }
}
