import * as service from "../services/bets.service.js";

export async function list(req, res) {
  const { data, error } = await service.listBets(req.user.id);
  if (error) return res.status(400).json(error);
  res.json(data);
}

export async function show(req, res) {
  const { data, error } = await service.getBet(req.params.id, req.user.id);
  if (error) return res.status(404).json({ error: "Aposta não encontrada." });
  res.json(data);
}

export async function create(req, res) {
  const { animal, number, price } = req.body;

  if (!animal || !number || !price)
    return res.status(400).json({ error: "Campos obrigatórios faltando." });

  const { data, error } = await service.createBet(req.body, req.user.id);

  if (error) return res.status(400).json(error);
  res.status(201).json(data);
}

export async function update(req, res) {
  const { data, error } = await service.updateBet(req.params.id, req.body, req.user.id);
  if (error) return res.status(400).json(error);
  res.json(data);
}

export async function remove(req, res) {
  const { error } = await service.deleteBet(req.params.id, req.user.id);
  if (error) return res.status(400).json(error);
  res.json({ message: "Aposta removida." });
}
