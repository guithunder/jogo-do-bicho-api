// src/controllers/register.controller.js
import supabase from "../supabase.js";

/*
  REGISTRAR USUÁRIO
*/
export async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios: email e password" });
    }

    // Criar usuário no Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: data.user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
