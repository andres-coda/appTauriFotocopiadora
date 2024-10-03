import { clienteAdapter } from "./cliente.adapter.js";
import { materiaAdapter } from "./materia.adapter.js";

export const profeMateriaCursoAdapter = (profMateria) => {
    const libros = profMateria.libro?.map(libro => ({ idLibro: libro.idLibro, nombre: libro.nombre }));
    const profe = clienteAdapter(profMateria.profesor);
    const materia = materiaAdapter(profMateria.materia);
    const formatearProfeMateria = {
        idProfMateria: profMateria.idProfeMateria,
        idCurso: profMateria.idCurso,
        materia: materia,
        profesor:profe,
        libros:libros
    }
    return formatearProfeMateria;
}