import { useEffect } from "react";
import { useGlobalContext } from "../../contexto/contexto";
import useApi from "../../servicios/Api/useApi";
import { URL_USER } from "../../endPoint/endpoint.ts";
import listaUsuariosAdapter from "../../adaptadores/listaUsuariosAdapter.adapter.js";
import { usuarioAdapter } from "../../adaptadores/usuario.adapter.js";
import { useModalContext } from "../../contexto/modalContexto.jsx";

const useUsuarios = () => {
  const { datos, setDatos } = useGlobalContext();
  const {setEstadoModal} = useModalContext()
  const {
    response, errorFetch, loading, fetchData
  } = useApi();

  useEffect(() => {
    if (datos.listaUsers.length === 0) {
      fetchData(URL_USER, null, 'GET', listaUsuariosAdapter);
    }
  }, []);

  useEffect(() => {
    if (!response) {
      setEstadoModal(false);
      return
    }
    let listaUsers = null;
    if (Array.isArray(response)) {
      listaUsers = response;
    } else {
      listaUsers = datos.listaUsers.map(user => user.idUsuario === response.idUsuario ? response : user);
    }
    setDatos((prev) => ({ ...prev, listaUsers: listaUsers }));

  }, [response]);


  const handleCambiarRolUser = (user) => {
    const url = URL_USER + '/' + user.idUsuario;
    const body = { role: user.role === 'admin' ? 'user' : 'admin' }
    fetchData(url, JSON.stringify(body), 'PATCH', usuarioAdapter);
  }

  return {
   response, errorFetch, loading, handleCambiarRolUser
  }
}

export default useUsuarios;
