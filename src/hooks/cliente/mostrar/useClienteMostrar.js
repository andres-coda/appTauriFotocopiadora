import { useContext, useEffect} from "react";
import { contexto } from "../../../contexto/contexto";
import { URL_CLIENTES } from "../../../endPoint/endpoint";
import { rutasGenerales } from "../../../rutas/rutas";
import { useNavigate } from "react-router-dom";
import useApi from "../../../servicios/Api/useApi";
import listaClientesAdapter from "../../../adaptadores/listaClientesAdapter.adapter";

function useClienteMostrar() {
  const { datos, setDatos } = useContext(contexto);
  const url = datos.clienteActual ? `${URL_CLIENTES}/${datos.clienteActual.idPersona}` : '';
  const { fetchData, loading, errorFetch, response } = useApi();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!datos.clienteActual) {
      navigate(rutasGenerales.CLIENTES);
    }
  }, [datos.clienteActual]);
  
  const handleAtras = () => {
    setDatos((prev) => ({ ...prev, clienteActual: null }));
    navigate(-1);
  }

  useEffect(()=>{
    if(datos.clientes.length===0) {
      fetchData(URL_CLIENTES, null, 'GET', listaClientesAdapter)
    }
  },[])

  useEffect(()=>{
    if (Array.isArray(response)){
      setDatos((prev)=>({...prev, clientes:response}))
    }
  },[response])

  const handleEditarCliente = () => {
    setDatos((prev) => ({ ...prev, clienteAEditar: datos.clienteActual }));
    navigate(rutasGenerales.CLIENTENUEVO);
  }

  const eliminarCliente = () => {
    fetchData(url, null, 'DELETE');
  }

  const handleNuevoCliente = () => {
    navigate(rutasGenerales.CLIENTENUEVO);
  };

  return { 
    handleEditarCliente, eliminarCliente, handleNuevoCliente,
    loading, errorFetch, response, handleAtras 
  }

}

export default useClienteMostrar;