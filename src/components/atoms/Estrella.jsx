import { BiSolidStar, BiStar } from "react-icons/bi";

// Átomo: una estrella, rellena si está activa
export default function Estrella({ activa, onClick }) {
  const Icono = activa ? BiSolidStar : BiStar;
  return (
    <Icono
      className={`estrella ${activa ? "activa" : ""}`}
      style={{ color: activa ? "#f5c518" : "" }}
      onClick={onClick}
    />
  );
}