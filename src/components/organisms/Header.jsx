import { NavLink } from "react-router-dom";
import MarcaHeader from "../molecules/MarcaHeader";

export default function Header() {
  return (
    <header className="header-principal">
      <MarcaHeader />
      <nav className="header-nav">
        {/* "end" evita que Inicio quede activo en todas las rutas */}
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/confesar">Confesar</NavLink>
        <NavLink to="/libros">Libros</NavLink>
        <NavLink to="/recomendaciones">Recomendaciones</NavLink>
      </nav>
    </header>
  );
}