import './UsuarioCard.css'
import { useContext, useState } from 'react';
import User from '../../../assets/user.svg';
import AlertaFormulario from '../../../componentes/alertas/alertaFormulario/alertaFormulario';
import AlertaEliminar from '../../../componentes/alertas/alertaEliminar/alertaEliminar';
import { contexto } from '../../../contexto/contexto';
import Cargando from '../../../componentes/cargando/cargando';
import { cambioarRolUser } from '../../../servicios/usuarios.service.js';
import BotonFormulario from '../../../componentesStilos/botones/botonFormulario.jsx';
import useUsuarios from '../../../hooks/usuarios/useUsuarios.js';
import Modal from '../../../componentes/modal/modal.jsx';
import { useModalContext } from '../../../contexto/modalContexto.jsx';

function UsuarioCard({ user, editar }) {
  const { setEstadoModal} = useModalContext();
  const {
    response, errorFetch, loading, handleCambiarRolUser,
  } = useUsuarios()

  const [modalLocal, setModalLocal] = useState(false);
  
  if (!user) return null

  return (
    <>
      <div className="usuario-card">
        <h3><img src={User} alt='Usuario'/> {user.email}</h3>
        <p>Rol: {user.role}</p>
        {editar ? (
          <BotonFormulario 
            onClick={() => {setEstadoModal(true), setModalLocal(true)}}
            textBtn={'Cambiar de rol'}
          />
        ) : (null)}
      </div>
      <Modal
        children={
          loading || response || errorFetch
            ?  (
              <Cargando 
          text={
            <>
              { loading 
                ? 'Cambiando rol de usuario ...' 
                : errorFetch
                  ? `Error al intentar cambiar el rol del usuario: ${errorFetch}`
                  : 'Usuario cambiado de rol con éxito'
                }
            </>
            }/>
            )
            : (
              <AlertaEliminar
                children={<h6>{`Seguro que desea cambiar de rol al usuario ${user.email}?`}</h6>}
                setEliminar={setEstadoModal}
                handleEliminar={()=>handleCambiarRolUser(user)}
                error={errorFetch}
              />
            )
        }
        modal={modalLocal} setModal={setModalLocal}
      />
    </>
  )
}
export default UsuarioCard;