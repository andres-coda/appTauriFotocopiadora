import './UsuarioCard.css'
import { useContext, useState } from 'react';
import User from '../../../assets/user.svg';
import AlertaFormulario from '../../../componentes/alertas/alertaFormulario/alertaFormulario';
import AlertaEliminar from '../../../componentes/alertas/alertaEliminar/alertaEliminar';
import { contexto } from '../../../contexto/contexto';
import Cargando from '../../../componentes/cargando/cargando';
import { cambioarRolUser } from '../../../servicios/usuarios.service.js';
import BotonFormulario from '../../../componentesStilos/botones/botonFormulario.jsx';

function UsuarioCard({ user, editar }) {
  const { datos, setDatos } = useContext(contexto);
  const [alerta, setAlerta] = useState(false);
  const [error, setError] = useState('')

  const handleCambiarRolUser = async () => {
    cambioarRolUser(user, datos, setDatos, setError);
    setAlerta(false)
  }

  if (!user) return (
    <Cargando />
  )

  return (
    <>
      <div className="usuario-card">
        <h3><img src={User} alt='Usuario'/> {user.email}</h3>
        <p>Rol: {user.role}</p>
        {editar ? (
          <BotonFormulario 
            onClick={() => setAlerta(true)}
            textBtn={'Cambiar de rol'}
          />
        ) : (null)}
      </div>
      <AlertaFormulario
        isAlerta={alerta}
        setIsAlerta={setAlerta}
        children={
          <AlertaEliminar
            children={<h6>{`Seguro que desea cambiar de rol al usuario ${user.email}?`}</h6>}
            setEliminar={setAlerta}
            handleEliminar={handleCambiarRolUser}
            error={error}
          />
        }
      />
    </>
  )
}
export default UsuarioCard;