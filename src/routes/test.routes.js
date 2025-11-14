import { Router } from "express";
import { supabase } from "../supabaseClient.js";

const router = Router();

router.get("/test-supabase", async (req, res) => {
  const { data, error } = await supabase.from("bets").select("*").limit(1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ message: "Conexão com Supabase OK!", data });
});

export default router;
