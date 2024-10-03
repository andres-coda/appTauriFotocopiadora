import { escuelaAdapter } from "../adaptadores/escuela.adapter.js";
import { materiaAdapter } from "../adaptadores/materia.adapter.js";
import { URL_ESCUELAS, URL_MATERIAS } from "../endPoint/endpoint.ts";
import { fetchGet, fetchPost, fetchPut } from "../funciones/fetch.function";

export const cargarNuevoEscuela = async ( escuela, setError) => {
    try{
      const newEscuela = await fetchPost(URL_ESCUELAS, escuela, setError);
      if (newEscuela) {
        console.log('Escuela agregado a la base de datos');      
        return newEscuela;
      }
    } catch (error) {
      setError(`Error al cargar la escuela con id ${escuela.idEscuela}, ${error}`);
      console.error(`Error al cargar la escuela con id ${escuela.idEscuela}, ${error}`);    
    }
  }
  
  export const actualizarNuevoEscuela = async ( idEscuela, escuela, setError ) => {
    try{
      const newEscuela = await fetchPut(URL_ESCUELAS+ '/' + idEscuela, escuela, setError);
      if (newEscuela) {
        console.log('Escuela actualizado con exito'); 
        return newEscuela;     
      }
    } catch (error) {
      setError(`Error al actualizar la escuela con id ${idEscuela}, ${error}`);
      console.error(`Error al actualizar la escuela con id ${idEscuela}, ${error}`);    
    }
  }

  export const leerEscuelas = async (setDatos, setError) => {
    try {
      console.log("Fetching escuelas...");
      const res = await fetchGet(URL_ESCUELAS, setError);
      if (res) {
        const newEscuelas = res.length>0 ? res.map(esc => escuelaAdapter(esc)) : [];
        setDatos((prev) => ({ ...prev, escuelas: newEscuelas }));
      }
    } catch (error) {
      setError(`Error fetching escuelas, ${error}`)
      console.error("Error fetching escuelas", error);
    }
  }

  export const leerMaterias = async (setDatos, setError) => {
    try {
      console.log("Fetching materias...");
      const res = await fetchGet(URL_MATERIAS, setError);
      if (res) {
        const materias = res.length>0 ? res.map(materia=> materiaAdapter(materia)) : [];
        setDatos((prev) => ({ ...prev, materias: materias }));
      }
  
    } catch (error) {
      setError(`Error fetching materias, ${error}`)
      console.error("Error fetching materias", error);
    }
  }