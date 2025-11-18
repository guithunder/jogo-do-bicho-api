// src/controllers/register.controller.js
import * as service from "../services/register.service.js";

export async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const { data, error } = await service.createUser(email, password);

    if (error) {
      return res.status(400).json({ error: error.message || error });
    }

    return res.status(201).json({
      message: "Usuário registrado com sucesso",
      user: data,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
