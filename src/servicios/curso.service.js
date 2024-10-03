import { cursoAdapter } from "../adaptadores/curso.adapter.js";
import { URL_CURSOS, URL_PROFE_MATERIA } from "../endPoint/endpoint.ts";
import { fetchGet, fetchPatCh, fetchPost } from "../funciones/fetch.function";

export const quitarLibroProfeMateria = async (cursoEliminar, libro, setError) => {
    try {
        const profMatActualizado = await fetchGet(URL_PROFE_MATERIA + '/' + cursoEliminar.idProfeMateria + '/profeMateria-subtract-libro'+'/'+ libro.idLibro, setError);
        if (profMatActualizado) {
            console.log('Curso agregado');            
        }
      } catch (error) {
        setError(`Error al quitar el curso del libro: ${error}`)
        console.error(error);
      }
}

export const agregarLibroProfeMateria = async (prMat, libro, setError) => {
    try {
        const profMatActualizado = await fetchPatCh(URL_PROFE_MATERIA+'/'+prMat.idProfMateria+ '/profeMateria-add-libro', libro, setError);
        if (profMatActualizado) {
          console.log('Curso agregado');
        }  
      } catch (error) {
        setError(`Error al agregar el curso al libro: ${error}`)
        console.error(error);
      }
}

export const quitarProfeMateriaCurso = async (idCurso, profeMateria, setError) =>{
  try {
    const newCurso = await fetchPatCh(
      URL_CURSOS + '/' + idCurso + '/profeMateria-subtract',
      profeMateria
    )
    if (newCurso) {
      console.log('el profe y la materia fueron quitados');
      return newCurso
    }
  } catch (error) {
    setError(`Error al quitar el curso del profe materia: ${error}`)
    console.error(`Error al quitar el curso del profe materia: ${error}`);

  }
}

export const crearCurso = async (dto, setError) => {
  try {
    const newCurso = await fetchPost(URL_CURSOS+'/profeMateria-add', dto, setError);
    if (newCurso) {
      const cursoAdaptado = cursoAdapter(newCurso)
      return cursoAdaptado;
    }
  } catch (error) {
    setError((prev) => ({ ...prev, error: error.message || 'Error desconocido al procesar la solicitud' }));
    console.error('Error al procesar la solicitud:', error.message);
  }
}

export const leerCursos = async (setDatos, setError ) => {
  try {
    console.log("Fetching cursos...");
    const res = await fetchGet(URL_CURSOS, setError);
    if (res) {
      const newRes = res.map(curso=>cursoAdapter(curso));
      setDatos((prev) => ({ ...prev, cursos: newRes }));
    }

  } catch (error) {
    setError(`Error fetching materias, ${error}`)
    console.error("Error fetching materias", error);
  }
}