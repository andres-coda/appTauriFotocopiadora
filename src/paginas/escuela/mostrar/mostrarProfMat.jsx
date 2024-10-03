import './mostrarEscuela.css'
import User from '../../../assets/userCheck.svg';
import BotonEliminar from '../../../componentesStilos/botones/botonEliminar';

function MostrarProfMat( {prMat, handleCurso, eliminar, handleEliminarProfeMateria}) {
  return (
    <div className='escuela-cursos-inf' onClick={() => handleCurso(prMat)}>
      <p>{prMat.materia.nombre}</p>
      <p><img src={User} alt='Profe' /> {prMat.profesor.nombre}</p>
      {eliminar ? 
        <BotonEliminar 
          onClick={() => handleEliminarProfeMateria(prMat)}
          titulo={'Eliminar la materia y el profesor del curso'}
        />
       : null}
    </div>
  )
}

export default MostrarProfMat;