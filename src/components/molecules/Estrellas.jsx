import Estrella from "../atoms/Estrella";

// Molécula: 5 estrellas. Con onChange es seleccionable; sin él, solo lectura
export default function Estrellas({ valor, onChange, className = "estrellas" }) {
  return (
    <div className={className}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Estrella
          key={n}
          activa={n <= valor}
          onClick={onChange ? () => onChange(n) : undefined}
        />
      ))}
    </div>
  );
}