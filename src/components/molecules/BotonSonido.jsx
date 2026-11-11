import { BiSolidVolumeMute, BiSolidVolumeFull } from "react-icons/bi";

// Molécula: botón mute/unmute (el estado vive en el padre)
export default function BotonSonido({ silenciado, onToggle }) {
  return (
    <button className="icono-sonido" onClick={onToggle}>
      {silenciado ? <BiSolidVolumeMute /> : <BiSolidVolumeFull />}
    </button>
  );
}