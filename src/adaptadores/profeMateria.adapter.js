import { cursoAdapter } from "./curso.adapter.js";
import { profeMateriaCursoAdapter } from "./profeMateriaCursoAdapter.js";

export const profeMateriaAdapter = (profMateria) => {
    const curso = cursoAdapter(profMateria.curso);
    const newProfMateria = profeMateriaCursoAdapter(profMateria);
    const formatearProfeMateria = {
        ...newProfMateria,
        curso:curso,
    }
    return formatearProfeMateria;
}