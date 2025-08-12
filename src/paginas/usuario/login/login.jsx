import Formulario from "../../../componentes/formulario/formulario";
import Inputs from "../../../componentes/input/input";
import Cargando from "../../../componentes/cargando/cargando";
import Modal from "../../../componentes/modal/modal.jsx";
import useLogin from "../../../hooks/usuarios/useLogin.js";

function Login() {
  const {
    onchange, handleLogin, errorFrom, usuario,
    errorLogin, loading,loadApi
  } = useLogin();  

  return (
    <>
      <Formulario
        handleForm={handleLogin}
        subtitulo={'Iniciar sesión'}
        textBtn={'Iniciar sesión'}
        error={errorFrom.error}
        children={
          <>
            <Inputs
              name={'email'}
              texto={'Ingrese email'}
              tipo={'email'}
              handleOnChange={(e) => onchange(e)}
              valor={usuario.email}
              error={errorFrom.email}
              autocomplete={true}
              requerido={true}
            />
            <Inputs
              name={'password'}
              texto={'Ingrese contraseña'}
              tipo={'password'}
              handleOnChange={(e) => onchange(e)}
              valor={usuario.password}
              error={errorFrom.password}
              requerido={true}
            />


          </>
        }
      />     
      <Modal 
        children={
          <Cargando 
          text={ loading || loadApi 
            ? 'Iniciando sesión ...'
            : `Error al iniciar sesión: ${errorLogin}`
          }
        />
        }
        />
    </>
  )
}

export default Login;