import { useContext, useEffect, useState } from "react";
import Formulario from "../../../componentes/formulario/formulario";
import Inputs from "../../../componentes/input/input";
import { userLogin } from "../../../servicios/usuarios.service";
import { contexto, useGlobalContext } from "../../../contexto/contexto";
import Cargando from "../../../componentes/cargando/cargando";
import useApi from "../../../servicios/Api/useApi";
import useFormGeneral from "../../../hooks/form/useFormGeneral";


const errorInicialLogin = {
  error: 'Todos los campos deben completarse',
  email: '',
  password: ''
}

const loginInicial = {
  email: "",
  password: ""
}

function useLogin() {
  const loginInicialLocal = {...loginInicial}
  const errorInicialLocal = {...errorInicialLogin}
  const { setUserLogin } = useGlobalContext(contexto);
  const {onchange, } =useFormGeneral(loginInicialLocal, errorInicialLocal)
  const [usuario, setUsuario] = useState(loginInicialLocal);

}

function Login({validarErrores}) {
  const { setUserLogin } = useGlobalContext(contexto);
  const {} =useApi()
  const [clasError, setClasError] = useState('sugerencia-error');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState({
    error: 'Todos los campos deben completarse',
    email: '',
    password: ''
  });

  useEffect(()=>{
    if (error.error != 'Todos los campos deben completarse') {
      setClasError('');
    }
  },[error.error]);

  const [usuario, setUsuario] = useState(
    {
      email: "",
      password: ""
    }
  );

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };
  

  const handleLogin = async () => {
    setClasError('')
    const ifError = validarErrores(usuario);
    if (ifError) {
      setError(ifError);
      setClasError('');
      return
    }
    setCargando(true);
    userLogin(usuario, setUserLogin, setError);
  }

  if (cargando) return (
    <Cargando 
      text={'Iniciando sesión ...'}
    />
  )

  return (
    <>
      <Formulario
        handleForm={handleLogin}
        subtitulo={'Iniciar sesión'}
        textBtn={'Iniciar sesión'}
        error={error.error}
        classError={clasError}
        children={
          <>
            <Inputs
              name={'email'}
              texto={'Ingrese email'}
              tipo={'email'}
              handleOnChange={(e) => handleChange(e)}
              valor={usuario.email}
              error={error.email}
              autocomplete={true}
              requerido={true}
            />
            <Inputs
              name={'password'}
              texto={'Ingrese contraseña'}
              tipo={'password'}
              handleOnChange={(e) => handleChange(e)}
              valor={usuario.password}
              error={error.password}
              requerido={true}
            />


          </>
        }
      />
    </>
  )
}

export default Login;