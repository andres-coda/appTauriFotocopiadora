import Inputs from "../../../componentes/input/input";
import AlertaCoincidencias from "../../../componentes/alertas/alertaCoincidencias/alertaCoincidencias";
import BotonAdd from "../../../componentesStilos/botones/botonAdd";
import usePedidoAgregarLibro from "../../../hooks/pedido/cargar/usePedidoAgregarLibro";
import { useContext } from "react";
import { contexto } from "../../../contexto/contexto";
import usePedidoForm from "../../../hooks/pedido/cargar/usePedidoForm";

function LibroBuscar({setAlertaNew}) {  
  const {pedidos, currentPedidoIndex} = useContext(contexto);
  const { onChangeLibro, coincidenciasLibro, alertaCoincidenciaLibro, handleSelecLibro } = usePedidoForm()

  const handleNuevoLibro = (e) => {
    e.preventDefault()
    setAlertaNew(true);
  }

  return (
    <>
      <div className="form-doble">
        <Inputs
          name={'nombre'}
          texto={'Nombre del libro'}
          tipo={'text'}
          handleOnChange={(e) => onChangeLibro(e)}
          valor={pedidos[currentPedidoIndex].libro.nombre || ""}
        />
        <BotonAdd titulo={'Nuevo libro'} onClick={(e) => handleNuevoLibro(e)} />
      </div>

      <AlertaCoincidencias
        isAlerta={alertaCoincidenciaLibro}
        children={
          <>
            {coincidenciasLibro.map((libro, index) => (
              <li key={`nombre-${index}`} onClick={() => handleSelecLibro(libro)}>
                <h6>{libro.nombre}</h6>
                <div>
                  {libro.materia ? <p>Materia: {libro.materia.nombre}</p> : null}
                  <p>Edición: {libro.edicion}</p>
                  <p>Autor: {libro.autor}</p>
                  <p>Pg: {libro.cantidadPg}</p>
                </div>
              </li>
            ))}
          </>
        }
      />
    </>
  )
}

export default LibroBuscar;