
import Cargando from '../../../componentes/cargando/cargando';
import { quitarProfeMateriaCurso } from '../../../servicios/curso.service';
import MostrarCursoInterno from './mostrarCursoInterno';
import './mostrarEscuela.css'
import { useContext, useState } from 'react'
import MostrarProfMat from './mostrarProfMat';
import { contexto } from '../../../contexto/contexto';

function MostrarCurso({ curso, handleCurso, eliminar }) {
  const { setDatos } = useContext(contexto);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('')

  const handleEliminarProfeMateria = async (profeMateria) => {
    setCargando(true);
    const newCurso = await quitarProfeMateriaCurso(curso.idCurso, profeMateria, setError)
    if (newCurso) {
      setCargando(false)
    }
  }

  if (!curso) return null;

  if (cargando) return (
    <Cargando />
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