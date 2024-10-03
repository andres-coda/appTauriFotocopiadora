import { materiaAdapter } from "./materia.adapter.js";
import { stockAdapter } from "./stock.adapter.js";

export const libroAdapterGeneral = (libro) => {
    // Verifica que 'libro' no sea null o undefined y que tenga las propiedades esperadas
    const stocks = Array.isArray(libro?.stock) 
        ? libro.stock.map(st => stockAdapter(st)) 
        : []; // Si 'stock' no existe, asigna un array vacío

    const profeMaterias = Array.isArray(libro?.profeMaterias) 
        ? libro.profeMaterias.map(pm => ({
            curso: {
                escuela: {
                    nombre: pm?.curso?.escuela?.nombre || 'Desconocido', // Maneja undefined
                    idEscuela: pm?.curso?.escuela?.idEscuela || null,   // Maneja undefined
                }
            }
          }))
        : []; // Si 'profeMaterias' no existe, asigna un array vacío

    const materia = materiaAdapter(libro?.materia || {}); // Maneja undefined en 'materia'

    const libroFormateado = {
        idLibro: libro?.idLibro || null,         // Maneja undefined
        nombre: libro?.nombre || 'Desconocido',  // Maneja undefined
        descripcion: libro?.descripcion || '',   // Maneja undefined
        edicion: libro?.edicion || 'No disponible',
        img: libro?.img || '',
        cantidadPg: libro?.cantidadPg || 0,      // Valor por defecto en caso de undefined
        autor: libro?.autor || 'Anónimo',        // Valor por defecto en caso de undefined
        materia: materia,
        stock: stocks,
        profeMaterias: profeMaterias,
    };

    return libroFormateado;
};