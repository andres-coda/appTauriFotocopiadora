import { cursoAdapter } from "./curso.adapter.js";

export const escuelaAdapter = (escuela) => {
    const cursos = escuela.cursos?.map(curso=>cursoAdapter(curso));
    const escuelaFormateada = {
        idEscuela : escuela.idEscuela,
        nombre: escuela.nombre,
        direccion: escuela.direccion,
        numero: escuela.numero,
        email: escuela.email,
        cursos: cursos
    }
    return escuelaFormateada;
}