import Formulario from "../../../componentes/formulario/formulario";
import Inputs from "../../../componentes/input/input";
import useEscuelaForm from "../../../hooks/escuela/useEscuelaForm";

function CargarEscuela({ escAEditar }) {
  const {
    onchange, cargarEscuela, 
    escuela, errorFrom,
    response, errorFetch, loading,
  }=useEscuelaForm(escAEditar);

  if (loading || errorFetch || response) return (
    <>
        {
          loading 
            ? (<h6>{escAEditar ? `Editando escuela ...` : `Creando escuela ...`}</h6>) 
            : errorFetch 
              ? (<h6>{escAEditar ? `Error al editar la escuela: ${errorFetch}` : `Error al crear escuela: ${errorFetch}`}</h6>) 
              : <h6>{escAEditar ? `Escuela editada con éxito` : `Escuela creada con éxito`}</h6>
        }
              </>
     
  )

  return (
    <Formulario
      handleForm={(e) => cargarEscuela(e)}
      textBtn={escAEditar ? 'Editar escuela' : 'Cargar escuela'}
      subtitulo={escAEditar ? 'Editar escuela' : 'Cargar escuela'}
      error={errorFrom.error}
      children={
        <>
          <Inputs
            name={'nombre'}
            texto={'Nombre'}
            tipo={'text'}
            error={errorFrom.nombre}
            handleOnChange={(e) => onchange(e)}
            valor={escuela.nombre}
          />
          <Inputs
            name={'direccion'}
            texto={'Dirección'}
            tipo={'text'}
            error={errorFrom.direccion}
            handleOnChange={(e) => onchange(e)}
            valor={escuela.direccion}
          />
          <Inputs
            name={'numero'}
            texto={'Celular'}
            tipo={'phone'}
            error={errorFrom.numero}
            handleOnChange={(e) => onchange(e)}
            valor={escuela.numero}
          />
          <Inputs
            name={'email'}
            texto={'Email'}
            tipo={'email'}
            error={errorFrom.email}
            handleOnChange={(e) => onchange(e)}
            valor={escuela.email}
          />
        </>
      }
    />
  )
}

export default CargarEscuela;