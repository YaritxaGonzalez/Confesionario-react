import { BiSolidBookHeart } from "react-icons/bi";

// Molécula: ícono + nombre de la marca
export default function MarcaHeader() {
  return (
    <div className="header-marca">
      <BiSolidBookHeart size={28} />
      <span>El Confesionario</span>
    </div>
  );
}