import { useContext, useEffect} from "react";
import { contexto } from "../../../contexto/contexto";
import { URL_CLIENTES } from "../../../endPoint/endpoint";
import { rutasGenerales } from "../../../rutas/rutas";
import { useNavigate } from "react-router-dom";
import useApi from "../../../servicios/Api/useApi";

function useClienteMostrar() {
  const { datos, setDatos } = useContext(contexto);
  const url = datos.clienteActual ? `${URL_CLIENTES}/${datos.clienteActual.idPersona}` : '';
  const { fetchData, loading, error, response } = useApi();
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

  const handleEditarCliente = () => {
    setDatos((prev) => ({ ...prev, clienteAEditar: datos.clienteActual }));
    navigate(rutasGenerales.CLIENTENUEVO);
  }

  const eliminarCliente = () => {
    fetchData(url, null, 'DELETE');
  }

  return { handleEditarCliente, eliminarCliente, loading, error, response, handleAtras }

}

export default useClienteMostrar;