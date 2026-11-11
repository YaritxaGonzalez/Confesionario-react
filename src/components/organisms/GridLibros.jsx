import { useEffect, useState } from "react";
import TarjetaLibro from "../molecules/TarjetaLibro";
import { obtenerLibrosAgrupados } from "../../services/libros";

export default function GridLibros() {
  const [libros, setLibros] = useState(null); // null = cargando
  const [error, setError] = useState(false);

  useEffect(() => {
    obtenerLibrosAgrupados().then(({ data, error }) => {
      if (error) {
        console.error("Error al cargar libros:", error);
        return setError(true);
      }
      setLibros(data);
    });
  }, []);

  // Estados: error / cargando / vacío / lista
  let contenido;
  if (error) contenido = <p className="cargando-libros">No se pudieron cargar los libros.</p>;
  else if (!libros) contenido = <p className="cargando-libros">Buscando libros prohibidos...</p>;
  else if (libros.length === 0) contenido = <p className="cargando-libros">Aún nadie ha recomendado un libro.</p>;
  else contenido = libros.map((l) => <TarjetaLibro key={l.nombre_libro} libro={l} />);

  return <div className="grid-libros" id="grid-libros">{contenido}</div>;
}