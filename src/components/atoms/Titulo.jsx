// Átomo: título genérico; "nivel" elige h1/h2/h3
export default function Titulo({ nivel = 1, className = "", children }) {
  const Tag = `h${nivel}`;
  return <Tag className={className}>{children}</Tag>;
}