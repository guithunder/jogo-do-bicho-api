// src/controllers/bets.controller.js
import * as service from "../services/bets.service.js";

/* LISTAR */
export async function list(req, res) {
  try {
    const { data, error } = await service.listBets(req.user.id);
    if (error) return res.status(500).json({ error: error.message || error });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* MOSTRAR POR ID */
export async function show(req, res) {
  try {
    const { data, error } = await service.getBet(req.params.id, req.user.id);
    if (error) return res.status(404).json({ error: "Aposta não encontrada." });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* CRIAR */
export async function create(req, res) {
  try {
    const { animal, number, price } = req.body;

    if (!animal || number == null || price == null)
      return res.status(400).json({ error: "Campos obrigatórios: animal, number, price" });

    const { data, error } = await service.createBet(req.body, req.user.id);
    if (error) return res.status(400).json({ error: error.message || error });

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* ATUALIZAR */
export async function update(req, res) {
  try {
    const id = req.params.id;
    // validações básicas (ex.: price não negativo)
    if (req.body.price && Number(req.body.price) < 0) {
      return res.status(400).json({ error: "price deve ser >= 0" });
    }

    const { data, error } = await service.updateBet(id, req.body, req.user.id);

    if (error) {
      // Supabase retorna error quando não encontrou/permissão etc.
      return res.status(400).json({ error: error.message || error });
    }

    if (!data) return res.status(404).json({ error: "Aposta não encontrada ou sem permissão." });

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* REMOVER */
export async function remove(req, res) {
  try {
    const id = req.params.id;
    const { data, error } = await service.deleteBet(id, req.user.id);

    if (error) return res.status(400).json({ error: error.message || error });
    if (!data) return res.status(404).json({ error: "Aposta não encontrada ou sem permissão." });

    return res.json({ message: "Aposta removida com sucesso.", deleted: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
