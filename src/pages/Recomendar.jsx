import Titulo from "../components/atoms/Titulo";
import FormLibro from "../components/organisms/FormLibro";

export default function Recomendar() {
  return (
    <section id="recomendar">
      <Titulo className="titulo-recomendar">Recomienda un libro prohibido</Titulo>
      <p>Comparte esa historia que te robó el sueño.</p>
      <FormLibro />
    </section>
  );
}