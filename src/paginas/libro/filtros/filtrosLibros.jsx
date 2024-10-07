import { useContext, useState } from 'react';
import FiltroEstilo from '../../../componentesStilos/filtro/filtroEstilo';
import BotonFormulario from '../../../componentesStilos/botones/botonFormulario';
import { contexto } from '../../../contexto/contexto';

function FiltrosLibros({setFuncion, setFiltros, setAlertaFiltro, filtros}) {
  const { datos } = useContext(contexto);
  const [select, setSelect] = useState(true);
  const verificacionFiltro=(condicion) => {
    if (filtros.length < 1) return [];
  return filtros.filter(filtro => 
    (condicion && filtro.idEscuela) || (!condicion && filtro.idMateria)
  );
  }
  const [opcionEscuela, setOpcionEscuela] = useState(verificacionFiltro(true)||[]);
  const [opcionMateria, setOpcionMateria] = useState(verificacionFiltro(false)||[]);
  const [filtroActivo, setFiltroActivo] = useState('materia')
  const handleFiltrar=()=>{
    setFiltros([...opcionMateria, ...opcionEscuela]);
    setFuncion(()=>{
      return(libro)=>{
        const escuelasLibro = libro.profeMaterias?.map(pm => pm.curso.escuela.idEscuela) || [];
        const materiaSelec = opcionMateria.map(m => m.idMateria);
        return (
          (materiaSelec.includes(libro.materia?.idMateria) && opcionEscuela.length<=0) ||
          (opcionEscuela.some(escuela => escuelasLibro.includes(escuela.idEscuela)) && opcionMateria.length<=0) ||
          (materiaSelec.includes(libro.materia?.idMateria) &&opcionEscuela.some(escuela => escuelasLibro.includes(escuela.idEscuela))) ||
          (opcionEscuela.length<=0 && opcionMateria.length<=0)
        );
      }
    });
    setAlertaFiltro(false);
  }

  const handleChangeSelectEscuela = (event) => {
    const id = event.target.value;
    const checked = event.target.checked;
    const selectedEscuela = datos.escuelas.find(escuela => escuela.idEscuela === parseInt(id));
    if (checked) {
      setOpcionEscuela((prevOpcion) => [...prevOpcion, selectedEscuela]);
    } else {
      setOpcionEscuela((prevOpcion) => prevOpcion.filter((item) => item.idEscuela !== selectedEscuela.idEscuela));
    }
  };

  const handleChangeSelectMateria = (event) => {
    const id = event.target.value;
    const checked = event.target.checked;
    const selectedMateria = datos.materias.find(materia => materia.idMateria === parseInt(id));
    if (checked) {
      setOpcionMateria((prevOpcion) => [...prevOpcion, selectedMateria]);
    } else {
      setOpcionMateria((prevOpcion) => prevOpcion.filter((item) => item.idMateria !== selectedMateria.idMateria));
    }
  };

  const handleSelectEscuela = () => {
    setFiltroActivo('escuela')
    setSelect(false)
  }

  const handleSelectMateria = () => {
    setFiltroActivo('materia')
    setSelect(true)
  }

  return (
    <FiltroEstilo
      childrenBtn={
        <BotonFormulario
          textBtn={'Filtrar'}
          onClick={handleFiltrar}
        />
      }
      childrenDerecha={
        <>
          <li onClick={handleSelectMateria} className={filtroActivo === 'materia' ? 'filtro-activo' : ''}>Materia</li>
          <li onClick={handleSelectEscuela} className={filtroActivo === 'escuela' ? 'filtro-activo' : ''}>Escuela</li>
        </>
      }
      childrenIzquierda={
        <>
          {select ? (
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