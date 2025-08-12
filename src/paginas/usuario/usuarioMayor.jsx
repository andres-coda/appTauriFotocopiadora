import { useContext,  useState } from "react";
import { contexto } from "../../contexto/contexto";
import MiniNav from "../../componentes/miniHeder/miniNav";
import LeftArrow from "../../assets/arrowLeft.svg"
import UserCheck from '../../assets/userCheck.svg'
import Nuevo  from '../../assets/nuevo.svg'
import Registro from "./registro/registro";
import { useNavigate } from "react-router-dom";
import Login from "./login/login";
import Perfil from "./perfil/perfil";

function UsuarioMayor() {
  const { userLogin} = useContext(contexto);
  const [isRegistro, setIsRegistro] = useState(false);
  const navigate = useNavigate();

  if (userLogin && userLogin.email ) return (
    <>
      <MiniNav
        children={
          <li onClick={() => navigate(-1)}
            title='Atras'
            className='btn-add'
          ><img src={LeftArrow} alt="Atras" /></li>
        }
      />
      <Perfil />
    </>
  ) 

  return (
    <>
      <MiniNav
        children={
          <>
            <li onClick={() => navigate(-1)}
              title='Atras'
              className='btn-add'
            ><img src={LeftArrow} alt="Atras" /></li>
            <li
              title='Registrar usuario'
              onClick={() => setIsRegistro(true)}
              className='btn-add'
            ><img src={Nuevo} alt="Registrar usuario" /></li>
            <li
              title='Iniciar sesión'
              onClick={() => setIsRegistro(false)}
              className='btn-add'
            ><img src={UserCheck} alt="Iniciar sesión" /></li>
          </>
        }
      />      
        <>
        {!isRegistro ? (
          <Login />
        ): (
          <Registro />
        )}
        </>
    </>
  )
}
export default UsuarioMayor;