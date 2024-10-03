import { useState } from 'react';
import './mostrarPrecios.css'
import { isFiniteNumber } from '../../funciones/utilidades.function';
import { crearPrecio, editarPrecio } from '../../servicios/precios.service';
import Cargando from '../../componentes/cargando/cargando';
import Formulario from '../../componentes/formulario/formulario';
import Inputs from '../../componentes/input/input';

const errorInicial = {
  error: '',
  importe: '',
  tipo: ''
};

function CargarPrecio({ setIsAlerta, precioAeditar }) {
  const [newPrecio, setNewPrecio] = useState({
    tipo: precioAeditar ? precioAeditar.tipo : '',
    importe: precioAeditar ? precioAeditar.importe: '',
  });
  const [cargando, setCargando] = useState(false);
  const [textCargando, setTextCargando] = useState('Procesando la carga de precio')
  const [clasError, setClasError] = useState('sugerencia-error');
  const [errorFetch, setErrorFetch] = useState('');
  const [error, setError] = useState({
    ...errorInicial,
    error: 'Debe completar todos los campos'
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewPrecio({
      ...newPrecio,
      [name]: value
    })
  };
  const validarError = () => {
    const newError = errorInicial;
    if (!newPrecio.tipo) {
      newError.tipo = 'El precio debe tener un nombre';
      newError.error = 'Tiene errores en la solicitud';
    }
    if (!newPrecio.importe || !isFiniteNumber(Number(newPrecio.importe))) {
      newError.importe = 'El precio debe tener un importe válido (en números)';
      newError.error = 'Tiene errores en la solicitud';
    }

    return newError.error ? newError : null;
  }

  const handleGuardar = async () => {
    const errores = validarError();
    if (errores) {
      setError(errores);
      setTextCargando(errores.error)
      setClasError('');
      return
    }
    setCargando(true);
    const precioActualizado = precioAeditar
      ? editarPrecio(precioAeditar.idPrecios, newPrecio, setErrorFetch)
      : crearPrecio(newPrecio, setErrorFetch);
    if (precioActualizado) {
      setIsAlerta(false);
      setCargando(false);
    }
  }

  if (cargando) return (
    <Cargando text={textCargando} error={errorFetch} />
  )

  return (
    <Formulario
      handleForm={(e) => { handleGuardar(e) }}
      textBtn={'Confirmar'}
      subtitulo={precioAeditar? 'Editar precio' : 'Nuevo precio'}
      error={error.error}
      classError={clasError}
      children={
        <>
          <Inputs
            name={'tipo'}
            texto={'Nombre del precio'}
            tipo={'text'}
            valor={newPrecio.tipo}
            error={error.tipo}
            handleOnChange={(e) => handleOnChange(e)}
          />
          <Inputs
            name={'importe'}
            texto={'Importe'}
            tipo={'text'}
            valor={newPrecio.importe}
            error={error.importe}
            handleOnChange={(e) => handleOnChange(e)}
          />
        </>
      }
    />
  )
}

export default CargarPrecio;