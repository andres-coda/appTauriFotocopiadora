import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexto/contexto";
import { useModalContext } from "../../contexto/modalContexto";
import useApi from "../../servicios/Api/useApi";
import useFormGeneral from "../form/useFormGeneral";
import { URL_LOGIN, URL_PERFIL, URL_USER } from "../../endPoint/endpoint";
import { errorUserInicial, userInicial, validarUsuario } from "../../funciones/validaciónForm/validarUsuario";

const errorInicialLocal = {...errorUserInicial}

const loginInicialLocal = {...userInicial}

function useLogin() {
  const { setUserLogin } = useGlobalContext();
  const { setEstadoModal } = useModalContext();
  const [ login, setLogin] = useState(true)

  const {
    info:usuario, 
    onchange, handleForm, errorFrom,
    response, errorFetch, loading,
  } =useFormGeneral(loginInicialLocal, errorInicialLocal);

  const { fetchData, response:resApi, errorFetch: errorApi, loading:loadApi } = useApi();

  const [errorLogin, setErrorLogin] = useState(null);

  
  useEffect(()=>{
    if (response) {
        if (login) {
            setLogin(false)
            localStorage.setItem('token', response.access_token);
            fetchData(URL_PERFIL , null, 'GET');
        } else {
            setLogin(true);
            handleForm(URL_LOGIN, usuario, true, validarUsuario);
        }
    }
  },[response]);

  useEffect(()=>{
    if (resApi && resApi.email){
      setUserLogin(resApi);
      setErrorLogin(null);
      setEstadoModal(false);
    }
  },[resApi]);

  useEffect(()=>{
    if (loadApi || loading || errorApi||errorFetch) {
      setEstadoModal(true);
    }
    if(errorApi||errorFetch) {   
      const error = errorApi || errorFetch;
      localStorage.setItem('token',null);
      setUserLogin(null);   
      const errorMessage = error || 'Error desconocido al procesar la solicitud';
        const message = error === 'Unauthorized'
          ? 'El usuario o la contraseña son inválidos'
          : errorMessage;
      setErrorLogin(message);
      console.error('Error al procesar la solicitud:', errorMessage);
    }
  },[errorApi, errorFetch, loadApi, loading])
  
  const handleLogin = () => {
    setLogin(true);
    handleForm(URL_LOGIN, usuario, true, validarUsuario);
  }

  const handleRegistro = () => {
    setLogin(false);
    handleForm(URL_USER, usuario, true, validarUsuario);
  }

  return {
    onchange, handleLogin, handleRegistro, 
    errorFrom, usuario,
    errorLogin, loading, loadApi
  }

}

export default useLogin;