import { sb } from "../lib/supabase";

// Guarda una confesión compartida; devuelve el error (o null si salió bien)
export async function guardarConfesion({ apodo, pecado }) {
  const { error } = await sb
    .from("confesiones")
    .insert({ apodo: apodo || "Anónimo", pecado, compartido: true });
  return error;
}

// Trae las confesiones compartidas, más nuevas primero
// Devuelve { data, error } tal cual lo entrega Supabase
export function obtenerCompartidas() {
  return sb
    .from("confesiones")
    .select()
    .eq("compartido", true)
    .order("created_at", { ascending: false });
}