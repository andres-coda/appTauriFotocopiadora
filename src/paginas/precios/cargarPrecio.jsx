import { useState } from 'react';
import './mostrarPrecios.css'
import { isFiniteNumber } from '../../funciones/utilidades.function';
import Cargando from '../../componentes/cargando/cargando';
import Formulario from '../../componentes/formulario/formulario';
import Inputs from '../../componentes/input/input';
import usePutApi from '../../hooks/Api/usePutApi';
import { URL_PRECIOS } from '../../endPoint/endpoint.ts';
import usePostApi from '../../hooks/Api/usePostApi';

const errorInicial = {
  error: '',
  importe: '',
  tipo: ''
};

const url = URL_PRECIOS;

function CargarPrecio({ precioAeditar }) {
  const {postData, loading, error, response } = usePostApi(url);
  const {putData, loading:loadingPut, error:errorPut, response:responsePut} = usePutApi( 
    precioAeditar ? `${url}/${precioAeditar.idPrecios}` : ``);

  const [newPrecio, setNewPrecio] = useState({
    tipo: precioAeditar ? precioAeditar.tipo : '',
    importe: precioAeditar ? precioAeditar.importe: '',
  });

  const [clasError, setClasError] = useState('sugerencia-error');
  const [errorVerif, setErrorVerif] = useState({
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
      setErrorVerif(errores);
      setClasError('');
      return
    }

    if (precioAeditar) {
      putData(newPrecio)
    } else {
      postData(newPrecio);
    }
  }

  if (response || responsePut) {
    return (
      <Cargando text={response ? `Precio creado con exito` : `Precio actualizado con exito`}/>
    )
  }

  if (loading || loadingPut) return (
    <Cargando text={
       loading ? 'Creando nuevo precio ...' : 'Actualizando precio ...'} />
  )

  if (error || errorPut) return (
    <Cargando 
      text={
        error ? error : errorPut
      }
    />
  )

  return (
    <Formulario
      handleForm={(e) => { handleGuardar(e) }}
      textBtn={'Confirmar'}
      subtitulo={precioAeditar? 'Editar precio' : 'Nuevo precio'}
      error={errorVerif.error}
      classError={clasError}
      children={
        <>
          <Inputs
            name={'tipo'}
            texto={'Nombre del precio'}
            tipo={'text'}
            valor={newPrecio.tipo}
            error={errorVerif.tipo}
            handleOnChange={(e) => handleOnChange(e)}
          />
          <Inputs
            name={'importe'}
            texto={'Importe'}
            tipo={'text'}
            valor={newPrecio.importe}
            error={errorVerif.importe}
            handleOnChange={(e) => handleOnChange(e)}
          />
        </>
      }
    />
  )
}

export default CargarPrecio;