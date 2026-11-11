// Átomo: <button> genérico (Boton es un <Link>, este ejecuta acciones)
export default function BotonAccion({ type = "button", className = "", ...props }) {
  return <button type={type} className={className} {...props} />;
}