import Formulario from "../../../componentes/formulario/formulario";
import Inputs from "../../../componentes/input/input";
import ClienteCargarInterno from "../../cliente/cargar/clienteCargarInterno";
import AlertaCoincidencias from "../../../componentes/alertas/alertaCoincidencias/alertaCoincidencias";
import useCargarCurso from "../../../hooks/cursos/useCargarCurso";

function CargarCurso({cursoAEditar, escuela }) {
  const {
    onChangeMateria, handleSelecMateria, coincidenciasMateria, isAlertaMateria,
    profesor, onChangeProfesor, coinPersona, alertaCoinPersona, handleSelecPersona,
    curso, onChangeCurso, errorFrom, agregarCurso,
    errorFetch, loading, response, 
  } = useCargarCurso(cursoAEditar);

  if (loading || errorFetch || response) return (
    <>
        {
          loading 
            ? (<h6>{cursoAEditar ? `Editando curso ...` : `Creando curso ...`}</h6>) 
            : errorFetch 
              ? (<h6>{cursoAEditar ? `Error al editar el curso: ${errorFetch}` : `Error al crear curso: ${errorFetch}`}</h6>) 
              : <h6>{cursoAEditar ? `Curso editado con exito` : `Curso creado con exito`}</h6>
        }
              </>
     
  )
  
  return (
    <Formulario
      handleForm={() => agregarCurso(escuela)}
      textBtn={cursoAEditar ? 'Editar curso' : 'Cargar curso'}
      subtitulo={cursoAEditar ? 'Editar curso' : 'Cargar curso'}
      error={errorFrom.error}
      children={
        <>
          <Inputs
            name={'anio'}
            texto={'Año'}
            tipo={'text'}
            error={errorFrom.anio}
            handleOnChange={(e) => onChangeCurso(e)}
            valor={curso.anio}
          />
          <Inputs
            name={'grado'}
            texto={'Grado'}
            tipo={'text'}
            error={errorFrom.grado}
            handleOnChange={(e) => onChangeCurso(e)}
            valor={curso.grado}
          />
          <h5>Datos del profesor</h5>
          <ClienteCargarInterno
                        persona={profesor}
                        error={errorFrom}
                        coincidencias={coinPersona}
                        alerta={alertaCoinPersona}
                        handleSelec={handleSelecPersona}
                        handleOnChange={onChangeProfesor}
                      />
          <Inputs
            name={'materia.nombre'}
            texto={'Materia'}
            tipo={'materia'}
            error={errorFrom.materia}
            handleOnChange={(e)=>onChangeMateria(e)}
            valor={curso.materia.nombre}
          />
          <AlertaCoincidencias
          isAlerta={isAlertaMateria}
          children={
            <>
              {coincidenciasMateria.map((materia, index) => (
                <li key={`materia-${index}`} onClick={() => handleSelecMateria(materia)}>
                  <h6>{materia.nombre}</h6>
                </li>
              ))}
            </>
          }
        />
        </>
      }
    />
  )
}

export default CargarCurso;