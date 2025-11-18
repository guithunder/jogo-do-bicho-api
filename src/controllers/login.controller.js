// src/controllers/login.controller.js
import supabase from "../supabase.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios: email e password" });
    }

    // Login Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: "Email ou senha incorretos." });
    }

    return res.json({
      message: "Login realizado com sucesso!",
      user: data.user,
      token: data.session.access_token,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
