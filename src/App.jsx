import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/template/MainLayout";
import Inicio from "./pages/Inicio";
import Confesar from "./pages/Confesar";
import Libros from "./pages/Libros";
import Recomendar from "./pages/Recomendar";

export default function App() {
  return (
    <Routes>
      {/* Todas las páginas comparten el layout (header + música) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/confesar" element={<Confesar />} />
        <Route path="/libros" element={<Libros />} />
        <Route path="/recomendaciones" element={<Recomendar />} />      </Route>
    </Routes>
  );
}