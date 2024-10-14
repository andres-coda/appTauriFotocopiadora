import './mostrarPrecios.css'
import Cargando from '../../componentes/cargando/cargando';
import Formulario from '../../componentes/formulario/formulario';
import Inputs from '../../componentes/input/input';
import usePrecioCargar from '../../hooks/precio/cargar/usePrecioCargar.js';

function CargarPrecio({ precioAeditar }) {
 const {
  response, errorFetch, loading,
  handlePrecioGuardar, onchange, precio, errorFrom
 } = usePrecioCargar(precioAeditar)

  if (response) return (
      <Cargando text={!precioAeditar ? `Precio creado con exito` : `Precio actualizado con exito`}/>
    )

  if (loading) return (
    <Cargando text={
       !precioAeditar ? 'Creando nuevo precio ...' : 'Actualizando precio ...'} />
  )

  if (errorFetch) return (
    <Cargando 
      text={
        !precioAeditar ? `Error al intentar crear nuevo precio: ${errorFetch}` : `Error al intentar actualizar el precio: ${errorFetch}`
      }
    />
  )

  return (
    <Formulario
      handleForm={handlePrecioGuardar}
      textBtn={'Confirmar'}
      subtitulo={precioAeditar? 'Editar precio' : 'Nuevo precio'}
      error={errorFrom.error}
      children={
        <>
          <Inputs
            name={'tipo'}
            texto={'Nombre del precio'}
            tipo={'text'}
            valor={precio.tipo}
            error={errorFrom.tipo}
            handleOnChange={(e) => onchange(e)}
          />
          <Inputs
            name={'importe'}
            texto={'Importe'}
            tipo={'text'}
            valor={precio.importe}
            error={errorFrom.importe}
            handleOnChange={(e) => onchange(e)}
          />
        </>
      }
    />
  )
}

export default CargarPrecio;