import { useEffect, useState } from 'react';
import './mostrarPrecios.css'
import Cargando from '../../componentes/cargando/cargando';
import BotonEditar from '../../componentesStilos/botones/botonEditar';
import BotonEliminar from '../../componentesStilos/botones/botonEliminar';
import CargarPrecio from './cargarPrecio';
import AlertaEliminar from '../../componentes/alertas/alertaEliminar/alertaEliminar';
import Modal from '../../componentes/modal/modal';
import usePrecioCargar from '../../hooks/precio/cargar/usePrecioCargar';
import { useModalContext } from '../../contexto/modalContexto';

function EditarPrecio({ precio }) {
  const [eliminar, setEliminar] = useState(false);
  const [ editar, setEditar] = useState(false);
  
  const {
    errorEliminar,loadingEliminar,responseEliminar, handleEliminar,
  } = usePrecioCargar(precio);

  const {estadoModal,setEstadoModal} = useModalContext();

  useEffect(()=>{
    if (!estadoModal){
      setEditar(false);
      setEliminar(false);
    }
  },[estadoModal])

  if (errorEliminar || loadingEliminar || responseEliminar) return (
    <Modal
          children={
    <Cargando text={
      errorEliminar ? (
        `Error al intentar eliminar el precio: ${errorEliminar}`
      ) : (
        loadingEliminar 
        ? ('Se esta procesando la eliminación del precio ...')
        : ('Precio eliminado con éxito')
      )} />
    }/>
  )

  return (
    <>
      <div className='precios-card-container'>
        <div className='precios-card'>
          <p>$ {precio.tipo}: </p>
          <p className='alin-derecha'>${precio.importe}</p>
          <BotonEditar 
            clase={'btn-editar-normal'}
            onClick={() =>{setEditar(true), setEstadoModal(true)}}
            titulo={'Editar precio'}
          />
          {precio.idPrecios > 8 
            ? <BotonEliminar 
                clase={'btn-editar-normal'}
                onClick={() => {setEliminar(true), setEstadoModal(true)}}
              />
            : <BotonEliminar 
                clase={'btn-editar-normal edi-desactivado'}
              />
          }
        </div>
      </div>
      {editar ?  <Modal children={ <CargarPrecio precioAeditar={precio} /> } />: null}
      {eliminar ? (
        <Modal
        children={ <AlertaEliminar 
            children={<h6>{`Eliminar el precio ${precio.tipo}`}</h6>}
            handleEliminar={handleEliminar}
            />
          }
      />
      ): null}
    </>
  )
}
export default EditarPrecio;