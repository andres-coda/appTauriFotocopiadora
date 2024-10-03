import { useContext } from "react";
import UsuarioCard from "../card/usuarioCard";
import { contexto } from "../../../contexto/contexto";
import { logout } from "../../../servicios/usuarios.service";
import BotonFormulario from "../../../componentesStilos/botones/botonFormulario";

function Perfil() {  
  const {userLogin, setUserLogin} = useContext(contexto);
  
  if (!userLogin.email) {
    console.log('no entro');
    
    return null
  }

  const handleLogout = () => {
    logout(setUserLogin);
  }

  return (
    <>

      <h2 className='formulario-h2'>Usuario logueado</h2>
      <hr className='linea' />
      <UsuarioCard user={userLogin} />
      <BotonFormulario 
        textBtn={'Cerrar sesión'}
        onClick={handleLogout}
      />
    </>

  )
}
export default Perfil;