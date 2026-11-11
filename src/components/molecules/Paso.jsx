// Molécula: un paso del formulario (tu CSS muestra solo el que tiene .activo)
export default function Paso({ activo, titulo, children }) {
  return (
    <div className={`paso ${activo ? "activo" : ""}`}>
      <p className="paso-titulo">{titulo}</p>
      {children}
    </div>
  );
}