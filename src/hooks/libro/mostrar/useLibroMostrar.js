import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../contexto/contexto";
import { useModalContext } from "../../../contexto/modalContexto";
import useApi from "../../../servicios/Api/useApi";
import { URL_LIBROS, URL_PROFE_MATERIA } from "../../../endPoint/endpoint.ts";
import listaLibroAdapter from "../../../adaptadores/listaLibrosAdapter.adapter.js";

const useLibroMostrar = () => {
  const { filtros, setFiltros, datos, setDatos } = useGlobalContext();

  const { estadoModal, setEstadoModal } = useModalContext();
  const [selecEscuela, setSelecEscuela] = useState(false);
  const [agregarCurso, setAgregarCurso] = useState(false);
  const [nuevaEscuela, setNuevaEscuela] = useState(false);
  const [nuevoCurso, setNuevoCurso] = useState(false);
  const [solicitud, setSolicitud] = useState(false);
  const [alertaEditar, setAlertaEditar] = useState(false);
  const [alertaEliminar, setAlertaEliminar] = useState(false);

  const {
    response, errorFetch, loading, fetchData
  } = useApi();

  useEffect(()=>{
    if(datos.libros.length===0){
      fetchData(URL_LIBROS, null, 'GET', listaLibroAdapter)
    }
  },[])

  useEffect(() => {
    if (!filtros.busqueda) {
      setAgregarCurso(false);
      return
    }

    if (!estadoModal) {
      setFiltros((prev) => ({
        ...prev,
        busqueda: null
      }))
    }

    if (filtros.busqueda) {
      setSelecEscuela(false);
      setAgregarCurso(true);
    }
  }, [filtros.busqueda, estadoModal]);

  useEffect(()=>{
    if (response===true) {
      setDatos((prev) => ({ ...prev, libroActual: null }))
    }
    if (Array.isArray(response)) {
      setDatos((prev)=>({... prev, libros:response}))
    }
  },[response])


  const handleAgregarCurso = async (prMat) => {
    setSolicitud(true);
    const url = URL_PROFE_MATERIA + '/' + prMat.idProfMateria + '/profeMateria-add-libro';
    fetchData(url, JSON.stringify(datos.libroActual), 'PATCH');
  }

  const handleQuitarCurso = async (prMat) => {
    setSolicitud(true);
    const url = URL_PROFE_MATERIA + '/' + prMat.idProfMateria + '/profeMateria-subtract-libro/' + datos.libroActual.idLibro;
    fetchData(url, null, 'GET');
  }

  const handleEditar = () => {
    const libroAEditar = datos.libroActual;
    setDatos((prev) => ({ ...prev, libroAEditar: libroAEditar }))
    setAlertaEditar(true);
    setEstadoModal(true);
  }

  const handleEliminar = () => {
    const url = URL_LIBROS+'/'+datos.libroActual.idLibro;
    setSolicitud(true);
    fetchData(url, null, 'DELETE');
  }

  return {
    filtros,
    alertaEditar, setAlertaEditar, alertaEliminar, setAlertaEliminar,
    selecEscuela, setSelecEscuela, nuevaEscuela, setNuevaEscuela,
    agregarCurso, setAgregarCurso, nuevoCurso, setNuevoCurso,
    handleAgregarCurso, handleQuitarCurso,
    handleEditar, handleEliminar,
    response, errorFetch, loading, solicitud, setSolicitud,
  }
}

export default useLibroMostrar;