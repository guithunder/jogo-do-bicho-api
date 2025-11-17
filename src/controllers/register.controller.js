// src/controllers/register.controller.js
import { supabase } from "../config/supabase.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica campos
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    // Verifica se email já existe na tabela users
    const { data: existingUser } = await supbase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Cria usuário no AUTH
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // Criptografa a senha para salvar na tabela users
    const hashed = await bcrypt.hash(password, 10);

    // Registra na sua tabela users
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          auth_id: authData.user.id, 
          name,
          email,
          password: hashed,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Erro ao salvar no banco" });
    }

    return res.json({
      message: "Usuário registrado com sucesso!",
      user: {
        id: data.id,
        auth_id: authData.user.id,
        name: data.name,
        email: data.email,
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
