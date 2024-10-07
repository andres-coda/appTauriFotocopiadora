import { useState } from 'react';
import './mostrarPrecios.css'
import { eliminarPrecio } from '../../servicios/precios.service';
import Cargando from '../../componentes/cargando/cargando';
import BotonEditar from '../../componentesStilos/botones/botonEditar';
import BotonEliminar from '../../componentesStilos/botones/botonEliminar';
import AlertaFormulario from '../../componentes/alertas/alertaFormulario/alertaFormulario';
import CargarPrecio from './cargarPrecio';
import AlertaEliminar from '../../componentes/alertas/alertaEliminar/alertaEliminar';

function EditarPrecio({ precio }) {
  const [editPrecio, setEditPrecio] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [error, setError] = useState('')

  const handleEliminar = async () => {
    if (precio.idPrecios<= 8) {
      setError((prev)=>({...prev, error: 'No se puede eliminar este precio'}));
      return
    }
    setCargando(true);
    const precioEliminar = await eliminarPrecio(precio.idPrecios, setError);
    if (precioEliminar) {
      setCargando(false);
      setEliminar(false);
    }
    }

  if (cargando) return (
    <Cargando text={'Se esta procesando la eliminación del precio'} error={error} />
  )

  return (
    <>
      <div className='precios-card-container'>
        <div className='precios-card'>
          <p>$ {precio.tipo}: </p>
          <p className='alin-derecha'>${precio.importe}</p>
          <BotonEditar 
            clase={'btn-editar-normal'}
            onClick={() =>{console.log(precio), setEditPrecio(true)}}
            titulo={'Editar precio'}
          />
          {precio.idPrecios > 8 
            ? <BotonEliminar 
                clase={'btn-editar-normal'}
                onClick={() => setEliminar(true)}
              />
            : <BotonEliminar 
                clase={'btn-editar-normal edi-desactivado'}
              />
          }
        </div>
      </div>
      <AlertaFormulario
        isAlerta={editPrecio}
        setIsAlerta={setEditPrecio}
        children={
          <CargarPrecio
            precioAeditar={precio}
          />
        }
      />
      <AlertaFormulario
        isAlerta={eliminar}
        setIsAlerta={setEliminar}
        children={
            <AlertaEliminar 
            children={<h6>{`Confirmar eliminar el precio ${precio.tipo}`}</h6>}
            setEliminar={setEliminar}
            handleEliminar={handleEliminar}
            />
            
        }
      />
    </>
  )
}
export default EditarPrecio;