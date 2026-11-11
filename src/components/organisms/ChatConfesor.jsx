import { useRef, useState } from "react";
import ListaMensajes from "../molecules/ListaMensajes";
import ChatInput from "../molecules/ChatInput";
import BotonAccion from "../atoms/BotonAccion";
import { guardarConfesion } from "../../services/confesiones";

const RESPUESTAS = [
  "Continúa. Aquí nada se juzga.",
  "El silencio también dice mucho... pero sigue.",
  "Cada palabra tuya queda entre estas paredes.",
  "Interesante confesión. ¿Hay algo más que quieras soltar?",
  "Te escucho. No te detengas ahora.",
];

export default function ChatConfesor({ apodo, onApodo, onCompartido }) {
  const [mensajes, setMensajes] = useState([
    { id: 1, tipo: "recibido", texto: "Habla alma perdida. Te escucho sin juzgarte." },
    { id: 2, tipo: "recibido", texto: "Antes de comenzar, dime... ¿cómo te llamas, alma perdida?" },
  ]);
  const [texto, setTexto] = useState("");
  const [fase, setFase] = useState("apodo"); // "apodo" -> "confesion"
  const ultimoPecado = useRef("");
  const idRef = useRef(3); // ids únicos para las keys

  const agregar = (msg) =>
    setMensajes((prev) => [...prev, { id: idRef.current++, ...msg }]);

  const compartir = async () => {
    const error = await guardarConfesion({ apodo, pecado: ultimoPecado.current });
    if (error) return console.error("Error al guardar la confesión:", error);
    onCompartido(); // la página abre el panel lateral
  };

  const preguntarDecision = () =>
    agregar({
      tipo: "recibido",
      texto: "¿Quieres compartir tu pecado con otras almas, o que quede solo entre nosotros?",
      // Los botones viajan dentro del mensaje
      acciones: (
        <>
          <BotonAccion className="btn-decision" onClick={compartir}>
            Compartir con otros
          </BotonAccion>
          <BotonAccion
            className="btn-decision"
            onClick={() =>
              agregar({ tipo: "recibido", texto: "Como prefieras. Tu secreto está a salvo conmigo." })
            }
          >
            Que quede entre nosotros
          </BotonAccion>
        </>
      ),
    });

  const enviar = () => {
    const t = texto.trim();
    if (!t) return;
    agregar({ tipo: "enviado", texto: t });
    setTexto("");

    // Primer mensaje = apodo
    if (fase === "apodo") {
      onApodo(t);
      setTimeout(() => {
        agregar({ tipo: "recibido", texto: `Un placer, ${t}. Ahora dime, ¿qué pecado cargas contigo?` });
        setFase("confesion");
      }, 1000);
      return;
    }

    // Siguientes = pecado: respuesta random y luego la pregunta de decisión
    ultimoPecado.current = t;
    setTimeout(() => {
      agregar({ tipo: "recibido", texto: RESPUESTAS[Math.floor(Math.random() * RESPUESTAS.length)] });
      setTimeout(preguntarDecision, 1000);
    }, 1200);
  };

  return (
    <div className="chat-contenedor">
      <ListaMensajes id="chat-mensajes" mensajes={mensajes} />
      <ChatInput
        valor={texto}
        onChange={setTexto}
        onEnviar={enviar}
        placeholder="Escribe tu confesión..."
        inputId="input-mensaje"
        btnId="btn-enviar"
      />
    </div>
  );
}