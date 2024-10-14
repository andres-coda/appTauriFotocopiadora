import { useEffect, useState } from 'react';
import './mostrarEscuela.css'
import { useGlobalContext } from '../../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import MiniNav from '../../../componentes/miniHeder/miniNav';
import LeftArrow from '../../../assets/arrowLeft.svg'
import Add from '../../../assets/add.svg'
import MostrarEscuelaInterno from './mostrarEscuelaInterno';
import CargarEscuela from '../cargar/cargarEscuela';
import { useModalContext } from '../../../contexto/modalContexto';
import Modal from '../../../componentes/modal/modal';

function MostrarEscuela() {
  const {estadoModal, setEstadoModal} = useModalContext()
  const [escAEditar, setEscAEditar] = useState(null);
  const { datos } = useGlobalContext();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleEditarEscuela = (esc) => {
    setModal(true);
    setEscAEditar(esc);
    setEstadoModal(true);
  }

  return (
    <>
      <MiniNav
        children={
          <>
            <li onClick={(e) => navigate(-1)}
              title='Atras'
              className='btn-add'
            ><img src={LeftArrow} alt='Atras' /></li>
            <li 
              onClick={() => { setEstadoModal(true), setModal(true)}}
              className='btn-add'
              title='Nueva escuela'
            ><img src={Add} alt='Nueva escuela' /></li>
          </>
        }
      />
      <h2 className='formulario-h2'>Lista de escuelas</h2>
      {datos.escuelas?.map((esc, index) => (    
        <MostrarEscuelaInterno esc={esc} key={`esc-${index}`} setEscAEditar={handleEditarEscuela} />
      ))}
      
      <Modal children={<CargarEscuela escAEditar={escAEditar} />} modal={modal} setModal={setModal}/>
    </>
  )
}

export default MostrarEscuela;