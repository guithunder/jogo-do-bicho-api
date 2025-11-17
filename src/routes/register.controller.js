import { supabase } from "../supabase.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica campos
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    // Verifica se email já existe
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Criptografar senha
    const hashed = await bcrypt.hash(password, 10);

    // Criar usuário no Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password: hashed }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Erro ao registrar usuário" });
    }

    return res.json({
      message: "Usuário registrado com sucesso",
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno" });
  }
};
