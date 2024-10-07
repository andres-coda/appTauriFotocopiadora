import Botonera from "../../../componentesStilos/botonera/botonera";
import BotonFormulario from "../../../componentesStilos/botones/botonFormulario";

function AlertaEliminar({ children, setEliminar, handleEliminar, error }) {
  return (
    <>
        {children}
        <Botonera
          children={
            <>
              <BotonFormulario
                onClick={() => { setEliminar(false) }}
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