import Formulario from '../../../componentes/formulario/formulario';
import Inputs from '../../../componentes/input/input';
import Cargando from '../../../componentes/cargando/cargando';
import useLogin from '../../../hooks/usuarios/useLogin';
import Modal from '../../../componentes/modal/modal';

function Registro() {
    const {
      onchange, handleRegistro, errorFrom, usuario,
      errorLogin, loading,loadApi
    } = useLogin();
  
    return (
      <>
        <Formulario
          handleForm={handleRegistro}
          subtitulo={'Registrar usuario'}
          textBtn={'Registrarse'}
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
              />
              <Inputs
                name={'password'}
                texto={'Ingrese contraseña'}
                tipo={'password'}
                handleOnChange={(e) => onchange(e)}
                valor={usuario.password}
                error={errorFrom.password}
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
  export default Registro;