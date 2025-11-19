// src/controllers/login.controller.js
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email e senha são obrigatórios." });

    // Buscar usuário manualmente no Supabase (somente como banco)
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "Usuário não encontrado." });
    }

    // Comparação simples (se quiser, depois coloco bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Gerar token JWT válido por 1 dia
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login realizado com sucesso!",
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
