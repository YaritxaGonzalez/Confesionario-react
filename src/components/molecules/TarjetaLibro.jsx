import Estrellas from "./Estrellas";

// Molécula: tarjeta de un libro ya agrupado (promedio + veces recomendado)
export default function TarjetaLibro({ libro }) {
  return (
    <div className="tarjeta-libro">
      {libro.imagen ? (
        <img src={libro.imagen} alt={`Portada de ${libro.nombre_libro}`} />
      ) : (
        <div className="sin-portada">Sin portada</div>
      )}
      <h3>{libro.nombre_libro}</h3>
      <p className="autor-libro">{libro.autor}</p>
      <Estrellas valor={Math.round(libro.promedio)} className="estrellas-tarjeta" />
      <p className="veces-recomendado">
        Recomendado {libro.veces} {libro.veces === 1 ? "vez" : "veces"}
      </p>
    </div>
  );
}