import { supabase } from "../config/supabase.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email e senha são obrigatórios." });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) return res.status(401).json({ error: error.message });

    return res.json({
      message: "Login realizado com sucesso!",
      user: data.user,
      session: data.session,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
