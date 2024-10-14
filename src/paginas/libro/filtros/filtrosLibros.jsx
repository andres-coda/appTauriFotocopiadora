import FiltroEstilo from '../../../componentesStilos/filtro/filtroEstilo';
import BotonFormulario from '../../../componentesStilos/botones/botonFormulario';
import { useGlobalContext } from '../../../contexto/contexto';
import useFiltro from '../../../hooks/filtros/useFiltro';
import { useEffect } from 'react';

function FiltrosLibros() {
  const { datos } = useGlobalContext();
  const {
    opcionEscuela, opcionMateria,
    filtroActivo, setFiltroActivo, 
    handleChangeSelectMateria, handleChangeSelectEscuela, 
    handleFiltrarLibro
  }= useFiltro()

  useEffect(()=>{
    setFiltroActivo('materia')
  },[])

  return (
    <FiltroEstilo
      childrenBtn={
        <BotonFormulario
          textBtn={'Filtrar'}
          onClick={handleFiltrarLibro}
        />
      }
      childrenDerecha={
        <>
          <li onClick={()=>setFiltroActivo('materia')} className={filtroActivo === 'materia' ? 'filtro-activo' : ''}>Materia</li>
          <li onClick={()=>setFiltroActivo('escuela')} className={filtroActivo === 'escuela' ? 'filtro-activo' : ''}>Escuela</li>
        </>
      }
      childrenIzquierda={
        <>
          {filtroActivo ==='materia' ? (
            <ul>
              {datos.materias.map((materia, index) => (
                <li key={`materia-${index}`}>
                  <input
                    type='checkbox'
                    onChange={handleChangeSelectMateria}
                    id={materia.nombre}
                    name='filtro'
                    value={materia.idMateria}
                    checked={opcionMateria.some(option => option.idMateria === materia.idMateria)}
                  />
                  <label htmlFor={materia.nombre} title={materia.nombre}>{materia.nombre}</label>
                </li>
              ))}
            </ul>

          ) : (
            <ul>
              {datos.escuelas.map((escuela, index) => (
                <li key={`escuela-${index}`}>
                  <input
                    type='checkbox'
                    onChange={handleChangeSelectEscuela}
                    id={escuela.nombre}
                    name='filtro'
                    value={escuela.idEscuela}
                    checked={opcionEscuela.some(option => option.idEscuela === escuela.idEscuela)}
                  />
                  <label htmlFor={escuela.nombre} title={escuela.nombre}>{escuela.nombre}</label>
                </li>
              ))}
            </ul>
          )}
        </>
      }
    />
  )
}
export default FiltrosLibros;