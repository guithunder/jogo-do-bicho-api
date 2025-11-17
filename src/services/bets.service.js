// src/services/bets.service.js
import { supabase } from "../config/supabase.js";

// LISTAR TODAS AS APOSTAS DO USUÁRIO
export async function listBets(userId) {
  const { data, error } = await supabase
    .from("bets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
}

// BUSCAR UMA APOSTA ESPECÍFICA
export async function getBet(id, userId) {
  const { data, error } = await supabase
    .from("bets")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  return { data, error };
}

// CRIAR APOSTA
export async function createBet(body, userId) {
  const payload = { ...body, user_id: userId };

  const { data, error } = await supabase
    .from("bets")
    .insert(payload)
    .select()
    .single();

  return { data, error };
}

// ATUALIZAR APOSTA
export async function updateBet(id, body, userId) {
  const { data, error } = await supabase
    .from("bets")
    .update(body)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  return { data, error };
}

// REMOVER APOSTA
export async function deleteBet(id, userId) {
  const { error } = await supabase
    .from("bets")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  return { error };
}
