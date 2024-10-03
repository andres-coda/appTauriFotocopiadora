import { especificacionesAdapter } from "../adaptadores/especificaciones.adapter";
import { estadoAdapter } from "../adaptadores/estado.adapter";
import { URL_ESPECIF, URL_ESTADOS } from "../endPoint/endpoint.ts";
import { fetchGet } from "../funciones/fetch.function";

export const leerEstados = async (setDatos, setError) => {
    try {
      console.log("Fetching estados...");
      const res = await fetchGet(URL_ESTADOS, setError);
      if (res) {
        const estados = res.length>0 ? res.map(estado => estadoAdapter(estado)) : [];
        setDatos((prev) => ({ ...prev, estados: estados }));
      }
    } catch (error) {
        setError(`Error fetching estados: ${error}`)
      console.error("Error fetching estados", error);
    }
  }
  
  export const leerEspecificaciones= async (setDatos, setError) => {
    try {
      console.log(`Fetching especificaciones ...`);
      const res = await fetchGet(URL_ESPECIF, setError);
      if (res) {
        const especificaciones = res.length>0 ? res.map(esp=> especificacionesAdapter(esp)) : [];
        setDatos((prev)=>({...prev, especificaciones:especificaciones}))
      }
    }catch(error) {
        setError(`Error fetching especificaciones: ${error}`)
      console.error("Error fetching especificaciones", error);
    }
  }