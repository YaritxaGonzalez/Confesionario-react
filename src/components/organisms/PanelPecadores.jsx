import { useEffect, useState } from "react";
import ListaMensajes from "../molecules/ListaMensajes";
import ChatInput from "../molecules/ChatInput";
import { guardarConfesion, obtenerCompartidas } from "../../services/confesiones";

// "version" sube cada vez que se comparte algo, para forzar la recarga
export default function PanelPecadores({ abierto, version, apodo }) {
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("");

  const cargar = async () => {
    // Mensaje del sistema para estados vacío/error
    const confesor = (t) => [{ id: "confesor", tipo: "recibido", autor: "El confesor", texto: t }];
    const { data, error } = await obtenerCompartidas();

    if (error) {
      console.error("Error al cargar confesiones:", error);
      return setMensajes(confesor("No se pudieron cargar las confesiones. Intenta de nuevo."));
    }
    if (data.length === 0) {
      return setMensajes(confesor("Aún no hay confesiones compartidas. Sé el primero en soltar la tuya."));
    }
    setMensajes(
      data.map((c, i) => ({
        id: c.id ?? i,
        tipo: "enviado",
        autor: c.apodo || "Anónimo",
        texto: c.pecado,
      }))
    );
  };

  // Carga al abrir el panel o cuando se comparte algo nuevo
  useEffect(() => {
    if (abierto) cargar();
  }, [abierto, version]);

  const enviar = async () => {
    const t = texto.trim();
    if (!t) return;
    setTexto("");
    const error = await guardarConfesion({ apodo, pecado: t });
    if (error) return console.error("Error al enviar mensaje:", error);
    cargar();
  };

  return (
    <div className={`panel-decision ${abierto ? "abierto" : ""}`} id="panel-decision">
      <p id="panel-bienvenida">
        Bienvenido a la sala de los pecadores, {apodo || "alma anónima"}.
      </p>
      <ListaMensajes id="panel-mensajes" mensajes={mensajes} />
      <ChatInput
        valor={texto}
        onChange={setTexto}
        onEnviar={enviar}
        placeholder="Escribe algo..."
        inputId="input-panel"
        btnId="btn-enviar-panel"
      />
    </div>
  );
}