export const errorInicial = {
  nombre: '',
  error: '',
  direccion: '',
  numero: '',
  email: ''
}

export const escuelaInicial = {
  nombre: '',
  direccion: '',
  numero: '',
  email: ''
}

export const validarErrorEscuela = (libro) => {
  const newError = errorInicial;
  if (!libro.nombre) {
    newError.nombre = 'La escuela debe tener un nombre';
    newError.error = 'Tiene errores en la solicitud';
  }
  return newError
};