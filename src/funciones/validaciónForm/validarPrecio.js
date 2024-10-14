import { isFiniteNumber } from "../utilidades.function";

export const precioInicial= {
    tipo:'',
    importe:''
}

export const errorPrecioInicial = {
    error: 'Debe completar todos los campos',
    importe: '',
    tipo: ''
  };

export const validarPrecio = (precio) => {
    const newError = {...errorPrecioInicial};
    newError.error='';
    if (!precio.tipo) {
      newError.tipo = 'El precio debe tener un nombre';
      newError.error = 'Tiene errores en la solicitud';
    }
    if (!precio.importe || !isFiniteNumber(Number(precio.importe))) {
      newError.importe = 'El precio debe tener un importe válido (en números)';
      newError.error = 'Tiene errores en la solicitud';
    }

    return newError;
  }