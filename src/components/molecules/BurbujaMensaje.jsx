// Molécula: un mensaje del chat (opcional: autor y botones)
export default function BurbujaMensaje({ tipo, autor, texto, acciones }) {
  return (
    <div className={`mensaje ${tipo}`}>
      {autor && <span className="autor-mensaje">{autor}</span>}
      <p>{texto}</p>
      {acciones}
    </div>
  );
}
