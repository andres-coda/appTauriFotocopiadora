import { useContext, useState } from "react";
import { contexto } from "../../../contexto/contexto";
import Cargando from "../../../componentes/cargando/cargando";
import Formulario from "../../../componentes/formulario/formulario";
import Inputs from "../../../componentes/input/input";
import ClienteCargarInterno from "../../cliente/cargar/clienteCargarInterno";
import AlertaCoincidencias from "../../../componentes/alertas/alertaCoincidencias/alertaCoincidencias";
import { crearCurso } from "../../../servicios/curso.service";
import { obtenerAnioActual } from "../../../funciones/utilidades.function";

const profesorInicial = {
  nombre:'',
  celular: '',
  email:''
};

const errorInicial = {
  anio: '',
  grado: '',
  profesor: '',
  materia: '',
  error: ''
}

function CargarCurso({cursoAEditar, escuela, setAgregarCurso}) {
  const { datos } = useContext(contexto);
  const [cargando, setCargando] = useState(false);
  const [ claseError, setClaseError ] = useState('sugerencia-error');
  const [isAlerta, setIsAlerta] = useState({materia:false});
  const [ coincidencias, setCoincidencias ] = useState({materia:[]});
  const [profesor, setProfesor]=useState(profesorInicial);
  const [materia, setMateria]=useState(null);
  const [error, setError] = useState({
    ...errorInicial,
    error: 'Debe completarse el grado',
  });

  const [curso, setCurso] = useState({
    anio: cursoAEditar ? cursoAEditar.anio : obtenerAnioActual(),
    grado: cursoAEditar ? cursoAEditar.grado :'',
    profesor:'',
    materia:''
  });

  const validarError=(curso) =>{
    const newError = errorInicial;
    if(!curso.grado) {
      newError.grado = 'El curso debe tener grado';
      newError.error = 'Tiene errores en la solicitud';
    }
    return newError
  }
  const handleSelectMateria = (materiaInterna) =>{
    setCurso((prev)=>({...prev,materia:materiaInterna.nombre}));
    setMateria(materiaInterna);
    setCoincidencias((prev)=>({...prev,materia:[]}));
  }

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setCurso((prev) => ({
      ...prev,
      [name]: value
    }));
    let coincidenciaFiltradas=[];
    if (value.length > 1) {
      if (name==='materia') {
        coincidenciaFiltradas = datos.materias?.filter(materia =>
          materia.nombre.toLowerCase().includes(value.toLowerCase())
        ) || [];
        setCoincidencias(prev => ({ ...prev, materia: coincidenciaFiltradas }));
      }
      
      if (coincidenciaFiltradas?.length > 0) {
        setIsAlerta(prev => ({ ...prev, [name]: true }));
      } else {
        setIsAlerta(prev => ({ ...prev, [name]: false }));
      }
    } else {
      setCoincidencias(prev => ({ ...prev, [name]: [] }));
      setIsAlerta(prev => ({ ...prev, [name]: false }));
    }
  }

  const handleForm = async (e) => {
    const valError = validarError(curso);
    if (valError.error) {
      setError(valError);
      setClaseError('')
      return
    }
    setCargando(true);
    const profeMateria ={ 
      profesor: profesor, 
      materia: materia? materia : { nombre: curso.materia }
    }
    const cursoCargar = { escuela:escuela, anio: curso.anio, grado: curso.grado }
    const dto = {...profeMateria, curso:cursoCargar}

    const newCurso = await crearCurso(dto, setError);
    if (newCurso) {
      setAgregarCurso(false);
      setCargando(false);
    }
  }

  if(cargando ) return (
    <Cargando text={'Se esta procesando la solicitud'}/>
  )
  
  return (
    <Formulario
      handleForm={(e) => handleForm(e)}
      textBtn={cursoAEditar ? 'Editar curso' : 'Cargar curso'}
      subtitulo={cursoAEditar ? 'Editar curso' : 'Cargar curso'}
      error={error.error}
      classError={claseError}
      children={
        <>
          <Inputs
            name={'anio'}
            texto={'Año'}
            tipo={'text'}
            error={error.anio}
            handleOnChange={(e) => handleOnChange(e)}
            valor={curso.anio}
          />
          <Inputs
            name={'grado'}
            texto={'Grado'}
            tipo={'text'}
            error={error.grado}
            handleOnChange={(e) => handleOnChange(e)}
            valor={curso.grado}
          />
          <h6>Datos del profesor</h6>
          <ClienteCargarInterno
                        persona={profesor}
                        error={error.profesor}
                        setPersona={(persona)=>setProfesor(persona)}

                      />
          <Inputs
            name={'materia'}
            texto={'Materia'}
            tipo={'materia'}
            error={error.materia}
            handleOnChange={(e) => handleOnChange(e)}
            valor={curso.materia}
          />
          <AlertaCoincidencias
          isAlerta={isAlerta.materia}
          children={
            <>
              {coincidencias.materia.map((materia, index) => (
                <li key={`nombre-${index}`} onClick={() => handleSelectMateria(materia)}>
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