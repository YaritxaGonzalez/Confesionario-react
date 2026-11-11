import Titulo from "../components/atoms/Titulo";
import GridLibros from "../components/organisms/GridLibros";

export default function Libros() {
  return (
    <section id="lista-libros">
      <Titulo className="titulo-recomendar">Libros prohibidos</Titulo>
      <p>Historias que te recomienda otros pecadores.</p>
      <GridLibros />
    </section>
  );
}