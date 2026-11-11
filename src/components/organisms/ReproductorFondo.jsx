import { useRef, useState } from "react";
import BotonSonido from "../molecules/BotonSonido";

const VIDEO_ID = "ZTiTgqak9ZE";

export default function ReproductorFondo() {
  const iframeRef = useRef(null);
  // Los navegadores bloquean autoplay con sonido: arranca silenciado
  const [silenciado, setSilenciado] = useState(true);

  // Controla el iframe de YouTube por postMessage (requiere enablejsapi=1)
  const enviar = (func) =>
    iframeRef.current?.contentWindow.postMessage(
      JSON.stringify({ event: "command", func, args: "" }),
      "*"
    );

  const toggle = () => {
    enviar(silenciado ? "unMute" : "mute");
    if (silenciado) enviar("playVideo"); // asegura reproducción tras el clic
    setSilenciado(!silenciado);
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        width="1"
        height="1"
        title="musica-fondo"
        allow="autoplay"
        src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&enablejsapi=1`}
        style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
      />
      <BotonSonido silenciado={silenciado} onToggle={toggle} />
    </>
  );
}