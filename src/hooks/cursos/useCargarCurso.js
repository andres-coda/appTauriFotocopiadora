import { useEffect } from "react";
import { useGlobalContext } from "../../contexto/contexto";
import { cursoIncial, errorCursoInicial, validarErrorCurso } from "../../funciones/validaciónForm/validarCurso";
import { clienteInicial } from "../cliente/cargar/clienteFormDefault";
import useClienteForm from "../cliente/cargar/useClienteForm";
import useCoinsidencias from "../coincidencias/useCoincidencias";
import useFormGeneral from "../form/useFormGeneral";
import { URL_CURSOS } from "../../endPoint/endpoint.ts";
import useApi from "../../servicios/Api/useApi.js";

const errorLocalInicial = {...errorCursoInicial};
const cursoLocalInicial = {...cursoIncial};
const profeLocalInicial = {...clienteInicial}

const useCargarCurso = (cursoAEditar) => {
    const {datos} = useGlobalContext();

    const { fetchData, responseApi, loadingApi, errorFetchApi } = useApi()
  
    const {
      info:curso, onchange:onChangeCurso, errorFrom, setInfo: setCurso,
      errorFetch, loading, response,
      handleForm, 
    } = useFormGeneral(cursoLocalInicial, errorLocalInicial, cursoAEditar);
  
    const {
      onchange: onChangeProfesor, info:profesor, recetearPersona,
      coincidencias:coinPersona, alertaCoincidencia: alertaCoinPersona, handleSelec :handleSelecPersona
    } = useClienteForm(profeLocalInicial);
  
    const { 
      coincidencias: coincidenciasMateria, alertaCoincidencia: isAlertaMateria, setSeleccion: setSeleccionMateria 
    } = useCoinsidencias(datos.materias, { name: 'nombre', value: curso.materia.nombre });
  
    useEffect(()=>{
      if(response) {
        recetearPersona();
      }
    },[response])
  
    const onChangeMateria = (e) => {    
      const { name, value } = e.target;
  
      if (name.includes('materia')) {
        const field = name.split('.')[1];
        setCurso({
          ...curso,
          materia: {
            ...curso.materia,
            [field]: value,
          },
        });      
      }
    };
  
    const handleSelecMateria = (materia) =>{
      setCurso((prev) => ({ ...prev, materia: materia }));
      setSeleccionMateria();
    }
  
    const agregarCurso = (escuela) => {
      const url = URL_CURSOS+'/profeMateria-add';
      const profeMateria ={ 
        profesor: profesor, 
        materia: curso.materia,
      }
      const cursoCargar = { escuela:escuela, anio: curso.anio, grado: curso.grado }
      const dto = {...profeMateria, curso:cursoCargar}
  
      handleForm(url,dto, true, validarErrorCurso);
  
    }

    const quitarCurso = (idCurso, profeMateria) => {
        const url = URL_CURSOS+'/'+idCurso+'/profeMateria-subtract';
        fetchData(url, JSON.stringify(profeMateria), 'PATCH');
      }
  
    return{
      onChangeMateria, handleSelecMateria, coincidenciasMateria, isAlertaMateria,
      profesor, onChangeProfesor, coinPersona, alertaCoinPersona, handleSelecPersona,
      curso, onChangeCurso, errorFrom, agregarCurso,
      errorFetch, loading, response, 
      responseApi, loadingApi, errorFetchApi, quitarCurso, 
    }
  
  }

  export default useCargarCurso;