import '../pedidoCargar.css'
import AlertaCoincidencias from "../../../../componentes/alertas/alertaCoincidencias/alertaCoincidencias";
import Inputs from "../../../../componentes/input/input";
import BotonAdd from "../../../../componentesStilos/botones/botonAdd";
import { useModalContext } from '../../../../contexto/modalContexto';
import Modal from '../../../../componentes/modal/modal';
import LibroCargar from '../../../libro/cargar/libroCargar';
import { useEffect, useState } from 'react';
import usePedidoManager from '../../../../hooks/pedido/cargar/usePedidoManager';
import { useGlobalContext } from '../../../../contexto/contexto';

function AgregarLibro() {
  const {estadoModal,setEstadoModal} = useModalContext();
  const [crearLibro, setCrearLibro] = useState(false);
  const {pedidos, currentPedidoIndex} = useGlobalContext();

  const {
    onChangeLibro, libro, coincidenciasLibro, alertaCoincidenciaLibro, handleSelecLibro
  } = usePedidoManager()

  const handleNuevoLibro = (e) => {
    e.preventDefault()
    setCrearLibro(true)
    setEstadoModal(true);
  };

  useEffect(()=>{
    console.log('cambio libro', libro.nombre);
    
  }, [libro])

  useEffect(()=>{
    if (!estadoModal) {
      setCrearLibro(false);
    }
  },[estadoModal])

  return (
    <>
      <div className="form-doble">
        <Inputs
          name={'nombre'}
          texto={'Nombre del libro'}
          tipo={'text'}
          handleOnChange={(e) => onChangeLibro(e)}
          valor={pedidos[currentPedidoIndex].libro.nombre}
        />
        <BotonAdd titulo={'Nuevo libro'} onClick={(e) => handleNuevoLibro(e)} />
      </div>

      <AlertaCoincidencias
        isAlerta={alertaCoincidenciaLibro}
        children={
          <>
            {coincidenciasLibro.map((libro, index) => (
              <li key={`nombre-${index}`} onClick={(e) => handleSelecLibro(e,libro)}>
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
      { crearLibro ? (          
          <Modal 
          children={
            <LibroCargar setAlerta={setEstadoModal} />
          }
          />
        )   : null
      }
    </>
  )
}

export default AgregarLibro;