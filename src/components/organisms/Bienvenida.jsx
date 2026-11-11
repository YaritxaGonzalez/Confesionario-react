import Titulo from "../atoms/Titulo";
import Boton from "../atoms/Boton";

export default function Bienvenida() {
  return (
    <section id="bienvenida">
      <Titulo nivel={1} className="inicio">El Confesionario</Titulo>
      <Titulo nivel={2}>Aquí nadie sabe tu nombre. Aquí nadie te juzga. Aquí todos pagan.</Titulo>
      <Titulo nivel={2}>Entra si te atreves a soltar lo que llevas guardado en lo profundo de tu alma.</Titulo>
      <Boton to="/confesar">Confesar mi pecado</Boton>
      <Boton to="/recomendar">Recomendar un libro prohibido</Boton>
      <Boton to="/libros">Lista de libros prohibidos</Boton>
    </section>
  );
}