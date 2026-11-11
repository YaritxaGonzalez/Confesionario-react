import { createClient } from "@supabase/supabase-js";

// Cliente único: todos los services lo importan de aquí
export const sb = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);