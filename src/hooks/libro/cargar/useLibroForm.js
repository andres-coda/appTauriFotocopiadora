import { useContext, useEffect, useState } from "react"
import { contexto } from "../../../contexto/contexto"
import { URL_LIBROS } from "../../../endPoint/endpoint";
import { libroAdapterGeneral } from "../../../adaptadores/libro.adapter";
import { errorLibroInicial, libroInicial } from "./libroFormDefault";
import useCoinsidencias from "../../coincidencias/useCoincidencias";
import useFormGeneral from "../../form/useFormGeneral";
import { validarLibro } from "../../../funciones/validaciónForm/validarLibro";
import { useModalContext } from "../../../contexto/modalContexto";

function useLibroForm(img) {
  const { datos } = useContext(contexto);
  const { estadoModal} = useModalContext();
  const [condicion, setCondicion] = useState(false) 

  const url = datos.libroAEditar ? `${URL_LIBROS}/${datos.libroAEditar.idLibro}` : URL_LIBROS;
  const newLibroInicial = {...libroInicial, img:img}
  
  const {
    handleForm, onchange,
    errorPost, loading, response, 
    info, errorFrom, setInfo
  } = useFormGeneral( newLibroInicial, errorLibroInicial, datos.libroAEditar);
  
  const { coincidencias: coincidenciasNombre, alertaCoincidencia: isAlertaNombre, setSeleccion: setSeleccionNombre } = useCoinsidencias(datos.libros, { name: 'nombre', value: info.nombre });
  const { coincidencias: coincidenciasMateria, alertaCoincidencia: isAlertaMateria, setSeleccion: setSeleccionMateria } = useCoinsidencias(datos.materias, { name: 'nombre', value: info.materia.nombre });

  const [coincidencias, setCoincidencias] = useState({
    nombre:coincidenciasNombre,
    materia: coincidenciasMateria
  });

  const [alertaCoincidencia, setAlertaCoincidencia] = useState({
    nombre: isAlertaNombre,
    materia: isAlertaMateria
  });

  useEffect(()=>{
    if (response) {
      setCondicion(true);
    }
  }, [response])

  useEffect(()=>{
    if (condicion) {
      setCondicion(false);
      setDatos((prev)=>({...prev, libroAEditar:null}));
    }
  }, [estadoModal]);

  const handleSelecNombre = (libro) => {
    setInfo(libro);
    setSeleccionNombre();
  }

  const handleSelecMateria = (materia) =>{
    setInfo((prev) => ({ ...prev, materia: materia }));
    setSeleccionMateria();
  }

  useEffect(()=>{
    const newCoincidencia = {
      nombre:coincidenciasNombre,
      materia: coincidenciasMateria
    }    
    setCoincidencias(newCoincidencia);
  },[coincidenciasNombre, coincidenciasMateria]);

  useEffect(()=>{
    const newAlrta = {
      nombre: isAlertaNombre,
      materia: isAlertaMateria
    }
        
    setAlertaCoincidencia(newAlrta);
  },[isAlertaNombre, isAlertaMateria]);

  useEffect(()=>{
    const libroGuardar = { ...info, img: img };
    setInfo(libroGuardar);
  }, [img])

  const onChangeMateria = (e) => {
    
    const { name, value } = e.target;
    if (name.includes('materia')) {
      const field = name.split('.')[1];
      setInfo({
        ...info,
        materia: {
          ...info.materia,
          [field]: value,
        },
      });      
    }
  };

  const cargarLibro = () => {
    handleForm(url, info, true, validarLibro, libroAdapterGeneral);
  }

  const handleAtras = () => {
    setDatos((prev)=>({...prev, libroAEditar:null}));
    navigate(-1);
  }

  return {
    cargarLibro, handleAtras, onchange, onChangeMateria,
    errorPost, loading, response, 
    info, errorFrom,
    coincidencias, alertaCoincidencia, handleSelecNombre,handleSelecMateria
  }

}

export default useLibroForm;