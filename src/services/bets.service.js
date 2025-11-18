// src/services/bets.service.js
import { supabase } from "../config/supabase.js";

/**
 * Lista todas as apostas do usuário
 */
export async function listBets(userId) {
  const { data, error } = await supabase
    .from("bets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
}

/**
 * Busca uma aposta por id (apenas do usuário)
 */
export async function getBet(id, userId) {
  const { data, error } = await supabase
    .from("bets")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  return { data, error };
}

/**
 * Cria uma aposta associada ao usuário
 */
export async function createBet(body, userId) {
  const payload = { ...body, user_id: userId };

  const { data, error } = await supabase
    .from("bets")
    .insert(payload)
    .select()
    .single();

  return { data, error };
}

/**
 * Atualiza uma aposta — retorna a aposta atualizada (apenas se for do usuário)
 */
export async function updateBet(id, body, userId) {
  // opcional: evitar atualizar user_id ou id
  const updates = { ...body };
  delete updates.id;
  delete updates.user_id;

  const { data, error } = await supabase
    .from("bets")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  return { data, error };
}

/**
 * Remove uma aposta (apenas do usuário)
 * Retorna { data, error } onde data é o(s) registro(s) deletado(s)
 */
export async function deleteBet(id, userId) {
  const { data, error } = await supabase
    .from("bets")
    .delete()
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  return { data, error };
}
