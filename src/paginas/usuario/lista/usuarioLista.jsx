import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contexto } from "../../../contexto/contexto";
import { actualizarLiastaUsers } from "../../../servicios/usuarios.service";
import MiniNav from "../../../componentes/miniHeder/miniNav";
import LeftArrow from "../../../assets/arrowLeft.svg"
import Cargando from "../../../componentes/cargando/cargando";
import UsuarioCard from "../card/usuarioCard";

function ListaUsuarios() {
    const { datos, setDatos } = useContext(contexto);
    const [ error, setError ] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
      actualizarLiastaUsers(setDatos, setError);
    },[]);
  
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
        ) : ( <Cargando />)
      }
      </>
    )
  }
  export default ListaUsuarios;