import Input from "../atoms/Input";
import BotonAccion from "../atoms/BotonAccion";

// Molécula: input + botón enviar (Enter también envía)
export default function ChatInput({ valor, onChange, onEnviar, placeholder, inputId, btnId }) {
  return (
    <div className="chat-input">
      <Input
        id={inputId}
        type="text"
        placeholder={placeholder}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnviar()}
      />
      <BotonAccion id={btnId} onClick={onEnviar}>
        Enviar
      </BotonAccion>
    </div>
  );
}