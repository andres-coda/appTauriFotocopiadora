import { libroAdapterGeneral } from "../adaptadores/libro.adapter.js";
import { libroParticularAdapter } from "../adaptadores/libroParticular.adapter.js";
import { URL_IMGSUBIR, URL_LIBROS } from "../endPoint/endpoint.ts";
import { fetchDelete, fetchGet, fetchPatCh, fetchPost, fetchPostImg, fetchPut } from "../funciones/fetch.function.js";

export const leerLibros = async (setDatos, setError) => {
  try {
    console.log("Fetching libros...");
    const res = await fetchGet(URL_LIBROS, setError);
    if (res) {
      const newRes = res?.map(libro => libroAdapterGeneral(libro));
      setDatos((prev) => ({ ...prev, libros: newRes }));
    }

  } catch (error) {
    setError(`Error fetching libros: ${error}`)
    console.error("Error fetching libros", error);
  }
}

export const leerLibroActual = async (idLibro, setDatos, setError) => {
  try {
    console.log(`Fetching libro ${idLibro}...`);
    const res = await fetchGet(URL_LIBROS + '/' + idLibro, setError);
    if (res) {
      const newRes = libroParticularAdapter(res)
      setDatos((prev) => ({ ...prev, libroActual: newRes }));
      return (newRes);
    }
  } catch (error) {
    setError(`Error en el fetching de libro id ${idLibro}, ${error}`)
    console.error(`Error en el fetching de libro id ${idLibro}: `, error);
  }
}

export const cargarNuevoLibro = async ( libro, setError) => {
  try{
    const newLibro = await fetchPost(URL_LIBROS, libro, setError);
    if (newLibro) {
      console.log('Libro agregado a la base de datos');      
    }
  } catch (error) {
    setError(`Error al cargar el libro libro id ${libro.idLibro}, ${error}`);
    console.error(`Error al cargar el libro libro id ${libro.idLibro}, ${error}`);    
  }
}

export const actualizarNuevoLibro = async ( idLibro, libro, setError ) => {
  try{
    const newLibro = await fetchPut(URL_LIBROS+ '/' + idLibro, libro, setError);
    if (newLibro) {
      console.log('Libro actualizado con exito');      
    }
  } catch (error) {
    setError(`Error al actualizar el libro libro id ${idLibro}, ${error}`);
    console.error(`Error al actualizar el libro libro id ${idLibro}, ${error}`);    
  }
}

export const subirImagen = async (formData, setUrlImg, setBtnSubir, setEstadoSubida) => {
  try {
    const response = await fetchPostImg(URL_IMGSUBIR, formData)
    if (response) {
      setUrlImg(response.imageUrl);
      setEstadoSubida('Imagen subida con éxito: ' + response.imageUrl);
    }

  } catch (error) {
    setEstadoSubida('Error subiendo la imagen: ' + error.message);
    setBtnSubir(true);
  }
}

export const eliminarLibro = async (idLibro, setError) => {
  try{
    const libroEliminar = await fetchDelete(URL_LIBROS+'/'+idLibro, setError);
    if (libroEliminar) {
      console.log('Libro eliminado con exito');
    }
  } catch (err){
    setError(`No se pudo eliminar el libro, ${err.message}`);
    console.log('tengo el error'+err);
    
  }
}