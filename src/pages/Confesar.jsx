import { useEffect, useState } from "react";
import { BiSolidCommentDetail } from "react-icons/bi";
import Titulo from "../components/atoms/Titulo";
import ChatConfesor from "../components/organisms/ChatConfesor";
import PanelPecadores from "../components/organisms/PanelPecadores";

export default function Confesar() {
  const [apodo, setApodo] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [version, setVersion] = useState(0);

  // Tu CSS usa body.panel-abierto; se limpia al salir de la página
  useEffect(() => {
    document.body.classList.toggle("panel-abierto", abierto);
    return () => document.body.classList.remove("panel-abierto");
  }, [abierto]);

  return (
    <section id="confesionario">
      <Titulo className="titulo-confesionario">Confesionario</Titulo>

      <ChatConfesor
        apodo={apodo}
        onApodo={setApodo}
        onCompartido={() => {
          setVersion((v) => v + 1); // fuerza recarga del panel
          setAbierto(true);
        }}
      />

      <button id="btn-panel-toggle" className="icono-panel" onClick={() => setAbierto(!abierto)}>
        <BiSolidCommentDetail />
      </button>

      <PanelPecadores abierto={abierto} version={version} apodo={apodo} />
    </section>
  );
}