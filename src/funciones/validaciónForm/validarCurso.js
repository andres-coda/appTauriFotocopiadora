import { clienteInicial } from "../../hooks/cliente/cargar/clienteFormDefault";
import { obtenerAnioActual } from "../utilidades.function";

export const errorCursoInicial = {
  anio: '',
  grado: '',
  nombre: '',
  celular: '',
  email: '',
  materia: '',
  error: ''
}

export const cursoIncial = {
  anio: obtenerAnioActual(),
  grado: '',
  profesor: clienteInicial,
  materia: { nombre: '' }
}

export const validarErrorCurso = (dto) => {
  const newError = errorCursoInicial;
  if (!dto.curso.grado) {
    newError.grado = 'El curso debe tener grado';
    newError.error = 'Tiene errores en la solicitud';
  }
  return newError
}