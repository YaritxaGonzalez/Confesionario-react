import { sb } from "../lib/supabase";

// Inserta una recomendación; devuelve el error (o null)
export async function guardarLibro(libro) {
  const { error } = await sb.from("libros_recomendados").insert(libro);
  return error;
}

// Trae las recomendaciones, las agrupa por nombre y ordena por puntuación combinada
export async function obtenerLibrosAgrupados() {
  const { data, error } = await sb
    .from("libros_recomendados")
    .select()
    .order("created_at", { ascending: false });

  if (error) return { error };

  const grupos = {};
  data.forEach((item) => {
    // Misma clave sin importar mayúsculas/espacios: "Drácula " = "drácula"
    const clave = item.nombre_libro.trim().toLowerCase();

    if (!grupos[clave]) {
      grupos[clave] = {
        nombre_libro: item.nombre_libro,
        autor: item.autor,
        imagen: item.imagen,
        suma: 0,
        veces: 0,
      };
    }
    grupos[clave].suma += item.calificacion;
    grupos[clave].veces += 1;

    // Si alguna recomendación trae portada y el grupo no tiene, se usa esa
    if (item.imagen && !grupos[clave].imagen) grupos[clave].imagen = item.imagen;
  });

  const lista = Object.values(grupos)
    .map((l) => {
      const promedio = l.suma / l.veces;
      // puntuacion = promedio * veces: premia libros muy recomendados
      return { ...l, promedio, puntuacion: promedio * l.veces };
    })
    .sort((a, b) => b.puntuacion - a.puntuacion);

  return { data: lista };
}