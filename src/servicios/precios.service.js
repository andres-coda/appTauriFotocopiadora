import { URL_PRECIOS } from "../endPoint/endpoint.ts";
import { fetchDelete, fetchGet, fetchPost, fetchPut } from "../funciones/fetch.function.js";

export const crearPrecio = async (precio, setError) => {
    try {
        const newPrecio = await fetchPost(URL_PRECIOS, precio, setError);
        if (newPrecio) {
            console.log('Precio creado con exito');            
            return newPrecio
        }
    } catch (error) {
        setError( error.message || 'Error desconocido al procesar la solicitud');
        console.error( error.message || 'Error desconocido al procesar la solicitud');
        
    }
}

export const editarPrecio = async (idPrecios, precio, setError) => {
    try {
        const newPrecio = await fetchPut(`${URL_PRECIOS}/${idPrecios}`, precio, setError);
        if (newPrecio) {
            console.log('Precio actualizado con exito');            
            return newPrecio
        }
    } catch (error) {
        setError( error.message || 'Error desconocido al procesar la solicitud');
        console.error( error.message || 'Error desconocido al procesar la solicitud');
        
    }
}

export const eliminarPrecio = async (idPrecios, setError, setDatos) => {
    try {
        const newPrecio = await fetchDelete(`${URL_PRECIOS}/${idPrecios}`, setError);
        if (newPrecio) {
            console.log('Precio actualizado con exito');            
            return newPrecio
        }
    } catch (error) {
        setError( error.message || 'Error desconocido al procesar la solicitud');
        console.error( error.message || 'Error desconocido al procesar la solicitud');
        
    }
}

export const leerPrecios = async (setDatos, setError) => {
    try {
        console.log(`Fetching precios ...`);
        const res = await fetchGet(URL_PRECIOS, setError);
        if (res) {
          setDatos((prev)=>({...prev, precios:res}))
        }
      }catch(error) {
        setError(`Error fetching precios, ${error}`)
        console.error("Error fetching precios", error);
      }
}
