import { useState } from "react";
import { BiImageAdd, BiSolidCheckCircle } from "react-icons/bi";
import Paso from "../molecules/Paso";
import Estrellas from "../molecules/Estrellas";
import Input from "../atoms/Input";
import Boton from "../atoms/Boton";
import BotonAccion from "../atoms/BotonAccion";
import { guardarLibro } from "../../services/libros";

export default function FormLibro() {
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState("");
  const [autor, setAutor] = useState("");
  const [imagen, setImagen] = useState(null); // base64, igual que antes
  const [calificacion, setCalificacion] = useState(0);
  const [enviado, setEnviado] = useState(false);

  // Convierte la portada elegida a base64 para mostrarla y guardarla
  const leerFoto = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    const lector = new FileReader();
    lector.onload = (ev) => setImagen(ev.target.result);
    lector.readAsDataURL(archivo);
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !autor.trim() || calificacion === 0) {
      alert("Completa el nombre, el autor y selecciona una calificación.");
      return;
    }
    const error = await guardarLibro({
      nombre_libro: nombre.trim(),
      autor: autor.trim(),
      calificacion,
      imagen,
    });
    if (error) {
      console.error("Error al guardar la recomendación:", error);
      alert("Hubo un problema al guardar tu recomendación. Intenta de nuevo.");
      return;
    }
    setEnviado(true);
  };

  // Pantalla de éxito (reemplaza al formulario)
  if (enviado) {
    return (
      <div className="mensaje-exito mostrar">
        <BiSolidCheckCircle size={48} />
        <p>¡Tu recomendación ha sido agregada!</p>
        <Boton to="/">Volver al inicio</Boton>
      </div>
    );
  }

  const siguiente = () => setPaso((p) => p + 1);
  const atras = () => setPaso((p) => p - 1);

  return (
    <form className="form-libro" onSubmit={enviar}>
      <Paso activo={paso === 1} titulo="¿Cómo se llama el libro?">
        <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del libro" />
        <BotonAccion className="btn-siguiente" onClick={siguiente}>Siguiente</BotonAccion>
      </Paso>

      <Paso activo={paso === 2} titulo="¿Quién lo escribió?">
        <Input value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Autor" />
        <div className="botones-paso">
          <BotonAccion className="btn-atras" onClick={atras}>Atrás</BotonAccion>
          <BotonAccion className="btn-siguiente" onClick={siguiente}>Siguiente</BotonAccion>
        </div>
      </Paso>

      <Paso activo={paso === 3} titulo="Agrega una portada (opcional)">
        <label htmlFor="input-foto" className="label-foto">
          <BiImageAdd size={28} />
          <span>Agregar portada</span>
        </label>
        <input type="file" id="input-foto" accept="image/*" hidden onChange={leerFoto} />
        {imagen && <img className="preview-foto" src={imagen} alt="Vista previa de la portada" />}
        <div className="botones-paso">
          <BotonAccion className="btn-atras" onClick={atras}>Atrás</BotonAccion>
          <BotonAccion className="btn-siguiente" onClick={siguiente}>Siguiente</BotonAccion>
        </div>
      </Paso>

      <Paso activo={paso === 4} titulo="¿Qué calificación le das?">
        <Estrellas valor={calificacion} onChange={setCalificacion} />
        <div className="botones-paso">
          <BotonAccion className="btn-atras" onClick={atras}>Atrás</BotonAccion>
          <BotonAccion type="submit" className="btn-opcion">Enviar recomendación</BotonAccion>
        </div>
      </Paso>
    </form>
  );
}