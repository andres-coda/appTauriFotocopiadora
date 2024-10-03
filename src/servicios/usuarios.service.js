import { usuarioAdapter } from '../adaptadores/usuario.adapter.js';
import { URL_LOGIN, URL_PERFIL, URL_USER } from '../endPoint/endpoint.ts'
import { fetchGet, fetchPatCh, fetchPost } from "../funciones/fetch.function";

export const userVerificar = async (setUserLogin,setError)=> {
    try {
      const userCheck = await fetchGet(URL_PERFIL, setError);
      if (userCheck.email) {
        const newUser = JSON.stringify(userCheck);
        console.log(newUser);        
        setUserLogin(userCheck);
        localStorage.setItem('user', newUser);
      } else {
        localStorage.setItem('token',null);
        localStorage.setItem('user',null);
      setUserLogin(null); 
      
    }
  } catch (error) { 
      localStorage.setItem('token',null);
      localStorage.setItem('user',null);
      setUserLogin(null);   
      const errorMessage = error.message || 'Error desconocido al procesar la solicitud';
        const message = error.message === 'Unauthorized'
          ? 'El usuario o la contraseña son inválidos'
          : errorMessage;
      setError((er)=>({...er, error: message}));
      console.error('Error al procesar la solicitud:', errorMessage);
    }
  }

export const userLogin= async (user, setUserLogin,setError) => {
    try{
      const login = await fetchPost(URL_LOGIN, user, setError);
      if (login) {
        localStorage.setItem('token', login.access_token);
        userVerificar(setUserLogin, setError);
      } else {
        setError((er)=>({...er, error:'No se pudo loguear el usuario'}))
      }
    } catch (error) {
      const errorMessage = error.message || 'Error desconocido al procesar la solicitud';
      const message = error.message === 'Unauthorized'
        ? 'El usuario o la contraseña son inválidos'
        : errorMessage;
      setError((prev) => ({ ...prev, error: message }));
      console.error('Error al procesar la solicitud:', errorMessage);
    }
  }

  export const registrarUser = async (user, setUserLogin, setError) => {
    try{
        const newUser = await fetchPost(URL_USER, user );
        if (newUser) {
          const newUserAdaptado = usuarioAdapter(newUser);
          userLogin(newUserAdaptado, setUserLogin, setError);
        }
      } catch (error) {
        setError((er)=>({...er, error: error.message || 'Error desconocido al procesar la solicitud'}));
        console.error(error);
      }
  } 

  export const cambioarRolUser = async (user, datos, setDatos, setError)=> {
    try{
        const newUser = await fetchPatCh(URL_USER+'/'+user.idUsuario, {role: user.role==='admin' ? 'user' : 'admin'});
        if (newUser) {
          const newUserAdaptado = usuarioAdapter(newUser);
          const listaUsers = datos.listaUsers.map(user=> user.idUsuario===newUserAdaptado.idUsuario ? newUserAdaptado : user);
          setDatos((prev)=>({...prev, listaUsers:listaUsers}));
        }
      } catch (error) {
        setError('Error al intentar el cambio de rol ', error)
      }
  }

  export const actualizarLiastaUsers = async (setDatos, setError) => {
    try {
      console.log("Fetching lista de usuarios...");
      const res = await fetchGet(URL_USER, setError);
      if (res) {
        const listaUsers = res.map(user=> usuarioAdapter(user))
        setDatos((prev) => ({ ...prev, listaUsers: listaUsers }));
      }
    } catch (error) {
      setError("Error fetching materias", error)
      console.error("Error fetching materias", error);
    }
  }

  export const logout = async (setUserLogin) =>{
    setUserLogin({email:''});
    localStorage.setItem('token', null);
    localStorage.setItem('user', null);
  } 