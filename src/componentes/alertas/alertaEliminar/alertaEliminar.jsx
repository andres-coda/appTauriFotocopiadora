import Botonera from "../../../componentesStilos/botonera/botonera";
import BotonFormulario from "../../../componentesStilos/botones/botonFormulario";
import { useModalContext } from "../../../contexto/modalContexto";

function AlertaEliminar({ children, setEliminar, handleEliminar, error }) {
  const {setEstadoModal} = useModalContext();
  return (
    <>
        {children}
        <Botonera
          children={
            <>
              <BotonFormulario
                onClick={() => { setEstadoModal(false), setEliminar(false)? setEliminar(false) : null }}
                textBtn={'Cancelar'}
              />
              <BotonFormulario
                onClick={handleEliminar}
                textBtn={'Confirmar'}
              />
            </>
          }
        />
      {error ? (
        <div className="inputs-span">
          <span>{error}</span>
        </div>
      ) : (null)}
    </>
  )
}
export default AlertaEliminar;