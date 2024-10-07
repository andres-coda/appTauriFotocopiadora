import { errorClienteInicial } from "../../hooks/cliente/cargar/clienteFormDefault";

export const validarLibro = (libro) =>{
        // Define un objeto para almacenar los errores
        const newError = {...errorClienteInicial};
        newError.error = '';
    
        // Verifica si el libro tiene nombre
        if (!libro.nombre) {
          newError.nombre = 'El libro debe tener un nombre';
          newError.error = 'Tiene errores en la solicitud';
        }
        // Verifica si el libro tiene cantidad de páginas
        else if (!libro.cantidadPg) {
          newError.cantidadPg = 'El libro debe tener la cantidad de páginas';
          newError.error = 'Tiene errores en la solicitud';
        }
        return newError;
      };
      