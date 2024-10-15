import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../contexto/contexto";
import MiniNav from "../../../componentes/miniHeder/miniNav";
import LeftArrow from "../../../assets/arrowLeft.svg"
import Cargando from "../../../componentes/cargando/cargando";
import UsuarioCard from "../card/usuarioCard";
import useUsuarios from "../../../hooks/usuarios/useUsuarios";

function ListaUsuarios() {
    const { datos } = useGlobalContext();
    const {errorFetch, loading } = useUsuarios();
    const navigate = useNavigate();
    
    return (
      <>
      <MiniNav
        children={
          <>
            <li onClick={() => navigate(-1)}
              title='Atras'
              className='btn-add'
            ><img src={LeftArrow} alt="Atras" /></li>
          </>
        }
      />
      <h3 className='titulo'>Lista de usuarios</h3>
      {
        datos.listaUsers.length > 0 ? (
          datos.listaUsers?.map((user, index) =>(
            <UsuarioCard user={user} key={`user-${index}`} editar={true}/>
          ))
        ) : ( 
        <Cargando 
          text={
            <>
              { loading 
                ? 'Cargando lista de usuarios' 
                : errorFetch
                  ? `Error al intentar leer la lista de usuarios: ${errorFetch}`
                  : 'Lista de usuarios lista'
                }
            </>
            }/>)
      }
      </>
    )
  }
  export default ListaUsuarios;