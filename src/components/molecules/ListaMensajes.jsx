import { useEffect, useRef } from "react";
import BurbujaMensaje from "./BurbujaMensaje";

// Molécula: lista de mensajes con scroll automático al final
export default function ListaMensajes({ id, mensajes }) {
  const ref = useRef(null);

  // Cada vez que llega un mensaje nuevo, baja el scroll
  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [mensajes]);

  return (
    <div className="chat-mensajes" id={id} ref={ref}>
      {mensajes.map((m) => (
        <BurbujaMensaje key={m.id} {...m} />
      ))}
    </div>
  );
}