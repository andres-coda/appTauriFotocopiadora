import AlertaCoincidencias from "../alertas/alertaCoincidencias/alertaCoincidencias";
import Formulario from "../formulario/formulario";
import Inputs from "../input/input";
import BotonAdd from "../../componentesStilos/botones/botonAdd";
import useBuscar from "../../hooks/buscar/useBuscar";

function Buscar({titulo, childrenAlerta, name, lista, handleNuevoElemento}) {
  const {
    coincidencias, alertaCoincidencia,
    handleChangeSearch, handleSeleccionElemento, errorForm,
    busqueda
  } = useBuscar(lista, name);

  return (
    <>
      <Formulario
        handleForm={()=>{handleSeleccionElemento(coincidencias[0])}}
        subtitulo={titulo}
        children={
          <>
          <div className="form-doble">

            <Inputs
              name={name}
              texto={'Empiece a escribir para buscar'}
              tipo={'text'}
              handleOnChange={(e) => handleChangeSearch(e)}
              valor={busqueda[name]}
              error={errorForm.error}
              />
            <BotonAdd titulo={'Nuevo libro'} onClick={(e) => handleNuevoElemento(e)} />
          </div>
          </>
        }
      />
      <AlertaCoincidencias 
        isAlerta={alertaCoincidencia}
        children={
          coincidencias.map((elemento, index) => (
            <li key={index} onClick={()=>handleSeleccionElemento(elemento)}>
              {childrenAlerta(elemento)}
            </li>
          ))
        }
      />
    </>
  )
}

export default Buscar;