import { profeMateriaCursoAdapter } from "./profeMateriaCursoAdapter.js";

export const cursoAdapter = (curso) => {
    const profeMaterias = curso.profeMaterias?.map(pm => profeMateriaCursoAdapter(pm)) || [];

    const escuela = curso.escuela || {}; // Usa un objeto vacío por defecto
    
    const formatearCurso = {
        idCurso: curso.idCurso,
        anio: curso.anio,
        escuela: {
            nombre: escuela.nombre || 'Nombre no disponible', // Valor por defecto
            idEscuela: escuela.idEscuela || 'ID no disponible' // Valor por defecto
        },
        grado: curso.grado,
        profeMaterias: profeMaterias
    }
    return formatearCurso;
}