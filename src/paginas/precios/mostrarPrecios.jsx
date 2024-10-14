import './mostrarPrecios.css';
import LeftArrow from '../../assets/arrowLeft.svg'
import Nuevo from  '../../assets/add.svg';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contexto } from '../../contexto/contexto';
import MiniNav from '../../componentes/miniHeder/miniNav.jsx';
import CargarPrecio from './cargarPrecio.jsx';
import EditarPrecio from './precioEditar.jsx'
import Modal from '../../componentes/modal/modal.jsx';
import { useModalContext } from '../../contexto/modalContexto.jsx';

function MostrarPrecios() {
  const { datos } = useContext(contexto);
  const navigate = useNavigate();
  const {estadoModal, setEstadoModal} = useModalContext();
  const [cargarPrecio, setCargarPrecio] = useState(false)
  
  useEffect(()=>{
    if (!estadoModal){
      setCargarPrecio(false);
    }
  },[estadoModal])

  return (
    <>
      <MiniNav
        children={
          <>
            <li onClick={() => navigate(-1)}
              title='Atras'
              className='btn-add'
            ><img src={LeftArrow} alt='Atras' /></li>
            <li 
              onClick={()=>{setCargarPrecio(true), setEstadoModal(true)}}
              title='Nuevo precio'
              className='btn-add'
            ><img src={Nuevo} alt='Nuevo precio' /></li>
          </>
        }
      />
       <h2 className='formulario-h2'>Lista de precios</h2>
      {datos.precios?.map((precio, index) => (
        <EditarPrecio key={`precios-${index}`} precio={precio} />
      ))}
      {cargarPrecio? <Modal children={<CargarPrecio />} />:null}
    </>
  )
}

export default MostrarPrecios;