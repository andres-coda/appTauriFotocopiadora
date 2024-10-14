import MostrarCursoInterno from './mostrarCursoInterno';
import './mostrarEscuela.css'
import MostrarProfMat from './mostrarProfMat';
import useCargarCurso from '../../../hooks/cursos/useCargarCurso';

function MostrarCurso({ curso, handleCurso, eliminar }) {
  const {
    responseApi, loadingApi, errorFetchApi, quitarCurso,
  } = useCargarCurso()

  const handleEliminarProfeMateria = async (profeMateria) => {
    quitarCurso(curso.idCurso, profeMateria);
  }
  
  if (!curso) return null;

  if (loadingApi || errorFetchApi || responseApi) return (
    <>
        {
          loadingApi 
            ? (<h6>{`Quitando curso ...`}</h6>) 
            : errorFetchApi 
              ? (<h6>{`Error al quitar el curso: ${errorFetchApi}`}</h6>) 
              : <h6>{`Curso quitado con exito`}</h6>
        }
              </>
     
  )

  return (
    <>
      {curso.profeMaterias?.length > 0 ? (
        <div className='escuela-cursos'>
          <MostrarCursoInterno curso={curso} />
          {curso.profeMaterias?.map((prMat, inde) => (
            <MostrarProfMat
              key={`prMat-${inde}`}
              prMat={prMat}
              handleCurso={handleCurso}
              eliminar={eliminar}
              handleEliminarProfeMateria={handleEliminarProfeMateria}
            />))}
        </div>
      ) : (null)}
    </>
  )
}

export default MostrarCurso;