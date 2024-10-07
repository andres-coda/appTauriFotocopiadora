import { errorClienteInicial } from "../../hooks/cliente/cargar/clienteFormDefault";
import { isFiniteNumber } from '../utilidades.function.js'

export const validarCliente = (persona) => {
    const newError = {...errorClienteInicial}

        newError.error = '';
        
        if (!persona.nombre && !persona.celular) {
          newError.nombre = 'El campo nombre o celular debe estar completo';
          newError.celular = 'El campo nombre o celular debe estar completo';
          newError.error = "tiene errores en la carga de datos"
          console.log('1er if', newError);
          
        }
        
        if (persona.celular && !isFiniteNumber(Number(persona.celular)) || persona.celular && persona.celular.length < 9) {
            newError.celular = 'El celular debe ser un número valido y tener minimo 9 digitos';
            newError.error = "tiene errores en la carga de datos";
            console.log('Segundo if', persona);
        }

    return newError;
}


