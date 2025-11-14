import { supabase } from "../config/supabase.js";

export async function listBets(userId) {
  return await supabase.from("bets").select("*").eq("user_id", userId);
}

export async function getBet(id, userId) {
  return await supabase.from("bets").select("*").eq("id", id).eq("user_id", userId).single();
}

export async function createBet(data, userId) {
  return await supabase.from("bets")
    .insert({ ...data, user_id: userId })
    .select()
    .single();
}

export async function updateBet(id, data, userId) {
  return await supabase.from("bets")
    .update(data)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();
}

export async function deleteBet(id, userId) {
  return await supabase.from("bets")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
}
