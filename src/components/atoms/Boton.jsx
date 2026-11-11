import { Link } from "react-router-dom";

// Átomo: botón-enlace con la clase btn-opcion de tu CSS
export default function Boton({ to, children }) {
  return (
    <Link to={to} className="btn-opcion">
      {children}
    </Link>
  );
}