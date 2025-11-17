
import { supabase } from "../config/supabase.js";

export async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email e senha são obrigatórios." });

    // Cria usuário no Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({
      message: "Usuário registrado com sucesso!",
      user: data.user
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
