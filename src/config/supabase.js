import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Em ambiente local carrega o .env
dotenv.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("❌ ERRO: Variáveis do Supabase não encontradas!");
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    auth: {
      persistSession: false,
    }
  }
);
