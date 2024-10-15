import './mostrarEscuela.css'
import User from '../../../assets/userCheck.svg';
import BotonEliminar from '../../../componentesStilos/botones/botonEliminar';
import { useState } from 'react';
import Modal from '../../../componentes/modal/modal';
import AlertaEliminar from '../../../componentes/alertas/alertaEliminar/alertaEliminar';
import { useModalContext } from '../../../contexto/modalContexto';

function MostrarProfMat( {prMat, handleCurso, eliminar, handleEliminarProfeMateria}) {
  const [alertaEliminar, setAlertaEliminar] = useState(false);
  const {setEstadoModal} = useModalContext();

  return (
    <>
    <div className='escuela-cursos-inf' onClick={() => handleCurso(prMat)}>
      <p>{prMat.materia.nombre}</p>
      <p><img src={User} alt='Profe' /> {prMat.profesor.nombre}</p>
      {eliminar ? 
        <BotonEliminar 
        onClick={() => {setAlertaEliminar(true), setEstadoModal(true)}}
        titulo={'Eliminar la materia y el profesor del curso'}
        />
        : null}
    </div>
    <Modal children={
      <AlertaEliminar 
        children={<h6>Quitar el profesor y la materia</h6>}
        setEliminar={setEstadoModal}
        handleEliminar={() => {handleEliminarProfeMateria(prMat), setAlertaEliminar(false)}}
      />
    } modal={alertaEliminar} setModal={setAlertaEliminar}/>
    </>
  )
}

export default MostrarProfMat;