import { Outlet } from "react-router-dom";
import Header from "../organisms/Header";
import ReproductorFondo from "../organisms/ReproductorFondo";

export default function MainLayout() {
  return (
    // El reproductor vive aquí: la música no se corta al cambiar de página
    <>
      <Header />
      <ReproductorFondo />
      <main>
        <Outlet /> {/* aquí se renderiza la página activa */}
      </main>
    </>
  );
}