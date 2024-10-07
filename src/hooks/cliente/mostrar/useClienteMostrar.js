import { useContext} from "react";
import { contexto } from "../../../contexto/contexto";
import { URL_CLIENTES } from "../../../endPoint/endpoint";
import useDeleteApi from "../../Api/useDeletedApi";
import { rutasGenerales } from "../../../rutas/rutas";
import { useNavigate } from "react-router-dom";

function useClienteMostrar() {
  const { datos, setDatos } = useContext(contexto);
  const url = datos.clienteActual ? `${URL_CLIENTES}/${datos.clienteActual.idPersona}` : '';
  const { deletedId, loading, error, response } = useDeleteApi(url);
  const navigate = useNavigate();

  if (!datos.clienteActual) {
    navigate(rutasGenerales.CLIENTES);
  }

  const handleAtras = () => {
    setDatos((prev) => ({ ...prev, clienteActual: null }));
    navigate(-1);
  }

  const handleEditarCliente = () => {
    setDatos((prev) => ({ ...prev, clienteAEditar: datos.clienteActual }));
    navigate(rutasGenerales.CLIENTENUEVO);
  }

  return { handleEditarCliente, deletedId, loading, error, response, handleAtras }

}

export default useClienteMostrar;